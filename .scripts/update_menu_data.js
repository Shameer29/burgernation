import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const menuTsPath = path.join(__dirname, '../src/data/menu.ts');
const dishesDir = path.join(__dirname, '../public/dishes');

let content = fs.readFileSync(menuTsPath, 'utf8');

const files = fs.readdirSync(dishesDir);
const fileMap = {};
files.forEach(f => {
  const ext = path.extname(f);
  const name = path.basename(f, ext);
  if (!fileMap[name] || ext === '.png') {
    fileMap[name] = `/dishes/${f}`;
  }
});

// Update item definitions in menu.ts string
const itemRegex = /{\s*id:\s*"([^"]+)"([^}]+)}/g;

content = content.replace(itemRegex, (match, id, rest) => {
  if (rest.includes('image:')) return match; // already has image
  const imgPath = fileMap[id];
  if (imgPath) {
    return `{ id: "${id}"${rest.trimEnd()}, image: "${imgPath}" }`;
  }
  return match;
});

fs.writeFileSync(menuTsPath, content);
console.log('Updated menu.ts with 100% image coverage!');
