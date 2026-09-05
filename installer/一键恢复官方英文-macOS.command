#!/bin/bash
set -e
cd "$(dirname "$0")"

echo "========================================================="
echo "   Antigravity 官方英文原版一键恢复器 (macOS 专属版)"
echo "========================================================="
echo ""

APP_PATH="/Applications/Antigravity.app"
RESOURCES_DIR="$APP_PATH/Contents/Resources"
TARGET_ASAR="$RESOURCES_DIR/app.asar"
BACKUP_ASAR="$RESOURCES_DIR/app.asar.backup"

if [ ! -f "$BACKUP_ASAR" ]; then
    echo "[提示] 未在系统目录中检测到官方原版备份文件 (app.asar.backup)。"
    read -p "按回车键退出..."
    exit 1
fi

echo "[1/3] 正在安全退出 Antigravity 进程..."
pkill -f "Antigravity" 2>/dev/null || true
sleep 1

echo "[2/3] 正在恢复官方英文 app.asar..."
cp -f "$BACKUP_ASAR" "$TARGET_ASAR"
xattr -cr "$APP_PATH" 2>/dev/null || true
codesign --force --deep --sign - "$APP_PATH" 2>/dev/null || true

echo "[3/3] 正在启动官方英文版 Antigravity..."
open -a "Antigravity"

echo ""
echo "========================================================="
echo "   恢复成功！已还原为 Google Antigravity 官方英文原版。"
echo "========================================================="
sleep 2
exit 0
