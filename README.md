# 🚀 Advanced Trello MERN Stack

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

---

## 🚀 Getting Started

### 📋 Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Version >= 18.x recommended)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster
- A [Brevo Account](https://www.brevo.com/) (to obtain an API key for sending transactional emails)
- A [Cloudinary Account](https://cloudinary.com/) (for card attachments/cover images)
- A [Google AI Studio Key](https://aistudio.google.com/) (for the Gemini chatbot assistant)

---

### ⚙️ Environment Configuration

#### 1. Backend API (`trello-api/.env`)
Create a `.env` file in the `trello-api/` directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=MERNSTACK

LOCAL_DEV_APP_PORT=8017
LOCAL_DEV_APP_HOST=localhost

# Security Credentials
ACCESS_TOKEN_SECRET_SIGNATURE=your_jwt_access_signature_key
ACCESS_TOKEN_LIFE=1h
REFRESH_TOKEN_SECRET_SIGNATURE=your_jwt_refresh_signature_key
REFRESH_TOKEN_LIFE=14d

# Brevo (SendinBlue) Email Config
BREVO_API_KEY=xkeysib-your_brevo_api_key_here
ADMIN_EMAIL_ADDRESS=your_sender_email@domain.com
ADMIN_EMAIL_NAME=Trello Admin

# Cloudinary Config
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Gemini AI Config
GEMINI_API_KEY=your_gemini_api_key_here
```

#### 2. Frontend React (`trello-web/` variables)
*The frontend automatically targets `http://localhost:8017` in development mode by default (defined in `trello-web/src/utils/constants.js`). No additional configuration is required for local testing.*

---

### 🗄️ Database Migration (MongoDB)

Since the `deadline`, `isDeadlineSent`, and `isDone` fields were added to support smart card deadlines, you must initialize these fields for any pre-existing cards in your database. 

Run the following commands in your MongoDB shell (`mongosh`):

```javascript
use MERNSTACK // Substitute with your database name if different

db.cards.updateMany(
  {}, 
  { 
    $set: { 
      deadline: null, 
      isDeadlineSent: false,
      isDone: false 
    } 
  }
)
```

---

### 💻 Running the App Locally

#### Step 1: Start the Backend API Server
1. Navigate to the backend directory:
   ```bash
   cd trello-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
   *The backend will run on `http://localhost:8017`.*

#### Step 2: Start the Frontend Client
1. Navigate to the frontend directory:
   ```bash
   cd ../trello-web
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
   *The React web app will run on `http://localhost:5174/`.*

---

## 💡 How to Test & Demo the Core Features

To demonstrate the **Deadline Notifications** feature during your presentation:

1. **Assign a Member**: Click on a Card to open the **ActiveCard** modal. Under the **Members** section on the right sidebar, assign your own account (or another registered email account) to the card.
2. **Set a Deadline**: Click on **Dates** on the right sidebar, choose a date and time exactly **4 minutes** ahead of the current server time, and click **Save**.
   - Notice the status badge at the top of the card details displays a yellow **"Sắp tới hạn"** status.
3. **Wait for Cron Scraper**: 
   - Under the hood, the backend cron worker (`trello-api/src/utils/cronJob.js`) runs every **5 minutes** and scans for cards whose deadline falls within the 5-minute threshold.
   - Once it runs, you will receive an in-app notification in your notification bell (top right), and a warning email in your Brevo mailbox indicating that the task is approaching its deadline.
4. **Mark as Done**: Check the completion box next to the deadline inside the Card modal. The badge will instantly change to a green **"Đã xong"** status, and no further cron warnings will be sent.
5. **Real-time Navigation**: Click on the notification item from the Notification Hub bell dropdown. You will be redirected to the corresponding board page and the card details modal will automatically slide open.

To demonstrate the **AI Chatbot**:
- Click on the AI Bot floating icon on the bottom right corner of the workspace.
- Start chatting in Vietnamese (e.g. *"Hãy gợi ý danh sách công việc cần làm cho dự án web bán hàng"*). The chatbot leverages **Gemini 2.5 Flash** to respond instantly.
