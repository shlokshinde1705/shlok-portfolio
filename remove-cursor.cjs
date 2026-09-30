const fs = require('fs');
const path = require('path');

function walk(dir) {
  let files = [];
  fs.readdirSync(dir).forEach(f => {
    let p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) files.push(...walk(p));
    else if (p.endsWith('.jsx')) files.push(p);
  });
  return files;
}

const files = walk('src');
let changedFiles = 0;

files.forEach(f => {
  let original = fs.readFileSync(f, 'utf8');
  let content = original;
  
  // Remove cursor inline styles
  content = content.replace(/,\s*cursor:\s*'none'/g, '');
  content = content.replace(/cursor:\s*'none',?\s*/g, '');
  
  // Remove cursor data attributes
  content = content.replace(/\s*data-cursor="[^"]*"/g, '');
  
  if (content !== original) {
    fs.writeFileSync(f, content);
    changedFiles++;
    console.log(`Updated ${f}`);
  }
});

console.log(`Finished. Updated ${changedFiles} files.`);
