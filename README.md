# 🎉 Event Management API

A robust and scalable **Event Management RESTful API** built with **Node.js**, **Express**, **TypeScript**, and **PostgreSQL**. This backend service allows organizers to create events and users to register or cancel registrations while enforcing smart business rules like capacity limits, duplicate prevention, and real-time validation.

---

## 🚀 Features

* 🔧 **Create Events** with validation on capacity and input types
* 🧾 **Retrieve Event Details**, including full user registration list
* ✅ **Register Users** for events with strict validation:
  * No duplicate registrations
  * Capacity enforcement (max 1000)
  * No registrations for past events
* ❌ **Cancel Registration** for users from an event
* 📅 **List Upcoming Events**, sorted by:
  * Closest date first
  * Location (alphabetically for ties)
* 📊 **Event Statistics** including:
  * Total registrations
  * Remaining capacity
  * Percentage filled

---

## 🧠 Business Logic Highlights

* Many-to-Many relationship between Users and Events via `registrations` table
* Prevents:
  * Double registration
  * Overbooking
  * Registration for past events
* Meaningful HTTP status codes and messages
* Zod validation for all inputs
* Efficient PostgreSQL queries
* Safe parameterized queries (prevents SQL injection)
* Ready for concurrent registration/cancellation

---

## 🛠️ Tech Stack

* **Backend**: Node.js, Express.js
* **Language**: TypeScript
* **Database**: PostgreSQL
* **Database Access**: `pg` library (no ORM)
* **Validation**: Zod
* **Tools**: pgAdmin (for DB management), Postman (for testing), pnpm (for package management)

---

## 📂 Project Structure

```
📦EventManagementAPI
 ┣ 📁src
    ┣ 📁config
    ┣ 📁controllers
    ┣ 📁models
    ┣ 📁routes
    ┣ 📁validators
    ┣ 📁middleware (optional)
 ┣ 📄server.ts
 ┣ 📄.env.example
 ┗ 📄README.md
 ┣ 📄.env.example
 ┗ 📄README.md
```

---

## 🔧 Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sanjay-Mudela/EventManagementAPI.git
   cd event-management-api
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Create PostgreSQL database**

   Create a database named `event_management` using pgAdmin or CLI.

   ```sql
   CREATE DATABASE event_management;
   ```

4. **Configure your `.env` file**

   Create `.env` from the example:

   ```bash
   cp .env.example .env
   ```

   Use the default values where applicable, or adjust them based on your setup:

   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_postgres_username
   DB_PASSWORD=your_postgres_password
   DB_NAME=event_management
   ```

5. **Start the development server**

   ```bash
   pnpm run dev
   ```

---

## 📬 API Endpoints

### ➕ `POST /api/events`
Create a new event  
✅ Validates inputs using Zod, returns event ID on success

### 📄 `GET /api/events/:id`
Fetch event details along with registered users

### 📝 `POST /api/events/:id/register`
Register a user for an event  
🚫 Fails if already registered, event is full, or event is in the past  
```json
{ "userId": 5 }
```

### ❌ `DELETE /api/events/:id/register`
Cancel a user’s registration  
⚠️ Error if the user wasn't registered  
```json
{ "userId": 5 }
```

### 📆 `GET /api/events/upcoming`
Returns all upcoming events  
🔃 Sorted by event date (ASC), then location (A–Z)

### 📊 `GET /api/events/:id/stats`
Returns event statistics:
* Total Registrations
* Remaining Capacity
* % of capacity used

---

## ✅ Example Response

```json
{
  "event_id": 1,
  "title": "Tech Conference",
  "capacity": 500,
  "registrations": 120,
  "seats_left": 380,
  "usage_percent": 24
}
```

---

## 📌 HTTP Status Codes

| Code | Meaning                    |
|------|----------------------------|
| 200  | OK                         |
| 201  | Created                    |
| 400  | Bad Request / Validation   |
| 404  | Not Found                  |
| 409  | Conflict (Duplicate Reg.)  |
| 500  | Internal Server Error      |

---

## 📃 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

**Sanjay Mudela** 
