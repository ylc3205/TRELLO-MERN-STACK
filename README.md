# 🚀 Trello Web Clone

![Trello Clone Banner](https://via.placeholder.com/1200x400?text=Trello+Web+Clone+Banner) *(Thêm link ảnh banner hoặc screenshot giao diện của bạn vào đây)*

Một ứng dụng web quản lý dự án và công việc mô phỏng lại các chức năng cốt lõi của Trello. Dự án này cung cấp một không gian làm việc trực quan giúp người dùng tổ chức các task, theo dõi tiến độ và quản lý quy trình làm việc thông qua hệ thống Bảng (Boards), Danh sách (Columns) và Thẻ (Cards).

---

## ✨ Các tính năng chính (Key Features)

* **Quản lý Bảng (Board Management):** Tạo, xem chi tiết và quản lý các bảng làm việc.
* **Tương tác Kéo & Thả (Drag and Drop):** * Kéo thả các Cột (Columns) để sắp xếp lại thứ tự ưu tiên.
  * Kéo thả các Thẻ (Cards) linh hoạt giữa các cột khác nhau hoặc trong cùng một cột.
* **Quản lý Dữ liệu Động:** * Thêm mới Cột và Thẻ ngay lập tức trên giao diện (Optimistic UI update).
  * Xóa cột (kéo theo việc xóa tất cả các thẻ bên trong).
* **Xác thực & Bảo mật (Dự kiến):** Tích hợp JSON Web Tokens (JWT) để quản lý phiên đăng nhập và bảo mật các luồng API.
* **Kiểm tra dữ liệu (Validation):** Dữ liệu đầu vào được kiểm tra nghiêm ngặt ở backend trước khi lưu vào cơ sở dữ liệu để đảm bảo tính toàn vẹn.

---

## 🛠 Công nghệ & Thư viện (Tech Stack)

Dự án áp dụng mô hình **MERN Stack** tiêu chuẩn:

### Frontend
* **Core:** React.js
* **State Management:** Redux Toolkit *(Dự kiến áp dụng để quản lý state toàn cục)*
* **Routing:** React Router v6
* **UI & Tương tác:** Thư viện hỗ trợ Drag & Drop (VD: `dnd-kit` hoặc `react-beautiful-dnd`)
* **HTTP Client:** Axios (gọi API tới Backend)

### Backend
* **Core:** Node.js, Express.js
* **Database:** MongoDB & Mongoose (ODM)
* **Bảo mật:** CORS, JWT (JSON Web Tokens)
* **Khác:** Biến môi trường (`dotenv`), xử lý lỗi tập trung.

---

## 📂 Cấu trúc thư mục (Folder Structure)

```text
trello-web/
├── backend/
│   ├── src/
│   │   ├── config/        # Cấu hình database, môi trường
│   │   ├── controllers/   # Tiếp nhận request và trả về response
│   │   ├── models/        # Định nghĩa Schema MongoDB (Board, Column, Card)
│   │   ├── routes/        # Định nghĩa các Endpoints (v1, v2...)
│   │   ├── services/      # Xử lý logic nghiệp vụ (vd: boardService.createNew)
│   │   ├── utils/         # Các hàm tiện ích dùng chung
│   │   └── server.js      # Entry point của server
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── apis/          # Chứa các hàm gọi API bằng Axios
    │   ├── components/    # Các UI components dùng chung (Button, Modal...)
    │   ├── pages/         # Các trang chính (Board Detail, Auth...)
    │   ├── redux/         # Cấu hình store và slices cho Redux Toolkit
    │   ├── utils/         # Format dữ liệu, constants
    │   └── App.jsx        # Root component
    └── package.json
    👨‍💻 Author

🛠️ Tech Stack
Frontend

React 18, Vite

Redux Toolkit, DnD Libraries (Drag and Drop)

React Router DOM, Axios

Backend

Node.js, Express.js

MongoDB, Mongoose (ODM)

JWT, CORS

DevOps

Docker & Docker Compose

Render (Backend) / Vercel (Frontend)

Vinh
Information Technology Student at Posts and Telecommunications Institute of Technology (PTIT)

LinkedIn: [Hien Vinh Nguyen Van](https://www.linkedin.com/in/hien-vinh-nguyen-van-9607462a9/)
