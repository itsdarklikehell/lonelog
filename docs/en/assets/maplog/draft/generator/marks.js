// Maplog v0.2 masters: a sheet of all marks (one per cell), the example dungeon and the example overland map.
// Usage: node marks.js <outdir>  -> marks.svg, example-dungeon.svg, example-overland.svg, names.json
const fs = require('fs'), path = require('path');
const OUT = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });

const INK = '#000', BG = '#fff', W = 2.5;
const MONO = "Consolas, 'Cascadia Mono', 'DejaVu Sans Mono', monospace";

const st = w => `fill="none" stroke="${INK}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
const m = (d, w = W) => `<path d="${d}" ${st(w)}/>`;
const circle = (cx, cy, r, filled, w = W) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${filled ? INK : 'none'}" stroke="${INK}" stroke-width="${w}"/>`;
const dot = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${INK}"/>`;
const wall = d => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"/>`;
const dwall = d => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="4" stroke-dasharray="6 5" stroke-linecap="butt"/>`;
const rect = (x, y, w, h, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${o.fill || 'none'}" stroke="${INK}" stroke-width="${o.sw || W}"${o.dash ? ' stroke-dasharray="6 5"' : ''}/>`;
const letter = d => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
const at = (x, y, s, inner, rot = 0) => `<g transform="translate(${x} ${y})${rot ? ` rotate(${rot})` : ''}${s !== 1 ? ` scale(${s})` : ''}">${inner}</g>`;
const text = (x, y, size, t, extra = '') => `<text x="${x}" y="${y}" font-family="${MONO}" font-weight="700" font-size="${size}" fill="${INK}"${extra}>${t}</text>`;

const LT = {
  S: 'M4 -5.5C4 -8.5 -4 -8.5 -4 -4C-4 0 4 0 4 4C4 8.5 -4 8.5 -4 5.5',
  U: 'M-4.5 -7.5V2.5A4.5 4.5 0 0 0 4.5 2.5V-7.5',
  C: 'M4 -5A5.5 7.5 0 1 0 4 5',
  Q: 'M-3.5 -4.5C-3.5 -9 3.5 -9 3.5 -4.5C3.5 -1.5 0 -1.5 0 2',
};
const L = k => letter(LT[k]) + (k === 'Q' ? dot(0, 6.5, 1.2) : '');
const knock = (w, h) => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="${BG}"/>`;

const stubs = wall('M-32 0H-12M12 0H32');
const slab = filled => `<rect x="-12" y="-5" width="24" height="10" fill="${filled ? INK : 'none'}" stroke="${INK}" stroke-width="${W}"/>`;
const stairBox = kind => {
  const box = `<rect x="-12" y="-16" width="24" height="32" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linejoin="miter"/>`;
  const ys = [-12, -8, -4, 0, 4, 8, 12];
  const hw = kind === 'up' ? ys.map(() => 10.25) : [10.25, 10.25, 10.25, 8, 6, 4, 2];
  return box + ys.map((y, i) => `<path d="M${-hw[i]} ${y}H${hw[i]}" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`).join('');
};
const star = (() => {
  const pts = [];
  for (let k = 0; k < 10; k++) { const a = (-90 + k * 36) * Math.PI / 180, r = k % 2 === 0 ? 5.2 : 2.2; pts.push((r * Math.cos(a)).toFixed(2) + ' ' + (r * Math.sin(a)).toFixed(2)); }
  return m('M' + pts.join('L') + 'Z', 1.8);
})();
const rays = (n, r1, r2, w = 2) => Array.from({ length: n }, (_, k) => { const a = (k * 360 / n - 90) * Math.PI / 180; return m(`M${(r1 * Math.cos(a)).toFixed(2)} ${(r1 * Math.sin(a)).toFixed(2)}L${(r2 * Math.cos(a)).toFixed(2)} ${(r2 * Math.sin(a)).toFixed(2)}`, w); }).join('');
const wave = (y, x0 = -16, x1 = 16, w = 1.8) => m(`M${x0} ${y}Q${x0 + 4} ${y - 4} ${x0 + 8} ${y}T${x0 + 16} ${y}T${x0 + 24} ${y}T${x1} ${y}`, w);
const arcArrow = (r, a0, a1, w = 2) => {
  const rad = d => d * Math.PI / 180, f = n => n.toFixed(2);
  const x0 = r * Math.cos(rad(a0)), y0 = r * Math.sin(rad(a0)), x1 = r * Math.cos(rad(a1)), y1 = r * Math.sin(rad(a1));
  const tx = -Math.sin(rad(a1)), ty = Math.cos(rad(a1));
  const barb = sg => { const c = Math.cos(rad(sg * 28)), sn = Math.sin(rad(sg * 28)); return `M${f(x1)} ${f(y1)}L${f(x1 - 4.5 * (tx * c - ty * sn))} ${f(y1 - 4.5 * (tx * sn + ty * c))}`; };
  return m(`M${f(x0)} ${f(y0)}A${r} ${r} 0 0 1 ${f(x1)} ${f(y1)}`, w) + m(barb(1), w) + m(barb(-1), w);
};
const hazard = m('M0 -12L13 11H-13Z') + m('M0 -4V3') + dot(0, 7, 1.6);
const triangleSmall = m('M0 -19L6.5 -8H-6.5Z', 2);
const shaft = circle(0, 0, 10, false) + m('M-6.5 -6.5L6.5 6.5M6.5 -6.5L-6.5 6.5', 2);
const square = rect(-9, -9, 18, 18);
const pitCore = rect(-4.5, -4.5, 9, 9, { fill: INK, sw: 1.5 });
const sup = k => at(18, -9, 0.8, L(k));

// name -> drawing, centred on (0,0)
const marks = {
  'bound-wall': wall('M-30 0H30'),
  'bound-offmap': wall('M-12 26V6M12 26V6') + [-12, 12].map(x => m(`M${x - 3} 8L${x + 3} -2`) + m(`M${x - 3} 1L${x + 3} -9`)).join(''),
  'bound-bars': stubs + dot(-8, 0, 2) + dot(0, 0, 2) + dot(8, 0, 2),
  'bound-ledge': m('M-30 -4H30') + [-24, -12, 0, 12, 24].map(x => m(`M${x} -4V6`, 2)).join(''),
  'open-passage': stubs,
  'open-door': stubs + slab(false),
  'open-double': wall('M-60 0H-24M24 0H60') + rect(-24, -5, 24, 10) + rect(0, -5, 24, 10),
  'open-window': stubs + m('M-12 -5.5V5.5', 2.2) + m('M12 -5.5V5.5', 2.2) + m('M-12 0H12', 1.6),
  'open-collapsed': stubs + m('M-12 -9L-5 5L-1 -7L5 8L12 -4'),
  'door-locked': stubs + slab(true),
  'door-secret': wall('M-32 0H32') + knock(16, 19) + L('S'),
  'door-barred': stubs + slab(false) + m('M-4 -18V-9', 2.5) + m('M4 -18V-9', 2.5),
  'door-trapped': stubs + slab(false) + triangleSmall,
  'door-oneway': stubs + slab(false) + m('M0 15V-15M-4.5 -10.5L0 -15L4.5 -10.5', 1.8),
  'door-illusory': wall('M-32 0H32') + knock(14, 19) + L('Q'),
  'door-locked-trapped': stubs + slab(true) + triangleSmall,
  'level-stairs-up': stairBox('up'),
  'level-stairs-down': stairBox('down'),
  'level-spiral': circle(0, 0, 10, false, 3.5) + rays(6, 3, 8.5, 1.6) + arcArrow(16.5, -85, 5),
  'level-slope-3': [-8, 0, 8].map(y => m(`M-9 ${y - 3}L0 ${y + 3}L9 ${y - 3}`)).join(''),
  'level-slope-2': [-4, 4].map(y => m(`M-9 ${y - 3}L0 ${y + 3}L9 ${y - 3}`)).join(''),
  'level-slope-1': m('M-9 -3L0 3L9 -3'),
  'level-shaft': shaft,
  'level-shaft-up': shaft + at(19, -9, 0.8, L('U')),
  'trap-generic': hazard,
  'trap-pit': square + pitCore,
  'trap-pit-covered': square + pitCore + sup('C'),
  'trap-trapdoor': square,
  'trap-trapdoor-secret': square + sup('S'),
  'trap-trapdoor-ceiling': square + sup('U'),
  'fix-column': rect(-6, -6, 12, 12, { fill: INK, sw: 1.5 }),
  'fix-statue': circle(0, 0, 10, false) + star,
  'fix-well': circle(0, 0, 10, false) + m('M-5.5 0Q-2.75 -3.5 0 0T5.5 0', 1.8),
  'fix-altar': rect(-10, -4, 20, 10) + m('M0 -15V-7M-4 -11H4', 2.2),
  'fix-light': circle(0, 0, 3.8, false, 2.2) + rays(8, 7, 11.5),
  'ground-water': rect(-22, -17, 44, 34, { sw: 1.4 }) + wave(-9) + wave(0) + wave(9),
  'note-destination': at(0, -9, 1, stairBox('down')) + text(-19, 24, 13, 'L3, 1'),
  // ---- overland set ----
  ...overland(),
};

function overland() {
  const tuft = x => m(`M${x - 3} 4L${x - 4.5} -2M${x} 4V-3.5M${x + 3} 4L${x + 4.5} -2`, 2);
  const tree = x => circle(x, -3, 5, false, 2.2) + m(`M${x} 2V9`, 2.2);
  const reeds = (x, y) => m(`M${x - 7} ${y}H${x + 7}`, 2) + m(`M${x - 3} ${y}L${x - 4.5} ${y - 5}M${x} ${y}V${y - 6}M${x + 3} ${y}L${x + 4.5} ${y - 5}`, 1.8);
  const house = m('M-7 9V-1L0 -8L7 -1V9Z');
  const shrine = m('M-10 -3L0 -11L10 -3Z') + m('M-7 -3V9M7 -3V9') + dot(0, 3, 1.8);
  const anchor = circle(0, -9, 2.5, false, 2) + m('M0 -6.5V9M-5 -3H5', 2.2) + m('M-8 3Q-7 9 0 9Q7 9 8 3M-8 3L-9.5 6M-8 3L-5.5 4.5M8 3L9.5 6M8 3L5.5 4.5', 2);
  const ring = r => circle(0, 0, r, false, 2.2);
  // double line: a thick black stroke with a white stroke inside
  const dbl = (d, gap = 3) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${gap + 4}" stroke-linecap="butt" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${BG}" stroke-width="${gap}" stroke-linecap="square" stroke-linejoin="round"/>`;
  const wavy = 'M-30 0Q-25 -5 -20 0T-10 0T0 0T10 0T20 0T30 0';
  const river = dbl(wavy, 3.5);
  return {
    'terrain-plains': tuft(-7) + tuft(7),
    'terrain-forest': tree(-6) + tree(6),
    'terrain-jungle': m('M0 10Q-2.5 3 0 -4', 2.2) + m('M0 -4Q-6 -9 -11 -2M0 -4Q6 -9 11 -2M0 -4Q-2 -11 -6 -12M0 -4Q2 -11 6 -12', 2),
    'terrain-hills': m('M-14 6Q-7 -6 0 6') + m('M-1 6Q6 -9 13 6'),
    'terrain-mountains': m('M-13 9L-3 -10L7 9') + m('M1.2 -2L7 -8L14 9'),
    'terrain-desert': m('M-13 1Q-7 -5 -1 1', 2.2) + m('M-3 8Q3 2 9 8', 2.2) + dot(6, -5, 1.4) + dot(11, 0, 1.4) + dot(-9, 7, 1.4),
    'terrain-swamp': reeds(-4, -1) + reeds(5, 8),
    'terrain-water': wave(-6, -12, 12, 2) + wave(0, -12, 12, 2) + wave(6, -12, 12, 2),
    'terrain-ice': m('M0 -10V10M-8.66 -5L8.66 5M-8.66 5L8.66 -5', 2) + m('M-2.5 -10L0 -7.5L2.5 -10M-2.5 10L0 7.5L2.5 10', 1.6),
    'relief-border': m('M-30 0H30', 2) + [-16, 0, 16].map(x => `<circle cx="${x}" cy="0" r="3" fill="${BG}" stroke="${INK}" stroke-width="2"/>`).join(''),
    'relief-peak': m('M-10 10L0 -10L10 10') + `<path d="M-3.5 -3L0 -10L3.5 -3Z" fill="${INK}" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>`,
    'relief-pass': m('M-7 -10Q-1 0 -7 10') + m('M7 -10Q1 0 7 10'),
    'route-road': dbl('M-30 0H30', 3.5),
    'route-track': m('M-30 0H30'),
    'route-trail': m('M-30 0H30', 1.8) + [-20, -10, 0, 10, 20].map(x => m(`M${x} -3.5V3.5`, 1.8)).join(''),
    'route-river': river,
    'route-stream': m(wavy, 2.2),
    'route-bridge': river + `<rect x="-5" y="-10" width="10" height="20" fill="${BG}"/>` + m('M-5 -9V9M5 -9V9') + m('M-5 -9L-9 -13M-5 9L-9 13M5 -9L9 -13M5 9L9 13', 2),
    'route-ford': river + [-7, 0, 7].map(x => `<circle cx="${x}" cy="0" r="2.6" fill="${BG}" stroke="${INK}" stroke-width="1.8"/>`).join(''),
    'route-ferry': river + `<path d="M-7 -1H7L4.5 4H-4.5Z" fill="${BG}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>` + m('M0 -1V-12', 1.8) + m('M0 -12L6 -4H0', 1.8),
    'site-entrance': m('M-13 9H13') + m('M-9 9V0A9 9 0 0 1 9 0V9') + `<path d="M-5 9V1A5 5 0 0 1 5 1V9Z" fill="${INK}"/>`,
    'site-ruin': m('M-11 10H11') + m('M-7 10V-4L-4 -8L-1 -3L2 -9L4 -5L7 -7V10'),
    'site-tomb': m('M-11 9H11') + m('M-6 9V-2A6 6 0 0 1 6 -2V9') + m('M0 -3V5M-3 0H3', 1.8),
    'site-stones': rect(-8, -4, 4, 13, { sw: 2 }) + rect(4, -4, 4, 13, { sw: 2 }) + rect(-11, -9, 22, 5, { sw: 2 }),
    'site-shrine': shrine,
    'site-lair': m('M-6 -12Q-4 -2 -12 7') + m('M1 -11Q3 -1 -5 9') + m('M8 -10Q10 0 2 10'),
    'settle-homestead': house,
    'settle-hamlet': dot(0, 0, 3.2),
    'settle-village': ring(6),
    'settle-town': ring(8) + ring(4),
    'settle-city': ring(10) + ring(6.5) + ring(3),
    'settle-castle': m('M-11 10V-8H-7V-4H-2V-8H2V-4H7V-8H11V10Z') + `<path d="M-3 10V5A3 3 0 0 1 3 5V10Z" fill="${INK}"/>`,
    'settle-tower': m('M-6 11V-11H-2V-7H2V-11H6V11Z'),
    'settle-port': anchor,
    'settle-inn': house + m('M7 1H13M11 1V3', 1.8) + rect(8.5, 3, 5, 5, { sw: 1.8 }),
    'combo-port-town': ring(8) + ring(4) + at(17, -9, 0.6, anchor),
    'combo-temple-village': ring(6) + at(15, -8, 0.6, shrine),
    'furniture-north': m('M0 12V-8', 2.2) + m('M-5 -3L0 -9L5 -3', 2.2) + letter('M-3.5 -12V-20L3.5 -12V-20'),
  };
}

const svgWrap = (w, h, vb, body, note = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${vb}">\n${note ? `<!-- ${note} -->\n` : ''}${body}\n</svg>\n`;
const write = (name, s) => { fs.writeFileSync(path.join(OUT, name), s); console.log('wrote', name, s.length); };

// ---- 1. marks sheet: COLS x ROWS cells of 176 x 112, each mark at 1.75 ----
const names = Object.keys(marks);
const CW = 176, CH = 112, COLS = 6, ROWS = Math.ceil(names.length / COLS);
{
  let body = `<rect width="${CW * COLS}" height="${CH * ROWS}" fill="${BG}"/>\n`;
  names.forEach((name, i) => {
    const cx = (i % COLS) * CW + CW / 2, cy = Math.floor(i / COLS) * CH + CH / 2;
    const s = name === 'open-double' ? 1.4 : 1.75;
    body += `<g id="${name}">${at(cx, cy, s, marks[name])}</g>\n`;
  });
  write('marks.svg', svgWrap(CW * COLS, CH * ROWS, `0 0 ${CW * COLS} ${CH * ROWS}`, body,
    `Maplog marks. ${COLS} columns x ${ROWS} rows of ${CW}x${CH} cells, left to right, top to bottom: ${names.join(', ')}`));
  fs.writeFileSync(path.join(OUT, 'names.json'), JSON.stringify({ names, CW, CH, COLS, ROWS }));
}

// ---- 2. example dungeon (viewBox 40 20 520 340) ----
{
  let s = `<rect x="40" y="20" width="520" height="340" fill="${BG}"/>`;
  // R2 (guard room) and R1 (entry cave) and R3 (library): walked, so solid
  s += wall('M200 40H340V170H480V300H340V170');                    // R2 north/east, R3 box (east wall drawn whole: the secret door sits on it)
  s += wall('M200 40V93M200 117V170');                            // R2/R5 wall, gap for the locked door
  s += wall('M200 170H258M282 170H340');                           // R1/R2 wall, gap for the door
  s += wall('M200 170V300H258M282 300H340');                       // R1 west and south, gap for the way in
  s += wall('M340 170V223M340 247V300');                           // R1/R3 wall, open passage
  // way in: corridor south, leaving the map
  s += wall('M258 300V338M282 300V338');
  s += [258, 282].map(x => m(`M${x - 3} 346L${x + 3} 336`) + m(`M${x - 3} 353L${x + 3} 343`)).join('');
  // R5: only seen through its door, so its walls are dashed
  s += dwall('M200 40H60V170H200');
  // R4: marked on a guard's map, not placed: dashed and floating
  s += rect(420, 40, 120, 80, { dash: true, sw: 4 });
  // openings
  s += at(200, 105, 1, `<rect x="-12" y="-5" width="24" height="10" fill="${INK}" stroke="${INK}" stroke-width="${W}"/>`, 90);   // locked door
  s += at(270, 170, 1, slab(false));                                                                                          // door R1-R2
  s += at(480, 235, 1, knock(19, 16) + L('S'));                                                                              // secret door, letter upright
  s += dwall('M482 223H540M482 247H540');                                                                                     // unwalked corridor beyond it
  // contents
  s += at(300, 105, 1, circle(0, 0, 10, false) + star);                    // statue in R2
  s += at(240, 235, 1, rect(-6, -6, 12, 12, { fill: INK, sw: 1.5 })) + at(300, 235, 1, rect(-6, -6, 12, 12, { fill: INK, sw: 1.5 })); // columns in R1
  s += at(270, 270, 1, square + pitCore);                                  // pit in R1, in front of the way in
  s += at(452, 262, 1, stairBox('down')) + text(390, 267, 12, 'L2, 8');   // stairs down in R3
  s += at(390, 215, 1, hazard);                                            // trapped chest in R3
  // IDs
  s += text(72, 64, 14, 'R5') + text(212, 64, 14, 'R2') + text(212, 194, 14, 'R1') + text(352, 194, 14, 'R3') + text(432, 64, 14, 'R4');
  write('example-dungeon.svg', svgWrap(520, 340, '40 20 520 340', s, 'Maplog example: a five-room dungeon drawn from the log in section 8.1'));
}

// ---- 3. example overland map: 5 x 4 hexes, pointy-top, even rows shifted right ----
{
  const O = overland();
  const s = 38, w = Math.sqrt(3) * s, dy = 57, x0 = 12 + w / 2, y0 = 46, f = n => n.toFixed(1);
  const C = (c, r) => [x0 + (c - 1) * w + (r % 2 === 0 ? w / 2 : 0), y0 + (r - 1) * dy];
  // [terrain, feature]
  const grid = {
    '1,1': ['mountains'], '2,1': ['mountains', 'peak'], '3,1': ['hills'], '4,1': ['forest'], '5,1': ['forest', 'lair'],
    '1,2': ['hills', 'entrance'], '2,2': ['hills'], '3,2': ['plains', 'ruin'], '4,2': ['forest'], '5,2': ['forest'],
    '1,3': ['plains', 'stones'], '2,3': ['plains', 'village'], '3,3': ['plains'], '4,3': ['swamp'], '5,3': ['swamp', 'tomb'],
    '1,4': ['water'], '2,4': ['water'], '3,4': ['plains', 'porttown'], '4,4': ['plains', 'castle'],
  };
  const feat = { peak: O['relief-peak'], entrance: O['site-entrance'], ruin: O['site-ruin'], lair: O['site-lair'], stones: O['site-stones'],
    village: O['settle-village'], tomb: O['site-tomb'], porttown: O['settle-town'] + at(-17, -9, 0.6, O['settle-port']), castle: O['settle-castle'] };
  let out = `<rect width="480" height="270" fill="${BG}"/>\n`; let ids = '';
  const hexes = [];
  for (let r = 1; r <= 4; r++) for (let c = 1; c <= 5; c++) {
    const [cx, cy] = C(c, r);
    const pts = [...Array(6)].map((_, k) => { const a = Math.PI / 180 * (60 * k + 30); return f(cx + s * Math.cos(a)) + ',' + f(cy + s * Math.sin(a)); }).join(' ');
    const cell = grid[c + ',' + r];
    out += `<polygon points="${pts}" fill="none" stroke="${cell ? '#585260' : '#c3bccf'}" stroke-width="${cell ? 1.25 : 1}"/>\n`;
    ids += `<text x="${f(cx)}" y="${f(cy - 21)}" font-family="${MONO}" font-size="9.5" fill="#6b6575" stroke="#fff" stroke-width="3" paint-order="stroke" text-anchor="middle">${String(c).padStart(2, '0') + String(r).padStart(2, '0')}</text>\n`;
    if (cell) hexes.push([cx, cy, cell]);
  }
  // routes under the marks: river 0401 > 0402 > 0403 > 0304 > sea; road 0203 > 0303 > 0304; trail 0302 > 0202 > 0102
  const P = (...cr) => cr.map(([c, r]) => C(c, r));
  const smooth = pts => { let d = `M${f(pts[0][0])} ${f(pts[0][1])}`; for (let i = 1; i < pts.length; i++) { const [a, b] = pts[i - 1], [x, y] = pts[i]; d += `Q${f((a + x) / 2 + (y - b) * 0.18)} ${f((b + y) / 2 - (x - a) * 0.18)} ${f(x)} ${f(y)}`; } return d; };
  const riverPts = P([4, 1], [4, 2], [4, 3], [3, 4]); riverPts.push([C(2, 4)[0] + 14, C(2, 4)[1] + 4]);
  const dblP = (d, gap) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${gap + 4}" stroke-linecap="butt" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${BG}" stroke-width="${gap}" stroke-linecap="butt" stroke-linejoin="round"/>`;
  // sample the curve, then wave it sideways so the river reads as a river, not a road
  const wavyRiver = pts => {
    const dense = [];
    for (let i = 1; i < pts.length; i++) {
      const [a, b] = pts[i - 1], [x, y] = pts[i], qx = (a + x) / 2 + (y - b) * 0.18, qy = (b + y) / 2 - (x - a) * 0.18;
      for (let k = i === 1 ? 0 : 1; k <= 24; k++) { const t = k / 24, u = 1 - t; dense.push([u * u * a + 2 * u * t * qx + t * t * x, u * u * b + 2 * u * t * qy + t * t * y]); }
    }
    let len = 0;
    return 'M' + dense.map(([x, y], i) => {
      if (i) len += Math.hypot(x - dense[i - 1][0], y - dense[i - 1][1]);
      const [px, py] = dense[Math.max(i - 1, 0)], [qx, qy] = dense[Math.min(i + 1, dense.length - 1)];
      const L = Math.hypot(qx - px, qy - py) || 1, off = 3.2 * Math.sin(len / 20 * 2 * Math.PI);
      return `${f(x - (qy - py) / L * off)} ${f(y + (qx - px) / L * off)}`;
    }).join('L');
  };
  out += dblP(wavyRiver(riverPts), 3.5) + '\n';
  const road = P([2, 3], [3, 3], [3, 4]).map(([x, y]) => `${f(x)} ${f(y)}`);
  out += dblP('M' + road.join('L'), 3) + '\n';
  const trail = P([3, 2], [2, 2], [1, 2]);
  out += m('M' + trail.map(([x, y]) => `${f(x)} ${f(y)}`).join('L'), 1.6);
  for (let i = 1; i < trail.length; i++) {        // cross-ticks along the trail
    const [a, b] = trail[i - 1], [x, y] = trail[i], L = Math.hypot(x - a, y - b), nx = -(y - b) / L, ny = (x - a) / L;
    for (const t of [0.3, 0.5, 0.7]) { const px = a + (x - a) * t, py = b + (y - b) * t; out += m(`M${f(px - nx * 3.5)} ${f(py - ny * 3.5)}L${f(px + nx * 3.5)} ${f(py + ny * 3.5)}`, 1.6); }
  }
  // hexes a route crosses keep their terrain low, out of its way
  const low = new Set([[2, 2], [3, 3], [4, 1], [4, 2], [4, 3]].map(([c, r]) => C(c, r).map(Math.round).join(',')));
  // terrain and features on top; knock out a white disc under features so routes stop at them
  for (const [cx, cy, [t, k]] of hexes) {
    if (k) {
      out += `<circle cx="${f(cx)}" cy="${f(cy - 1)}" r="${k === 'porttown' ? 11 : 12}" fill="${BG}"/>` + at(f(cx), f(cy - 1), 0.85, feat[k]);
      out += at(f(cx), f(cy + 22), 0.5, O['terrain-' + t]) + '\n';
    } else if (low.has(`${Math.round(cx)},${Math.round(cy)}`)) out += at(f(cx + (t === 'swamp' ? 16 : t === 'forest' ? (cy < 60 ? -12 : 14) : 0)), f(cy + (t === 'swamp' ? 12 : 22)), 0.5, O['terrain-' + t]) + '\n';
    else out += at(f(cx), f(cy + 2), 0.75, O['terrain-' + t]) + '\n';
  }
  out += at(456, 236, 0.9, O['furniture-north']);
  out += ids;
  write('example-overland.svg', svgWrap(480, 270, '0 0 480 270', out, 'Maplog example: an overland hex map. Hex IDs are column then row, counted from 1'));
}
