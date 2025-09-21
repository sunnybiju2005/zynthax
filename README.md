# ZYNTHAX - Desktop Application

A Python-based desktop application to receive and manage form submissions from the ZYNTHAX website.

## Quick Start

**Double-click `start_simple.bat`** to launch the application.

## Features

- ✅ **Real-time Form Submissions**: Receives data from website forms instantly
- 📊 **Statistics Dashboard**: View total, unread, and service-specific counts  
- 🔍 **Filter & Search**: Filter submissions by service type or read/unread status
- 📋 **Detailed View**: Double-click any submission to see full details
- 💾 **Export Data**: Export all submissions to JSON format
- 🗃️ **SQLite Database**: Local storage for all submissions

## Files

- `zynthax_desktop_simple.py` - Main desktop application
- `start_simple.py` - Application launcher with dependency check
- `start_simple.bat` - Windows batch file for easy launching
- `submissions.db` - SQLite database (created automatically)

## Website Integration

The desktop app runs a webhook server on `http://127.0.0.1:3001` that receives form submissions from the ZYNTHAX website forms.

## Requirements

- Python 3.6+
- Flask
- Flask-CORS

Dependencies are automatically installed when you run the application.

## Contact

- **Email**: zynthax13@gmail.com
- **Phone**: +91 8848241519