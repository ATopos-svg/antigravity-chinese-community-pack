@echo off
chcp 65001 >nul
title Antigravity Chinese Localization Installer
echo =========================================================
echo       Google Antigravity 中文汉化一键安装工具 (v2.10.0)
echo =========================================================
echo.

set "TARGET_DIR=%LOCALAPPDATA%\Programs\antigravity\resources"
set "EXE_PATH=%LOCALAPPDATA%\Programs\antigravity\Antigravity.exe"

if not exist "%TARGET_DIR%" (
    echo [错误] 未检测到 Antigravity 安装目录！
    echo 请确认您已安装 Google Antigravity，且位于默认路径：
    echo %LOCALAPPDATA%\Programs\antigravity
    echo.
    pause
    exit /b
)

echo [1/4] 正在关闭 Antigravity 运行进程...
taskkill /f /im Antigravity.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo [2/4] 正在备份官方原版核心文件...
if not exist "%TARGET_DIR%\app.asar.backup" (
    copy /y "%TARGET_DIR%\app.asar" "%TARGET_DIR%\app.asar.backup" >nul 2>&1
    echo       [成功] 官方原版已备份为 app.asar.backup
) else (
    echo       [跳过] 原版备份已存在，跳过备份步骤
)

echo [3/4] 正在写入中文汉化补丁...
copy /y "%~dp0app.asar.chinese" "%TARGET_DIR%\app.asar" >nul 2>&1
if errorlevel 1 (
    echo [提示] 正在重试文件替换...
    timeout /t 2 /nobreak >nul
    copy /y "%~dp0app.asar.chinese" "%TARGET_DIR%\app.asar"
)

echo [4/4] 正在启动 Antigravity 中文版...
start "" "%EXE_PATH%"

echo.
echo =========================================================
echo   恭喜！中文汉化安装完成，Antigravity 正在启动！
echo   进入主界面后约 1 秒，所有菜单与设置项自动呈现为中文。
echo =========================================================
timeout /t 3 >nul