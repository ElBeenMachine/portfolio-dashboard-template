#!/bin/bash

# Exit on error
set -e

echo "Generating release notes..."

# Get the latest two tags
tags=$(git tag --sort=-creatordate | head -n 2)

# Check if there are at least two tags
if [ $(echo "$tags" | wc -l) -lt 2 ]; then
    echo "Error: Less than two git tags found in the repository"
    exit 1
fi

latest_tag=$(echo "$tags" | sed -n '1p')
previous_tag=$(echo "$tags" | sed -n '2p')

echo "Latest tag: $latest_tag"
echo "Previous tag: $previous_tag"

# Generate release notes from previous tag to latest tag
if ! git log ${previous_tag}..${latest_tag} --pretty=format:"- %h - %s (%an)" > release-notes.txt 2>/dev/null; then
    echo "Error: Failed to generate release notes"
    exit 1
fi

# Check if release notes are empty
if [ ! -s release-notes.txt ]; then
    echo "No new commits found between tags ${previous_tag} and ${latest_tag}"
    exit 0
fi

# Add markdown formatting
{
    echo "## Changes from ${previous_tag} to ${latest_tag}"
    echo ""
    cat release-notes.txt
} > release-notes.md

echo "Release notes generated successfully"