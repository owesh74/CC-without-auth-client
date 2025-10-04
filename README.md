# 🛠️ CoolCare: AC Service Booking Platform (Direct Booking Version)

**Live Demo:** https://my-coolcare.vercel.app/

This version of the CoolCare application is highly simplified, removing all complex user authentication (OTP/Signup) and mailing systems. It is optimized for direct public service booking and centralized Admin management.

---

## 🚀 Key Features

### Public Booking
- **Direct Booking:** Users can book a service instantly by providing just their name, contact details, date, and address.
- **Real-time Slot Check:** The form checks the availability of time slots (10:00 - 19:00) against existing bookings.
- **Simple Admin Access:** Secure, password-only login for management.
- **Mobile Optimized:** Responsive navigation with a hidden Admin entry point.

### Admin Dashboard (Protected)
- **Manage Bookings:** View customer name, contact number, address, and service details.
- **Status Control:** Update booking status (Pending, Assigned, Completed).
- **Service Management:** CRUD operations for services (Add, Delete).

---

## 📁 Repository Structure

This project is streamlined into two repositories:

| Component | Repository Link | Description |
|-----------|----------------|-------------|
| **Client (Frontend)** | [owesh74/CC-without-auth-client](https://github.com/owesh74/CC-without-auth-client) | React application focusing on public booking and admin UI. |
| **Server (Backend)** | [owesh74/CC-without-auth-ser](https://github.com/owesh74/CC-without-auth-ser) | Node.js backend handling API requests and database operations. |

> **Note:** Verify the server repository link is correct for your intended backend repository.

---

## ⚙️ Setup and Installation

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (to get your `MONGO_URI`)

### Step 1: Configure the Backend (Server)

1. **Clone your server repository:**
   ```bash
   git clone [YOUR_SERVER_REPO_LINK] coolcare/server
   cd coolcare/server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file and paste your credentials:**
   ```env
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_key_for_jwt

   # Admin Login Credentials (Used for password-only login)
   ADMIN_EMAIL=your_admin_email@gmail.com 
   ADMIN_PASS=your_admin_password
   ```

   > **Note:** The `EMAIL_USER` and `EMAIL_PASS` variables are kept, even though the OTP system is removed, as they are used to send new booking alerts to the admin.

4. **Start the server:**
   ```bash
   node server.js
   ```
   
   The server will confirm the Admin user and sample services are seeded.

### Step 2: Configure the Frontend (Client)

1. **Clone the client repository:**
   ```bash
   git clone https://github.com/owesh74/CC-without-auth-client.git coolcare/client
   cd coolcare/client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env.development` file and set the API URL:**
   ```env
   # Must be prefixed with REACT_APP_
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Start the frontend application:**
   ```bash
   npm start
   ```

---

## 🔒 Admin Access (Password Only)

Access to the Admin Dashboard is protected by a password only, visible only by manually navigating to the route.

| Feature | Details |
|---------|---------|
| **Login Page** | Manually navigate to `/admin-login` |
| **Credential** | Use the `ADMIN_PASS` from your server's `.env` file |
| **Dashboard** | After successful login, you are redirected to `/admin` |