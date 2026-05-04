# Inoverse Technologies — Company Website

A professional full-stack company website for **Inoverse Technologies**, a software engineering company specializing in custom systems development. Built with React JS, Node.js, Express.js, and MySQL.

---

## 📌 Project Overview

Inoverse Technologies is a full-stack web application that includes:

- A responsive, animated multi-page public website
- A functional contact form with validation that saves to the database
- A full Admin CMS panel with JWT authentication
- CRUD management for services, projects, messages, and content
- Soft delete with archive and restore functionality
- Dynamic content management — edit website text from the admin panel without touching code
- Image upload via Multer with blurred background preview
- Toast notifications, loading states, and scroll animations throughout
- Email notifications via Nodemailer when contact form is submitted
- Gmail reply deep-link integration in admin messages

---

## 🛠️ Technologies Used

### Frontend
| Technology | Purpose |
|---|---|
| React JS | Component-based UI library |
| React Router | Client-side routing |
| Redux Toolkit | Global state management |
| Axios | HTTP client for API requests |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations and transitions on Login page |
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
| helmet | Security headers |
| cors | Cross-origin resource sharing |
| morgan | HTTP request logging |
| express-rate-limit | Rate limiting for API routes |

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
│   ├── public/
│   │   ├── logo.png                  # Company logo
│   │   └── hero-3d.gif               # Hero section 3D animation
│   ├── src/
│   │   ├── admin/                    # CMS admin pages
│   │   │   ├── Login.jsx             # Split-layout admin login with Framer Motion
│   │   │   ├── Dashboard.jsx         # Live stats + real-time clock + recent messages
│   │   │   ├── AdminServices.jsx     # Services CRUD (card grid)
│   │   │   ├── AdminProjects.jsx     # Projects CRUD (card grid + image upload)
│   │   │   ├── AdminMessages.jsx     # Contact inbox + Gmail reply
│   │   │   ├── AdminContent.jsx      # Page content editor
│   │   │   └── AdminArchive.jsx      # Restore / permanent delete
│   │   ├── api/
│   │   │   └── axiosInstance.js      # Axios with JWT interceptor
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Responsive navbar with hamburger menu
│   │   │   ├── Footer.jsx            # Footer with quick links and contact info
│   │   │   ├── Animate.jsx           # Scroll animation components (FadeUp, SlideLeft, etc.)
│   │   │   ├── ProjectCard.jsx       # Split-layout project card
│   │   │   ├── ServiceCard.jsx       # Glassmorphism service card
│   │   │   ├── Spinner.jsx           # Loading spinner
│   │   │   └── Toast.jsx             # Toast notification with progress bar
│   │   ├── hooks/
│   │   │   ├── useScrollAnimation.js # Intersection Observer hook
│   │   │   └── useToast.js           # Toast state management hook
│   │   ├── layouts/
│   │   │   ├── MainLayout.jsx        # Public layout with Navbar + Footer
│   │   │   └── AdminLayout.jsx       # Admin layout with dark sidebar + topbar
│   │   ├── pages/                    # Public pages
│   │   │   ├── Home.jsx              # Hero, count-up stats, services, tech, portfolio preview
│   │   │   ├── About.jsx             # Mission, vision, core values, why choose us
│   │   │   ├── Services.jsx          # Dynamic services from DB
│   │   │   ├── Technologies.jsx      # Full tech stack grouped by category
│   │   │   ├── Portfolio.jsx         # Split-card layout with technology filter
│   │   │   ├── Contact.jsx           # Split layout contact form with success modal
│   │   │   └── NotFound.jsx          # 404 page
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx    # JWT route guard
│   │   └── store/                    # Redux store
│   │       ├── store.js
│   │       └── slices/
│   │           ├── authSlice.js      # Login, logout, token management
│   │           ├── servicesSlice.js  # Services state + CRUD thunks
│   │           ├── projectsSlice.js  # Projects state + CRUD + archive/restore thunks
│   │           ├── messagesSlice.js  # Messages state + mark read + delete thunks
│   │           └── toastSlice.js     # Toast notification state
│   ├── index.html
│   ├── index.css                     # Tailwind + custom CSS animations
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   │   ├── db.js                     # Sequelize connection pool
│   │   ├── mailer.js                 # Nodemailer SMTP setup
│   │   └── multer.js                 # Multer disk storage config
│   ├── controllers/
│   │   ├── authController.js         # Login, me
│   │   ├── contactController.js      # Submit, getAll, markRead, remove
│   │   ├── contentController.js      # getByPage, getAll, update (upsert)
│   │   ├── projectsController.js     # CRUD + soft delete + restore
│   │   ├── servicesController.js     # CRUD + soft delete + restore
│   │   └── uploadController.js       # Upload image + delete
│   ├── middleware/
│   │   └── auth.js                   # JWT authenticate middleware
│   ├── models/
│   │   └── index.js                  # Sequelize models (all 5 tables)
│   ├── routes/
│   │   ├── auth.js                   # /api/auth
│   │   ├── contact.js                # /api/contact
│   │   ├── content.js                # /api/content
│   │   ├── projects.js               # /api/projects
│   │   ├── services.js               # /api/services
│   │   └── upload.js                 # /api/upload
│   ├── scripts/
│   │   └── createAdmin.js            # One-time admin seeder script
│   ├── uploads/                      # Uploaded images stored here
│   ├── .env                          # Environment variables (never commit)
│   ├── schema.sql                    # Database schema
│   └── server.js                     # Express app entry point
│
├── .gitignore
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
git clone https://github.com/gaylrr/inoverse-tech.git
cd inoverse-tech
```

---

### 2. Database Setup

Open MySQL and create the database:

```sql
CREATE DATABASE inoverse_db;
```

Import the schema:

```bash
mysql -u root -p inoverse_db < backend/schema.sql
```

Run the ALTER statements for soft delete columns:

```sql
USE inoverse_db;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP NULL DEFAULT NULL;
ALTER TABLE services ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP NULL DEFAULT NULL;
```

Seed default content:

```sql
USE inoverse_db;

INSERT INTO services (title, description, use_cases, icon, order_index) VALUES
('Custom Web Development', 'We build responsive and scalable web applications tailored to your business processes.', 'Improves accessibility and operational efficiency.', '🌐', 1),
('System Development', 'End-to-end system development for managing workflows, records, and operations.', 'Reduces manual processes and improves data handling.', '⚙️', 2),
('API Development', 'We create secure and scalable APIs that connect systems and enable integrations.', 'Ensures smooth communication between applications.', '🔌', 3),
('Database Design', 'Structured database solutions with optimized performance and proper relationships.', 'Ensures data integrity, speed, and scalability.', '🗄️', 4);

INSERT INTO projects (title, description, technologies, outcome, order_index) VALUES
('Dory Delivery Platform', 'A multi-platform delivery ecosystem designed to connect customers, riders, and merchants in a unified system.', 'React, Node.js, Express.js, MySQL', 'Streamlined delivery operations through role-based system architecture.', 1),
('Dory Delivery — Customer App', 'A customer-facing application for browsing, ordering, and tracking deliveries.', 'React Native, Node.js, MySQL', 'Improved user experience for order placement and real-time tracking.', 2),
('Dory Rider — Rider App', 'A mobile application designed for delivery riders to manage tasks and navigation.', 'React Native, Node.js, MySQL', 'Optimized delivery routing and task management for riders.', 3),
('Dory Merchant — Merchant App', 'A platform for merchants to manage products, orders, and sales.', 'React, Node.js, Express.js, MySQL', 'Enabled efficient order processing and inventory control.', 4),
('DOREX Logistics', 'A logistics management system designed for large-scale shipment tracking.', 'React, Node.js, Express.js, MySQL', 'Improved nationwide logistics visibility and operational tracking.', 5),
('Agenxure — Agent Management System', 'A structured system for managing agents, performance tracking, and task distribution.', 'React, Node.js, Express.js, MySQL', 'Enhanced agent productivity and centralized monitoring.', 6),
('Whatahotel — Mobile App', 'A hotel browsing and booking mobile application.', 'React Native, Node.js, MySQL', 'Simplified hotel discovery and reservation process.', 7),
('DorTel — Hotel Booking Platform', 'A full hotel booking system currently under development.', 'React, Node.js, Express.js, MySQL', 'Aims to provide an end-to-end hotel reservation and management platform.', 8),
('TaraText PH — SMS Service System', 'A messaging platform designed for SMS-based communication services.', 'Node.js, Express.js, MySQL', 'Provides scalable SMS communication for businesses and notifications.', 9);

INSERT INTO content (page, section, value) VALUES
('home', 'hero_title', 'Engineering Systems That Work'),
('home', 'hero_subtitle', 'Inoverse Technologies builds scalable web and software solutions designed to streamline operations, improve efficiency, and support long-term growth.'),
('home', 'cta_title', 'Have an idea?'),
('home', 'cta_subtitle', 'Let''s turn it into a working system.'),
('about', 'company_description', 'Inoverse Technologies focuses on delivering efficient and reliable software solutions. Our approach is centered on understanding real-world problems and translating them into structured digital systems.'),
('about', 'mission', 'To develop scalable and functional software solutions that help organizations adapt to evolving technologies and improve workflows in a rapidly changing digital landscape.'),
('about', 'vision', 'To power organizations with solutions that drive growth, innovation, and long-term relevance.'),
('about', 'core_values', 'Functionality First, Clarity in Design, Scalability, Reliability'),
('about', 'why_choose_us', 'We focus on building systems that are practical and usable, easy to maintain, and structured for long-term growth.'),
('contact', 'email', 'inovers.dev@gmail.com'),
('contact', 'phone', '0999 570 7957'),
('contact', 'location', 'Urdaneta City, Pangasinan, PH'),
('contact', 'response_time', 'We typically respond within 24 hours on business days.');
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
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=inoverse_db

JWT_SECRET=your_jwt_secret_key_make_it_long
JWT_EXPIRES_IN=8h

FRONTEND_URL=http://localhost:5173

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
MAIL_FROM_NAME=Inoverse Technologies
```

> For `SMTP_PASS` — go to Google Account → Security → 2-Step Verification → App Passwords → Generate one for Mail.

Start the backend:

```bash
npm run dev
```

Create the default admin user (run once only):

```bash
node scripts/createAdmin.js
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

### 5. Access on Mobile (same WiFi)

Find your computer's IP:
```bash
ipconfig   # Windows
```

Open on your phone: `http://YOUR_IP:5173`

---

## 🌐 Public Pages

| Route | Page | Key Features |
|---|---|---|
| `/` | Homepage | Hero with 3D GIF, count-up stats, services preview, tech badges, portfolio preview |
| `/about` | About Us | Mission, vision, core values, why choose us |
| `/services` | Services | Dynamic from DB, glassmorphism cards |
| `/technologies` | Tech Stack | Full stack grouped by category |
| `/portfolio` | Portfolio | Split-card layout, technology filter, animated |
| `/contact` | Contact | Split layout, validation, success modal, toast |
| `*` | 404 | Styled not found page |

---

## 🔐 Admin Panel

| URL | Page | Description |
|---|---|---|
| `/admin/login` | Login | Split layout, JWT auth, show/hide password, Framer Motion |
| `/admin/dashboard` | Dashboard | Live counts, real-time clock, recent messages, quick actions |
| `/admin/services` | Services | Card grid, CRUD, active/inactive toggle, archive |
| `/admin/projects` | Projects | Card grid, image upload, CRUD, archive |
| `/admin/messages` | Messages | Inbox, Gmail reply, copy email, mark read, delete |
| `/admin/content` | Content | Edit page text for Home, About, Contact |
| `/admin/archive` | Archive | Restore or permanently delete archived items |

### Default Admin Credentials
```
Email:    admin@inoverse.com
Password: Admin@1234
```
> ⚠️ Change these credentials after first login.

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | ❌ | Admin login — returns JWT token |
| GET | `/api/auth/me` | ✅ | Get current user info |

### Services
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/services` | ❌ | Active services (public) |
| GET | `/api/services/admin` | ✅ | All services including inactive |
| GET | `/api/services/archived` | ✅ | Soft-deleted services |
| POST | `/api/services` | ✅ | Create service |
| PUT | `/api/services/:id` | ✅ | Update service |
| DELETE | `/api/services/:id` | ✅ | Soft delete (archive) |
| PATCH | `/api/services/:id/restore` | ✅ | Restore archived service |

### Projects
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/projects` | ❌ | Active projects (public) |
| GET | `/api/projects/admin` | ✅ | All projects including inactive |
| GET | `/api/projects/archived` | ✅ | Soft-deleted projects |
| POST | `/api/projects` | ✅ | Create project |
| PUT | `/api/projects/:id` | ✅ | Update project |
| DELETE | `/api/projects/:id` | ✅ | Soft delete (archive) |
| PATCH | `/api/projects/:id/restore` | ✅ | Restore archived project |

### Contact / Messages
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/contact` | ❌ | Submit contact form |
| GET | `/api/contact` | ✅ | Get all messages |
| PATCH | `/api/contact/:id/read` | ✅ | Mark as read |
| DELETE | `/api/contact/:id` | ✅ | Delete message |

### Content
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/content/:page` | ❌ | Get content by page (public) |
| GET | `/api/content` | ✅ | Get all content entries |
| PUT | `/api/content` | ✅ | Create or update content section |

### Upload
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/upload` | ✅ | Upload image — returns URL |
| DELETE | `/api/upload/:filename` | ✅ | Delete uploaded image |

---

## 🗄️ Database Schema

### `users`
| Column | Type | Description |
|---|---|---|
| id | INT PK | Auto increment |
| name | VARCHAR(100) | Admin name |
| email | VARCHAR(150) | Unique email |
| password_hash | VARCHAR(255) | Bcrypt hashed password |
| role | ENUM('admin') | User role |
| created_at | TIMESTAMP | Created date |

### `services`
| Column | Type | Description |
|---|---|---|
| id | INT PK | Auto increment |
| title | VARCHAR(150) | Service title |
| description | TEXT | Service description |
| use_cases | TEXT | Business value / use cases |
| icon | VARCHAR(100) | Emoji icon |
| order_index | INT | Display order |
| is_active | BOOLEAN | Visible on public site |
| deleted_at | TIMESTAMP | Soft delete timestamp |
| created_at | TIMESTAMP | Created date |
| updated_at | TIMESTAMP | Last updated |

### `projects`
| Column | Type | Description |
|---|---|---|
| id | INT PK | Auto increment |
| title | VARCHAR(150) | Project title |
| description | TEXT | Project description |
| technologies | VARCHAR(255) | Comma-separated tech stack |
| outcome | TEXT | Project result or impact |
| image_url | VARCHAR(255) | Uploaded image URL |
| project_url | VARCHAR(255) | Live project URL |
| order_index | INT | Display order |
| is_active | BOOLEAN | Visible on public site |
| deleted_at | TIMESTAMP | Soft delete timestamp |
| created_at | TIMESTAMP | Created date |
| updated_at | TIMESTAMP | Last updated |

### `messages`
| Column | Type | Description |
|---|---|---|
| id | INT PK | Auto increment |
| name | VARCHAR(100) | Sender name |
| email | VARCHAR(150) | Sender email |
| message | TEXT | Message content |
| is_read | BOOLEAN | Read status |
| created_at | TIMESTAMP | Submitted date |

### `content`
| Column | Type | Description |
|---|---|---|
| id | INT PK | Auto increment |
| page | VARCHAR(50) | Page name (home, about, contact) |
| section | VARCHAR(100) | Section key (hero_title, mission, etc.) |
| value | TEXT | Editable content value |
| updated_at | TIMESTAMP | Last updated |

---

## ✨ Features Summary

### Public Website
- ✅ Fully responsive on all screen sizes (mobile, tablet, desktop)
- ✅ Scroll animations — FadeUp, SlideLeft, SlideRight, ScaleUp, StaggerContainer
- ✅ Hero with dot pattern background, 3D GIF, glassmorphism frame
- ✅ Count-up stats animation (0 → target on scroll into view)
- ✅ Services preview with large emoji icons and glassmorphism cards
- ✅ Technology badges grouped by category
- ✅ Portfolio split-card layout (image left, dark blue panel right)
- ✅ Technology filter on Portfolio page (bonus feature)
- ✅ Dynamic content from database via CMS
- ✅ Contact form with frontend + backend validation
- ✅ Contact form success modal popup
- ✅ Email notification via Nodemailer on contact submission
- ✅ Gmail reply deep-link integration in admin messages

### Admin CMS
- ✅ JWT-secured login with show/hide password toggle
- ✅ Split-layout login (dark branding panel + cream form panel)
- ✅ Framer Motion animations on login page
- ✅ Live dashboard stats with real-time clock
- ✅ Unread message alert banner on dashboard
- ✅ Recent messages preview on dashboard
- ✅ Dark sidebar with active state highlighting
- ✅ CRUD for Services (card grid view)
- ✅ CRUD for Projects (card grid with image upload + blurred preview)
- ✅ Soft delete → archive → restore system
- ✅ Confirm modals for all destructive actions
- ✅ Contact inbox with Gmail reply + copy email button
- ✅ Content editor for Home, About, Contact page text
- ✅ Toast notifications for every action
- ✅ Loading states throughout

### Bonus Features
- ✅ CMS / Admin dashboard with live data
- ✅ Technology filter on Portfolio page
- ✅ Toast notifications (Redux-powered)
- ✅ Loading states and spinners
- ✅ Scroll animations (Intersection Observer API)
- ✅ Soft delete with archive and restore system
- ✅ Dynamic content management (no-code editing)
- ✅ Gmail reply deep-link in Messages
- ✅ Real-time clock on Dashboard
- ✅ Unread message count badge
- ✅ Image upload with blurred background preview

---

## 🎨 Color Palette

| Name | Hex | Usage |
|---|---|---|
| Citrus Zest | `#FFA62B` | Primary accent, CTA buttons, highlights |
| Sea Breeze | `#86C5FF` | Secondary accent, sidebar text |
| Amalfi Tile | `#2E5AA7` | Navbar, headings, dark panels |
| Cream Gelato | `#F8E6A0` | Page backgrounds, card fills |

---

## 👤 Author

**Inoverse Technologies**
- Email: inovers.dev@gmail.com
- Phone: 0999 570 7957
- Location: Roxas, Isabela, PH

---

## 📄 License

This project was developed as a capstone / project submission.
All rights reserved © 2025 Inoverse Technologies.