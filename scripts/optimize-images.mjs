// Creates an 800 px wide "-800.jpg" variant of every photo in public/images
// (used by <Media> for cards and mobile via srcset). Run with: npm run images
import sharp from 'sharp';
import { readdir } from 'node:fs/promises';

const DIR = 'public/images';
const files = (await readdir(DIR)).filter((f) => /\.jpe?g$/i.test(f) && !/-800\.jpe?g$/i.test(f));

for (const f of files) {
  const out = f.replace(/\.(jpe?g)$/i, '-800.jpg');
  await sharp(`${DIR}/${f}`).resize({ width: 800, withoutEnlargement: true }).jpeg({ quality: 74, mozjpeg: true }).toFile(`${DIR}/${out}`);
  console.log(`${out}`);
}
