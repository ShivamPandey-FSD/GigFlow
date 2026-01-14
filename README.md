# GigFlow

GigFlow is a simple freelance marketplace application where users can post jobs (gigs) and apply for them by submitting bids. The platform focuses on clean architecture, secure authentication, and reliable hiring logic.

---

## 📌 Overview

- Users can create job postings (gigs)
- Other users can browse gigs and place bids
- Gig owners can review bids and hire one freelancer
- Only one bid can be hired per gig

---

## 🛠 Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Redux Toolkit

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Mongoose)

### Authentication
- JWT with HttpOnly cookies

---

## ✨ Features

### Authentication
- User registration and login
- Secure JWT-based authentication
- Flexible roles (any user can post or bid)

### Gig Management
- Create gigs with title, description, and budget
- Browse all open gigs
- Search gigs by title

### Bidding & Hiring
- Freelancers can place bids with price and message
- Gig owners can view all bids
- One bid can be hired per gig
- When a bid is hired:
  - Gig status changes to `assigned`
  - Selected bid becomes `hired`
  - Remaining bids are marked as `rejected`

---

## 📡 API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Gigs
- `GET /api/gigs`
- `POST /api/gigs`

### Bids
- `POST /api/bids`
- `GET /api/bids/:gigId`

### Hiring
- `PATCH /api/bids/:bidId/hire`

---

## 🗄 Database Models

### User
- name
- email
- password

### Gig
- title
- description
- budget
- ownerId
- status (`open`, `assigned`)

### Bid
- gigId
- freelancerId
- message
- status (`pending`, `hired`, `rejected`)

---

## ⭐ Extras

- Atomic hiring logic using MongoDB transactions
- Real-time notifications using Socket.io

---

## ⚙️ Environment Variables

Create a `.env` file using the following example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## 🚀 Running the Project
```
# Backend
npm install
npm run dev

# Frontend
npm install
npm run dev
```

## 👤 Author

- Shivam Pandey
