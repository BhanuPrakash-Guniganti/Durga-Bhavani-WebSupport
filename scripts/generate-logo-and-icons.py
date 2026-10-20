import os
import base64
from io import BytesIO
from PIL import Image

def generate_assets():
    source_path = r"C:\Users\HP\.gemini\antigravity-ide\brain\d71e3a31-b9ac-4c67-9063-c66f0282fa3f\.user_uploaded\media_1792471437834.jpg"
    base_dir = r"c:\Users\HP\OneDrive\Desktop\Durga-Bhavani-Seva"
    public_dir = os.path.join(base_dir, "frontend", "public")
    assets_dir = os.path.join(public_dir, "assets")
    images_dir = os.path.join(public_dir, "images")

    os.makedirs(public_dir, exist_ok=True)
    os.makedirs(assets_dir, exist_ok=True)
    os.makedirs(images_dir, exist_ok=True)

    print(f"Loading source image from: {source_path}")
    orig_img = Image.open(source_path).convert("RGB")
    width, height = orig_img.size
    print(f"Original size: {width}x{height}")

    # 1. Save Full Official Logo
    full_logo_paths = [
        os.path.join(public_dir, "logo.png"),
        os.path.join(assets_dir, "logo.png"),
        os.path.join(images_dir, "logo.png"),
    ]
    for p in full_logo_paths:
        orig_img.save(p, format="PNG", optimize=True)
        print(f"Saved: {p}")

    full_webp_paths = [
        os.path.join(public_dir, "logo.webp"),
        os.path.join(assets_dir, "logo.webp"),
        os.path.join(images_dir, "logo.webp"),
    ]
    for p in full_webp_paths:
        orig_img.save(p, format="WEBP", quality=92)
        print(f"Saved: {p}")

    # 2. Extract Emblem Cleanly
    # Emblem content: X min 303, max 721 (w=418); Y min 85, max 683 (h=598)
    # We crop with 10px breathing room around content
    crop_x1 = 295
    crop_y1 = 75
    crop_x2 = 729
    crop_y2 = 687
    emblem_crop = orig_img.crop((crop_x1, crop_y1, crop_x2, crop_y2))
    ew, eh = emblem_crop.size

    # Place on square canvas with the warm cream background (252, 249, 234)
    canvas_size = 680
    bg_color = (252, 249, 234)
    emblem_square = Image.new("RGB", (canvas_size, canvas_size), bg_color)
    offset_x = (canvas_size - ew) // 2
    offset_y = (canvas_size - eh) // 2
    emblem_square.paste(emblem_crop, (offset_x, offset_y))

    emblem_paths = [
        os.path.join(public_dir, "logo-emblem.png"),
        os.path.join(assets_dir, "logo-emblem.png"),
        os.path.join(images_dir, "logo-emblem.png"),
    ]
    for p in emblem_paths:
        emblem_square.save(p, format="PNG", optimize=True)
        print(f"Saved: {p}")

    emblem_webp_paths = [
        os.path.join(public_dir, "logo-emblem.webp"),
        os.path.join(assets_dir, "logo-emblem.webp"),
        os.path.join(images_dir, "logo-emblem.webp"),
    ]
    for p in emblem_webp_paths:
        emblem_square.save(p, format="WEBP", quality=92)
        print(f"Saved: {p}")

    # 3. Generate Favicon PNGs from Emblem
    icon_sizes = {
        "favicon-16x16.png": 16,
        "favicon-32x32.png": 32,
        "favicon-48x48.png": 48,
        "apple-touch-icon.png": 180,
        "apple-touch-icon-precomposed.png": 180,
        "android-chrome-192x192.png": 192,
        "icon-192.png": 192,
        "android-chrome-512x512.png": 512,
        "icon-512.png": 512,
    }

    for filename, sz in icon_sizes.items():
        resized = emblem_square.resize((sz, sz), Image.Resampling.LANCZOS)
        out_path = os.path.join(public_dir, filename)
        resized.save(out_path, format="PNG", optimize=True)
        print(f"Generated: {out_path} ({sz}x{sz})")

    # 4. Generate multi-size favicon.ico (16, 32, 48)
    ico_path = os.path.join(public_dir, "favicon.ico")
    emblem_square.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"Generated multi-size favicon.ico: {ico_path}")

    # 5. Generate favicon.svg embedding 512x512 base64 PNG
    img_512 = emblem_square.resize((512, 512), Image.Resampling.LANCZOS)
    buf = BytesIO()
    img_512.save(buf, format="PNG")
    b64_png = base64.b64encode(buf.getvalue()).decode("utf-8")

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" fill="#FCF9EA"/>
  <image width="512" height="512" href="data:image/png;base64,{b64_png}"/>
</svg>
'''
    svg_path = os.path.join(public_dir, "favicon.svg")
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Generated favicon.svg: {svg_path}")

    # 6. Generate site.webmanifest and manifest.json
    manifest_content = '''{
  "name": "Durga Bhavani Seva Samiti - Dodlapahad",
  "short_name": "Durga Bhavani",
  "description": "Annual history, festival celebrations, photo albums, events, and community updates of Sri Durga Bhavani Seva Samiti, Dodlapahad.",
  "icons": [
    {
      "src": "/favicon-32x32.png",
      "sizes": "32x32",
      "type": "image/png"
    },
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#7A0C0C",
  "background_color": "#FCF9EA",
  "display": "standalone",
  "start_url": "/"
}
'''
    for mname in ["site.webmanifest", "manifest.json"]:
        mpath = os.path.join(public_dir, mname)
        with open(mpath, "w", encoding="utf-8") as f:
            f.write(manifest_content)
        print(f"Generated manifest: {mpath}")

    print("All assets successfully created!")

if __name__ == "__main__":
    generate_assets()
