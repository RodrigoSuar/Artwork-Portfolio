# 🎨 Artwork Portfolio

A full-stack art portfolio gallery application that allows artists to showcase, manage, and display their artwork. Built with modern technologies including React, Vite, Express.js, and MongoDB.

## ✨ Overview

This project provides a complete solution for creating and managing an art portfolio website. Artists can upload their artwork, organize it in a gallery, and share it with the world. The application includes both a public gallery view and an admin panel for managing content.

**Live Demo:** [Your deployment URL here]

## 🛠️ Technology Stack

### Frontend
- **React 18+** - Modern UI library
- **Vite** - Lightning-fast build tool and dev server
- **CSS3** - Responsive styling
- **ESLint** - Code quality and consistency

### Backend
- **Node.js 18+** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **ESLint** - Code quality

## 🚀 Key Features

### Public Gallery
- Browse all published artworks
- View detailed artwork information
- Responsive gallery layout
- Contact form for inquiries

### Admin Features
- Secure admin login
- Create, read, update, and delete artwork (CRUD)
- Manage artwork titles and images
- Protected admin routes

### API Endpoints
- `GET /api/artwork` - Retrieve all artworks
- `GET /api/artwork/:id` - Retrieve specific artwork
- `POST /api/artwork` - Create new artwork (admin only)
- `PUT /api/artwork/:id` - Update artwork (admin only)
- `DELETE /api/artwork/:id` - Delete artwork (admin only)

## 📂 Directory Structure

```
Artwork-Portfolio/
├── backend/                          # Express.js server
│   ├── app.js                        # Express app setup
│   ├── index.js                      # Server entry point
│   ├── package.json                  # Backend dependencies
│   ├── eslint.config.mjs             # ESLint configuration
│   ├── controller/
│   │   └── artworks.js               # Artwork route handlers
│   ├── models/
│   │   └── artwork.js                # Mongoose artwork schema
│   ├── tests/
│   │   ├── artwork_api.test.js      # API integration tests
│   │   └── reverse.test.js          # Utility tests
│   └── utils/
│       ├── config.js                 # Configuration management
│       ├── logger.js                 # Logging utilities
│       ├── middleware.js             # Core middleware
│       └── for_testing.js            # Test utilities
│
├── frontend/                         # React + Vite application
│   ├── index.html                    # HTML entry point
│   ├── package.json                  # Frontend dependencies
│   ├── vite.config.js                # Vite configuration
│   ├── eslint.config.js              # ESLint configuration
│   ├── README.md                     # Frontend-specific docs
│   ├── public/                       # Static assets
│   └── src/
│       ├── main.jsx                  # React app entry point
│       ├── App.jsx                   # Root component
│       ├── App.css                   # Global styles
│       ├── assets/                   # Images and media
│       ├── components/
│       │   ├── ArtworkCard.jsx       # Individual artwork display
│       │   ├── EditBox.jsx           # Edit artwork form
│       │   ├── Nav.jsx               # Navigation component
│       │   └── ProtectedRoute.jsx    # Admin route protection
│       ├── pages/
│       │   ├── Home.jsx              # Landing page
│       │   ├── Gallery.jsx           # Public gallery view
│       │   ├── AdminLogin.jsx        # Admin login page
│       │   ├── Admin.jsx             # Admin dashboard
│       │   ├── Art.jsx               # Artwork detail page
│       │   └── Contact.jsx           # Contact form page
│       └── services/
│           └── artwork.js            # API client service
│
├── deploy.sh                         # Deployment script
└── README.md                         # This file
```

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** 8.x or higher (comes with Node.js)
- **MongoDB** - Cloud database (MongoDB Atlas) or local installation
- A code editor (VS Code recommended)
- Git version control

### MongoDB Setup

1. Create a free MongoDB Atlas account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a new cluster and database
3. Generate a connection string with your credentials
4. Keep this URI safe - you'll need it for the `.env` file

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Artwork-Portfolio
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
# Database Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/artwork?retryWrites=true&w=majority

# Server Configuration
PORT=3001

# Optional: Environment mode
NODE_ENV=development
```

Replace `<username>`, `<password>`, and the cluster URL with your MongoDB Atlas credentials.

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` directory if needed:

```env
# API Configuration
VITE_API_URL=http://localhost:3001
```

## 🚀 Running the Application

### Development Mode (Both Backend & Frontend)

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:3001
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

Then open your browser and navigate to `http://localhost:5173`

### Production Build

```bash
# Build frontend
cd frontend
npm run build

# Copy frontend build to backend
cd ../backend
npm run build:ui

# Start production server
npm start
# Server runs on http://localhost:3001
```

## 📖 API Documentation

### Artwork Endpoints

#### Get All Artworks
```http
GET /api/artwork
```

**Response:**
```json
[
  {
    "id": "645f7c2e1a2b3c4d5e6f7g8h",
    "title": "Sunset Landscape",
    "image": "https://example.com/image.jpg"
  }
]
```

#### Get Single Artwork
```http
GET /api/artwork/:id
```

**Response:**
```json
{
  "id": "645f7c2e1a2b3c4d5e6f7g8h",
  "title": "Sunset Landscape",
  "image": "https://example.com/image.jpg"
}
```

#### Create Artwork (Admin Only)
```http
POST /api/artwork
Content-Type: application/json

{
  "title": "New Artwork",
  "image": "https://example.com/image.jpg"
}
```

**Response:** 201 Created
```json
{
  "id": "645f7c2e1a2b3c4d5e6f7g8h",
  "title": "New Artwork",
  "image": "https://example.com/image.jpg"
}
```

**Errors:**
- `400 Bad Request` - Missing required `image` field
- `401 Unauthorized` - Not authenticated as admin

#### Update Artwork (Admin Only)
```http
PUT /api/artwork/:id
Content-Type: application/json

{
  "title": "Updated Title"
}
```

**Response:** 200 OK
```json
{
  "id": "645f7c2e1a2b3c4d5e6f7g8h",
  "title": "Updated Title",
  "image": "https://example.com/image.jpg"
}
```

**Errors:**
- `404 Not Found` - Artwork doesn't exist

#### Delete Artwork (Admin Only)
```http
DELETE /api/artwork/:id
```

**Response:** 204 No Content (or 200 OK with deleted object)

**Errors:**
- `404 Not Found` - Artwork doesn't exist

## 📜 NPM Scripts

### Backend Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `npm start` | `node index.js` | Run production server |
| `npm run dev` | `node --watch index.js` | Run with auto-reload on file changes |
| `npm run build:ui` | Build and copy frontend | Prepare for production |
| `npm test` | Run tests | Execute test suite |

### Frontend Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `npm run dev` | `vite` | Start development server |
| `npm run build` | `vite build` | Create production build |
| `npm run preview` | `vite preview` | Preview production build locally |
| `npm run lint` | `eslint .` | Check code quality |

## 🧪 Testing

Run the backend test suite:

```bash
cd backend
npm test
```

Tests use Jest and Supertest for API integration testing.

## 📝 Code Quality

### Linting

Check for code style issues:

```bash
# Backend
cd backend
npm run lint

# Frontend
cd frontend
npm run lint
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- **Error:** `MongoError: connect ECONNREFUSED`
  - Solution: Check your `MONGODB_URI` in `.env` and ensure MongoDB is running
  - For Atlas: Verify IP whitelist includes your machine

### Port Already in Use
- **Error:** `Error: listen EADDRINUSE: address already in use :::3001`
  - Solution: Kill process on port 3001 or change `PORT` in `.env`
  ```bash
  # Find and kill process on port 3001
  lsof -i :3001
  kill -9 <PID>
  ```

### Frontend Not Connecting to Backend
- **Error:** CORS errors or API requests failing
  - Solution: Ensure backend is running on correct port
  - Check `VITE_API_URL` matches your backend URL
  - Verify CORS middleware is configured in backend

### Module Not Found Errors
- **Solution:** Reinstall dependencies
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

## 🚀 Deployment

### Deployment Options

1. **Heroku** - Easy deployment with Git integration
2. **Vercel** (Frontend only) + Node service (Backend)
3. **AWS** - EC2 instances or App Runner
4. **Railway** - Modern Node.js hosting
5. **Render** - Full-stack deployment platform

See the [deploy.sh](deploy.sh) script for deployment automation.

## 🎯 Future Enhancements

- [ ] Input validation with `joi` or `express-validator`
- [ ] Authentication/authorization system
- [ ] Pagination and filtering for galleries
- [ ] Image upload to S3 or Cloudinary (instead of URL)
- [ ] Advanced admin dashboard with analytics
- [ ] Search functionality
- [ ] Category/tag system for artworks
- [ ] User comments and ratings
- [ ] Dark mode support
- [ ] Performance optimization (caching, lazy loading)

## 📄 Project Structure Standards

This project follows these conventions:

- **Naming:** camelCase for variables/functions, PascalCase for React components
- **Styling:** CSS modules and inline styles in components
- **API:** RESTful conventions with standard HTTP methods
- **Error Handling:** Centralized middleware for error responses
- **Logging:** Automatic request logging with timestamps

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

Created with ❤️ by Rodrigo

## 📞 Support

For support or questions:
- Open an issue on GitHub
- Contact through the Contact page in the application

---

**Happy creating!** 🎨✨
