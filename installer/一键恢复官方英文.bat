@echo off
chcp 65001 >nul
title Antigravity Restore Official English
echo =========================================================
echo       Google Antigravity 恢复官方英文原版工具
echo =========================================================
echo.

set "TARGET_DIR=%LOCALAPPDATA%\Programs\antigravity\resources"
set "EXE_PATH=%LOCALAPPDATA%\Programs\antigravity\Antigravity.exe"

if not exist "%TARGET_DIR%\app.asar.backup" (
    echo [提示] 未检测到备份文件 app.asar.backup！
    echo 如需恢复英文，可直接重新运行官方安装包。
    echo.
    pause
    exit /b
)

echo [1/3] 正在关闭 Antigravity...
taskkill /f /im Antigravity.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo [2/3] 正在还原官方原版核心文件...
copy /y "%TARGET_DIR%\app.asar.backup" "%TARGET_DIR%\app.asar" >nul 2>&1

echo [3/3] 正在重新启动 Antigravity 官方原版...
start "" "%EXE_PATH%"

echo.
echo =========================================================
echo   已成功恢复为官方英文原版！
echo =========================================================
timeout /t 3 >nul