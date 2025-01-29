call ng build

call npm run build:rega-material

@echo off
REM Script to update media folder and main.scss in rega-ui-material

REM Define paths
set REGA_UI_PATH=dist\rega-ui\browser\media
set REGA_UI_MATERIAL_PATH=dist\rega-ui-material\src\assets\styles
set CSS_FOLDER=dist\rega-ui\browser

REM Step 1: Copy media folder from rega-ui to rega-ui-material
echo Copying media folder...
xcopy /E /I /Y "%REGA_UI_PATH%" "%REGA_UI_MATERIAL_PATH%\media"
if %errorlevel% equ 0 (
    echo Media folder copied successfully.
) else (
    echo Failed to copy media folder.
    exit /b 1
)

REM Step 2: Find the styles-*.css file and append its content to main.scss
echo Searching for styles-*.css file...
for /r "%CSS_FOLDER%" %%f in (styles-*.css) do (
    set CSS_FILE=%%f
    goto :found_css
)

:found_css
if not defined CSS_FILE (
    echo No styles-*.css file found.
    exit /b 1
)

echo Found CSS file: %CSS_FILE%
echo Appending CSS content to main.scss...
type "%CSS_FILE%" >> "%REGA_UI_MATERIAL_PATH%\main.scss"
if %errorlevel% equ 0 (
    echo CSS content appended to main.scss successfully.
) else (
    echo Failed to append CSS content to main.scss.
    exit /b 1
)

echo Script completed successfully.

call cd dist/rega-ui-material && npm pack

 
