# Job Portal Frontend

A React-based frontend for a full-stack Job Portal application powered by a secured Spring Boot REST API.

The application allows users to browse and search job opportunities while authenticated users can manage job posts through complete CRUD operations.

## Related Repository

Backend Repository:

[BACKEND_REPO_URL](https://github.com/Randomlyclueless/jobApplication-Spring)

The backend is built using Java, Spring Boot, Spring Security, Hibernate, and MySQL.

## Tech Stack

**Frontend:** React.js

**UI:** Material UI

**HTTP Client:** Axios

**Routing:** React Router

**Authentication State:** React Context API

**Backend Integration:** Spring Boot REST API

## Features

- User registration
- User login
- Authentication state management
- Protected routes
- Public job browsing
- Keyword-based job search
- Create job posts
- Edit job posts
- Delete job posts
- Responsive job cards
- Centralized Axios API configuration
- Material UI components
- Frontend-backend REST integration

## Application Flow

```text
Login / Register
       |
       v
Authentication Context
       |
       v
Centralized Axios Client
       |
       | HTTP Requests
       v
Spring Boot REST API
       |
       v
Spring Security
       |
       v
MySQL Database
```

## Authentication Flow

```text
User enters credentials
        |
        v
Login Component
        |
        v
AuthContext
        |
        v
Axios API Client
        |
        | HTTP Basic Authentication
        v
Spring Boot Backend
        |
        v
Spring Security verifies credentials
        |
        +---- Valid ----> Job Portal
        |
        +---- Invalid --> Login Error
```

Authentication state is managed centrally using React Context API.

The Axios client stores authentication configuration after a successful login and is reused by authenticated API requests.

## Authorization Flow

Public users can:

```text
View Jobs
Search Jobs
```

Authenticated users can:

```text
View Jobs
Search Jobs
Create Jobs
Edit Jobs
Delete Jobs
```

Protected routes prevent unauthenticated users from accessing job management pages.

## Project Structure

```text
src
|
├── api
│   └── api.js
|
├── context
│   └── AuthContext.jsx
|
├── components
│   ├── AllPosts.jsx
│   ├── AppLayout.jsx
│   ├── AuthenticatedRoute.jsx
│   ├── Create.jsx
│   ├── Edit.jsx
│   ├── Login.jsx
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   └── Register.jsx
|
├── App.js
├── index.js
└── index.css
```

## Centralized API Client

Axios configuration is maintained in:

```text
src/api/api.js
```

Instead of repeating the complete backend URL and authentication configuration in every component, requests use a centralized Axios instance.

Example:

```javascript
api.get("/jobPosts");

api.post("/jobPost", form);

api.put("/jobPost", form);

api.delete(`/jobPost/${id}`);
```

This keeps API communication consistent across the application.

## Job Management

### Browse Jobs

The application fetches job posts from:

```text
GET /jobPosts
```

Jobs are displayed as responsive Material UI cards.

### Search Jobs

Search requests are sent to:

```text
GET /jobPosts/keyword/{keyword}
```

The frontend uses a small delay before sending the request to avoid making an API call for every immediate keystroke.

### Create Jobs

Authenticated users can create job posts using:

```text
POST /jobPost
```

### Edit Jobs

Existing job information is fetched and populated into the edit form.

Updates are sent using:

```text
PUT /jobPost
```

### Delete Jobs

Authenticated users can remove job posts using:

```text
DELETE /jobPost/{postId}
```

The frontend immediately updates the displayed job list after successful deletion.

## Running Locally

### 1. Clone the frontend

```bash
git clone https://github.com/Randomlyclueless/job-portal-frontend.git
```

### 2. Navigate to the project

```bash
cd job-portal-frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the application

```bash
npm start
```

The frontend starts at:

```text
http://localhost:3000
```

## Backend Setup

The Spring Boot backend must be running before using the complete application.

Backend repository:

BACKEND_REPO_URL

The backend API runs locally at:

```text
http://localhost:8080
```

## Full-Stack Architecture

```text
React + Material UI
         |
         | Axios
         v
Spring Boot REST API
         |
         | Spring Security
         v
Service Layer
         |
         | Spring Data JPA / Hibernate
         v
MySQL
```

## Current Deployment Work

The application is currently being prepared for deployment.

The backend is being containerized using Docker, followed by cloud deployment and frontend hosting.

Once deployment is complete, the live application URL will be added here.

## Learning Journey

This frontend was integrated while building my Java backend development skills through:

```text
JDBC
  ↓
Hibernate
  ↓
Spring Boot
  ↓
REST APIs
  ↓
Spring Security
  ↓
Full-Stack React Integration
  ↓
Docker & Deployment
```

The project helped me understand not only how to build a React UI, but how authentication, protected routes, REST APIs, persistence, and frontend state work together in a complete application.

## Backend

The backend source code is available here:

BACKEND_REPO_URL

## Status

Core full-stack functionality is complete.

Docker containerization and cloud deployment are currently in progress.
