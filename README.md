# 🎉 Event Management API

A robust, modular, and production-ready **Event Management RESTful API** built using **Node.js**, **Express**, **TypeScript**, and **PostgreSQL**. This backend system handles event creation, user registrations, and enforces rules such as duplicate prevention, capacity checks, and date validations.

---

## 🚀 Features

- 🔧 Create & List Events
- 👥 User management (create, list)
- ✅ Register & Cancel Event Registrations
- ⚠️ Enforce event constraints:
  - No past event registration
  - Max capacity: 1000 users
  - No duplicate registration
  - Only allow cancellation if already registered
- 📅 List Upcoming Events (sorted by date + location)
- 📊 Event Stats (total registered, seats left, % filled)
- 🧪 Zod input validation
- 📂 Clean, modular structure

---

## 📁 Folder Structure

```
📦EventManagementAPI
 ┣ 📁src
 ┣  ┣ 📁config              # DB connection
 ┣  ┣ 📁modules
 ┣  ┣    ┣ 📁user           # User-related logic
 ┣  ┣    ┣ 📁event          # Event-related logic
 ┣  ┣    ┣ 📁registration   # Event registration logic
 ┣  ┣ 📄server.ts           # Express server entry point
 ┣
 ┣ 📄.env.example
 ┗ 📄README.md
 
```

---

## 🛠️ Tech Stack

- **Node.js + Express**
- **TypeScript**
- **PostgreSQL** with `pg`
- **Zod** for input validation
- **pnpm** or `npm` for dependency management

---

## 🔧 Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Sanjay-Mudela/EventManagementAPI.git
   cd EventManagementAPI
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file based on the `.env.example` file:

   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_postgres_username
   DB_PASSWORD=your_postgres_password
   DB_NAME=event_management
   ```

4. **Create the PostgreSQL Database**
   Use pgAdmin or terminal to create a database named `event_management`.

5. **Start the Server**
   ```bash
   pnpm run dev
   # or
   npm run dev
   ```

---

## 📬 API Endpoints

### 👤 Users

* `POST /api/users/create` → Create a user  
  **Body**:
  ```json
  {
    "name": "Rohit Mishra",
    "email": "rohit@example.com"
  }
  ```

* `GET /api/users/all` → Get all users

---

### 📅 Events

* `POST /api/events/create` → Create an event  
  **Body**:
  ```json
  {
    "title": "Tech Fest",
    "eventDate": "2025-08-01",
    "location": "Bangalore",
    "capacity": 300
  }
  ```

* `GET /api/events/upcoming` → Get upcoming events  
* `GET /api/events/:id` → Get event details (with registered users)  
* `GET /api/events/:id/stats` → Get event registration stats  

---

### 🎫 Registrations

* `POST /api/registrations/register` → Register a user to an event  
  **Body**:
  ```json
  {
    "userId": 1,
    "eventId": 2
  }
  ```

* `DELETE /api/registrations/cancel` → Cancel a registration  
  **Body**:
  ```json
  {
    "userId": 1,
    "eventId": 2
  }
  ```

---

## ⚠️ Business Rules Enforced

* Cannot register for past events
* Cannot register more than once for same event
* Max 1000 capacity per event
* Can only cancel if already registered

---

## 🔒 Input Validation

Handled using **Zod schemas** in each module:

* Users: name + valid email
* Events: future date, string title/location, capacity 1–1000
* Registrations: numeric userId and eventId

---

## ✅ Status Codes

| Code | Meaning                   |
|------|---------------------------|
| 200  | OK                        |
| 201  | Created                   |
| 400  | Bad request / validation  |
| 404  | Not found                 |
| 409  | Conflict (e.g. duplicate) |
| 500  | Internal server error     |

---

## 📦 Sample `.env.example`

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_NAME=event_management
```

---

## 🧾 License

This project is open-source and available under the [MIT License](LICENSE).

---

## ✨ Author

**Sanjay Mudela**  
GitHub: [@Sanjay-Mudela](https://github.com/Sanjay-Mudela)

---

## 🎯 Status

✅ Complete, tested, and production-ready.
Use this as a base for a full-featured backend application with authentication and role-based access later.