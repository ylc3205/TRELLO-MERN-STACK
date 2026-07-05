# 🚀 Advanced Trello MERN Stack

[![Demo Trello Workspace](https://youtu.be/kWtk0fz96QQ)
A professional, feature-rich Trello-inspired project management platform built on the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). This platform leverages modern real-time WebSockets, automated background notifications, Gemini AI integration, and robust drag-and-drop mechanics to deliver an industry-standard collaborative task management experience.

---

## 🌟 Key Features & Functionalities

### 🔑 Authentication & Security
- **Full User Session Management**: Secure user registration, login, logout, and token refresh system.
- **JWT-Based Protection**: Implementation of access tokens (short-lived) and refresh tokens (long-lived, secure HTTP-only cookies) to maintain seamless authentication.
- **Email Verification**: User accounts require activation via secure links dispatched via the **Brevo API (Sendinblue)**.
- **Password Protection**: Secure password hashing utilizing **BcryptJS**.

### 📋 Board & Member Management
- **Workspaces & Boards**: Create, read, update, and delete boards.
- **Collaboration Invitations**: Invite other registered platform users to join a board via email invitations powered by Brevo.
- **Member Control**: Board owners can view, manage, and assign roles to members on the board.

### 📑 Drag & Drop Column & Card Workflows
- **Column Operations**: Create, rename, delete, and sort columns dynamically.
- **Card Operations**: Create task cards, write rich markdown descriptions (`@uiw/react-md-editor`), upload attachments (documents, images, PDFs) hosted on **Cloudinary**, and set custom cover images.
- **Card Customization**: Add, edit, or delete nested user comments.
- **Fluid Drag & Drop**: Native-feeling drag-and-drop system to reorder cards between columns or reorder columns horizontally, powered by the modern and lightweight **@dnd-kit** framework (Core, Sortable, Utilities).

### 💬 Real-Time Collaboration
- **In-Board Chatroom**: Real-time communication channel for members of the board powered by **Socket.io**.
- **Active Member Selector**: Select or mention active board members for messaging inside the chat room.

### 🤖 Gemini AI Assistant Integration
- **AI Project Assistant**: Powered by the state-of-the-art **Gemini 2.5 Flash** model (`@google/generative-ai`).
- **Context-Aware Assistance**: An interactive chat widget on the workspace that supports Vietnamese and English. Users can brainstorm tasks, ask for coding/planning advice, or summarize task descriptions instantly.

### ⏰ Smart Deadlines & Automated Alerts
- **Interactive Datetime Picker**: Set precise target dates and times on cards directly from the card details modal.
- **Dynamic Status Badges**: Real-time status chips indicating task progress:
  - 🟢 **Completed** - when checked as completed.
  - 🟡 **Due Soon** - when the deadline is within the alert threshold.
  - 🔴 **Overdue**  - when the current time has passed the deadline.
  - 🔵 **In Progress** - default active state.
- **Automated Alerts (Background Cron Service)**: A backend background daemon powered by `node-cron` scans the database every 5 minutes. If an assigned card's deadline is exactly **5 minutes away** (or custom threshold), the service automatically dispatches:
  1. Real-time **Socket.io** notifications to all assigned card members.
  2. Transactional email warnings through **Brevo Mail** to the members' registered email addresses.

### 🔔 Interactive Notification Hub
- **AppBar Notification Dropdown**: Lists all past and real-time board activities, invitations, and deadline warnings.
- **Actionable Clicks**: Clicking on any deadline or assignment notification automatically routes the user to the correct Board and opens the corresponding Card modal immediately!

---

## 🛠️ Technology Stack

| Layer | Technologies & Core Libraries |
| :--- | :--- |
| **Frontend** | ReactJS (Vite), Redux Toolkit, Redux Persist, Material UI (MUI v5), @dnd-kit, Socket.io-Client, Axios, React Hook Form, React Toastify, Moment.js, @uiw/react-md-editor |
| **Backend** | Node.js, Express.js, MongoDB (Native Node.js Driver), Socket.io, Node-Cron, Joi (Schema Validation), BcryptJS, JsonWebToken, Multer & Streamifier |
| **Services** | Brevo API (Email Delivery), Cloudinary API (File Hosting), Google Generative AI (Gemini 2.5 Flash) |

---

## 📂 Project Structure

```bash
MERN STACK/
│
├── trello-api/               # Backend Service (Node.js & Express)
│   ├── src/
│   │   ├── config/           # MongoDB config, env variables, cors
│   │   ├── controllers/      # Route request/response handlers (includes Chatbot, Card, Board)
│   │   ├── middlewares/      # Auth validation, file upload parsing
│   │   ├── models/           # Collection schemas & Joi validation (Board, Column, Card, User)
│   │   ├── providers/        # Brevo Email & Cloudinary integration
│   │   ├── routes/           # REST API endpoints (v1)
│   │   ├── services/         # Core business logic
│   │   ├── sockets/          # Socket.io connection handlers (Chat, Notifications)
│   │   └── utils/            # Helper functions, validators, & node-cron background job
│   ├── .env                  # Backend environment secrets
│   └── server.js             # API entrypoint & server listener
│
├── trello-web/               # Frontend Application (React & Vite)
│   ├── src/
│   │   ├── apis/             # Axios API calls
│   │   ├── assets/           # Static images/illustrations
│   │   ├── components/       # Reusable UI widgets (AppBar, ActiveCard, Chatbox, etc.)
│   │   ├── customLibraries/  # Custom helpers (Dnd-kit extensions)
│   │   ├── pages/            # Page views (Auth, Boards, BoardDetail, Chat)
│   │   ├── redux/            # RTK slices & Store config
│   │   └── utils/            # Constants & date helpers
│   └── App.jsx               # Root React entrypoint
│
└── README.md
```
