#!/bin/bash
set -e
cd "$(dirname "$0")"

echo "========================================================="
echo "   Antigravity 官方原版英文还原器 (Linux)"
echo "========================================================="
echo ""

POSSIBLE_PATHS=(
    "/opt/Antigravity/resources"
    "/opt/antigravity/resources"
    "/usr/lib/antigravity/resources"
    "/usr/share/antigravity/resources"
    "$HOME/.local/share/antigravity/resources"
)

TARGET_DIR=""
for p in "${POSSIBLE_PATHS[@]}"; do
    if [ -f "$p/app.asar.backup" ]; then
        TARGET_DIR="$p"
        break
    fi
done

if [ -z "$TARGET_DIR" ]; then
    echo "[提示] 请输入包含 app.asar.backup 的 resources 目录路径:"
    read -r TARGET_DIR
fi

TARGET_ASAR="$TARGET_DIR/app.asar"
BACKUP_ASAR="$TARGET_DIR/app.asar.backup"

if [ ! -f "$BACKUP_ASAR" ]; then
    echo "[错误] 未找到备份文件: $BACKUP_ASAR"
    exit 1
fi

echo "[1/2] 正在关闭 Antigravity 进程..."
killall -9 antigravity 2>/dev/null || pkill -9 -f "antigravity" 2>/dev/null || true
sleep 1

echo "[2/2] 正在还原官方原版英文核心..."
if [ -w "$TARGET_DIR" ]; then
    cp -f "$BACKUP_ASAR" "$TARGET_ASAR"
else
    sudo cp -f "$BACKUP_ASAR" "$TARGET_ASAR"
fi

echo ""
echo "========================================================="
echo "   已成功恢复为官方英文原版！"
echo "========================================================="
