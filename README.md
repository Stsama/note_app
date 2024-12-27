# Note App 📝  

**Note App** is a simple yet powerful application for creating, managing, and organizing notes. Built using **Express.js** and **MongoDB**, it offers an intuitive interface for users to securely store and retrieve their notes with ease.  

## 🚀 Features  

- **User Authentication**: Secure login and session management using Passport.js.  
- **Create, Edit, and Delete Notes**: Fully functional CRUD operations for managing notes.  
- **Search and Filter**: Easily find specific notes with search functionality.  
- **Persistent Storage**: All notes are securely stored in a MongoDB database.  
- **Responsive Design**: Optimized for use across various devices.  
- **404 Error Handling**: Custom error page for improved user experience.  

## 🛠️ Tech Stack  

- **Backend**: Express.js  
- **Database**: MongoDB with Mongoose  
- **Authentication**: Passport.js with session persistence using connect-mongo  
- **Templating Engine**: EJS  
- **Styling**: [CSS Framework or Custom Styles]  
- **Other Tools**: dotenv, method-override


## 🚀 Getting Started  

Follow these steps to set up the project on your local machine.  

### Prerequisites  

- Node.js (>= 14.x)  
- MongoDB instance (local or cloud)  

### Installation  

1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/note_app.git
   cd note_app
   npm install

MONGO_URI=your-mongodb-uri
SESSION_SECRET=your-session-secret
PORT=3000

npm start
