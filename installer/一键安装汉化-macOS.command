#!/bin/bash
set -e
cd "$(dirname "$0")"

echo "========================================================="
echo "   Antigravity 社区中文补丁一键安装器 (macOS 专属版 v2.12.2)"
echo "========================================================="
echo ""

APP_PATH="/Applications/Antigravity.app"
RESOURCES_DIR="$APP_PATH/Contents/Resources"
TARGET_ASAR="$RESOURCES_DIR/app.asar"
BACKUP_ASAR="$RESOURCES_DIR/app.asar.backup"
SOURCE_ASAR="./app.asar.chinese"

if [ ! -d "$APP_PATH" ]; then
    echo "[错误] 未在 /Applications 目录下找到 Antigravity.app！"
    echo "请确认您已将 Antigravity 安装到了系统的应用程序目录。"
    read -p "按回车键退出..."
    exit 1
fi

if [ ! -f "$SOURCE_ASAR" ]; then
    echo "[错误] 当前目录下未找到 app.asar.chinese 核心补丁文件！"
    read -p "按回车键退出..."
    exit 1
fi

echo "[1/4] 正在安全退出 Antigravity 进程..."
pkill -f "Antigravity" 2>/dev/null || true
sleep 1

echo "[2/4] 正在备份原版并应用中文补丁..."
if [ ! -f "$BACKUP_ASAR" ]; then
    if [ -f "$TARGET_ASAR" ]; then
        cp "$TARGET_ASAR" "$BACKUP_ASAR"
        echo "      已创建官方原版备份: app.asar.backup"
    fi
fi

cp -f "$SOURCE_ASAR" "$TARGET_ASAR"

echo "[3/4] 正在修复 macOS 安全权限 (消除'应用已损坏'提示)..."
xattr -cr "$APP_PATH" 2>/dev/null || true
codesign --force --deep --sign - "$APP_PATH" 2>/dev/null || true

echo "[4/4] 正在启动全中文 Antigravity..."
open -a "Antigravity"

echo ""
echo "========================================================="
echo "   恭喜！macOS 中文汉化补丁安装成功，Antigravity 已启动！"
echo "========================================================="
sleep 2
exit 0
