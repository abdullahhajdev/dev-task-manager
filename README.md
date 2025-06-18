# 🛠️ Dev Task Manager

A full-stack Node.js API built with **Express** and **Prisma ORM** to manage users, projects, and tasks — with authentication, role-based access control, and relational data modeling.

---

## 📌 Features

### ✅ Current Features:
- 🔐 **User Authentication** with JWT
- 🧑‍💼 **User Model** with role (USER / ADMIN)
- 📁 **Project CRUD**
  - Users can create and manage their own projects
  - Projects are linked to their owner (1-to-many)
- 🌐 **Prisma ORM** for PostgreSQL
- 🧪 Ready for testing with **Postman** (Bearer Token support)

### 🚀 Upcoming Features:
- 👥 **Assign Users to Projects** (Many-to-Many relationship)
- ✅ **Tasks Model**:
  - CRUD operations for tasks
  - Tasks linked to specific projects
- 🔐 **Project-Level RBAC (Role-Based Access Control)**:
  - Project-specific roles like `Owner`, `Editor`, `Viewer`
  - Permissions based on user’s role within the project

---

## ⚙️ Tech Stack

| Tech        | Description                  |
|-------------|------------------------------|
| Node.js     | Runtime                      |
| Express.js  | Web Framework                |
| Prisma      | Type-safe ORM for PostgreSQL |
| PostgreSQL  | Relational Database          |
| JWT         | Authentication               |

---

## 📂 Project Structure

dev-task-manager/
├── prisma/
│ └── schema.prisma
├── src/
│ ├── controllers/
│ ├── middlewares/
│ ├── routes/
│ ├── utils/
│ └── app.js
├── .env
├── README.md
└── package.json


