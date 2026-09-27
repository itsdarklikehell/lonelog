Maplog figure generator (v0.2).
1. node marks.js out            -> out/marks.svg, out/example-dungeon.svg, out/names.json
2. Render both SVGs to PNG at 3x with headless Edge (Inkscape's shim fails on this machine):
   msedge --headless=new --force-device-scale-factor=3 --window-size=W,H --screenshot=raw-marks.png file:///.../out/marks.svg
   (W,H = CW*COLS, CH*ROWS from names.json; the dungeon is 520x340 -> raw-dungeon.png)
3. python crop.py <assets/maplog>   -> one transparent PNG per mark + example-dungeon.png
The overland example is 480x270 -> raw-overland.png.
Then copy out/marks.svg, out/example-dungeon.svg and out/example-overland.svg into assets/maplog/.
