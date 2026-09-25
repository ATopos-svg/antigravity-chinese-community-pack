const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const src = 'C:\\Users\\Lenovo\\AppData\\Local\\Programs\\antigravity\\resources\\app.asar';
const bak = 'C:\\Users\\Lenovo\\AppData\\Local\\Programs\\antigravity\\resources\\app.asar.official.2170.bak';
const extractDir = 'C:\\Users\\Lenovo\\AppData\\Local\\Temp\\agy_2170_extract';

console.log('1. 正在备份官方原版 ASAR...');
fs.copyFileSync(src, bak);
const bakStat = fs.statSync(bak);
console.log(`   备份完成: ${bak} (${bakStat.size} 字节)`);

console.log('2. 正在解包到:', extractDir);
if (fs.existsSync(extractDir)) {
    fs.rmSync(extractDir, { recursive: true, force: true });
}

execSync(`npx asar extract "${src}" "${extractDir}"`, { stdio: 'inherit' });

console.log('3. 解包完成，验证 package.json:');
const pkg = JSON.parse(fs.readFileSync(path.join(extractDir, 'package.json'), 'utf8'));
console.log(`   应用名称: ${pkg.productName || pkg.name}`);
console.log(`   官方版本: ${pkg.version}`);
console.log(`   依赖项:`, Object.keys(pkg.dependencies || {}));
