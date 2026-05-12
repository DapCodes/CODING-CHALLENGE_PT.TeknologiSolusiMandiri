# ⚡ Industrix Todo - Extreme Full Stack Management

A high-performance, **Neo-Brutalist** Full-Stack Todo application designed for speed, clarity, and reliability. Built by **Daffa Ramadhan Maulana** as a technical demonstration of modern web architecture.

## 🔗 Live Deployment
- **Frontend Link:** [https://coding-challenge-daffaramadhan.vercel.app](https://coding-challenge-daffaramadhan.vercel.app)
- **Backend API Link:** [https://coding-challengeptteknologisolusimandiri-production.up.railway.app](https://coding-challengeptteknologisolusimandiri-production.up.railway.app)
- **Database:** Neon Serverless PostgreSQL (Singapore Region)

---

## 👤 Developer Profile
**Daffa Ramadhan Maulana**  
*Full-Stack Developer & Software Architect*  
This project demonstrates the ability to build, optimize, and deploy a distributed system encompassing a structured backend API, a reactive frontend UI, and a cloud-native database.

---

## 🏗️ Technical Stack

### **Frontend (The Interface)**
- **Framework:** [React 19](https://react.dev/) - Using high-performance Hooks and Context API.
- **Build Tool:** [Vite](https://vitejs.dev/) - Lightning-fast HMR and build speeds.
- **UI Architecture:** [Ant Design 6](https://ant.design/) - Custom-themed for a "Neo-Brutalism" aesthetic (Bold borders, high contrast).
- **HTTP Client:** [Axios](https://axios-http.com/) - With central client configuration and interceptors.
- **Styling:** Vanilla CSS + Ant Design Tokens (Strict adherence to 3px borders and #000000 shadows).

### **Backend (The Core)**
- **Runtime:** [Node.js](https://nodejs.org/) with [TypeScript](https://www.typescriptlang.org/).
- **API Framework:** [Express.js](https://expressjs.com/) - Clean MVC-like structure.
- **ORM:** [Sequelize](https://sequelize.org/) - Robust PostgreSQL object-relational mapping.
- **Security:** [Helmet](https://helmetjs.github.io/) & [CORS](https://expressjs.com/en/resources/middleware/cors.html).
- **Logging:** [Morgan](https://github.com/expressjs/morgan) for developer insights.

### **Infrastructure (The Cloud)**
- **Database:** [Neon.tech](https://neon.tech/) - Serverless PostgreSQL for instant scaling.
- **Hosting (API):** [Railway.app](https://railway.app/) - Using Dockerized environments.
- **Hosting (UI):** [Vercel](https://vercel.com/) - For global edge delivery.

---

## 📂 Project Directory Structure

```text
industrix-todo/
├── backend/                  # SERVER SIDE (Railway Deployment)
│   ├── src/
│   │   ├── config/           # Database & Connection configs
│   │   ├── controllers/      # Request handlers
│   │   ├── middleware/       # CORS, Error Handling, Logging
│   │   ├── models/           # Sequelize Schemas (Todos & Categories)
│   │   ├── routes/           # API Endpoint definitions
│   │   ├── services/         # Business logic layer
│   │   └── app.ts            # Main application entry
│   ├── migrations/           # Raw SQL migration scripts
│   ├── tests/                # Jest & Supertest suites
│   ├── Dockerfile            # Container definition
│   └── tsconfig.json         # TypeScript configuration
├── frontend/                 # CLIENT SIDE (Vercel Deployment)
│   ├── src/
│   │   ├── api/              # API Clients & Service functions
│   │   ├── assets/           # UI Assets & Global Styles
│   │   ├── components/       # Reusable UI Components
│   │   ├── context/          # State Management (Todo & Category Context)
│   │   ├── pages/            # View compositions
│   │   └── App.tsx           # Main component tree
│   ├── public/               # Favicon & Static assets
│   └── vite.config.ts        # Bundler configuration
├── docker-compose.yml        # Local orchestration config
└── README.md                 # Project Documentation
```

---

## 🚀 Key Features
1. **Neo-Brutalist Design**: Unique visual identity using Blue (#2563eb), White, and Black hues with heavy 3px shadows.
2. **Category Management**: Organize tasks with custom categories and color-coded labels.
3. **Advanced Filtering**: Search by title, status (Done/Pending), category, and priority.
4. **Pagination**: Efficiently handles large datasets by loading 10 items per page.
5. **Real-time Synchronization**: Context-based state management ensures the UI reflects database changes instantly.
6. **Production Grade Performance**: Optimized build outputs and managed database persistence.

---

## 🔧 Installation & Local Setup

### 1. Database Configuration
Ensure you have a PostgreSQL instance running or use Neon.tech. Run the SQL scripts found in `backend/migrations/` to initialize the tables.

### 2. Startup Commands
```bash
# Clone the repository
git clone https://github.com/USERNAME/REPO_NAME.git

# Setup Backend
cd backend
npm install
npm run dev

# Setup Frontend (Open new terminal)
cd frontend
npm install
npm run dev
```

---

## 🛡️ API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | System health check & status |
| GET | `/api/todos` | List all todos with pagination/filtering |
| POST | `/api/todos` | Create a new task |
| PUT | `/api/todos/:id` | Update task details |
| DELETE | `/api/todos/:id` | Remove a task |
| GET | `/api/categories`| List all task categories |

---

## 💎 Acknowledgments
Project developed by **Daffa Ramadhan Maulana** for the PT.TeknologiSolusiMandiri Coding Challenge. The architecture follows industry best practices for separation of concerns and cloud deployment.
