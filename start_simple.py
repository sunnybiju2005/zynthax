#!/usr/bin/env python3
"""
ZYNTHAX Desktop Application Launcher
"""

import sys
import subprocess

def check_dependencies():
    """Check if required packages are installed"""
    required_packages = [
        'flask',
        'flask_cors'
    ]
    
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package)
        except ImportError:
            missing_packages.append(package)
    
    if missing_packages:
        print("❌ Missing required packages:")
        for package in missing_packages:
            print(f"   - {package}")
        print("\n📦 Installing missing packages...")
        
        try:
            subprocess.check_call([sys.executable, '-m', 'pip', 'install'] + missing_packages)
            print("✅ All packages installed successfully!")
        except subprocess.CalledProcessError:
            print("❌ Failed to install packages. Please install manually:")
            print(f"   pip install {' '.join(missing_packages)}")
            return False
    
    return True

def main():
    """Main launcher function"""
    print("🚀 Starting ZYNTHAX Desktop Application...")
    print("=" * 50)
    
    # Check dependencies
    if not check_dependencies():
        input("Press Enter to exit...")
        return
    
    print("✅ Dependencies checked!")
    print("🌐 Starting webhook server on port 3001...")
    print("🖥️  Opening desktop application...")
    print("📱 The GUI window should appear now!")
    print("=" * 50)
    
    try:
        # Import and run the main application
        from zynthax_desktop_simple import ZynthaxDesktopApp
        app = ZynthaxDesktopApp()
        app.run()
    except Exception as e:
        print(f"❌ Error starting application: {e}")
        input("Press Enter to exit...")

if __name__ == "__main__":
    main()
