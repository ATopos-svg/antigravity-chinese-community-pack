@echo off
title Antigravity Chinese Patch Installer (v2.11.0)
echo =========================================================
echo    Antigravity Chinese Patch Installer (v2.11.0)
echo =========================================================
echo.

set "TARGET_DIR=%LOCALAPPDATA%\Programs\antigravity\resources"
set "TARGET_ASAR=%TARGET_DIR%\app.asar"
set "BACKUP_ASAR=%TARGET_DIR%\app.asar.backup"
set "SOURCE_ASAR=%~dp0app.asar.chinese"

if not exist "%SOURCE_ASAR%" (
    echo [ERROR] app.asar.chinese not found in current folder!
    pause
    exit /b 1
)

if not exist "%TARGET_DIR%" (
    echo [ERROR] Antigravity installation not found at:
    echo %TARGET_DIR%
    pause
    exit /b 1
)

echo [1/3] Closing Antigravity...
taskkill /f /im Antigravity.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo [2/3] Backing up original and applying Chinese patch...
if not exist "%BACKUP_ASAR%" (
    if exist "%TARGET_ASAR%" (
        copy /y "%TARGET_ASAR%" "%BACKUP_ASAR%" >nul
        echo       Created backup: app.asar.backup
    )
)

copy /y "%SOURCE_ASAR%" "%TARGET_ASAR%" >nul
if errorlevel 1 (
    echo [RETRY] Retrying in 2 seconds...
    timeout /t 2 /nobreak >nul
    copy /y "%SOURCE_ASAR%" "%TARGET_ASAR%" >nul
)

if errorlevel 1 (
    echo [FAILED] Copy failed. Please right click and Run as administrator.
    pause
    exit /b 1
)

echo [3/3] Launching Antigravity with Chinese UI...
start "" "%LOCALAPPDATA%\Programs\antigravity\Antigravity.exe"
echo.
echo =========================================================
echo    Success! Antigravity started with Chinese UI.
echo =========================================================
timeout /t 3 >nul
