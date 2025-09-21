@echo off
echo Cleaning up empty directories...
rmdir /s /q zynthax-desktop-app 2>nul
rmdir /s /q __pycache__ 2>nul
echo Cleanup complete!
