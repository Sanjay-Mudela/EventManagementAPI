# 🎉 Event Management API

A robust and scalable **Event Management RESTful API** built with **Node.js**, **Express**, and **PostgreSQL**. This backend service allows organizers to create events and users to register or cancel registrations while enforcing smart business rules like capacity limits, duplicate prevention, and real-time validation.

---

## 🚀 Features

* 🔧 **Create Events** with validation on capacity and unique constraints
* 🧾 **Retrieve Event Details**, including full user registration list
* ✅ **Register Users** for events with checks for:

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

* Many-to-Many relationship between Users and Events
* Prevents:

  * Double registration
  * Overbooking
  * Registration for past events
* Graceful handling of edge cases with meaningful HTTP responses
* Custom sorting and efficient queries
* Supports concurrent registration/cancellation scenarios

---

## 🛠️ Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: PostgreSQL
* **ORM**: Native SQL queries (or pg module)
* **Tools**: pgAdmin (for database management), Postman (for testing)

---

## 📂 Project Structure

```
📦event-management-api
 ┣ 📁controllers
 ┣ 📁models
 ┣ 📁routes
 ┣ 📁database
 ┣ 📁middleware
 ┣ 📄server.js
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
   npm install
   ```

3. **Set up PostgreSQL database**

   * Create a new database (e.g., `eventdb`)
   * Configure your `.env` file:

     ```env
     DATABASE_URL=postgresql://username:password@localhost:5432/eventdb
     ```

4. **Run migrations or initialize schema** (SQL scripts in `/database`)

5. **Start the server**

   ```bash
   npm run dev
   ```

---

## 📬 API Endpoints

### ➕ `POST /events`

Create a new event
✅ Validates inputs, returns Event ID on success

---

### 📄 `GET /events/:id`

Fetch event details along with registered users

---

### 📝 `POST /events/:id/register`

Register a user for an event
🚫 Fails if already registered, event is full, or is in the past

---

### ❌ `DELETE /events/:id/register/:userId`

Cancel a user’s registration
⚠️ Error if the user wasn't registered

---

### 📆 `GET /events/upcoming`

Returns all upcoming events
🔃 Custom sorted by date (ASC) then location (A–Z)

---

### 📊 `GET /events/:id/stats`

Returns event statistics:

* Total Registrations
* Remaining Capacity
* % of capacity used

---

## 📬 Example Request

```http
POST /events/123/register
Content-Type: application/json

{
  "user_id": 5
}
```

### ✅ Success Response

```json
{
  "message": "User registered successfully"
}
```

---

## 📌 Status Codes

* `200 OK` – Successful operations
* `201 Created` – Event/User successfully created
* `400 Bad Request` – Validation or input errors
* `404 Not Found` – Invalid Event/User
* `409 Conflict` – Duplicate registration
* `500 Internal Server Error` – Unexpected failure

---

## 📃 License

This project is open-source and available under the [MIT License](LICENSE).
