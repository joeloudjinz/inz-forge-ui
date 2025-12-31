#!/bin/bash

# ==============================================================================
# Script Name:  folder-structure.script.sh
# Description:  Generates a clean Markdown representation of the project folder
#               structure. It automatically hides the script itself, the output
#               file, and the internal .git metadata folder.
#               If the project uses Git, it respects rules defined in .gitignore.
# Usage:        ./folder-structure.script.sh
# ==============================================================================

# --- Configuration ---
# You can change these variables to customize the output filename.
OUTPUT_FILE="folder_structure.md"
SCRIPT_NAME=$(basename "$0") # Gets the actual name of this script file
IGNORE_FILE=".gitignore"

# --- Git Detection ---
# We check two things here:
# 1. Is the 'git' command available on the system?
# 2. Is the current directory actually inside a Git repository?
HAS_GIT=false
if command -v git &> /dev/null && git rev-parse --is-inside-work-tree &> /dev/null; then
    HAS_GIT=true
fi

# ==============================================================================
# Function: traverse_dir
# Description: Recursively loops through directories to build the tree.
# Arguments:
#   $1 (dir):    The current directory path being scanned.
#   $2 (prefix): The string used for indentation (e.g., "│   ").
# ==============================================================================
traverse_dir() {
    local dir="$1"
    local prefix="$2"

    # --- Step 1: File Discovery ---
    # By default, the wildcard (*) ignores hidden files (files starting with .).
    # We enable 'dotglob' to catch hidden files like .github or .env.
    # We enable 'nullglob' so that if a folder is empty, the array remains empty
    # instead of containing the literal string path.
    shopt -s dotglob nullglob
    local items=("$dir"/*)
    shopt -u dotglob nullglob # Turn these settings off after we are done to be safe.

    # --- Step 2: Filtering Valid Items ---
    # We loop through every item found and decide whether to keep it or skip it.
    local valid_items=()
    for item in "${items[@]}"; do

        # Safety Check: Ensure the item actually exists
        [[ -e "$item" ]] || continue

        local name=$(basename "$item")

        # Skip '.' (current dir) and '..' (parent dir) to prevent infinite loops
        [[ "$name" == "." || "$name" == ".." ]] && continue

        # Skip the internal Git metadata folder (too noisy for a project overview)
        [[ "$name" == ".git" ]] && continue

        # Skip the script itself and the generated output file to keep the list clean
        [[ "$name" == "$SCRIPT_NAME" ]] && continue
        [[ "$name" == "$OUTPUT_FILE" ]] && continue

        # Git Ignore Check:
        # If Git is available, ask Git if this specific file is ignored.
        # If 'git check-ignore' returns success (0), the file IS ignored, so we skip it.
        if [ "$HAS_GIT" = true ]; then
            if git check-ignore -q "$item"; then
                continue
            fi
        fi

        # If it passed all checks, add it to our list of valid items
        valid_items+=("$item")
    done

    # --- Step 3: Printing the Tree ---
    local count=${#valid_items[@]}

    for i in "${!valid_items[@]}"; do
        local item="${valid_items[$i]}"
        local name=$(basename "$item")

        # Visual Logic:
        # Standard items get a "T" shape connector: ├──
        # The last item gets an "L" shape connector: └──
        local connector="├── "
        local next_prefix="${prefix}│   "

        if [ $i -eq $((count - 1)) ]; then
            connector="└── "
            next_prefix="${prefix}    "
        fi

        # Print the item
        if [ -d "$item" ]; then
            # If it is a directory, print it with a trailing slash
            echo "${prefix}${connector}${name}/" >> "$OUTPUT_FILE"

            # RECURSION: Call this function again for the subdirectory,
            # passing the new prefix indentation.
            traverse_dir "$item" "$next_prefix"
        else
            # If it is a file, just print the name
            echo "${prefix}${connector}${name}" >> "$OUTPUT_FILE"
        fi
    done
}

# ==============================================================================
# Main Execution Flow
# ==============================================================================

# 1. Initialize the output file
# We use '>' to overwrite the file if it already exists.
echo "## Project Folder Structure" > "$OUTPUT_FILE"
echo "Generated on: $(date)" >> "$OUTPUT_FILE"

# Add a note if we are hiding files based on .gitignore
[ "$HAS_GIT" = true ] && echo "*(Respected .gitignore rules)*" >> "$OUTPUT_FILE"

echo "" >> "$OUTPUT_FILE"
echo "\`\`\`text" >> "$OUTPUT_FILE" # Start Markdown code block

# 2. Print the root directory name (the folder you are currently in)
ROOT_DIR_NAME=$(basename "$(pwd)")
echo "$ROOT_DIR_NAME/" >> "$OUTPUT_FILE"

# 3. Start the traversal from the current directory (".")
# The second argument is empty because there is no indentation yet.
traverse_dir "." ""

# 4. Close the Markdown code block
echo "\`\`\`" >> "$OUTPUT_FILE"

echo "Success! Structure (respecting .gitignore) saved to: $OUTPUT_FILE"
