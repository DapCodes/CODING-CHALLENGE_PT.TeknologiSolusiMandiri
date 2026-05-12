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

## 🧠 Q&A - Technical Documentation

### **I. Database Design Questions**

#### **1. What database tables did you create and why?**
- **Table `Categories`**: Stores category definitions (`id`, `name`, `color`). This allows users to group tasks logically. Separation into a distinct table ensures data normalization.
- **Table `Todos`**: Stores the actual tasks (`id`, `title`, `description`, `is_done`, `priority`, `category_id`, etc.). This is the core data of the application.
- **Relationships**: A **One-to-Many** relationship exists between `Categories` and `Todos`. One category can be assigned to multiple todos, but each todo belongs to exactly one category. This is implemented via a Foreign Key (`category_id`) in the `Todos` table.
- **Choice of Structure**: This structure follows 3rd Normal Form (3NF), minimizing data redundancy and making it extremely easy to filter tasks by category without string manipulation.

#### **2. How did you handle pagination and filtering in the database?**
- **Filtering/Sorting**: I used Sequelize's `Op` (Operators) to handle dynamic queries. For title searching, I used `Op.iLike` (case-insensitive search). For status and priority, I used exact matches in the `where` clause.
- **Efficient Pagination**: I implemented the `limit` and `offset` pattern. The frontend sends `page` and `limit` parameters; the backend calculates `offset = (page - 1) * limit`. This ensures we only fetch a small subset of data from the database at a time.
- **Indexes**: Primary keys are indexed automatically. I also ensured an index exists on `category_id` in the `Todos` table to speed up JOIN operations and filtering by category.

---

### **II. Technical Decision Questions**

#### **1. How did you implement responsive design?**
- **Breakpoints**: I utilized Ant Design's standard breakpoints (xs: <576px, sm: 576px, md: 768px, lg: 992px, xl: 1200px).
- **Adaptation**: On mobile, the filter sidebar transforms into a top-down layout or a drawer, and the Todo list transitions from a multi-column grid to a single vertical stack.
- **Ant Design Help**: Components like `<Row>`, `<Col>`, and the `useBreakpoint` hook were instrumental in creating a fluid, responsive layout without writing heavy custom media queries.

#### **2. How did you structure your React components?**
- **Hierarchy**:
  - `App.tsx` (Wrappers & Providers)
  - `TodoContext` / `CategoryContext` (Global State)
  - `MainLayout` (Navbar & Container)
  - `TodoPage` (The main view composed of `FilterSider`, `TodoForm`, and `TodoList`)
- **State Management**: I chose the **Context API** for global state. This prevents "prop drilling" and allows components deep in the tree (like a Todo Item) to trigger a refresh of the list easily.
- **Filtering State**: Filters are stored as an object in the `TodoContext`. Every time a filter changes, the context triggers a new API call and updates the data for the entire app.

#### **3. What backend architecture did you choose and why?**
- **Architecture**: A Layered MVC-like architecture.
- **Organization**:
  - `Routes`: Handle endpoint definitions.
  - `Controllers`: Handle HTTP-specific logic (parsing params, sending responses).
  - `Services`: Handle business logic and Sequelize queries. This keeps the controllers thin and tests easy to write.
- **Error Handling**: A centralized `errorHandler` middleware. Using a global handler ensures that all errors return a consistent JSON format (`{ success: false, message: "..." }`) and logs the stack trace in development.

#### **4. How did you handle data validation?**
- **Location**: Both sides. Ant Design handles immediate feedback on the frontend, while `express-validator` secures the backend.
- **Rules**: Todos must have a non-empty title (max 100 chars), valid priority tags ('low', 'medium', 'high'), and correct Foreign Keys for categories.
- **Reasoning**: Validating in the backend is non-negotiable for security, while frontend validation provides a smooth, "zero-latency" UX.

---

### **III. Testing & Quality Questions**

#### **1. What did you choose to unit test and why?**
- **Scope**: Core Service functions (CRUD operations) and Health Check endpoints.
- **Edge Cases**: I tested behavior when fetching page numbers that don't exist, creating todos with invalid category IDs, and searching for non-existent keywords.
- **Structure**: I used **Jest** with **Supertest** for the backend to ensure endpoints return the correct status codes and data structures.

#### **2. If you had more time, what would you improve or add?**
- **Technical Debt**: Improve TypeScript interface strictness and implement a proper database migration runner (like Umzug).
- **Features**: Implement User Authentication (JWT), Drag-and-Drop task ordering, and a "Dark Mode" toggle.
- **Refactoring**: Move from a monolithic backend structure to a more modular "Domain-Driven" folder structure if the project grows.

---

### **💎 Acknowledgments**
Project developed by **Daffa Ramadhan Maulana** for the PT.TeknologiSolusiMandiri Coding Challenge. The architecture follows industry best practices for separation of concerns and cloud deployment.
