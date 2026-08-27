@echo off
title Antigravity Restore to Official English
echo =========================================================
echo    Antigravity Restore to Official English
echo =========================================================
echo.

set "TARGET_DIR=%LOCALAPPDATA%\Programs\antigravity\resources"
set "TARGET_ASAR=%TARGET_DIR%\app.asar"
set "BACKUP_ASAR=%TARGET_DIR%\app.asar.backup"

if not exist "%BACKUP_ASAR%" (
    echo [NOTICE] Backup file app.asar.backup not found.
    pause
    exit /b 1
)

echo [1/2] Closing Antigravity...
taskkill /f /im Antigravity.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo [2/2] Restoring official English app.asar...
copy /y "%BACKUP_ASAR%" "%TARGET_ASAR%" >nul

echo Launching official English Antigravity...
start "" "%LOCALAPPDATA%\Programs\antigravity\Antigravity.exe"
echo.
echo =========================================================
echo    Restored to official English version successfully!
echo =========================================================
timeout /t 3 >nul
