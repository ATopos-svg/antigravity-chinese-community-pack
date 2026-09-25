const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function hashFile(p) {
  return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
}

function getAllFiles(dir, prefix = '') {
  let res = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const rel = prefix ? prefix + '/' + item : item;
    if (fs.statSync(full).isDirectory()) {
      res = res.concat(getAllFiles(full, rel));
    } else {
      res.push(rel);
    }
  }
  return res;
}

const dir1 = 'C:/Users/Lenovo/AppData/Local/Temp/agy_2151_extract';
const dir2 = 'C:/Users/Lenovo/AppData/Local/Temp/agy_2170_extract';

const files1 = new Set(getAllFiles(dir1));
const files2 = new Set(getAllFiles(dir2));

console.log('=== 1. 新增的文件 (2.17.0 vs 2.15.1) ===');
let added = [];
for (const f of files2) {
  if (!files1.has(f)) {
    added.push(f);
    console.log('[ADDED]:', f);
  }
}
if (added.length === 0) console.log('(无新增文件)');

console.log('\n=== 2. 删除的文件 ===');
let removed = [];
for (const f of files1) {
  if (!files2.has(f)) {
    removed.push(f);
    console.log('[REMOVED]:', f);
  }
}
if (removed.length === 0) console.log('(无删除文件)');

console.log('\n=== 3. 核心源码变动的文件 (不含 node_modules) ===');
for (const f of files1) {
  if (files2.has(f)) {
    if (f.startsWith('node_modules')) continue;
    const p1 = path.join(dir1, f);
    const p2 = path.join(dir2, f);
    const h1 = hashFile(p1);
    const h2 = hashFile(p2);
    if (h1 !== h2) {
      console.log(`[MODIFIED]: ${f} (${fs.statSync(p1).size} -> ${fs.statSync(p2).size} bytes)`);
    }
  }
}

console.log('\n=== 4. 检查官方 2.17.0 ASAR 的 Unpacked 规则 ===');
function readAsarHeader(asarPath) {
  const fd = fs.openSync(asarPath, 'r');
  const buf = Buffer.alloc(16);
  fs.readSync(fd, buf, 0, 16, 0);
  const headerSize = buf.readUInt32LE(12);
  const headerBuf = Buffer.alloc(headerSize);
  fs.readSync(fd, headerBuf, 0, headerSize, 16);
  fs.closeSync(fd);
  return JSON.parse(headerBuf.toString('utf8'));
}

const header2170 = readAsarHeader('C:/Users/Lenovo/AppData/Local/Programs/antigravity/resources/app.asar.official.2170.bak');
function getUnpackedFiles(node, p = '') {
  let list = [];
  if (node.files) {
    for (const [k, v] of Object.entries(node.files)) {
      list = list.concat(getUnpackedFiles(v, p ? p + '/' + k : k));
    }
  } else if (node.unpacked) {
    list.push(p);
  }
  return list;
}
const u2170 = getUnpackedFiles(header2170);
console.log('Official 2.17.0 Unpacked count:', u2170.length);
const unpackedPrefixes = new Set(u2170.map(p => p.split('/')[0] + '/' + (p.split('/')[1] || '')));
console.log('Official 2.17.0 Unpacked prefixes:', Array.from(unpackedPrefixes));
