# 🚗 Vehicle Rental System

## 🎯 Project Overview

Vehicle Rental System is a backend API for managing vehicle rentals. It provides
functionality for:

- **Vehicles**: Manage vehicle inventory with availability tracking.
- **Customers**: Manage customer accounts and profiles.
- **Bookings**: Handle vehicle rentals, returns, and cost calculation.
- **Authentication**: Secure role-based access control with Admin and Customer
  roles.

## 🛠️ Technology Stack

- **Node.js + TypeScript**
- **Express.js** (Web Framework)
- **PostgreSQL** (Database)
- **bcrypt** (Password Hashing)
- **jsonwebtoken (JWT)** (Authentication)

## 📁 Code Structure

The project follows a **modular pattern** with clear separation of concerns. The
code is organized into feature-based modules such as:

- `auth` – Authentication routes and logic
- `users` – User management
- `vehicles` – Vehicle management
- `bookings` – Booking management

Each module contains:

- **Routes** – API endpoints
- **Controllers** – Business logic
- **Services/Repositories** – Database interactions

---

## 📊 Database Tables

### Users

| Field    | Notes                       |
| -------- | --------------------------- |
| id       | Auto-generated              |
| name     | Required                    |
| email    | Required, unique, lowercase |
| password | Required, min 6 characters  |
| phone    | Required                    |
| role     | 'admin' or 'customer'       |

### Vehicles

| Field               | Notes                       |
| ------------------- | --------------------------- |
| id                  | Auto-generated              |
| vehicle_name        | Required                    |
| type                | 'car', 'bike', 'van', 'SUV' |
| registration_number | Required, unique            |
| daily_rent_price    | Required, positive          |
| availability_status | 'available' or 'booked'     |

### Bookings

| Field           | Notes                                |
| --------------- | ------------------------------------ |
| id              | Auto-generated                       |
| customer_id     | Links to Users table                 |
| vehicle_id      | Links to Vehicles table              |
| rent_start_date | Required                             |
| rent_end_date   | Required, must be after start date   |
| total_price     | Required, positive                   |
| status          | 'active', 'cancelled', or 'returned' |

---

## 🔐 Authentication & Authorization

### User Roles

- **Admin**: Full system access – manage vehicles, users, and bookings
- **Customer**: Register, view vehicles, and manage own bookings

### Authentication Flow

- Passwords are hashed with **bcrypt** before storage.
- Users login via `/api/v1/auth/signin` and receive a **JWT token**.
- Protected endpoints require the token in the header:  
  `Authorization: Bearer <token>`
- System validates the token and checks user permissions.
- Unauthorized requests return `401` or `403`.

---

## 🌐 API Endpoints

### Authentication

| Method | Endpoint            | Access | Description                 |
| ------ | ------------------- | ------ | --------------------------- |
| POST   | /api/v1/auth/signup | Public | Register new user           |
| POST   | /api/v1/auth/signin | Public | Login and receive JWT token |

### Vehicles

| Method | Endpoint                    | Access | Description                                       |
| ------ | --------------------------- | ------ | ------------------------------------------------- |
| POST   | /api/v1/vehicles            | Admin  | Add new vehicle                                   |
| GET    | /api/v1/vehicles            | Public | View all vehicles                                 |
| GET    | /api/v1/vehicles/:vehicleId | Public | View specific vehicle                             |
| PUT    | /api/v1/vehicles/:vehicleId | Admin  | Update vehicle details                            |
| DELETE | /api/v1/vehicles/:vehicleId | Admin  | Delete vehicle (only if no active bookings exist) |

### Users

| Method | Endpoint              | Access       | Description                                       |
| ------ | --------------------- | ------------ | ------------------------------------------------- |
| GET    | /api/v1/users         | Admin        | View all users                                    |
| PUT    | /api/v1/users/:userId | Admin or Own | Update any user (Admin) or own profile (Customer) |
| DELETE | /api/v1/users/:userId | Admin        | Delete user (only if no active bookings exist)    |

### Bookings

| Method | Endpoint                          | Access         | Description                                                                         |
| ------ | --------------------------------- | -------------- | ----------------------------------------------------------------------------------- |
| POST   | /api/v1/bookings                  | Customer/Admin | Create booking, validate availability, calculate total price, update vehicle status |
| GET    | /api/v1/bookings                  | Role-based     | Admin: all bookings; Customer: own bookings                                         |
| PUT    | api/v1/bookings/return/:bookingId | Role-based     | Customer: cancel booking (before start date); Admin: mark as "returned"             |

---

## 📚 Additional Resources

- **API Reference** – Detailed endpoint documentation with request/response
  examples
- **Submission Guide** – Assignment submission requirements and deadlines

---

## ⚠️ Notes

- All API endpoint implementations must **exactly match** the specifications.
- Follow modular structure with proper layering (routes, controllers, services).
- Always validate data and user permissions before processing requests.
