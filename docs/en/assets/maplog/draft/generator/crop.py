import json, os, sys
from PIL import Image, ImageOps
out = sys.argv[1]
n = json.load(open('out/names.json'))
S = 3
sheet = Image.open('raw-marks.png').convert('L')
CW, CH = n['CW']*S, n['CH']*S
for i, name in enumerate(n['names']):
    if name == 'label-room': continue
    c, r = i % n['COLS'], i // n['COLS']
    L = sheet.crop((c*CW, r*CH, (c+1)*CW, (r+1)*CH))
    a = ImageOps.invert(L)
    l, t, rr, b = a.point(lambda v: 255 if v > 8 else 0).getbbox()
    p = 12
    box = (max(l-p,0), max(t-p,0), min(rr+p,CW), min(b+p,CH))
    im = Image.merge('LA', (Image.new('L', L.size, 0), a)).crop(box)
    im.save(os.path.join(out, name + '.png'), dpi=(420,420), optimize=True)
    print(name, im.size)
Image.open('raw-dungeon.png').convert('L').save(os.path.join(out, 'example-dungeon.png'), dpi=(288,288), optimize=True)
Image.open('raw-overland.png').convert('L').save(os.path.join(out, 'example-overland.png'), dpi=(288,288), optimize=True)
