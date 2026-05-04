[# Inoverse Technologies — Company Website

A professional full-stack company website for **Inoverse Technologies**, a software engineering company specializing in custom systems development. Built with React JS, Node.js, Express.js, and MySQL.

---

## 📌 Project Overview

This system includes:
- A responsive multi-page public website
- A functional contact form that saves to the database
- A full Admin CMS panel with JWT authentication
- CRUD management for services, projects, messages, and content
- Soft delete with archive and restore functionality
- Dynamic content management (edit website text from the admin panel)
- Toast notifications and loading states

---

## 🛠️ Technologies Used

### Frontend
| Technology | Purpose |
|---|---|
| React JS | Component-based UI |
| React Router | Client-side routing |
| Redux Toolkit | Global state management |
| Axios | HTTP client for API requests |
| Tailwind CSS v4 | Utility-first styling |
| Vite | Build tool and dev server |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Web framework |
| Sequelize | ORM for MySQL |
| MySQL2 | Database driver |
| JWT (jsonwebtoken) | Authentication |
| bcryptjs | Password hashing |
| Nodemailer | Email notifications |
| Multer | File upload handling |
| express-validator | Input validation |

### Database
| Tool | Purpose |
|---|---|
| MySQL | Relational database |
| Sequelize | Schema management and queries |

---

## 📁 Project Structure

```
inoverse-tech/
├── frontend/
│   ├── src/
│   │   ├── admin/           # CMS admin pages
│   │   ├── api/             # Axios instance
│   │   ├── components/      # Reusable components (Navbar, Footer, Toast)
│   │   ├── hooks/           # Custom hooks (useContent)
│   │   ├── layouts/         # MainLayout, AdminLayout
│   │   ├── pages/           # Public pages
│   │   ├── routes/          # ProtectedRoute
│   │   └── store/           # Redux store and slices
│   ├── index.html
│   └── vite.config.js
│
├── backend/
│   ├── config/              # DB, mailer, multer config
│   ├── controllers/         # Route controllers
│   ├── middleware/          # JWT auth middleware
│   ├── models/              # Sequelize models
│   ├── routes/              # Express routes
│   ├── uploads/             # Uploaded images
│   ├── createAdmin.js       # One-time admin seeder
│   └── server.js            # Entry point
│
└── README.md
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v18+
- MySQL 8+
- npm

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/inoverse-tech.git
cd inoverse-tech
```

---

### 2. Database Setup

1. Open MySQL and create the database:

```sql
CREATE DATABASE inoverse_db;
```

2. Import the schema:

```bash
mysql -u root -p inoverse_db < schema.sql
```

---

### 3. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=inoverse_db

JWT_SECRET=your_jwt_secret_key

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
MAIL_FROM_NAME=Inoverse Technologies
```

Start the backend:

```bash
npm run dev
```

Create the admin user (run once):

```bash
node createAdmin.js
```

---

### 4. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Visit: `http://localhost:5173`

---

## 🔐 Admin Panel

| URL | Description |
|---|---|
| `/admin/login` | Admin login page |
| `/admin/dashboard` | Overview with live stats |
| `/admin/services` | Manage services (CRUD) |
| `/admin/projects` | Manage projects (CRUD) |
| `/admin/messages` | View contact submissions |
| `/admin/content` | Edit website text content |
| `/admin/archive` | Restore or permanently delete archived items |

### Default Admin Credentials
```
Email:    admin@inoverse.com
Password: Admin@1234
```
> ⚠️ Change these credentials after first login.

---

## 🌐 Public Pages

| Route | Page |
|---|---|
| `/` | Homepage |
| `/about` | About Us |
| `/services` | Services |
| `/technologies` | Tech Stack |
| `/portfolio` | Portfolio / Projects |
| `/contact` | Contact Form |

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | ❌ | Admin login |
| GET | `/api/auth/me` | ✅ | Get current user |

### Services
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/services` | ❌ | Get active services (public) |
| GET | `/api/services/admin` | ✅ | Get all services (admin) |
| GET | `/api/services/archived` | ✅ | Get archived services |
| POST | `/api/services` | ✅ | Create service |
| PUT | `/api/services/:id` | ✅ | Update service |
| DELETE | `/api/services/:id` | ✅ | Archive service (soft delete) |
| PATCH | `/api/services/:id/restore` | ✅ | Restore archived service |
| DELETE | `/api/services/:id/permanent` | ✅ | Permanently delete service |

### Projects
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/projects` | ❌ | Get active projects (public) |
| GET | `/api/projects/admin` | ✅ | Get all projects (admin) |
| GET | `/api/projects/archived` | ✅ | Get archived projects |
| POST | `/api/projects` | ✅ | Create project |
| PUT | `/api/projects/:id` | ✅ | Update project |
| DELETE | `/api/projects/:id` | ✅ | Archive project (soft delete) |
| PATCH | `/api/projects/:id/restore` | ✅ | Restore archived project |
| DELETE | `/api/projects/:id/permanent` | ✅ | Permanently delete project |

### Contact / Messages
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/contact` | ❌ | Submit contact form |
| GET | `/api/contact` | ✅ | Get all messages |
| PATCH | `/api/contact/:id/read` | ✅ | Mark message as read |
| DELETE | `/api/contact/:id` | ✅ | Delete message |

### Content
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/content/:page` | ❌ | Get content by page (public) |
| GET | `/api/content` | ✅ | Get all content (admin) |
| PUT | `/api/content` | ✅ | Update content section |

### Upload
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/upload` | ✅ | Upload image |
| DELETE | `/api/upload/:filename` | ✅ | Delete image |

---

## 🗄️ Database Schema

### `users`
| Column | Type | Description |
|---|---|---|
| id | INT (PK) | Auto increment |
| name | VARCHAR(100) | Admin name |
| email | VARCHAR(100) | Unique email |
| password_hash | VARCHAR(255) | Bcrypt hashed password |
| role | ENUM('admin') | User role |
| created_at | TIMESTAMP | Created date |

### `messages`
| Column | Type | Description |
|---|---|---|
| id | INT (PK) | Auto increment |
| name | VARCHAR(255) | Sender name |
| email | VARCHAR(100) | Sender email |
| message | TEXT | Message content |
| is_read | TINYINT(1) | Read status |
| created_at | TIMESTAMP | Submitted date |

### `services`
| Column | Type | Description |
|---|---|---|
| id | INT (PK) | Auto increment |
| title | VARCHAR(255) | Service title |
| description | TEXT | Service description |
| use_cases | TEXT | Business value/use cases |
| icon | VARCHAR(100) | Emoji icon |
| order_index | INT | Display order |
| is_active | TINYINT(1) | Visibility on public site |
| created_at | TIMESTAMP | Created date |
| updated_at | TIMESTAMP | Last updated |
| deleted_at | TIMESTAMP | Soft delete timestamp |

### `projects`
| Column | Type | Description |
|---|---|---|
| id | INT (PK) | Auto increment |
| title | VARCHAR(255) | Project title |
| description | TEXT | Project description |
| technologies | VARCHAR(255) | Comma-separated tech stack |
| outcome | TEXT | Project outcome/result |
| image_url | VARCHAR(255) | Project image URL |
| project_url | VARCHAR(255) | Live project URL |
| order_index | INT | Display order |
| is_active | TINYINT(1) | Visibility on public site |
| created_at | TIMESTAMP | Created date |
| updated_at | TIMESTAMP | Last updated |
| deleted_at | TIMESTAMP | Soft delete timestamp |

### `content`
| Column | Type | Description |
|---|---|---|
| id | INT (PK) | Auto increment |
| page | VARCHAR(100) | Page name (home, about, contact) |
| section | VARCHAR(100) | Section key |
| value | TEXT | Content value |
| updated_at | TIMESTAMP | Last updated |

---

## ✨ Features

### Public Website
- Responsive on all screen sizes
- Scroll animations on all pages
- Dynamic services and projects from database
- Technology filter on Portfolio page (bonus)
- Contact form with frontend and backend validation

### Admin CMS
- JWT-secured login
- Live dashboard stats (messages, services, projects)
- Unread message alert on dashboard
- CRUD for services and projects
- Soft delete with archive and restore
- Contact message viewer with mark-as-read
- Dynamic content editor (edit website text without touching code)
- Toast notifications for all actions
- Loading states throughout

---

## 🎁 Bonus Features Implemented

- ✅ CMS/Admin dashboard
- ✅ Search/filter on Portfolio page
- ✅ Toast notifications
- ✅ Loading states
- ✅ Scroll animations
- ✅ Soft delete with archive system
- ✅ Dynamic content management

---

## 👤 Author

**Inoverse Technologies**
- Email: inovers.dev@gmail.com


---

## 📄 License

This project was developed as a final project for On-the-job Training.
All rights reserved © 2026 Inoverse Technologies.](https://github.com/gaylrr/inoverse-tech.git)
