
## Frontend `README.md`

```md
# Job Portal Frontend

A responsive React frontend for a full-stack Job Portal application.

The application provides an interface for users to browse, search, create, update, and delete job posts while integrating with a secured Spring Boot REST API.

## Tech Stack

- React.js
- JavaScript
- Material UI
- Axios
- React Router
- Context API

## Features

- User login
- User registration
- Authentication state management
- Protected frontend routes
- View all job posts
- Search jobs by keyword
- Create new job posts
- Edit existing job posts
- Delete job posts
- Responsive job card interface
- REST API integration
- Centralized Axios API configuration
- Guest browsing flow

## Authentication Flow

```text
User Login
    |
    v
Auth Context
    |
    v
Axios API Client
    |
    | HTTP Basic Authentication
    v
Spring Boot Backend
