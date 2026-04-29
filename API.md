# Inoverse Technologies — API Documentation

**Base URL:** `http://localhost:5000/api`  
**Version:** 1.0.0  
**Authentication:** Bearer Token (JWT)

---

## Table of Contents

1. [Authentication](#authentication)
2. [Services](#services)
3. [Projects](#projects)
4. [Contact / Messages](#contact--messages)
5. [Content](#content)
6. [Upload](#upload)
7. [Error Responses](#error-responses)

---

## Authentication

All protected routes require a Bearer token in the request header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens are valid for **8 hours**.

---

### POST `/api/auth/login`

Authenticate as admin and receive a JWT token.

**Auth Required:** 

**Request Body:**
```json
{
  "email": "admin@inoverse.com",
  "password": "Admin@1234"
}
```

**Success Response — `200 OK`:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "Inoverse Admin",
      "email": "admin@inoverse.com"
    }
  }
}
```

**Error Response — `401 Unauthorized`:**
```json
{
  "success": false,
  "message": "Invalid credentials."
}
```

---

### GET `/api/auth/me`

Get the currently authenticated user's info.

**Auth Required:**

**Success Response — `200 OK`:**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "email": "admin@inoverse.com",
        "role": "admin",
        "iat": 1777431847,
        "exp": 1777460647
    }
}
```

---

## Services

### GET `/api/services`

Get all **active** services for the public website.

**Auth Required:** 

**Success Response — `200 OK`:**
```json
{
  "success": true,
  "data": [
            {
            "id": 2,
            "title": "Custom Web Development",
            "description": "We build responsive and scalable web applications tailored to your business processes.",
            "use_cases": "Improves accessibility and operational efficiency.",
            "icon": "🌐",
            "order_index": 1,
            "is_active": true,
            "created_at": "2026-04-28T07:42:10.000Z",
            "updated_at": "2026-04-28T07:42:10.000Z",
            "deleted_at": null
        }
  ]
}
```

---

### GET `/api/services/admin`

Get all services including inactive ones (for admin panel).

**Auth Required:** 

**Success Response — `200 OK`:**
```json
{
  "success": true,
  "data": [ ...all services including inactive... ]
}
```

---

### GET `/api/services/archived`

Get all soft-deleted (archived) services.

**Auth Required:** 

**Success Response — `200 OK`:**
```json
{
  "success": true,
  "data": [
    {
      "id": 3,
      "title": "Old Service",
      "deleted_at": "2025-06-01T10:00:00.000Z"
    }
  ]
}
```

---

### POST `/api/services`

Create a new service.

**Auth Required:** ✅

**Request Body:**
```json
{
  "title": "Web Development",
  "description": "Modern, responsive websites and web applications.",
  "use_cases": "Company websites, e-commerce, landing pages.",
  "icon": "🌐",
  "order_index": 2
}
```

**Success Response — `201 Created`:**
```json
{
  "success": true,
  "message": "Service created.",
  "id": 5
}
```

**Error Response — `400 Bad Request`:**
```json
{
  "success": false,
  "message": "Title and description are required."
}
```

---

### PUT `/api/services/:id`

Update an existing service.

**Auth Required:** ✅

**URL Parameter:** `id` — Service ID

**Request Body:**
```json
{
  "title": "Web Development",
  "description": "Updated description.",
  "use_cases": "Updated use cases.",
  "icon": "🌐",
  "order_index": 2,
  "is_active": true
}
```

**Success Response — `200 OK`:**
```json
{
  "success": true,
  "message": "Service updated."
}
```

---

### DELETE `/api/services/:id`

Soft delete (archive) a service. The service is hidden from the public site but can be restored.

**Auth Required:** ✅

**URL Parameter:** `id` — Service ID

**Success Response — `200 OK`:**
```json
{
  "success": true,
  "message": "Service archived."
}
```

---

### PATCH `/api/services/:id/restore`

Restore an archived service.

**Auth Required:** ✅

**URL Parameter:** `id` — Service ID

**Success Response — `200 OK`:**
```json
{
  "success": true,
  "message": "Service restored."
}
```

---

### DELETE `/api/services/:id/permanent`

Permanently delete a service. **This action cannot be undone.**

**Auth Required:** ✅

**URL Parameter:** `id` — Service ID

**Success Response — `200 OK`:**
```json
{
  "success": true,
  "message": "Service permanently deleted."
}
```

---

## 📁 Projects

### GET `/api/projects`

Get all **active** projects for the public portfolio page.

**Auth Required:** ❌

**Success Response — `200 OK`:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Inventory Management System",
      "description": "A full-featured inventory system for retail businesses.",
      "technologies": "React, Node.js, MySQL",
      "outcome": "Reduced stock errors by 80%.",
      "image_url": "https://example.com/image.jpg",
      "project_url": "https://example.com",
      "order_index": 1,
      "is_active": true,
      "created_at": "2025-01-01T00:00:00.000Z",
      "updated_at": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### GET `/api/projects/admin`

Get all projects including inactive ones (for admin panel).

**Auth Required:** ✅

---

### GET `/api/projects/archived`

Get all soft-deleted (archived) projects.

**Auth Required:** ✅

---

### POST `/api/projects`

Create a new project.

**Auth Required:** ✅

**Request Body:**
```json
{
  "title": "HR Portal",
  "description": "Employee management system for mid-sized companies.",
  "technologies": "React, Express.js, MySQL",
  "outcome": "Streamlined HR processes for 200+ employees.",
  "image_url": "https://example.com/image.jpg",
  "project_url": "https://example.com",
  "order_index": 3
}
```

**Success Response — `201 Created`:**
```json
{
  "success": true,
  "message": "Project created.",
  "id": 10
}
```

---

### PUT `/api/projects/:id`

Update an existing project.

**Auth Required:** ✅

**URL Parameter:** `id` — Project ID

**Request Body:** _(same fields as POST, all optional)_

**Success Response — `200 OK`:**
```json
{
  "success": true,
  "message": "Project updated."
}
```

---

### DELETE `/api/projects/:id`

Soft delete (archive) a project.

**Auth Required:** ✅

**Success Response — `200 OK`:**
```json
{
  "success": true,
  "message": "Project archived."
}
```

---

### PATCH `/api/projects/:id/restore`

Restore an archived project.

**Auth Required:** ✅

**Success Response — `200 OK`:**
```json
{
  "success": true,
  "message": "Project restored."
}
```

---

### DELETE `/api/projects/:id/permanent`

Permanently delete a project. **This action cannot be undone.**

**Auth Required:** ✅

**Success Response — `200 OK`:**
```json
{
  "success": true,
  "message": "Project permanently deleted."
}
```

---

## ✉️ Contact / Messages

### POST `/api/contact`

Submit a contact form message. Saves to database and sends email notification.

**Auth Required:** ❌

**Request Body:**
```json
{
  "name": "Juan dela Cruz",
  "email": "juan@example.com",
  "message": "Hi, I want to inquire about your services."
}
```

**Validation Rules:**
- `name` — required
- `email` — required, must be valid email format
- `message` — required, minimum 10 characters

**Success Response — `201 Created`:**
```json
{
  "message": "Message sent successfully."
}
```

**Validation Error — `422 Unprocessable Entity`:**
```json
{
  "errors": [
    {
      "path": "email",
      "msg": "Invalid email address."
    }
  ]
}
```

---

### GET `/api/contact`

Get all contact form submissions.

**Auth Required:** ✅

**Success Response — `200 OK`:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Juan dela Cruz",
      "email": "juan@example.com",
      "message": "Hi, I want to inquire about your services.",
      "is_read": false,
      "created_at": "2025-06-01T10:00:00.000Z"
    }
  ]
}
```

---

### PATCH `/api/contact/:id/read`

Mark a message as read.

**Auth Required:** ✅

**URL Parameter:** `id` — Message ID

**Success Response — `200 OK`:**
```json
{
  "success": true,
  "message": "Marked as read."
}
```

---

### DELETE `/api/contact/:id`

Delete a contact message.

**Auth Required:** 

**URL Parameter:** `id` — Message ID

**Success Response — `200 OK`:**
```json
{
  "success": true,
  "message": "Message deleted."
}
```

---

## Content

### GET `/api/content/:page`

Get all content sections for a specific page. Used by public pages to load dynamic text.

**Auth Required:** 

**URL Parameter:** `page` — Page name (`home`, `about`, `contact`)

**Success Response — `200 OK`:**
```json
{
  "success": true,
  "data": {
    "hero_title": "Building Smart Software Solutions",
    "hero_subtitle": "Inoverse Technologies delivers custom systems...",
    "intro_title": "Who We Are",
    "intro_text": "Inoverse Technologies focuses on delivering..."
  }
}
```

---

### GET `/api/content`

Get all content entries across all pages (for admin panel).

**Auth Required:** ✅

**Success Response — `200 OK`:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "page": "home",
      "section": "hero_title",
      "value": "Building Smart Software Solutions",
      "updated_at": "2025-06-01T10:00:00.000Z"
    }
  ]
}
```

---

### PUT `/api/content`

Create or update a content section. Uses upsert — creates if not exists, updates if exists.

**Auth Required:** ✅

**Request Body:**
```json
{
  "page": "home",
  "section": "hero_title",
  "value": "Engineering Systems That Work"
}
```

**Success Response — `200 OK`:**
```json
{
  "success": true,
  "message": "Content updated."
}
```

**Error Response — `400 Bad Request`:**
```json
{
  "success": false,
  "message": "page, section and value are required."
}
```

---

## 📤 Upload

### POST `/api/upload`

Upload an image file. Returns the public URL of the uploaded image.

**Auth Required:** ✅

**Content-Type:** `multipart/form-data`

**Form Field:** `image` — The image file (jpg, png, etc.)

**Success Response — `200 OK`:**
```json
{
  "success": true,
  "message": "Image uploaded successfully.",
  "data": {
    "filename": "1234567890-photo.jpg",
    "url": "http://localhost:5000/uploads/1234567890-photo.jpg"
  }
}
```

**Error Response — `400 Bad Request`:**
```json
{
  "success": false,
  "message": "No file uploaded."
}
```

---

### DELETE `/api/upload/:filename`

Delete an uploaded image from the server.

**Auth Required:** ✅

**URL Parameter:** `filename` — The filename returned from upload

**Success Response — `200 OK`:**
```json
{
  "success": true,
  "message": "Image deleted."
}
```

**Error Response — `404 Not Found`:**
```json
{
  "success": false,
  "message": "File not found."
}
```

---

## ❌ Error Responses

### Common Error Codes

| Status Code | Meaning |
|---|---|
| `400` | Bad Request — missing or invalid fields |
| `401` | Unauthorized — missing or invalid token |
| `404` | Not Found — route or resource doesn't exist |
| `422` | Unprocessable Entity — validation failed |
| `500` | Internal Server Error — something went wrong on the server |

### `401 Unauthorized`
```json
{
  "message": "No token provided"
}
```

```json
{
  "message": "Invalid or expired token"
}
```

### `404 Not Found`
```json
{
  "success": false,
  "message": "Route not found."
}
```

### `500 Internal Server Error`
```json
{
  "success": false,
  "message": "Error message here"
}
```

---

## 🧪 Testing the API

You can test all endpoints using:
- **Postman** — Import the base URL and set the Authorization header
- **Thunder Client** (VS Code extension)
- **curl** from terminal

### Example curl — Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@inoverse.com","password":"Admin@1234"}'
```

### Example curl — Get Services (protected):
```bash
curl http://localhost:5000/api/services/admin \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

_Inoverse Technologies API Documentation — v1.0.0_