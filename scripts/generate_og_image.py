from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


WIDTH = 1200
HEIGHT = 630
ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "og-image.png"

COLORS = {
    "canvas": "#F3F0E8",
    "surface": "#FAF8F1",
    "ink": "#191813",
    "muted": "#676258",
    "accent": "#E85D2A",
    "success": "#2F7657",
    "line": "#D8D2C4",
}


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    candidates = [
        Path("C:/Windows/Fonts/msyhbd.ttc" if bold else "C:/Windows/Fonts/msyh.ttc"),
        Path("C:/Windows/Fonts/simhei.ttf"),
        Path("C:/Windows/Fonts/simsun.ttc"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size=size)
    raise FileNotFoundError("No supported Chinese font was found")


def main() -> None:
    image = Image.new("RGB", (WIDTH, HEIGHT), COLORS["canvas"])
    draw = ImageDraw.Draw(image)

    for x in range(0, WIDTH, 40):
        draw.line((x, 0, x, HEIGHT), fill=COLORS["line"], width=1)
    for y in range(0, HEIGHT, 40):
        draw.line((0, y, WIDTH, y), fill=COLORS["line"], width=1)

    draw.rounded_rectangle((54, 52, 1146, 578), radius=18, fill=COLORS["surface"], outline=COLORS["ink"], width=2)
    draw.line((54, 154, 1146, 154), fill=COLORS["ink"], width=2)

    draw.rounded_rectangle((86, 82, 158, 130), radius=7, fill=COLORS["ink"])
    draw.text((98, 91), "BXW", font=font(20, bold=True), fill=COLORS["canvas"])
    draw.ellipse((150, 74, 166, 90), fill=COLORS["accent"], outline=COLORS["surface"], width=3)
    draw.text((188, 89), "TECHNICAL FIELD NOTES / 2026", font=font(22, bold=True), fill=COLORS["muted"])
    draw.text((1000, 89), "NO. 01", font=font(18, bold=True), fill=COLORS["accent"])

    draw.text((86, 194), "浮生闲记", font=font(94, bold=True), fill=COLORS["ink"])
    draw.rounded_rectangle((88, 324, 498, 382), radius=6, fill=COLORS["accent"])
    draw.text((112, 333), "测试工程师 × 独立开发者", font=font(31, bold=True), fill="#FFF8EF")
    draw.text(
        (88, 419),
        "把复杂系统测得更可靠，\n也把真实问题做成好用的工具。",
        font=font(29),
        fill=COLORS["muted"],
        spacing=14,
    )

    panel = (760, 194, 1098, 506)
    draw.rounded_rectangle(panel, radius=10, fill=COLORS["ink"])
    draw.text((792, 222), "QUALITY PIPELINE", font=font(19, bold=True), fill="#AAA397")
    stages = [
        ("01", "VERIFY", COLORS["accent"]),
        ("02", "AUTOMATE", COLORS["success"]),
        ("03", "DELIVER", COLORS["accent"]),
    ]
    for index, (number, label, color) in enumerate(stages):
        top = 274 + index * 72
        draw.ellipse((794, top, 814, top + 20), fill=color)
        if index < len(stages) - 1:
            draw.line((804, top + 20, 804, top + 72), fill="#5B574C", width=3)
        draw.text((836, top - 4), number, font=font(17, bold=True), fill="#AAA397")
        draw.text((886, top - 6), label, font=font(22, bold=True), fill="#EDE8DC")

    draw.text((88, 538), "BAOXW.COM", font=font(18, bold=True), fill=COLORS["success"])
    draw.line((220, 550, 700, 550), fill=COLORS["line"], width=2)
    draw.text((916, 538), "MAKE IT RELIABLE", font=font(17, bold=True), fill=COLORS["muted"])

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    image.save(OUTPUT, format="PNG", optimize=True)


if __name__ == "__main__":
    main()
