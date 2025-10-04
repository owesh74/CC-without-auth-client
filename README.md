# 🛠️ CoolCare: AC Service Booking Platform

**Live Demo:** https://my-coolcare.vercel.app/

CoolCare is a streamlined AC service booking platform designed for direct public bookings with centralized admin management. No complex authentication required—just simple, efficient service scheduling.

---

## ✨ Features

### 🌐 Public Booking Interface
- **Instant Booking** - Book services with just name, contact, date, and address
- **Real-Time Availability** - Live slot checking for time slots between 10:00 AM - 7:00 PM
- **Responsive Design** - Optimized for all devices with intuitive navigation

### 🔐 Admin Dashboard
- **Booking Management** - View and manage all customer bookings in one place
- **Status Tracking** - Update booking status (Pending → Assigned → Completed)
- **Service Control** - Add and remove services with full CRUD operations
- **Secure Access** - Password-protected admin portal

---

## 📦 Project Architecture

This project is split into two repositories for clean separation of concerns:

| Component | Repository | Description |
|-----------|------------|-------------|
| **Frontend** | [CC-without-auth-client](https://github.com/owesh74/CC-without-auth-client) | React-based user interface for booking and admin management |
| **Backend** | [CC-without-auth-ser](https://github.com/owesh74/CC-without-auth-ser) | Node.js API server with MongoDB integration |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- MongoDB Atlas account
- Git

### Backend Setup

1. **Clone and navigate to the server repository:**
   ```bash
   git clone https://github.com/owesh74/CC-without-auth-ser.git
   cd CC-without-auth-ser
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   
   # Admin credentials
   ADMIN_PASS=your_secure_password
   ```

4. **Start the server:**
   ```bash
   node server.js
   ```
   
   The server will automatically seed the admin user and sample services.

### Frontend Setup

1. **Clone and navigate to the client repository:**
   ```bash
   git clone https://github.com/owesh74/CC-without-auth-client.git
   cd CC-without-auth-client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Create a `.env.development` file:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```
   
   The application will open at `http://localhost:3000`

---

## 🔑 Admin Access

The admin dashboard is password-protected and accessible through a dedicated route.

**Access Details:**
- **Login URL:** `/admin-login`
- **Credentials:** Use the `ADMIN_PASS` configured in your server `.env`
- **Dashboard:** Redirects to `/admin` upon successful authentication

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- React Router
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication

**Deployment:**
- Vercel (Frontend)
- Your preferred hosting (Backend)

---

## 📝 Environment Variables Reference

### Backend (.env)
```env
MONGO_URI          # MongoDB connection string
JWT_SECRET         # Secret key for JWT tokens
ADMIN_EMAIL        # Admin email address
ADMIN_PASS         # Admin password
```

### Frontend (.env.development)
```env
REACT_APP_API_URL  # Backend API URL
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📧 Support

For questions or support, please open an issue in the respective repository.