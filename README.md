# 🚀 TRELLO MERN STACK

A full-stack Trello-inspired web application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).  
This project allows users to manage tasks efficiently through boards, columns, and cards with a modern drag-and-drop interface similar to Trello.

---

## ✨ Features & Functionalities

### 🔑 Authentication & Security
- Secure User Registration and Login/Logout.
- JWT (JSON Web Tokens) Authentication and Protected Routes.
- Account verification via email (Nodemailer/Brevo) to enhance security.

### 📋 Board Management
- Create, update title, and delete workspaces/boards.

### 📑 Column Management
- Add, edit column names, delete, and reorder columns within a board.

### 📝 Card Management
- Create, edit details, and delete task cards.

### 🎯 Drag & Drop Interactions
- Move cards seamlessly between different columns.
- Drag columns to reorder them within the board interface.
- Smooth, Trello-like interaction utilizing React Beautiful DnD.

### ⚡ UI & Architecture
- Fully responsive UI optimized for a great user experience.
- Complete MERN Stack architecture with robust RESTful API endpoints.

---

## 🛠️ Tech Stack

### Frontend
- ReactJS
- Redux Toolkit
- React Router DOM
- Axios
- Material UI (MUI)
- React Beautiful DnD

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (JSON Web Tokens)
- Nodemailer / Brevo 

### Tools
- Git & GitHub
- VS Code
- Postman

---

## 📂 Project Structure

```bash
MERN STACK/
│
├── trello-api/ (Backend)
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── providers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── sockets/
│   │   ├── utils/
│   │   └── validations/
│   ├── .env
│   └── server.js
│
├── trello-web/ (Frontend)
│   ├── src/
│   │   ├── apis/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── customLibraries/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── utils/
│   └── App.jsx
│
└── README.md
