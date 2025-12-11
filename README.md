# CodeRev - AI Code Review Assistant

CodeRev is a modern, AI-powered code review and developer assistant. It provides a chat interface where developers can get instant feedback on their code, debug issues, learn best practices, and receive mentorship from an AI senior engineer.

## Features

- **AI Code Review**: Get detailed feedback on code quality, bugs, and improvements
- **Multiple AI Models**: Choose between Quick Assist, Creative Writer, or Deep Thinker modes
- **Rate Limiting**: Fair usage policy with tiered access:
  - **Guests**: 5 requests per day (IP-based)
  - **Logged-in Users**: 50 requests per day
- **Markdown Rendering**: AI responses support rich markdown with syntax highlighting
- **User Authentication**: Sign up and login functionality with JWT tokens
- **Chat History**: Maintains conversation context (up to 10 messages)
- **Responsive Design**: Works on desktop and mobile devices
- **Landing Page**: Modern homepage with feature highlights

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI Library |
| Vite | 7.2.4 | Build Tool |
| Tailwind CSS | 4.1.17 | Styling |
| React Router DOM | 7.10.0 | Routing |
| Axios | 1.13.2 | HTTP Client |
| React Markdown | 10.1.0 | Markdown Rendering |
| Rehype Highlight | 7.0.2 | Code Syntax Highlighting |
| PrismJS | 1.30.0 | Additional Syntax Highlighting |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | - | Runtime |
| Express | 5.1.0 | Web Framework |
| OpenAI SDK | 6.9.1 | AI API Integration |
| Mongoose | 9.0.1 | MongoDB ODM |
| bcryptjs | 3.0.3 | Password Hashing |
| jsonwebtoken | 9.0.3 | JWT Authentication |
| cookie-parser | (latest) | Parse Cookie Headers |
| CORS | 2.8.5 | Cross-Origin Requests |
| dotenv | 17.2.3 | Environment Variables |

### AI Models
| Model Name | Display Name | Provider |
|------------|-------------|----------|
| gemini-2.5-flash | Quick Assist | Google Gemini |
| longcat-flash-chat | Creative Writer | LongCat AI |
| longcat-flash-thinking | Deep Thinker | LongCat AI |

## Project Structure

```
coderev/
├── Backend/
│   ├── src/
│   │   ├── app.js              # Express app setup with routes
│   │   ├── controllers/
│   │   │   ├── ai.controller.js
│   │   │   └── userAuth.controller.js
│   │   ├── routes/
│   │   │   ├── ai.route.js
│   │   │   └── userAuth.route.js
│   │   ├── services/
│   │   │   └── ai.service.js   # AI integration with multi-model support
│   │   ├── middlewares/
│   │   │   └── limit.middleware.js # Rate limiting logic
│   │   ├── models/
│   │   │   ├── user.model.js   # User schema with auth methods
│   │   │   └── usage.models.js # Request usage tracking
│   │   └── db/
│   │       └── db.js           # MongoDB connection
│   ├── server.js               # Server entry point
│   ├── package.json
│   └── .env                    # API keys (not committed)
│
├── Frontend/
│   ├── public/
│   │   ├── robot.png           # Hero background image
│   │   ├── loginimage.png      # Login page image
│   │   ├── signupimage.png     # Signup page image
│   │   └── fonts/              # Custom fonts (ScienceGothic)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Landing page
│   │   │   ├── ChatInterface.jsx # Chat UI with model selection
│   │   │   ├── Login.jsx       # Login page
│   │   │   └── Signup.jsx      # Signup page
│   │   ├── App.jsx             # Routes setup
│   │   ├── App.css
│   │   ├── index.css           # Global styles & fonts
│   │   └── main.jsx            # React entry point
│   ├── package.json
│   └── .env                    # API URL config
│
├── README.md
├── LICENSE
└── .gitignore
```

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with features |
| `/chat` | ChatInterface | AI chat with model selection |
| `/login` | Login | User login form |
| `/signup` | Signup | User registration form |

## API Endpoints

### AI Routes (`/ai`)
| Method | Endpoint | Description | Usage Limit |
|--------|----------|-------------|-------------|
| POST | `/ai/get-response` | Send prompt and model, receive AI response | 5/day (Guest), 50/day (User) |

### User Routes (`/user`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/user/signup` | Register new user |
| POST | `/user/login` | Login existing user |

## Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB instance (local or cloud)
- API keys for Gemini and/or LongCat AI

### 1. Clone the Repository
```bash
git clone https://github.com/m-taqii/coderev.git
cd coderev
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

Create `.env` file:
```env
LONGCAT_API_KEY=your_longcat_api_key
GEMINI_API_KEY=your_gemini_api_key
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
```

Start the server:
```bash
nodemon server.js
# or
node server.js
```
Server runs on `http://localhost:3000`

### 3. Frontend Setup
```bash
cd Frontend
npm install
```

Create `.env` file:
```env
VITE_BASE_URL=http://localhost:3000
```

Start development server:
```bash
npm run dev
```
App runs on `http://localhost:5173`

## Scripts

### Frontend
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Backend
| Command | Description |
|---------|-------------|
| `node server.js` | Start server |
| `nodemon server.js` | Start with auto-reload |

## Environment Variables

### Backend
| Variable | Description |
|----------|-------------|
| `LONGCAT_API_KEY` | API key for LongCat AI service |
| `GEMINI_API_KEY` | API key for Google Gemini |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `FRONTEND_URL` | Frontend URL for CORS configuration |

### Frontend
| Variable | Description |
|----------|-------------|
| `VITE_BASE_URL` | Backend API URL (e.g., `http://localhost:3000`) |

## License

MIT License - See [LICENSE](LICENSE) file for details.

---

Built by **M.Taqi**
