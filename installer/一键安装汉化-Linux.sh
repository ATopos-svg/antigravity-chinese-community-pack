#!/usr/bin/env bash
set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "========================================================="
echo "   Antigravity 社区中文补丁一键安装器 (Linux 专属版 v2.12.2)"
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
    if [ -f "$dir/app.asar" ]; then
        RESOURCES_DIR="$dir"
        break
    fi
done

if [ -z "$RESOURCES_DIR" ]; then
    echo "[错误] 未能自动定位到 Antigravity resources 目录！"
    echo "请手动输入包含 app.asar 的 resources 目录绝对路径:"
    read -r RESOURCES_DIR
fi

if [ ! -f "$RESOURCES_DIR/app.asar" ]; then
    echo "[错误] 路径不存在 app.asar: $RESOURCES_DIR"
    exit 1
fi

SOURCE_ASAR="$SCRIPT_DIR/app.asar.chinese"
if [ ! -f "$SOURCE_ASAR" ]; then
    echo "[错误] 未找到 app.asar.chinese 核心补丁文件！"
    exit 1
fi

echo "[1/3] 正在退出 Antigravity 进程..."
killall -q antigravity Antigravity || true
sleep 1

echo "[2/3] 正在备份原版并应用中文补丁..."
BACKUP_ASAR="$RESOURCES_DIR/app.asar.backup"
if [ ! -f "$BACKUP_ASAR" ]; then
    if [ -w "$RESOURCES_DIR" ]; then
        cp "$RESOURCES_DIR/app.asar" "$BACKUP_ASAR"
    else
        sudo cp "$RESOURCES_DIR/app.asar" "$BACKUP_ASAR"
    fi
    echo "      已创建官方原版备份: app.asar.backup"
fi

if [ -w "$RESOURCES_DIR" ]; then
    cp -f "$SOURCE_ASAR" "$RESOURCES_DIR/app.asar"
else
    echo "需要管理员权限写入系统目录，请输入密码:"
    sudo cp -f "$SOURCE_ASAR" "$RESOURCES_DIR/app.asar"
fi

echo "[3/3] 安装完成！"
echo "========================================================="
echo "   恭喜！Linux 中文汉化补丁安装成功，请直接启动 Antigravity。"
echo "========================================================="
