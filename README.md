# JWT-Authentication System

## Introduction

This authentication system is built with **Node.js** and **Express.js** using **JWT (JSON Web Tokens)** for secure user authentication and session management. It includes essential features like user registration, login, email verification, and password recovery. Emails are sent using the **Gmail SMTP server**, and the system is optimized for scalability, reliability, and easy deployment on **Vercel servers**.

## Why Use This System?

- **Secure**: Implements JWT for stateless and secure authentication.
- **User-friendly**: Provides easy-to-use endpoints for common authentication tasks.
- **Scalable**: Designed to integrate seamlessly into modern web applications.
- **Deployable**: Simple to set up and deploy on Vercel for fast and reliable hosting.

---

## How to Use It

Below are the available endpoints and their functionalities:

### Endpoints:

#### 1. **Register**

**Endpoint**: `/register`\
**Description**: Registers a new user.\
**Required Data**: `username`, `email`, `password` (as JSON payload).

#### 2. **Login**

**Endpoint**: `/login`\
**Description**: Logs in a user and returns a JWT token.\
**Required Data**: `email`, `password` (as JSON payload).

#### 3. **Verify Token**

**Endpoint**: `/verify`\
**Description**: Verifies the JWT token to ensure the user is authenticated.\
**Required Data**: `token` (passed as JSON payload).

#### 4. **Send Verification Email**

**Endpoint**: `/send-verify-email`\
**Description**: Sends an email to verify the user's email ID.\
**Required Data**: `email`, `username` (as JSON payload).

#### 5. **Verify Email**

**Endpoint**: `/verifing`\
**Description**: Verifies the user's email by processing the secret and email ID sent in the URL parameters.\
**Required Data**: `secret`, `email` (in URL params).

#### 6. **Send Recovery Email**

**Endpoint**: `/send-recovery-email`\
**Description**: Sends an email for password recovery.\
**Required Data**: `email` (as JSON payload).

#### 7. **Recover Password**

**Endpoint**: `/recovering`\
**Description**: Updates the user's password by processing the secret, email ID, and new password sent in the URL parameters.\
**Required Data**: `secret`, `email`, `new-password` (in URL params).

---

## Deployment

This system is ready for deployment on **Vercel servers**. Simply upload your project, configure environment variables (e.g., JWT secret, Gmail credentials), and start your server to get it running.



