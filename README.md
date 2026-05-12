# Industrix Todo App - Neo Brutalism Edition

A full-stack Todo application built with React, TypeScript, Node.js, and PostgreSQL. Featuring a bold Neo-Brutalist UI with a Blue, White, and Black color scheme.

## 🚀 Speed Test Challenge Requirements
- **Responsive**: Fully responsive design for Desktop, Tablet, and Mobile.
- **Neo Brutalism Style**: High contrast, bold borders (3px), sharp edges (0 radius), and offset shadows.
- **Tech Stack**: React 18, Vite, Ant Design, Express.js, TypeScript, Sequelize ORM, PostgreSQL.
- **Features**: Full CRUD for Todos and Categories, Pagination, Filtering, Search, and Health Check.

## 🛠️ Project Structure
```text
industrix-todo/
├── backend/            # Express.js + TypeScript API
│   ├── src/            # Source code (MVC-like Service Layer)
│   ├── migrations/     # SQL Migration scripts
│   └── tests/          # Unit & Integration tests
├── frontend/           # React + Vite + Ant Design
│   └── src/            # UI Components & Context
├── docker-compose.yml  # Docker orchestration
└── README.md           # Documentation
```

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)
- npm or yarn

### 1. Database Setup
Create a PostgreSQL database and user:
```bash
# Connect to postgres
sudo -u postgres psql

# Run these commands
CREATE USER todoapp_user WITH PASSWORD 'todoapp_pass123';
CREATE DATABASE todoapp_db OWNER todoapp_user;
GRANT ALL PRIVILEGES ON DATABASE todoapp_db TO todoapp_user;
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🐳 Docker Deployment
You can also run the entire stack using Docker Compose:
```bash
docker-compose up --build
```

## 🧪 Running Tests
```bash
cd backend
npm test
```

## 🎨 Design Decisions
- **Typography**: Space Grotesk (Bold & Modern)
- **Palette**: #2563eb (Blue), #ffffff (White), #000000 (Black)
- **UI Elements**: 3px black borders, no border radius, 4px/6px solid black shadows for that "Brutalist" feel.
