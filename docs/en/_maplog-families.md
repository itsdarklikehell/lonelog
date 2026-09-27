# Maplog: symbol families (working map)

Working note, not a spec. The leading underscore keeps Quarto from rendering it. It maps every family of symbols Maplog needs to cover **site maps** (dungeons, caves, ruins, buildings) and **overland maps** (the regional map you travel across, usually hex), so marks can be designed family by family.

## 1. Terms and how to read this

- **Site map / overland map.** The two map types. "Wilderness" is retired: an overland map also holds towns, roads, borders and sea lanes, so "overland" is the accurate word.
- **Layers.** *Structure* is what is physically there (drawn once). *Play* is what is known or has happened (changes as you play). Maplog v0.1 is a play layer plus a few structure marks; the reference deck is a pure structure layer.
- **Geometries.** Every mark is an *area* (a filled or outlined place), a *line* (an edge or path), a *point* (a pin) or a *note* (text or a number).
- **Sets.** *Core* is Maplog v0.1 as it stands (nothing removed). The *site set* and the *overland set* add structure marks under the same grammar.

Columns in the tables below:

- **From:** `D` = DUNGEON.PPT (Sorolla 2011), `M` = Maplog v0.1, `O` = general overland and hexcrawl conventions. **No overland reference sheet exists in this repo: every `O` row is my inventory and needs your review.**
- **Now:** `have` (a v0.1 mark exists), `part` (covered loosely), `gap` (missing).
- **Pri:** `1` essential for that set, `2` common, `3` optional.

DUNGEON.PPT has about 45 distinct concepts among its hundreds of shapes. The rest are rotations and sizes (16 stair orientations, 12 door hinge positions, 8 ledge angles), which in a drawn standard are one mark turned to fit.

## 2. Core set (Maplog v0.1)

| Family | Marks |
|---|---|
| State pips | unexplored, active, cleared, looted |
| Pins | person, foe, item, hazard, event, thread, safe place |
| Openings | open passage, door, locked door, secret door, stairs up, stairs down, collapsed, unexplored exit (site structure, kept in core for continuity) |
| Modifiers | strike-through (done), dashed (unconfirmed) |
| Labels | room ID, hex ID, name, count |

## 3. Site set

### 3.1 Walls and boundaries (lines)

| Symbol | From | Now | Pri | Note |
|---|---|---|---|---|
| Wall | D, M | part | 1 | Drawn as a thick line in the figures but not defined; everything else sits on it |
| Off-map edge | D | gap | 2 | Ends a passage that leaves the map |
| Bars / grate | D | gap | 2 | Also covers a portcullis |
| Ledge / drop-off | D | gap | 2 | Comb points to the lower side |
| Illusory wall | D | gap | 3 | |
| Railing | D | gap | 3 | |
| Curtain | D | gap | 3 | |

### 3.2 Openings (edges)

| Symbol | From | Now | Pri | Note |
|---|---|---|---|---|
| Open doorway / passage | D, M | have | 1 | |
| Door | D, M | have | 1 | The deck's 12 hinge variants are one door, mirrored or turned |
| Double door | D | gap | 2 | |
| Window | D | gap | 2 | |
| Sliding door | D | gap | 3 | |
| Slab (traditional) door | D | part | 3 | An alternative drawing of the door |
| Locked | D, M | have | 1 | Today its own mark; better as an attribute overlay (Section 5) |
| Secret | D, M | have | 1 | Same: an attribute |
| Barred | D | gap | 2 | Attribute |
| Trapped | D | gap | 2 | Attribute; reuses the hazard triangle |
| One-way | D | gap | 3 | Attribute |
| Illusory | D | gap | 3 | Attribute |
| Collapsed | M | have | 1 | Not in the deck |
| Unexplored exit | M | have | 1 | Not in the deck; solo-specific |

### 3.3 Level changes (lines and points)

| Symbol | From | Now | Pri | Note |
|---|---|---|---|---|
| Stairs, straight (up, down) | D, M | have | 1 | Redrawn 2026-09-21 as the classic AD&D DMG icons: a box of step lines, even for up and tapering for down, so the narrow end points down. No letters |
| Stairs, spiral | D | gap | 2 | Drafted: circle with spokes and an arrow for the way you turn going down |
| Slope, steep | D | gap | 2 | Also covers chutes |
| Shaft (floor) | D | gap | 2 | |
| Slope, shallow | D | gap | 3 | |
| Slope, imperceptible | D | gap | 3 | |
| Shaft (ceiling exit) | D | gap | 3 | |
| Shaft (floor and ceiling) | D | gap | 3 | |
| Ladder | O | gap | 3 | Not in the deck |

### 3.4 Pits and traps (points)

| Symbol | From | Now | Pri | Note |
|---|---|---|---|---|
| Trap (generic) | D, M | part | 1 | v0.1 hazard pin |
| Pit, open | D | gap | 2 | |
| Pit, covered | D | gap | 2 | |
| Trapdoor | D | gap | 2 | |
| Trapdoor, secret | D | gap | 3 | |
| Trapdoor, covered | D | gap | 3 | |
| Trapdoor, ceiling | D | gap | 3 | |

The deck builds these seven from one square plus a letter (S secret, C covered): a base and overlays, not seven marks (Section 5, R3 and R7).

### 3.5 Fixtures (points)

| Symbol | From | Now | Pri | Note |
|---|---|---|---|---|
| Statue | D | gap | 2 | |
| Column / pillar | D | gap | 2 | |
| Well | D | gap | 2 | |
| Altar | O | gap | 2 | Not in the deck, common in play |
| Fountain | D | gap | 3 | |
| Furniture / container | O | gap | 3 | Chest, table, bed, sarcophagus |

### 3.6 Ground and heights (areas and room notes)

| Symbol | From | Now | Pri | Note |
|---|---|---|---|---|
| Water (still) | D | gap | 2 | Filled blue on the sample map; needs a pencil-proof form. Shared with overland water |
| Unusual floor (ice, rubble, lava) | O | gap | 3 | |
| Ceiling: low (5 ft) | D | gap | 3 | The deck decorates the room number |
| Ceiling: crawl (3 ft) | D | gap | 3 | |
| Ceiling: high (15 ft) | D | gap | 3 | |
| Ceiling: high (30 ft) | D | gap | 3 | |
| Ceiling: vault (15 ft) | D | gap | 3 | |

### 3.7 Sensory markers (points, play layer)

| Symbol | From | Now | Pri | Note |
|---|---|---|---|---|
| Light source | D | gap | 2 | |
| Creature (noticed) | D | gap | 3 | Overlaps foe and person |
| Smell | D | gap | 3 | |
| Sound | D | gap | 3 | Overlaps event |

### 3.8 Cross-references (notes)

| Symbol | From | Now | Pri | Note |
|---|---|---|---|---|
| Stair destination (level, room) | D | gap | 2 | "L3, 1" beside a staircase |
| Level tag | D | gap | 2 | "L1" on a map or a room |
| Sub-area label (A, B, c) | D | gap | 3 | Parts of one room |

## 4. Overland set

### 4.1 Terrain (areas)

| Symbol | From | Now | Pri | Note |
|---|---|---|---|---|
| Plains / grassland | O | gap | 1 | |
| Forest | O | gap | 1 | Light and dense as a variant if needed |
| Hills | O | gap | 1 | |
| Mountains | O | gap | 1 | |
| Desert | O | gap | 1 | |
| Swamp | O | gap | 1 | |
| Water (sea, lake) | O | gap | 1 | Same mark as site water |
| Jungle | O | gap | 2 | |
| Tundra / ice | O | gap | 2 | |
| Farmland | O | gap | 3 | |
| Badlands | O | gap | 3 | |
| Volcanic | O | gap | 3 | |
| Reef / shoals | O | gap | 3 | |

v0.1 leaves terrain to the drawer. An overland set can't be called complete without a decision here (Section 7).

### 4.2 Relief and boundaries (lines and points)

| Symbol | From | Now | Pri | Note |
|---|---|---|---|---|
| Coastline | O | gap | 1 | |
| Realm / region border | O | gap | 1 | Usually along hex edges |
| Cliff / escarpment | O | gap | 2 | |
| Peak / high mountain | O | gap | 2 | |
| Mountain pass | O | gap | 2 | |
| Canyon / ravine | O | gap | 3 | |
| Volcano | O | gap | 3 | |
| Impassable barrier | O | gap | 3 | |

### 4.3 Routes, waterways and crossings (lines and points)

| Symbol | From | Now | Pri | Note |
|---|---|---|---|---|
| Road | O | gap | 1 | Centre to centre across hexes |
| Track | O | gap | 1 | |
| Trail / path | O | gap | 1 | |
| River | O | gap | 1 | Along hex edges or through hexes |
| Bridge | O | gap | 1 | |
| Ford | O | gap | 1 | |
| Stream | O | gap | 2 | |
| Sea lane | O | gap | 2 | |
| Ferry | O | gap | 2 | |
| Canal | O | gap | 3 | |
| Tunnel | O | gap | 3 | |

### 4.4 Sites and landmarks (points)

| Symbol | From | Now | Pri | Note |
|---|---|---|---|---|
| Entrance (cave, dungeon, mine) | O | gap | 1 | The link to a site map; replaces the rejected stairs on a hex |
| Ruin | O | gap | 1 | |
| Tomb / barrow | O | gap | 2 | |
| Monument / standing stones | O | gap | 2 | |
| Shrine / holy place | O | gap | 2 | Outside a settlement |
| Lair | O | part | 2 | Foe pin covers it loosely |
| Portal / gate | O | gap | 3 | |
| Battlefield | O | gap | 3 | |
| Wreck | O | gap | 3 | |
| Sacred tree / grove | O | gap | 3 | |
| Waterfall | O | gap | 3 | |
| Spring / oasis | O | gap | 3 | |

### 4.5 Settlements and strongholds (points)

| Symbol | From | Now | Pri | Note |
|---|---|---|---|---|
| Village | O | gap | 1 | Size ladder (Section 5, R6) |
| Town | O | gap | 1 | |
| City | O | gap | 1 | |
| Castle / keep | O | gap | 1 | |
| Homestead / farm | O | gap | 2 | |
| Hamlet | O | gap | 2 | |
| Fort / watchtower | O | gap | 2 | |
| Port / harbour | O | gap | 2 | |
| Temple / monastery | O | gap | 2 | |
| Inn / waystation | O | gap | 2 | Overlaps safe place |
| Mine / quarry / mill | O | gap | 3 | |
| Camp (bandit, nomad, army) | O | gap | 3 | |

### 4.6 Regions and zones (areas)

| Symbol | From | Now | Pri | Note |
|---|---|---|---|---|
| Realm / territory | O | gap | 2 | Border line plus a name |
| Danger zone | O | gap | 2 | |
| Cursed / blighted | O | gap | 3 | |
| Magic / anomaly | O | gap | 3 | |
| Storm / weather | O | gap | 3 | |
| Fog / veil | O | gap | 3 | |
| Claimed / safe zone | O | gap | 3 | |

### 4.7 Travel and exploration state (play layer)

| Symbol | From | Now | Pri | Note |
|---|---|---|---|---|
| Unseen / seen / visited hex | M | part | 1 | Today prose only (blank, tinted, pip); should be a stated convention |
| Party position | M | part | 1 | The active pip |
| Map link (hex to site map) | M | part | 1 | Today prose only |
| Route walked | O | gap | 2 | Solid line |
| Route planned | M | part | 2 | Dashed, by the unconfirmed rule |
| Encounter location | M | part | 2 | Foe and event pins |
| Day / camp marker | O | gap | 3 | |

### 4.8 Map furniture (notes)

| Symbol | From | Now | Pri | Note |
|---|---|---|---|---|
| Scale | O | gap | 1 | Miles per hex |
| North arrow | O | gap | 2 | |
| Title / date / season | O | gap | 3 | |

## 5. Rules the sets need

| Rule | From | Now | Note |
|---|---|---|---|
| R1. Strike-through = done | M | dropped | State, not space (decision 0, 2026-09-25) |
| R2. Dashed = unconfirmed | M | have | Kept. Decided 2026-09-21: option A, grading uses count or weight, never dash style |
| R3. Attribute overlays | D | drafted | A door is a base plus small marks on the side they apply to: barred (two ticks), trapped (small triangle), one-way (arrow through). Locked stays a solid slab; secret and illusory are a letter on the wall (S, ?). Marks combine (locked + trapped). Also for covered, fortified, ruined |
| R4. Direction convention | D | drafted | Down is the narrow end or the point: tapering step lines on stairs (classic DMG icons), chevrons on slopes, an arrow on spiral stairs, comb ticks on the lower side of a ledge. No U/D letters on stairs |
| R5. Grading ladders | D, O | drafted (site) | Slopes: 3, 2 or 1 chevrons (steep, shallow, imperceptible). Overland routes still to draw: weight and parallel lines, not dash style |
| R6. Size ladder | O | gap | Village, town, city as a graded symbol |
| R7. Letter overlays | D, M | drafted | A small letter beside the base mark, like a superscript: S secret, C covered, U ceiling. Stairs no longer use letters |

**The R2 / R5 collision is systemic.** Both domains use line style as their grading channel, and Maplog spends dashed on "unconfirmed". Options:

- **A.** Keep dashed = unconfirmed. Grade by line weight, parallel lines or tick count: road as a double line, track single, trail single with ticks; slopes as one, two or three arrowheads. Keeps the approved rule.
- **B.** Give "unconfirmed" another mark (a small "?" or a ghost outline) and free dashed for grading. Matches tradition, changes an approved rule.
- **C.** Dashed grades inside line families and means unconfirmed elsewhere. Least change, most confusion.

Recommendation: A.

## 6. Size

Rows count *concepts*, not drawings. Counted from the tables above (`part` and `gap` rows need work; `have` rows exist):

| Set | Rows | To add | Pri 1 | Pri 2 | Pri 3 |
|---|---|---|---|---|---|
| Core (v0.1) | 19 | 0 | | | |
| Site | 57 | 50 | 2 | 21 | 27 |
| Overland | 73 | 73 | 25 | 24 | 24 |

Water appears in both sets but is one mark, so the total to add is about **122**, against 19 today. That breaks the "small" principle if it all goes into one flat list. Two things keep it manageable:

- **Tiers.** Each set ships its priority 1 and 2 marks in the body (23 site, 49 overland) and priority 3 as an extended list.
- **Rules instead of marks.** R3, R5 and R6 generate variants. Six door attributes are six small overlays, not six doors; seven pit and trapdoor rows are a base plus three overlays; village, town and city are one mark at three sizes. The real drawing count is well below the row count.

## 7. Decisions

Decided 2026-09-25:

0. **Maplog draws space, not state.** The play layer is dropped: pips, the person, foe, item, event, thread and safe-place pins, and the strike-through. Room state is already covered by the Dungeon Crawling Add-on (`[R:]`, `[DUNGEON STATUS]`). Kept from v0.1: openings, stairs, the hazard pin (now the generic trap) and dashed = unconfirmed. Unexplored exit is now dashed applied to a corridor, not a mark of its own. Section 4.7 (travel and exploration state) is out of scope. v0.1 assets archived in `assets/maplog/draft/v0.1/`.

Decided 2026-09-21:

1. **Structure.** Layers by geometries, core set unchanged, site and overland sets added.
2. **Terrain.** A standard set of about 9 (Section 4.1).
3. **R2 / R5.** Option A: dashed keeps meaning unconfirmed; grading uses count, weight or parallel lines.
4. **Entrance pin.** It is the hex-to-site link (Section 4.4).

Proceeding on defaults unless vetoed:

5. **Direction cue.** Settled by Roberto after the site sheet review: stairs use the classic DMG icons (down is the narrow end), so no U/D letters; slopes, ledges and spiral stairs use geometric cues.
6. **Overland source.** None supplied, so the `O` rows stay my inventory. Replace them if a reference sheet turns up.

## 7a. Progress

- **Site set, priorities 1 and 2: drafted and approved by Roberto (2026-09-21), except stairs, now redrawn as the classic DMG icons.** Sheet: on `docs/en/assets/maplog/draft/site-set.png` (SVG alongside). Review points: column is a solid square (a filled circle would look like the cleared pip); off-map edge is a corridor whose walls end in `//` breaks; bars are a row of dots; attribute marks sit above the wall, standing for "the side they apply to"; shaft is a circle with an X and pit a square with a solid centre.
- **Overland set, priorities 1 and 2: drawn and folded into `maplog.md` Section 9 (2026-09-25), awaiting Roberto's review.** Choices to review: terrain as small pictograms (grass tufts, round trees, palm, humps, peaks, dunes with dots, reeds, waves, snowflake); border = thin line with small circles (dash-dot avoided, R2); cliff reuses the ledge; peak = mountain with a solid cap; pass = `)(`; routes graded by count (road two lines, track one, trail one with cross ticks; river two wavy lines, stream one); bridge = flared lines, ford = three stepping stones, ferry = boat; sea lane = a track over water (no mark); entrance = arch with dark doorway; ruin = wall with broken top; tomb = headstone with cross; standing stones = trilithon; shrine = pointed roof on posts with a dot; lair = three claw marks; settlement ladder = hamlet dot, village 1 ring, town 2, city 3; castle wide crenellated, tower narrow; port = anchor beside a settlement and temple = shrine beside one (R3 attributes); inn = house with hanging sign; north arrow. Regions (4.6) use existing marks: border + name, outline + trap mark. Travel state (4.7) is out of scope: party position and visited hexes go in `[L:]` tags.
- **Site set folded into `maplog.md` v0.2.0 (2026-09-25)**, with one PNG per mark in `assets/maplog/` and `marks.svg` regenerated. Section 10.3 "Overland Maps" is a placeholder until the overland set is drawn.

## 8. Sources and licence

- DUNGEON.PPT, Roger S.G. Sorolla, 2011, CC BY-SA 3.0 (`docs/en/dungeon.pptx`, untracked). Any mark adapted from it needs credit to Sorolla. Maplog is BY-SA 4.0; adaptations may be licensed under a later version with the same elements. Confirmed by Roberto 2026-09-25; credit is in `maplog.md`.
- Maplog v0.1: `docs/en/maplog.md`.
- Overland rows: general conventions, no document.
