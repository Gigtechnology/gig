// Generates favicons + optimized header logos from public/logo.jpg.
// Run with: npm run icons
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const SRC = 'public/logo.jpg';
const OUT = 'public';

const meta = await sharp(SRC).metadata();
// The faucet + water drop sit in the top ~47% of the square logo.
// That mark stays readable at 16-32 px, the full wordmark does not.
const s = meta.width / 1260; // coordinates measured on the 1260 px original
const mark = {
  left: Math.round(175 * s),
  top: Math.round(10 * s),
  width: Math.round(910 * s),
  height: Math.round(600 * s),
};

const white = { r: 255, g: 255, b: 255, alpha: 1 };

async function markSquare(size, padding = 0.06) {
  const inner = Math.round(size * (1 - padding * 2));
  const cropped = await sharp(SRC)
    .extract(mark)
    .resize(inner, inner, { fit: 'contain', background: white })
    .png()
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: white } })
    .composite([{ input: cropped, gravity: 'center' }])
    .png()
    .toBuffer();
}

const sizes = { 'favicon-16x16.png': 16, 'favicon-32x32.png': 32, 'apple-touch-icon.png': 180, 'icon-192.png': 192, 'icon-512.png': 512 };
const pngs = {};
for (const [name, size] of Object.entries(sizes)) {
  pngs[size] = await markSquare(size, size <= 32 ? 0.02 : 0.08);
  await writeFile(`${OUT}/${name}`, pngs[size]);
}

// favicon.ico (PNG-encoded entries, 16 + 32 + 48)
const ico48 = await markSquare(48, 0.02);
const entries = [[16, pngs[16]], [32, pngs[32]], [48, ico48]];
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(entries.length, 4);
let offset = 6 + entries.length * 16;
const dirs = [];
for (const [size, buf] of entries) {
  const d = Buffer.alloc(16);
  d.writeUInt8(size, 0);
  d.writeUInt8(size, 1);
  d.writeUInt8(0, 2);
  d.writeUInt8(0, 3);
  d.writeUInt16LE(1, 4);
  d.writeUInt16LE(32, 6);
  d.writeUInt32LE(buf.length, 8);
  d.writeUInt32LE(offset, 12);
  offset += buf.length;
  dirs.push(d);
}
await writeFile(`${OUT}/favicon.ico`, Buffer.concat([header, ...dirs, ...entries.map((e) => e[1])]));

// Optimized full logo for header / footer (unchanged artwork, just resized)
for (const w of [160, 320, 640]) {
  await sharp(SRC).resize(w).webp({ quality: 90 }).toFile(`${OUT}/logo-${w}.webp`);
}
// Open Graph image 1200x630 (logo centered on white)
const og = await sharp(SRC).resize(560, 560).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: white } })
  .composite([{ input: og, gravity: 'center' }])
  .jpeg({ quality: 88 })
  .toFile(`${OUT}/og-default.jpg`);

console.log('Icons generated.');
