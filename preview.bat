@echo off
setlocal

where hugo.exe >nul 2>&1
if errorlevel 1 (
    echo Hugo is missing from PATH. Install Hugo Extended and try again.
    pause
    exit /b 1
)

pushd "%~dp0" || exit /b 1
hugo.exe server --baseURL http://localhost/ --renderToMemory %*
set "preview_exit=%errorlevel%"
popd
exit /b %preview_exit%
