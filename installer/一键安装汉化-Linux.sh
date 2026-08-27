#!/bin/bash
set -e
cd "$(dirname "$0")"

echo "========================================================="
echo "   Antigravity 社区中文补丁一键安装器 (Linux 专属版)"
echo "========================================================="
echo ""

SOURCE_ASAR="./app.asar.chinese"
if [ ! -f "$SOURCE_ASAR" ]; then
    echo "[错误] 当前目录下未找到 app.asar.chinese 核心补丁文件！"
    exit 1
fi

POSSIBLE_PATHS=(
    "/opt/Antigravity/resources"
    "/opt/antigravity/resources"
    "/usr/lib/antigravity/resources"
    "/usr/share/antigravity/resources"
    "$HOME/.local/share/antigravity/resources"
)

TARGET_DIR=""
for p in "${POSSIBLE_PATHS[@]}"; do
    if [ -d "$p" ]; then
        TARGET_DIR="$p"
        break
    fi
done

if [ -z "$TARGET_DIR" ]; then
    echo "[提示] 未在默认路径中找到 Antigravity，请输入包含 app.asar 的 resources 目录路径:"
    read -r TARGET_DIR
fi

if [ ! -d "$TARGET_DIR" ]; then
    echo "[错误] 指定目录不存在: $TARGET_DIR"
    exit 1
fi

TARGET_ASAR="$TARGET_DIR/app.asar"
BACKUP_ASAR="$TARGET_DIR/app.asar.backup"

echo "[1/3] 正在安全退出 Antigravity 进程..."
killall -9 antigravity 2>/dev/null || pkill -9 -f "antigravity" 2>/dev/null || true
sleep 1

echo "[2/3] 正在备份原版并应用中文补丁..."
if [ ! -f "$BACKUP_ASAR" ]; then
    if [ -f "$TARGET_ASAR" ]; then
        cp "$TARGET_ASAR" "$BACKUP_ASAR"
        echo "      已创建官方原版备份: app.asar.backup"
    fi
fi

if [ -w "$TARGET_DIR" ]; then
    cp -f "$SOURCE_ASAR" "$TARGET_ASAR"
else
    echo "正在请求管理员权限写入: $TARGET_DIR"
    sudo cp -f "$SOURCE_ASAR" "$TARGET_ASAR"
fi

echo "[3/3] 正在启动 Antigravity 中文版..."
if command -v antigravity >/dev/null 2>&1; then
    nohup antigravity >/dev/null 2>&1 &
fi

echo ""
echo "========================================================="
echo "   恭喜！Linux 中文汉化补丁安装成功！"
echo "========================================================="
