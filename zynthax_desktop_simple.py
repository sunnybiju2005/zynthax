import tkinter as tk
from tkinter import ttk, messagebox, scrolledtext
import sqlite3
import json
import threading
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS

class ZynthaxDesktopApp:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("ZYNTHAX Desktop - Form Submissions Manager")
        self.root.geometry("1000x700")
        self.root.configure(bg='#2c2c2c')
        
        # Make window always on top initially for visibility
        self.root.attributes('-topmost', True)
        self.root.after(2000, lambda: self.root.attributes('-topmost', False))
        
        # Database setup
        self.db_path = "submissions.db"
        self.init_database()
        
        # Flask server setup
        self.app = Flask(__name__)
        CORS(self.app)
        self.server_port = 3001
        self.server_thread = None
        self.server_running = False
        
        # Data storage
        self.submissions = []
        self.filtered_submissions = []
        self.current_filter = "all"
        
        # Create GUI
        self.create_gui()
        
        # Load existing submissions
        self.load_submissions()
        
        # Start webhook server
        self.start_server()
        
        # Show window prominently
        self.root.deiconify()
        self.root.lift()
        self.root.focus_force()
        
    def init_database(self):
        """Initialize SQLite database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS submissions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                service_type TEXT NOT NULL,
                full_name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT,
                company TEXT,
                project_description TEXT NOT NULL,
                additional_notes TEXT,
                submission_data TEXT NOT NULL,
                is_read BOOLEAN DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        conn.commit()
        conn.close()
        
    def create_gui(self):
        """Create the main GUI"""
        # Configure style
        style = ttk.Style()
        style.theme_use('clam')
        
        # Main frame
        main_frame = tk.Frame(self.root, bg='#2c2c2c')
        main_frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=20)
        
        # Header
        header_frame = tk.Frame(main_frame, bg='#2c2c2c')
        header_frame.pack(fill=tk.X, pady=(0, 20))
        
        title_label = tk.Label(header_frame, text="🚀 ZYNTHAX Desktop - Form Submissions Manager", 
                              font=('Arial', 18, 'bold'), fg='#00d4ff', bg='#2c2c2c')
        title_label.pack(side=tk.LEFT)
        
        # Server status
        self.status_label = tk.Label(header_frame, text="Server: Starting...", 
                                   font=('Arial', 12), fg='#00ff88', bg='#2c2c2c')
        self.status_label.pack(side=tk.RIGHT)
        
        # Stats frame
        stats_frame = tk.Frame(main_frame, bg='#3c3c3c', relief=tk.RAISED, bd=2)
        stats_frame.pack(fill=tk.X, pady=(0, 20))
        
        stats_inner = tk.Frame(stats_frame, bg='#3c3c3c')
        stats_inner.pack(padx=20, pady=15)
        
        # Statistics labels
        self.total_label = tk.Label(stats_inner, text="Total: 0", 
                                   font=('Arial', 14, 'bold'), fg='white', bg='#3c3c3c')
        self.total_label.pack(side=tk.LEFT, padx=(0, 30))
        
        self.unread_label = tk.Label(stats_inner, text="Unread: 0", 
                                    font=('Arial', 14, 'bold'), fg='#00ff88', bg='#3c3c3c')
        self.unread_label.pack(side=tk.LEFT, padx=(0, 30))
        
        self.general_label = tk.Label(stats_inner, text="General: 0", 
                                     font=('Arial', 14, 'bold'), fg='#ffa500', bg='#3c3c3c')
        self.general_label.pack(side=tk.LEFT, padx=(0, 30))
        
        self.app_label = tk.Label(stats_inner, text="App Dev: 0", 
                                 font=('Arial', 14, 'bold'), fg='#ff6b6b', bg='#3c3c3c')
        self.app_label.pack(side=tk.LEFT, padx=(0, 30))
        
        self.website_label = tk.Label(stats_inner, text="Website: 0", 
                                     font=('Arial', 14, 'bold'), fg='#4ecdc4', bg='#3c3c3c')
        self.website_label.pack(side=tk.LEFT, padx=(0, 30))
        
        self.elearning_label = tk.Label(stats_inner, text="E-Learning: 0", 
                                       font=('Arial', 14, 'bold'), fg='#45b7d1', bg='#3c3c3c')
        self.elearning_label.pack(side=tk.LEFT)
        
        # Control frame
        control_frame = tk.Frame(main_frame, bg='#2c2c2c')
        control_frame.pack(fill=tk.X, pady=(0, 20))
        
        # Filter buttons
        filter_frame = tk.Frame(control_frame, bg='#2c2c2c')
        filter_frame.pack(side=tk.LEFT)
        
        tk.Label(filter_frame, text="Filter:", font=('Arial', 12, 'bold'), 
                fg='white', bg='#2c2c2c').pack(side=tk.LEFT, padx=(0, 10))
        
        self.filter_var = tk.StringVar(value="all")
        filter_options = [
            ("All", "all"),
            ("Unread", "unread"),
            ("General Contact", "general-contact"),
            ("App Development", "app-development"),
            ("Website Development", "website-development"),
            ("E-Learning", "e-learning")
        ]
        
        for text, value in filter_options:
            rb = tk.Radiobutton(filter_frame, text=text, variable=self.filter_var, 
                               value=value, command=self.filter_submissions,
                               font=('Arial', 10), fg='white', bg='#2c2c2c',
                               selectcolor='#00d4ff', activebackground='#2c2c2c')
            rb.pack(side=tk.LEFT, padx=(0, 10))
        
        # Action buttons
        action_frame = tk.Frame(control_frame, bg='#2c2c2c')
        action_frame.pack(side=tk.RIGHT)
        
        tk.Button(action_frame, text="Refresh", command=self.load_submissions,
                 bg='#00d4ff', fg='white', font=('Arial', 10, 'bold'),
                 padx=15, pady=5, relief=tk.FLAT).pack(side=tk.LEFT, padx=(0, 5))
        
        tk.Button(action_frame, text="Export", command=self.export_submissions,
                 bg='#00ff88', fg='white', font=('Arial', 10, 'bold'),
                 padx=15, pady=5, relief=tk.FLAT).pack(side=tk.LEFT, padx=(0, 5))
        
        tk.Button(action_frame, text="Mark All Read", command=self.mark_all_read,
                 bg='#ff6b6b', fg='white', font=('Arial', 10, 'bold'),
                 padx=15, pady=5, relief=tk.FLAT).pack(side=tk.LEFT)
        
        # Submissions list
        list_frame = tk.Frame(main_frame, bg='#2c2c2c')
        list_frame.pack(fill=tk.BOTH, expand=True)
        
        # Treeview for submissions
        columns = ('ID', 'Name', 'Email', 'Service', 'Date', 'Status')
        self.tree = ttk.Treeview(list_frame, columns=columns, show='headings', height=12)
        
        # Configure columns
        self.tree.heading('ID', text='ID')
        self.tree.heading('Name', text='Name')
        self.tree.heading('Email', text='Email')
        self.tree.heading('Service', text='Service Type')
        self.tree.heading('Date', text='Date')
        self.tree.heading('Status', text='Status')
        
        self.tree.column('ID', width=50)
        self.tree.column('Name', width=150)
        self.tree.column('Email', width=200)
        self.tree.column('Service', width=150)
        self.tree.column('Date', width=120)
        self.tree.column('Status', width=80)
        
        # Scrollbar
        scrollbar = ttk.Scrollbar(list_frame, orient=tk.VERTICAL, command=self.tree.yview)
        self.tree.configure(yscrollcommand=scrollbar.set)
        
        self.tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        # Bind double-click event
        self.tree.bind('<Double-1>', self.on_submission_double_click)
        
        # Detail frame (initially hidden)
        self.detail_frame = tk.Frame(main_frame, bg='#3c3c3c', relief=tk.RAISED, bd=2)
        
        # Detail content
        detail_title = tk.Label(self.detail_frame, text="📋 Submission Details", 
                               font=('Arial', 16, 'bold'), fg='#00d4ff', bg='#3c3c3c')
        detail_title.pack(pady=15)
        
        self.detail_text = scrolledtext.ScrolledText(self.detail_frame, height=8, 
                                                   bg='#2c2c2c', fg='white', 
                                                   font=('Arial', 11))
        self.detail_text.pack(fill=tk.BOTH, expand=True, padx=20, pady=10)
        
        # Detail buttons
        detail_button_frame = tk.Frame(self.detail_frame, bg='#3c3c3c')
        detail_button_frame.pack(pady=15)
        
        tk.Button(detail_button_frame, text="Mark as Read", command=self.mark_current_read,
                 bg='#00ff88', fg='white', font=('Arial', 10, 'bold'),
                 padx=15, pady=5, relief=tk.FLAT).pack(side=tk.LEFT, padx=5)
        
        tk.Button(detail_button_frame, text="Delete", command=self.delete_current,
                 bg='#ff6b6b', fg='white', font=('Arial', 10, 'bold'),
                 padx=15, pady=5, relief=tk.FLAT).pack(side=tk.LEFT, padx=5)
        
        tk.Button(detail_button_frame, text="Close", command=self.hide_detail,
                 bg='#666666', fg='white', font=('Arial', 10, 'bold'),
                 padx=15, pady=5, relief=tk.FLAT).pack(side=tk.LEFT, padx=5)
        
        self.current_submission = None
        
    def start_server(self):
        """Start Flask webhook server"""
        def run_server():
            try:
                self.app.route('/webhook/form-submission', methods=['POST'])(self.handle_submission)
                self.app.route('/health', methods=['GET'])(self.health_check)
                
                self.server_running = True
                print(f"✅ Webhook server started on port {self.server_port}")
                self.app.run(host='127.0.0.1', port=self.server_port, debug=False, use_reloader=False, threaded=True)
            except Exception as e:
                print(f"❌ Server error: {e}")
                self.server_running = False
        
        self.server_thread = threading.Thread(target=run_server, daemon=True)
        self.server_thread.start()
        
        # Update status after a short delay
        self.root.after(2000, self.update_server_status)
        
    def update_server_status(self):
        """Update server status label"""
        if self.server_running:
            self.status_label.config(text=f"✅ Server: Running on port {self.server_port}")
        else:
            self.status_label.config(text="❌ Server: Starting...")
            self.root.after(1000, self.update_server_status)
    
    def handle_submission(self):
        """Handle incoming form submission"""
        try:
            data = request.get_json()
            if not data:
                return jsonify({'success': False, 'error': 'No data received'}), 400
            
            # Save to database
            submission_id = self.save_submission(data)
            
            # Show notification in console
            service_type = data.get('serviceType', 'Unknown')
            client_name = data.get('fullName', 'Unknown')
            print(f"🎉 New submission received: {service_type} from {client_name}")
            
            # Update GUI in main thread
            self.root.after(0, self.load_submissions)
            
            return jsonify({'success': True, 'id': submission_id})
            
        except Exception as e:
            print(f"❌ Error handling submission: {e}")
            return jsonify({'success': False, 'error': str(e)}), 500
    
    def health_check(self):
        """Health check endpoint"""
        return jsonify({'status': 'ok', 'port': self.server_port})
    
    def save_submission(self, data):
        """Save submission to database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO submissions 
            (service_type, full_name, email, phone, company, project_description, 
             additional_notes, submission_data)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data.get('serviceType', 'Unknown'),
            data.get('fullName', ''),
            data.get('email', ''),
            data.get('phone', ''),
            data.get('company', ''),
            data.get('projectDescription', ''),
            data.get('additionalNotes', ''),
            json.dumps(data)
        ))
        
        submission_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return submission_id
    
    def load_submissions(self):
        """Load submissions from database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, service_type, full_name, email, phone, company, 
                   project_description, additional_notes, is_read, created_at
            FROM submissions 
            ORDER BY created_at DESC
        ''')
        
        self.submissions = []
        for row in cursor.fetchall():
            self.submissions.append({
                'id': row[0],
                'service_type': row[1],
                'full_name': row[2],
                'email': row[3],
                'phone': row[4],
                'company': row[5],
                'project_description': row[6],
                'additional_notes': row[7],
                'is_read': bool(row[8]),
                'created_at': row[9]
            })
        
        conn.close()
        
        self.filter_submissions()
        self.update_stats()
    
    def filter_submissions(self):
        """Filter submissions based on current filter"""
        self.current_filter = self.filter_var.get()
        
        if self.current_filter == "all":
            self.filtered_submissions = self.submissions.copy()
        elif self.current_filter == "unread":
            self.filtered_submissions = [s for s in self.submissions if not s['is_read']]
        elif self.current_filter == "general-contact":
            self.filtered_submissions = [s for s in self.submissions if s['service_type'] == 'General Contact']
        elif self.current_filter == "app-development":
            self.filtered_submissions = [s for s in self.submissions if s['service_type'] == 'App Development']
        elif self.current_filter == "website-development":
            self.filtered_submissions = [s for s in self.submissions if s['service_type'] == 'Website Development']
        elif self.current_filter == "e-learning":
            self.filtered_submissions = [s for s in self.submissions if s['service_type'] == 'E-Learning Platform']
        
        self.update_treeview()
    
    def update_treeview(self):
        """Update the treeview with filtered submissions"""
        # Clear existing items
        for item in self.tree.get_children():
            self.tree.delete(item)
        
        # Add filtered submissions
        for submission in self.filtered_submissions:
            status = "Read" if submission['is_read'] else "Unread"
            date_str = submission['created_at'][:10]  # Just the date part
            
            # Color coding for unread items
            tags = ('unread',) if not submission['is_read'] else ()
            
            self.tree.insert('', 'end', values=(
                submission['id'],
                submission['full_name'],
                submission['email'],
                submission['service_type'],
                date_str,
                status
            ), tags=tags)
        
        # Configure tag colors
        self.tree.tag_configure('unread', background='#4a4a4a')
    
    def update_stats(self):
        """Update statistics labels"""
        total = len(self.submissions)
        unread = len([s for s in self.submissions if not s['is_read']])
        general = len([s for s in self.submissions if s['service_type'] == 'General Contact'])
        app_dev = len([s for s in self.submissions if s['service_type'] == 'App Development'])
        website = len([s for s in self.submissions if s['service_type'] == 'Website Development'])
        elearning = len([s for s in self.submissions if s['service_type'] == 'E-Learning Platform'])
        
        self.total_label.config(text=f"Total: {total}")
        self.unread_label.config(text=f"Unread: {unread}")
        self.general_label.config(text=f"General: {general}")
        self.app_label.config(text=f"App Dev: {app_dev}")
        self.website_label.config(text=f"Website: {website}")
        self.elearning_label.config(text=f"E-Learning: {elearning}")
    
    def on_submission_double_click(self, event):
        """Handle double-click on submission"""
        selection = self.tree.selection()
        if not selection:
            return
        
        item = self.tree.item(selection[0])
        submission_id = int(item['values'][0])
        
        # Find submission data
        submission = next((s for s in self.submissions if s['id'] == submission_id), None)
        if not submission:
            return
        
        self.current_submission = submission
        self.show_detail(submission)
    
    def show_detail(self, submission):
        """Show submission details"""
        self.detail_frame.pack(fill=tk.BOTH, expand=True, pady=(20, 0))
        
        detail_text = f"""
👤 CLIENT INFORMATION:
Name: {submission['full_name']}
Email: {submission['email']}
Phone: {submission['phone'] or 'Not provided'}
Company: {submission['company'] or 'Not provided'}

📋 PROJECT DETAILS:
Service Type: {submission['service_type']}
Project Description: {submission['project_description']}
Additional Notes: {submission['additional_notes'] or 'None'}

📅 SUBMISSION INFO:
Submitted: {submission['created_at']}
Status: {'Read' if submission['is_read'] else 'Unread'}
        """
        
        self.detail_text.delete(1.0, tk.END)
        self.detail_text.insert(1.0, detail_text)
    
    def hide_detail(self):
        """Hide submission details"""
        self.detail_frame.pack_forget()
        self.current_submission = None
    
    def mark_current_read(self):
        """Mark current submission as read"""
        if not self.current_submission:
            return
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('UPDATE submissions SET is_read = 1 WHERE id = ?', 
                      (self.current_submission['id'],))
        
        conn.commit()
        conn.close()
        
        # Update local data
        self.current_submission['is_read'] = True
        for submission in self.submissions:
            if submission['id'] == self.current_submission['id']:
                submission['is_read'] = True
                break
        
        self.load_submissions()
        messagebox.showinfo("Success", "Submission marked as read")
    
    def delete_current(self):
        """Delete current submission"""
        if not self.current_submission:
            return
        
        if messagebox.askyesno("Confirm Delete", "Are you sure you want to delete this submission?"):
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute('DELETE FROM submissions WHERE id = ?', 
                          (self.current_submission['id'],))
            
            conn.commit()
            conn.close()
            
            self.load_submissions()
            self.hide_detail()
            messagebox.showinfo("Success", "Submission deleted")
    
    def mark_all_read(self):
        """Mark all submissions as read"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('UPDATE submissions SET is_read = 1')
        
        conn.commit()
        conn.close()
        
        self.load_submissions()
        messagebox.showinfo("Success", "All submissions marked as read")
    
    def export_submissions(self):
        """Export submissions to JSON file"""
        try:
            from tkinter import filedialog
            
            filename = filedialog.asksaveasfilename(
                defaultextension=".json",
                filetypes=[("JSON files", "*.json"), ("All files", "*.*")],
                initialname=f"zynthax-submissions-{datetime.now().strftime('%Y-%m-%d')}.json"
            )
            
            if filename:
                with open(filename, 'w') as f:
                    json.dump(self.submissions, f, indent=2, default=str)
                
                messagebox.showinfo("Success", f"Exported {len(self.submissions)} submissions to {filename}")
        
        except Exception as e:
            messagebox.showerror("Error", f"Export failed: {e}")
    
    def run(self):
        """Run the application"""
        print("🚀 Starting ZYNTHAX Desktop Application...")
        print("📱 GUI should be visible now!")
        self.root.mainloop()

if __name__ == "__main__":
    app = ZynthaxDesktopApp()
    app.run()
