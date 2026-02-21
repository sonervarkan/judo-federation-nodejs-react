# Judo Federation Management System

A full-stack web application built with Node.js (Express) and React, powered by MariaDB, and deployed on AWS EC2 for public internet access.

This project is structured using industry-standard backend and frontend separation and follows production-ready deployment practices.

## Tech Stack
````
Backend

Node.js

Express.js

Sequelize ORM

MariaDB (MySQL compatible)

JWT Authentication

PM2 (Process Manager)

Frontend

React

Axios

Vite (Build tool)

Infrastructure

AWS EC2 (Amazon Linux 2023)

MariaDB Server

PM2 for process management

Public IPv4 deployment

Linux-based production environment
````

## Deployment

This project is deployed on:

AWS EC2 (t3.micro - Free Tier)

Publicly accessible via IPv4 address

Backend running on port 5000

Process managed using PM2

Production build served statically via Express

The server is configured to:

Automatically restart on reboot

Persist processes using pm2 startup and pm2 save

Run continuously in production mode

## Database

The project uses MariaDB (MySQL-compatible) installed directly on the EC2 instance.

Database setup includes:

Custom database creation

Dedicated database user

Privilege management

Secure local connection (localhost)

MariaDB was chosen because:

It is open-source

Fully compatible with MySQL

Stable for production use

## Environment Configuration

All sensitive information is stored securely inside a .env file.

This includes:

Database credentials

JWT secret keys

Admin credentials

Server configuration variables

The application injects environment variables using dotenv, ensuring:

No hardcoded secrets

Clean production setup

Secure configuration management

Safe GitHub repository (no exposed credentials)

### The .env file was excluded using .gitignore.

## Admin Account Initialization

The admin user is not hardcoded inside the application logic.

Instead, the admin account is created using a dedicated seeder script:

seeders/seed-admin.js

This ensures:

Clean separation of responsibilities

Controlled admin initialization

Re-runnable setup logic

Production-safe admin creation

## Project Structure
````
judo/
│
├── backend/
│   ├── server.js
│   ├── seeders/
│   ├── src/
│   ├── package.json
│   └── .env (ignored)
│
├── frontend/
│   ├── src/
│   ├── dist/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
````
## Installation (Development)
````
1️⃣ Backend
cd backend
npm install
npm start
2️⃣ Frontend
cd frontend
npm install
npm run dev
````
## Production Build

Frontend production build:
````
cd frontend
npm run build
````
The backend serves the production build using:

app.use(express.static(path.join(__dirname, "../frontend/dist")));
## Process Management (Production)

PM2 is used to ensure:

Auto-restart on crash

Auto-start on server reboot

Background process execution

Commands used:
````
pm2 start server.js --name judo-backend
pm2 startup
pm2 save
````
## Security Practices

SSH access secured with private key authentication

.pem files excluded from Git

.env file excluded from Git

Database restricted to localhost

JWT-based authentication

No hardcoded credentials

Dedicated database user

## Live Environment

The application is deployed on:

AWS EC2

Amazon Linux 2023

Public IPv4 accessible

MariaDB running locally

Node.js production runtime

## Key Production Features
````
✔ Deployed on AWS EC2
✔ MariaDB database installed on server
✔ Admin created via separate seeder file
✔ Environment variables injected securely
✔ Production build served via Express
✔ PM2 persistent process management
✔ Secure GitHub structure
````

## Author

Developed and deployed with full server configuration, database setup, and production optimization.
