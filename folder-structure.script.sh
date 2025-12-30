#!/bin/bash

# ==============================================================================
# Script Name:  generate_structure.sh
# Description:  Generates a Markdown folder structure, respecting .gitignore.
# Usage:        ./generate_structure.sh
# ==============================================================================

# Configuration
OUTPUT_FILE="folder_structure.md"
SCRIPT_NAME=$(basename "$0")
IGNORE_FILE=".gitignore"

# Check if git is installed and if the directory is a git repo
HAS_GIT=false
if command -v git &> /dev/null && git rev-parse --is-inside-work-tree &> /dev/null; then
    HAS_GIT=true
fi

# Function to traverse directories recursively
# $1: The directory path to scan
# $2: The prefix string for indentation
traverse_dir() {
    local dir="$1"
    local prefix="$2"

    # Expand the glob into an array
    local items=("$dir"/*)

    # Filter valid items
    local valid_items=()
    for item in "${items[@]}"; do
        # 1. Basic checks: skip if item doesn't exist (empty folder glob)
        [[ -e "$item" ]] || continue

        # 2. Skip the script itself and the output file
        local name=$(basename "$item")
        [[ "$name" == "$SCRIPT_NAME" ]] && continue
        [[ "$name" == "$OUTPUT_FILE" ]] && continue

        # 3. .gitignore Check
        # We check if git is available and if git marks this path as ignored
        if [ "$HAS_GIT" = true ]; then
            if git check-ignore -q "$item"; then
                continue
            fi
        fi

        valid_items+=("$item")
    done

    local count=${#valid_items[@]}

    for i in "${!valid_items[@]}"; do
        local item="${valid_items[$i]}"
        local name=$(basename "$item")

        # Determine visual connectors
        local connector="├── "
        local next_prefix="${prefix}│   "

        # If it's the last item in the list, use the "corner" connector
        if [ $i -eq $((count - 1)) ]; then
            connector="└── "
            next_prefix="${prefix}    "
        fi

        # Process directories vs files
        if [ -d "$item" ]; then
            echo "${prefix}${connector}${name}/" >> "$OUTPUT_FILE"
            # Recurse into the directory
            traverse_dir "$item" "$next_prefix"
        else
            echo "${prefix}${connector}${name}" >> "$OUTPUT_FILE"
        fi
    done
}

# --- Main Execution ---

# Initialize the file
echo "## Project Folder Structure" > "$OUTPUT_FILE"
echo "Generated on: $(date)" >> "$OUTPUT_FILE"
[ "$HAS_GIT" = true ] && echo "*(Respected .gitignore rules)*" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "\`\`\`text" >> "$OUTPUT_FILE"

# Print the root directory name
ROOT_DIR_NAME=$(basename "$(pwd)")
echo "$ROOT_DIR_NAME/" >> "$OUTPUT_FILE"

# Start the recursive process from current directory
traverse_dir "." ""

# Close the code block
echo "\`\`\`" >> "$OUTPUT_FILE"

echo "Success! Structure (respecting .gitignore) saved to: $OUTPUT_FILE"
