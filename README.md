# Devion - AI Code Assistant

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.181.0-000000?style=for-the-badge&logo=threedotjs&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-2.11.1-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.17-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.1.0-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-9.0.1-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Devion is a modern, AI-powered code review and developer assistant. It provides a chat interface where developers can get instant feedback on their code, debug issues, learn best practices, and receive mentorship from an AI senior engineer.

## Features

- **Immersive 3D Landing Page**: Interactive 3D elements powered by Three.js with post-processing effects (Bloom, Chromatic Aberration, Tone Mapping)
- **Redux State Management**: Global state for 3D scene settings (DPR, effects, interactions)
- **Adaptive Performance**: Automatic quality scaling based on device performance using PerformanceMonitor
- **Mobile Responsive 3D**: Different camera settings for mobile and desktop devices
- **GSAP Animations**: Scroll-triggered animations using GSAP and ScrollTrigger
- **Streaming AI Responses**: Real-time token-by-token response streaming for faster perceived response times
- **AI Code Review**: Get detailed feedback on code quality, bugs, and improvements
- **Multiple AI Models**: Choose between Quick, Pro, or Deep thinking modes
- **Rate Limiting**: Fair usage policy with tiered access:
  - **Guests**: 5 requests per day (IP-based)
  - **Logged-in Users**: 50 requests per day
- **Markdown Rendering**: AI responses support rich markdown with syntax highlighting
- **User Authentication**: Sign up and login functionality with JWT tokens
- **Chat History**: Maintains conversation context (up to 10 messages)
- **New Chat**: Clear conversation and start fresh with one click
- **Auto-resize Input**: Textarea automatically expands as you type
- **Auto-scroll**: Messages automatically scroll to bottom on new content
- **Responsive Design**: Works on desktop and mobile devices
- **Smooth Scrolling**: Enhanced scrolling experience using Lenis

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI Library |
| Vite | 7.2.4 | Build Tool |
| Redux Toolkit | 2.11.1 | State Management |
| React Redux | 9.2.0 | React Bindings for Redux |
| Tailwind CSS | 4.1.17 | Styling |
| React Router DOM | 7.10.0 | Routing |
| React Three Fiber | 9.4.2 | 3D Rendering (React wrapper for Three.js) |
| Three.js | 0.181.0 | 3D Graphics |
| Drei | 10.7.7 | R3F Helpers (PerformanceMonitor, Float, AdaptiveDpr) |
| Postprocessing | 3.0.4 | 3D Visual Effects (Bloom, ChromaticAberration, ToneMapping) |
| Lenis | 1.3.16 | Smooth Scrolling |
| GSAP | 3.14.1 | Animations & ScrollTrigger |
| Axios | 1.13.2 | HTTP Client |
| React Markdown | 10.1.0 | Markdown Rendering |
| Rehype Highlight | 7.0.2 | Code Syntax Highlighting |

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
| gemini-2.5-flash | Quick | Google Gemini |
| longcat-flash-chat | Pro | LongCat AI |
| longcat-flash-thinking | Deep | LongCat AI |

## Project Structure

```
devion/
├── Backend/
│   ├── src/
│   │   ├── app.js              # Express app setup with routes
│   │   ├── controllers/
│   │   │   ├── ai.controller.js  # Streaming response handler
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
│   │   ├── devion.png          # Logo
│   │   ├── models/             # 3D Assets (GLTF/GLB)
│   │   ├── noise.svg           # Background texturing
│   │   └── fonts/              # Custom fonts (ScienceGothic)
│   ├── src/
│   │   ├── app/
│   │   │   └── store.js        # Redux store configuration
│   │   ├── features/
│   │   │   └── modelSlice.js   # Redux slice for 3D settings
│   │   ├── models/
│   │   │   └── DamagedHelmet.jsx # 3D Model Component
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── CanvasExperience.jsx # 3D Canvas wrapper with performance monitoring
│   │   │   └── CanvasContent.jsx    # 3D Scene content with effects
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Landing page with mobile detection
│   │   │   ├── ChatInterface.jsx # Chat UI with streaming responses
│   │   │   ├── Login.jsx       # Login page
│   │   │   └── Signup.jsx      # Signup page
│   │   ├── App.jsx             # Routes setup & Lenis scroll
│   │   ├── App.css
│   │   ├── index.css           # Global styles & fonts
│   │   └── main.jsx            # React entry point with Redux Provider
│   ├── package.json
│   └── .env                    # API URL config
│
├── README.md
├── LICENSE
└── .gitignore
```

## Redux State

The application uses Redux Toolkit for managing 3D scene settings:

```javascript
// modelSlice state
{
  interaction: true,    // Enable/disable 3D interactions
  enableEffects: true,  // Enable/disable post-processing effects
  dpr: 1.5             // Device pixel ratio for rendering quality
}
```

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Immersive landing page with adaptive 3D elements |
| `/chat` | ChatInterface | AI chat with streaming responses & model selection |
| `/login` | Login | User login form |
| `/signup` | Signup | User registration form |

## API Endpoints

### AI Routes (`/ai`)
| Method | Endpoint | Description | Usage Limit |
|--------|----------|-------------|-------------|
| POST | `/ai/get-response` | Send prompt and model, receive streaming AI response | 5/day (Guest), 50/day (User) |

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
git clone https://github.com/m-taqii/devion.git
cd devion
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
