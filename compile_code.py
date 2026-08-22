#!/usr/bin/env python3
"""
Unified Code Collector for Backend (Python) and Frontend

Generates structured text files containing all source code,
excluding dev artifacts like .venv, node_modules, etc.
"""

import os
import sys
from pathlib import Path
from datetime import datetime

# ==============================
# CONFIGURATION
# ==============================

EXCLUDE_DIRS = {
    '.venv', 'venv', 'env', '.env',
    '__pycache__', '.git', '.idea', '.vscode',
    'node_modules', 'dist', 'build', 'out',
    '.next', '.nuxt', '.cache', '.mypy_cache',
    '.pytest_cache', '.tox', 'coverage', 'public/build',
    'logs', '.log', 'tmp', '.tmp'
}

BACKEND_EXTENSIONS = {'.py'}
FRONTEND_EXTENSIONS = {
    '.js', '.ts', '.jsx', '.tsx',
    '.css', '.scss', '.sass', '.less',
    '.html', '.htm',
    '.json', '.yaml', '.yml'
}

def normalize_path(path_str):
    """Normalize and resolve a user-provided path."""
    if not path_str:
        return Path.cwd()
    p = Path(path_str).expanduser().resolve()
    if not p.exists():
        raise FileNotFoundError(f"Directory does not exist: {p}")
    if not p.is_dir():
        raise NotADirectoryError(f"Path is not a directory: {p}")
    return p

def should_exclude_dir(dir_name):
    """Check if a directory name should be excluded (case-insensitive)."""
    dir_lower = dir_name.lower()
    for excl in EXCLUDE_DIRS:
        if excl.lower() == dir_lower or dir_lower.endswith(excl.lower()):
            return True
    return False

def collect_files(root_dir, extensions):
    """Collect files with given extensions, excluding unwanted directories."""
    collected = []
    try:
        for root, dirs, files in os.walk(root_dir):
            # Prune excluded directories in-place
            dirs[:] = [d for d in dirs if not should_exclude_dir(d)]
            for file in files:
                if any(file.lower().endswith(ext) for ext in extensions):
                    full_path = Path(root) / file
                    rel_path = full_path.relative_to(root_dir)
                    collected.append((str(rel_path).replace('\\', '/'), str(full_path)))
    except PermissionError as e:
        print(f"⚠️  Permission denied during scan: {e}", file=sys.stderr)
    except Exception as e:
        print(f"⚠️  Error during file walk: {e}", file=sys.stderr)
    return collected

def write_output_file(file_list, output_path, title_prefix):
    """Write collected files to output in the specified format."""
    if not file_list:
        return False

    file_list.sort(key=lambda x: x[0])
    
    # Group by directory for header
    dir_groups = {}
    for rel_path, _ in file_list:
        dir_path = os.path.dirname(rel_path) or "."
        if dir_path not in dir_groups:
            dir_groups[dir_path] = []
        dir_groups[dir_path].append(rel_path)
    
    sorted_dirs = sorted(dir_groups.keys())

    with open(output_path, 'w', encoding='utf-8') as outfile:
        # Header: File List
        outfile.write(f"# {title_prefix} File List:\n")
        outfile.write("# " + "=" * (len(title_prefix) + 11) + "\n\n")
        
        for dir_path in sorted_dirs:
            if dir_path != sorted_dirs[0]:
                outfile.write("\n")
            for rel_path in sorted(dir_groups[dir_path]):
                outfile.write(f"# {rel_path}\n")
        
        outfile.write("\n\n" + "="*80 + "\n\n")
        outfile.write(f"# {title_prefix} File Contents:\n")
        outfile.write("# " + "=" * (len(title_prefix) + 16) + "\n\n")
        
        # Contents
        for idx, (rel_path, full_path) in enumerate(file_list):
            if idx > 0:
                outfile.write("\n" + "-"*80 + "\n\n")
            
            outfile.write(f"# {rel_path}\n")
            outfile.write("#" * (len(rel_path) + 2) + "\n\n")
            
            try:
                with open(full_path, 'r', encoding='utf-8') as infile:
                    content = infile.read()
                    outfile.write(content)
                    if content and not content.endswith('\n'):
                        outfile.write('\n')
            except Exception as e:
                outfile.write(f"# ERROR reading file: {e}\n")
    
    return True

def get_timestamp():
    """Return timestamp string in DDMMYY-HHMM format."""
    return datetime.now().strftime("%d%m%y-%H%M")

def main():
    print("Unified Code Collector")
    print("=====================\n")
    
    # Get root directory
    while True:
        try:
            root_input = input(
                "Enter the root directory to search (or press Enter for current directory): "
            ).strip()
            root_dir = normalize_path(root_input)
            print(f"✅ Using root directory: {root_dir}\n")
            break
        except (FileNotFoundError, NotADirectoryError) as e:
            print(f"❌ Error: {e}\n")
        except KeyboardInterrupt:
            print("\nOperation cancelled by user.")
            sys.exit(0)

    # Menu selection
    print("Select what to compile:")
    print("1. Backend (Python files)")
    print("2. Frontend (JS/TS/CSS/HTML/JSON/YAML)")
    print("3. Both")
    
    while True:
        choice = input("\nEnter your choice (1/2/3): ").strip()
        if choice in {'1', '2', '3'}:
            break
        print("❌ Invalid choice. Please enter 1, 2, or 3.")

    timestamp = get_timestamp()
    backend_files = []
    frontend_files = []
    outputs = []

    # Collect based on choice
    if choice in {'1', '3'}:
        print("\n🔍 Scanning for backend (.py) files...")
        backend_files = collect_files(root_dir, BACKEND_EXTENSIONS)
        print(f"   Found {len(backend_files)} backend file(s).")

    if choice in {'2', '3'}:
        print("\n🔍 Scanning for frontend files...")
        frontend_files = collect_files(root_dir, FRONTEND_EXTENSIONS)
        print(f"   Found {len(frontend_files)} frontend file(s).")

    # Write outputs
    success_count = 0
    if backend_files:
        backend_out = f"combined_backend_files_{timestamp}.txt"
        if write_output_file(backend_files, backend_out, "Backend"):
            outputs.append(backend_out)
            success_count += 1
            print(f"✅ Backend output saved: {backend_out}")

    if frontend_files:
        frontend_out = f"combined_frontend_files_{timestamp}.txt"
        if write_output_file(frontend_files, frontend_out, "Frontend"):
            outputs.append(frontend_out)
            success_count += 1
            print(f"✅ Frontend output saved: {frontend_out}")

    # Summary
    print("\n" + "="*50)
    if success_count == 0:
        print("⚠️  No files were written (no matching files found).")
    else:
        print(f"🎉 Successfully generated {success_count} file(s):")
        for out in outputs:
            size_kb = os.path.getsize(out) / 1024
            print(f"   - {out} ({size_kb:.1f} KB)")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n🛑 Script interrupted by user.")
        sys.exit(1)
    except Exception as e:
        print(f"\n💥 Unexpected error: {e}", file=sys.stderr)
        sys.exit(1)