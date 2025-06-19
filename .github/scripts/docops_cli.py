import argparse
import os
from pathlib import Path
import yaml

DOCS_ROOT = Path("docs")
INDEX_FILE = DOCS_ROOT / "index.md"

def collect_metadata(md_path):
    meta_file = md_path.with_suffix(".metadata.yaml")
    if not meta_file.exists():
        return {"title": md_path.stem, "path": str(md_path), "validated": False}
    with open(meta_file, "r") as f:
        try:
            metadata = yaml.safe_load(f)
            metadata["path"] = str(md_path)
            metadata["validated"] = True
            return metadata
        except yaml.YAMLError as e:
            return {"title": md_path.stem, "path": str(md_path), "validated": False, "error": str(e)}

def validate_all_metadata():
    print("🔍 Validating all metadata.yaml files...")
    invalid = 0
    for md_path in sorted(DOCS_ROOT.rglob("*.md")):
        if md_path.name == "index.md":
            continue
        meta = collect_metadata(md_path)
        if not meta["validated"]:
            print(f"❌ Missing or invalid metadata for: {md_path}")
            if "error" in meta:
                print(f"   → YAML Error: {meta['error']}")
            invalid += 1
        else:
            print(f"✅ {md_path} metadata is valid")
    print(f"---\nValidation complete. {invalid} file(s) need attention.\n")

def regenerate_index():
    print("🛠️  Regenerating index.md...")
    with open(INDEX_FILE, "w", encoding="utf-8") as out:
        out.write("# 📚 Documentation Index\n\n")
        for md_path in sorted(DOCS_ROOT.rglob("*.md")):
            if md_path.name == "index.md":
                continue
            meta = collect_metadata(md_path)
            title = meta.get("title", md_path.stem)
            path = meta["path"]
            out.write(f"- [{title}]({path})\n")
    print(f"✅ index.md written to: {INDEX_FILE}")

def main():
    parser = argparse.ArgumentParser(description="📘 Citadel DocOps CLI")
    parser.add_argument("--validate", action="store_true", help="Validate all metadata.yaml files")
    parser.add_argument("--index", action="store_true", help="Regenerate index.md")
    args = parser.parse_args()

    if args.validate:
        validate_all_metadata()
    if args.index:
        regenerate_index()

if __name__ == "__main__":
    main()