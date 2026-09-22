const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const installerDir = path.resolve(__dirname, '..', 'installer');
const desktopDir = 'C:\\Users\\Lenovo\\Desktop\\Antigravity-Chinese-Pack-v2.15.1';
const zipPath = 'C:\\Users\\Lenovo\\Desktop\\Antigravity-Chinese-Pack-v2.15.1.zip';

console.log('1. 正在同步文件到桌面目录:', desktopDir);
if (!fs.existsSync(desktopDir)) {
    fs.mkdirSync(desktopDir, { recursive: true });
}

const files = fs.readdirSync(installerDir);
for (const file of files) {
    const src = path.join(installerDir, file);
    const dest = path.join(desktopDir, file);
    fs.copyFileSync(src, dest);
    console.log(`   -> 已复制: ${file}`);
}

console.log('2. 正在压缩发布包为 ZIP:', zipPath);
if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
}

// 使用 Windows 内置 bsdtar 生成标准 zip 文件
execSync(`tar -a -cf "${zipPath}" -C "${desktopDir}" .`, { stdio: 'inherit' });

const stat = fs.statSync(zipPath);
console.log(`3. 压缩完成！文件大小: ${(stat.size / 1024 / 1024).toFixed(2)} MB (${stat.size} 字节)`);
