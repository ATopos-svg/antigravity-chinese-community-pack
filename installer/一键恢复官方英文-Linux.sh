#!/usr/bin/env bash
set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "========================================================="
echo "   Antigravity 官方英文原版一键恢复器 (Linux 专属版)"
echo "========================================================="
echo ""

POSSIBLE_DIRS=(
    "/opt/Antigravity/resources"
    "/opt/antigravity/resources"
    "/usr/lib/antigravity/resources"
    "/usr/share/antigravity/resources"
    "$HOME/.local/share/antigravity/resources"
)

RESOURCES_DIR=""
for dir in "${POSSIBLE_DIRS[@]}"; do
    if [ -f "$dir/app.asar.backup" ]; then
        RESOURCES_DIR="$dir"
        break
    fi
done

if [ -z "$RESOURCES_DIR" ]; then
    echo "[提示] 未在默认位置检测到 app.asar.backup 备份文件。"
    exit 1
fi

echo "正在恢复官方英文版 app.asar..."
if [ -w "$RESOURCES_DIR" ]; then
    cp -f "$RESOURCES_DIR/app.asar.backup" "$RESOURCES_DIR/app.asar"
else
    sudo cp -f "$RESOURCES_DIR/app.asar.backup" "$RESOURCES_DIR/app.asar"
fi

echo "恢复成功！已还原为官方英文原版。"
