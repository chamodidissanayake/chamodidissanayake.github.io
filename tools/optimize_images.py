"""
Shrink photos in assets/ so the website loads fast, and strip EXIF metadata
(phone photos often contain GPS coordinates you don't want to publish).

Usage (from the site folder):
    python tools/optimize_images.py

- Resizes anything larger than MAX_EDGE px on its long side.
- Fixes rotation from EXIF before stripping it, so photos never appear sideways.
- Overwrites files IN PLACE (same name, same extension), so data.js paths stay valid.
  Keep your full-resolution originals somewhere else (not inside this folder).
- Safe to run repeatedly: already-optimized files are skipped (never re-compressed).
"""
from pathlib import Path
from PIL import Image, ImageOps

MAX_EDGE = 1600
JPEG_QUALITY = 80

root = Path(__file__).resolve().parent.parent / "assets"
total_before = total_after = 0

for path in sorted(root.rglob("*")):
    if path.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
        continue
    before = path.stat().st_size
    total_before += before
    with Image.open(path) as im:
        has_exif = bool(im.getexif())
        if max(im.size) <= MAX_EDGE and not has_exif:  # already optimized
            total_after += before
            continue
        im = ImageOps.exif_transpose(im)
        im.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
        if path.suffix.lower() in {".jpg", ".jpeg"}:
            im.convert("RGB").save(path, "JPEG", quality=JPEG_QUALITY, optimize=True)
        elif path.suffix.lower() == ".png":
            im.save(path, "PNG", optimize=True)
        else:
            im.save(path, quality=JPEG_QUALITY)
    after = path.stat().st_size
    total_after += after
    print(f"{path.relative_to(root)}: {before/1e6:.2f} MB -> {after/1e6:.2f} MB")

print(f"\nTotal: {total_before/1e6:.1f} MB -> {total_after/1e6:.1f} MB")
