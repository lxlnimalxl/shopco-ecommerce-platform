const fs = require('fs');
const path = require('path');

const [,, stepOutputFile] = process.argv;
const raw = fs.readFileSync(stepOutputFile, 'utf8');
const data = JSON.parse(raw);
const items = data.result.items;
for (const item of items) {
  const buf = Buffer.from(item.base64, 'base64');
  const dest = path.join(__dirname, 'src', 'assets', 'images', item.name);
  fs.writeFileSync(dest, buf);
  console.log(`Saved ${item.name} (${buf.length} bytes)`);
}
