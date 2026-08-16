# WorkSphere — Employee Management System (With Roles)

A **Node.js + Express** backend API for managing employees and departments with role-based access control (super_admin, admin, hr, employee). Includes JWT authentication, rate-limited password recovery, and OTP infrastructure (email + SMS) for future password-reset flows.

## Features

- **Authentication** — Register/login with hashed passwords (bcrypt) and JWT
- **Role-based access control** — `super_admin`, `admin`, `hr`, `employee` roles, with route guards for admin-only and admin/HR-only actions
- **Employee management** — Create, update, search by role, filter by age, get by ID, soft-delete/restore
- **Department management** — Create, update, search, public department listing, soft-delete/restore, with department "head" and budget tracking
- **Analytics endpoints** — Total employee count, employees per department, employees per role
- **Soft-delete** — Users, employees, and departments are flagged `isDeleted` with `deletedAt`/`restoredAt` timestamps instead of hard deletion
- **Rate limiting** — Dedicated limiters for forgot-password and reset-password requests
- **OTP infrastructure** — Email (Nodemailer) and SMS (Twilio) utilities in place for OTP-based flows (not yet wired into routes)
- **Static assets** — Serves a forms-page background image via a public endpoint

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 |
| Database | MongoDB with Mongoose |
| Auth | JWT (jsonwebtoken) + bcrypt |
| Email | Nodemailer |
| SMS/OTP | Twilio |
| Rate limiting | express-rate-limit |
| CORS | cors |
| Config | dotenv |
| Dev tooling | nodemon |

## Project Structure

```
Employee-Management-System-With-Roles/
├── controller/
│   ├── authController.js         # register, login
│   ├── departmentController.js   # department CRUD, search, soft-delete
│   └── employeeController.js     # employee CRUD, filters, analytics
├── middleware/
│   ├── auth.middleware.js        # JWT auth + role guards (isAdmin, isAdminOrhr)
│   └── rateLimiter.js            # forgot/reset password rate limiters
├── models/
│   ├── userModels.js             # name, email, role, OTP fields, soft-delete
│   ├── employeeModels.js         # user ref, designation, department, salary
│   └── departmentModels.js       # name, head (employee ref), budget, location
├── router/
│   ├── authRouter.js
│   ├── departmantRouter.js
│   └── employeeRouter.js
├── utils/
│   ├── Email.js                  # Nodemailer setup
│   ├── emailTemplates.js         # email templates
│   ├── generateOTP.js            # OTP generation
│   └── sendOTPViaSMS.js          # Twilio SMS sending
├── public/images/                # static assets (forms page background)
├── assets/logo/                  # WorkSphere logo
└── server.js                     # app entry point
```

## Getting Started

### Prerequisites

- Node.js installed
- A MongoDB connection URI (local or MongoDB Atlas)
- (Optional, for OTP features) Nodemailer-compatible email credentials and a Twilio account

### Installation

```bash
git clone https://github.com/M-Hussain921/Employee-Management-System-With-Roles.git
cd Employee-Management-System-With-Roles
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Email (for OTP / notifications)
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password

# Twilio (for SMS OTP)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_number
```

### Run the Server

```bash
npm start
```

The API will start at `http://localhost:<PORT>`.

## API Endpoints

### Auth — `/api/auth`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/user/register` | Register a new user (name, email, password, age, role, phoneNumber) |
| POST | `/api/auth/user/login` | Login and receive a JWT token |

### Employees — `/api/user` *(requires auth)*

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/user/create-employee` | admin/hr | Create an employee record |
| POST | `/api/user/create-employee-full` | admin/hr | Create employee with full details |
| GET | `/api/user/all-employee` | any authenticated | List all employees |
| GET | `/api/user/employee-role` | admin/hr | Search employees by role |
| GET | `/api/user/employee-age` | admin/hr | Filter employees by age |
| GET | `/api/user/total-employees` | admin/hr | Total employee count |
| GET | `/api/user/employees-per-department` | admin/hr | Employee count per department |
| GET | `/api/user/employees-per-role` | admin/hr | Employee count per role |
| GET | `/api/user/:id` | any authenticated | Get user by ID |
| GET | `/api/user/employee/:id` | any authenticated | Get employee by ID |
| PUT | `/api/user/update-employee/:id` | admin/hr | Update employee record |
| PUT | `/api/user/update/:id` | any authenticated | Update user |
| PUT | `/api/user/edit-user/:id` | any authenticated | Edit user |
| DELETE | `/api/user/delete-employee/:id` | admin | Soft-delete an employee |
| DELETE | `/api/user/delete-user/:id` | admin | Soft-delete a user |

### Departments — `/api/department`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/department/all-department` | authenticated | List all departments |
| GET | `/api/department/public-department` | public | Public department listing |
| POST | `/api/department/create-department` | admin/hr | Create a department |
| GET | `/api/department/:id` | admin/hr | Get department by ID |
| GET | `/api/department/` | admin/hr | Search departments |
| PUT | `/api/department/:id` | admin/hr | Update a department |
| DELETE | `/api/department/:id` | admin | Soft-delete a department |

### Misc

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/forms-page-image` | Returns URL of the forms-page background image |

**Auth header for protected routes:**
```
Authorization: Bearer <your_jwt_token>
```

## Data Models

**User** — `name`, `email` (unique), `password` (hashed), `phoneNumber`, `age`, `role` (`super_admin` | `admin` | `hr` | `employee`), `otp`, `otpExpire`, `otpAttempts`, `isDeleted`, `deletedAt`, `restoredAt`

**Employee** — `user` (ref), `designation`, `department` (ref), `salary`, `isDeleted`, `deletedAt`, `restoredAt`

**Department** — `name` (unique), `head` (ref to Employee), `budget`, `location`, `isDeleted`, `deletedAt`, `restoredAt`


## License

ISC

## Author

[M-Hussain921](https://github.com/M-Hussain921)
