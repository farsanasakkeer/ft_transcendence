# GameZone - Full Stack Gaming Web App

## 📌 Project Overview
GameZone is a **full-stack gaming web application** built using **TypeScript**, **Fastify (backend)**, **Vanilla TypeScript + Tailwind CSS (frontend)**, and **SQLite (database)**, fully containerized with **Docker**.

This project includes **authentication**, **a protected dashboard**, and **gaming-themed UI** with **dynamic API interactions**.

---

## 🛠️ Tools & Technologies Used

### **Backend (Fastify + Prisma)**
- **Fastify (with TypeScript)** - Lightweight and fast Node.js framework
- **Prisma ORM** - Database handling with SQLite
- **JWT Authentication** - Secure user login system
- **CORS Handling** - Managed with `@fastify/cors`
- **Docker** - Backend runs in a container for easy deployment

### **Frontend (Vanilla TypeScript + Tailwind CSS)**
- **Vanilla TypeScript** - Lightweight, no frameworks
- **Tailwind CSS** - Fast UI styling
- **Axios** - Handles API requests to backend
- **Vite** - Fast frontend development server

### **Database (SQLite + Prisma ORM)**
- SQLite is used for easy setup
- Prisma manages schema and migrations
- Database is stored persistently inside Docker

---

## 🚀 How to Set Up the Project

### **1️⃣ Clone the Repository**
```bash
git clone <repository-url>
cd transcendence_docker
```

### **2️⃣ Install Dependencies (Locally for Debugging Only)**

> 🔹 **NOTE**: If working with Docker, dependencies will be installed inside the container.

### **3️⃣ Start the Project with Docker**
```bash
docker-compose up --build
```

> 🔹 This builds and starts the **backend, frontend, and database** in separate Docker containers.

### **4️⃣ Access the Project**
- **Frontend:** `http://localhost:5173`
- **Backend API:** `http://localhost:3000`

---

## 🛠️ Backend Setup & Development

### **🔹 Installing Dependencies**
Since the backend is built with TypeScript, some Fastify plugins are named differently, e.g.,
```bash
npm install @fastify/cors
```

**DO NOT** install `fastify-cors`, as it will not work with TypeScript.

### **🔹 Running Prisma Migrations**
If you make changes to the **database schema**, create a migration **before starting Docker**:
```bash
cd backend
npx prisma migrate dev --name <migration-message>
```
Then, restart the Docker setup:
```bash
docker-compose up --build
```

> 🔹 **NOTE:** The **backend must be restarted** after database changes.

### **🔹 Backend API Routes**
| Route         | Method | Description |
|--------------|--------|-------------|
| `/register`  | POST   | Register a new user |
| `/login`     | POST   | Authenticate user, returns JWT |
| `/protected` | GET    | Protected API, requires JWT |
| `/dashboard` | GET    | Returns user data for dashboard |

---

## 🎨 Frontend Setup & Development

### **🔹 Live Development**
The **frontend updates automatically** while the project is running. If changes are made to **frontend code**, just save the file, and the updates will reflect immediately.

### **🔹 Frontend Structure**
```
frontend/
│-- src/
│   ├── index.ts        # Handles navigation & setup
│   ├── auth.ts         # Handles login & registration logic
│   ├── dashboard.ts    # Loads protected user data
│-- index.html          # Landing page
│-- pages/
│   ├── login.html      # Login page
│   ├── register.html   # Registration page
│   ├── dashboard.html  # User dashboard
```

### **🔹 How Pages Render**
- **Static HTML Files** are served with `index.html`, `login.html`, `register.html`, and `dashboard.html`.
- **JavaScript Handles API Calls** using `auth.ts` and `dashboard.ts`.
- **Tailwind CSS Styles Everything** with modern UI components.

### **🔹 Adding a New Page**
To create a new page (e.g., "Profile" page):
1. **Create a new file** `profile.html` inside `pages/`
2. **Add a new TypeScript file** in `src/` (e.g., `profile.ts`)
3. **Call an API Endpoint** from the backend
4. **Link it from the sidebar in `dashboard.html`**

---

## 🚀 How to Extend the Project

### **1️⃣ Adding More API Endpoints**
To create a new API route in the backend:
```typescript
fastify.get("/new-endpoint", async (request, reply) => {
    reply.send({ message: "This is a new API response" });
});
```
Then, restart Docker:
```bash
docker-compose restart backend
```

### **2️⃣ Creating New Pages on Frontend**
To **add a new page**, follow these steps:
1. Create `newpage.html` inside `frontend/pages/`
2. Create `newpage.ts` inside `frontend/src/`
3. Fetch API data using Axios
4. Style using Tailwind CSS
5. Add a button/link to navigate to the page

Example API call in `newpage.ts`:
```typescript
import axios from "axios";

const API_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", async () => {
    const response = await axios.get(`${API_URL}/new-endpoint`);
    console.log(response.data);
});
```

---

## 🔥 Features Implemented So Far
✅ **JWT Authentication (Login & Register)**  
✅ **Protected Routes (Dashboard Only for Logged-in Users)**  
✅ **Gaming-Themed UI (Dark Mode, Neon Glow)**  
✅ **Fully Responsive Design (Mobile & Desktop)**  
✅ **Live Frontend Updates (While Running)**  
✅ **Containerized Deployment (Docker + Docker Compose)**  

---

Create your repository and define a clear file structure. Setup Docker with a basic Dockerfile and docker-compose.yml.

Technical changes: • Mandatory simple backend: Ruby ⇒ PHP

• Mandatory simple frontend: Javascript ⇒ Typescript

• Framework backend module: Django ⇒ Node + Fastify

• Frontend framework/toolkit module: Bootstrap toolkit ⇒ Tailwind CSS

• Database module: PostgreSQL ⇒ SQLite

• Blockchain module: Ethereum and Solidity ⇒ Avalanche and Solidity

• Remote auth module: 42-OAuth ⇒ Google Sign-in

• Advanced 3D graphics: ThreeJS ⇒ BabylonJS

Rebuild Docker containers:

docker-compose up --build
