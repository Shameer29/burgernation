import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const menuTsPath = path.join(__dirname, '../src/data/menu.ts');

let content = fs.readFileSync(menuTsPath, 'utf8');

// Replace any .svg references in menu.ts with .png
content = content.replace(/\/dishes\/([^"']+)\.svg/g, '/dishes/$1.png');

fs.writeFileSync(menuTsPath, content);
console.log('Successfully updated all dish image paths in menu.ts to .png!');
