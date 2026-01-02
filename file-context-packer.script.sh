#!/bin/bash

# ==============================================================================
# SHELL SCRIPT ANATOMY & CONFIGURATION
# ==============================================================================

# 1. SHEBANG: Tells the operating system to use the 'bash' interpreter.
# 2. VARIABLES: In Bash, no '$' when assigning. Just NAME="value".
OUTPUT_FILENAME="context-packer-result.md"

# 3. ARRAYS: Lists are defined with parenthesis ().
#    Elements are separated by spaces, not commas.
EXCLUDE_PATTERNS=(
    "*.exe" "*.bin" "*.dll" "*.so"  # Compiled Binaries
    "*.lock"                        # Lockfiles (too much noise)
    "package-lock.json"
    "yarn.lock"
    ".git"                          # The git folder itself (metadata)
    "*.svg" "*.png" "*.jpg"         # Binary Media files
    "context-packer-result.md"      # RECURSION GUARD: Don't read the file we are writing to!
)

# ==============================================================================
# CORE FUNCTIONS
# ==============================================================================

# Function: is_git_ignored
# Goal: Determine if a file should be skipped based on Git rules.
# Returns: 0 (True/Yes) or 1 (False/No). Note: In shell, 0 is success!
is_git_ignored() {
    local path="$1"  # $1 is the first argument passed to this function.

    # $(...) is "Command Substitution". It runs the command inside and returns the string result.
    # dirname strips the filename, returning just the folder path.
    local dir
    dir=$(dirname "$path")

    # DEPENDENCY CHECK:
    # 'command -v' checks if a program exists.
    # >/dev/null redirects Standard Output (stdout) to the "void".
    # 2>&1 redirects Standard Error (stderr) to where stdout is going (the void).
    # effectively: "Run this silently, I only care about the Exit Code".
    if ! command -v git >/dev/null 2>&1; then return 1; fi

    # REPO CHECK:
    # git -C "$dir" tells git to run AS IF it were in that directory.
    # rev-parse checks if we are actually inside a git repository.
    if ! git -C "$dir" rev-parse --is-inside-work-tree >/dev/null 2>&1; then return 1; fi

    # TRACKING CHECK (The Fix for Cypress):
    # 'ls-files --error-unmatch' returns Exit Code 0 if the file is explicitly tracked by Git.
    # If it IS tracked, we immediately return 1 (Do NOT ignore), even if .gitignore matches it.
    if git -C "$dir" ls-files --error-unmatch "$(basename "$path")" >/dev/null 2>&1; then
        return 1
    fi

    # RULE CHECK:
    # If it wasn't tracked, we check .gitignore rules using 'check-ignore'.
    # -q means quiet (don't print output, just give me exit code 0 or 1).
    if git -C "$dir" check-ignore -q "$(basename "$path")"; then
        return 0 # Exit Code 0 means "Success, I found a match", so YES, it is ignored.
    fi

    return 1 # Default: Not ignored.
}

# Function: is_manually_excluded
# Goal: Check if file matches the EXCLUDE_PATTERNS array defined at the top.
is_manually_excluded() {
    local path="$1"
    local filename=$(basename "$path") # Extract "file.txt" from "src/file.txt"

    # ARRAY ITERATION:
    # "${EXCLUDE_PATTERNS[@]}" expands to all items in the array.
    for pattern in "${EXCLUDE_PATTERNS[@]}"; do
        # [[ ... ]] is a "New Test" block.
        # == performs pattern matching (globbing) because we used [[ ]].
        if [[ "$filename" == $pattern ]]; then
            return 0 # True (Found a match)
        fi
    done
    return 1 # False (No match)
}

# Function: get_binary_reason
# Goal: Detect if a file is binary to avoid printing garbage characters.
# Returns: 0 if Binary (Skip), 1 if Text (Keep).
# Side Effect: Echos the detected MIME type for logging.
get_binary_reason() {
    local file="$1"

    # -s checks file size. ! negates it.
    # So: "If file size is NOT greater than zero" (Empty file).
    # We treat empty files as text because printing them is harmless.
    if [ ! -s "$file" ]; then
        return 1
    fi

    # Strategy A: The 'file' command (Best method)
    if command -v file >/dev/null 2>&1; then
        local mime_output
        mime_output=$(file --mime -b "$file")

        # PIPING (|): Takes output of 'echo' and feeds it into 'grep'.
        # grep -q: Quiet search.
        if echo "$mime_output" | grep -q "charset=binary"; then

            # Edge Case: 'file' reports empty files as "inode/x-empty; charset=binary".
            # We want to keep those.
            if echo "$mime_output" | grep -q "inode/x-empty"; then
                return 1
            fi

            # It's real binary. Print the MIME type for the user to see.
            echo "MIME: $mime_output"
            return 0
        fi
    else
        # Strategy B: Fallback (Perl)
        # Perl is present on almost all Unix systems.
        # It scans for a Null Byte (\0) which never exists in plain text files.
        if command -v perl >/dev/null 2>&1; then
            if ! perl -ne 'exit 1 if /\0/' "$file"; then
                echo "Detected Null Bytes (Perl)"
                return 0
            fi
        # Strategy C: Last Resort (Grep with Perl-Regex)
        elif grep -qP '\x00' "$file" 2>/dev/null; then
             echo "Detected Null Bytes (Grep)"
             return 0
        fi
    fi
    return 1 # It is text.
}

# Function: get_fence_string
# Goal: Avoid "Markdown Breakage".
# If a file contains ``` (3 ticks), we wrap it in ```` (4 ticks).
get_fence_string() {
    local file="$1"
    local max_ticks

    # 1. grep -o: extract only the backticks.
    # 2. awk: count length of each match.
    # 3. sort -rn: sort numerically, descending.
    # 4. head -1: take the longest one.
    max_ticks=$(grep -o '`\+' "$file" 2>/dev/null | awk '{ print length }' | sort -rn | head -1)

    # -z checks if string is empty.
    if [ -z "$max_ticks" ]; then max_ticks=0; fi

    # Arithmetic expansion: $(( ... ))
    local fence_len=$((max_ticks + 1))

    # -lt means "Less Than". Ensure minimum 3 ticks.
    if [ "$fence_len" -lt 3 ]; then fence_len=3; fi

    # printf trick to repeat a character N times.
    printf "%0.s\`" $(seq 1 $fence_len)
}

# Function: print_file
# Goal: Output the actual content formatted for Markdown.
print_file() {
    local filepath="$1"
    local check_git="$2" # "yes" or "no"

    # -f checks if file exists and is a regular file.
    if [ ! -f "$filepath" ]; then
        echo "[WARN] File listed but not found (Permissions?): $filepath" >&2
        return
    fi

    if is_manually_excluded "$filepath"; then return; fi

    # Only run git check if requested (Optimization).
    if [ "$check_git" == "yes" ]; then
        if is_git_ignored "$filepath"; then return; fi
    fi

    # BINARY CHECK:
    local binary_reason
    binary_reason=$(get_binary_reason "$filepath")
    local is_bin=$? # $? captures the Exit Code of the last command run.

    # If exit code was 0 (True), it is binary.
    if [ $is_bin -eq 0 ]; then
        # >&2 redirects this echo to Standard Error (Terminal) instead of the file.
        echo "[SKIP] Binary file ignored: $filepath ($binary_reason)" >&2
        return
    fi

    # LOGGING: Print to Console (stderr)
    echo "[ADDED] $filepath" >&2

    # FORMATTING:
    local fence
    fence=$(get_fence_string "$filepath")

    # PRINTING: These go to Standard Output (stdout), which maps to our .md file.
    echo "${filepath}:"
    echo "$fence"
    cat "$filepath"
    echo ""
    echo "$fence"
}

# Function: process_directory
# Goal: Recursively find files.
process_directory() {
    local dirpath="$1"

    # Strategy A: Use Git (Faster, respects .gitignore natively)
    if command -v git >/dev/null 2>&1 && git -C "$dirpath" rev-parse --is-inside-work-tree >/dev/null 2>&1; then

        # ls-files flags:
        # --cached: files committed to git.
        # --others: files created but not committed yet.
        # --exclude-standard: remove files matching .gitignore from the 'others' list.
        git -C "$dirpath" ls-files --cached --others --exclude-standard | while read -r git_file; do
             local full_path="${dirpath}/${git_file}"
             # String Manipulation: ${var//search/replace} -> Remove double slashes.
             full_path=${full_path//\/\//\/}
             print_file "$full_path" "no"
        done
    else
        # Strategy B: Standard Find (Slower, manual checks)
        # find -print0 uses a null character separator to handle filenames with spaces safely.
        while IFS= read -r -d '' file; do
            print_file "$file" "yes"
        done < <(find "$dirpath" -type f -print0)
    fi
}

# ==============================================================================
# MAIN EXECUTION ENTRY POINT
# ==============================================================================

# $# is the number of arguments passed to the script.
if [ "$#" -eq 0 ]; then
    echo "Usage: $0 [file_or_folder] ..." >&2
    exit 1
fi

# Log start messages to Terminal (stderr)
echo "Generative Context Packer initialized..." >&2
echo "Target: $OUTPUT_FILENAME" >&2
echo "Scanning..." >&2

# BLOCK REDIRECTION:
# We wrap this entire block in curly braces { ... }.
# The '> "$OUTPUT_FILENAME"' at the very end captures EVERYTHING printed to stdout
# inside this block and writes it to the file.
{
    echo "# Context Dump"
    echo "Generated on: $(date)"
    echo "Inputs: $*" # $* represents all arguments as a single string.
    echo "---"
    echo ""

    # "$@" represents all arguments as a list (preserving quotes/spaces).
    for input_path in "$@"; do
        # Strip trailing slash: src/ becomes src
        clean_path="${input_path%/}"

        if [ -d "$clean_path" ]; then
            process_directory "$clean_path"
        elif [ -f "$clean_path" ]; then
            print_file "$clean_path" "yes"
        else
            echo "[WARN] '$clean_path' is not a valid file or directory." >&2
        fi
    done

} > "$OUTPUT_FILENAME"

# Final success message to Terminal
echo "------------------------------------------------" >&2
echo "Success! Content written to: $OUTPUT_FILENAME" >&2
