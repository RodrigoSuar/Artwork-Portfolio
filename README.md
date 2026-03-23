# 🎨 Art Portfolio Gallery

A full-stack art portfolio application built with React, Vite, Express, and MongoDB.

## 📂 Project Structure

- `backend/`
  - `index.js` - Express backend entry
  - `models/artwork.js` - Mongoose schema/model
  - `mongo.js` - optional connection helper
  - `.env` - environment vars (`MONGODB_URI`, `PORT`)
- `frontend/`
  - Vite + React app
  - `src/components/` - UI components
  - `src/pages/` - route screens
  - `src/services/artwork.js` - API calls

## 🚀 Features

- CRUD for artwork items
  - GET `/api/artwork` - all artworks
  - GET `/api/artwork/:id` - specific artwork
  - POST `/api/artwork` - add new artwork (`title`, `image`)
  - PUT `/api/artwork/:id` - update artwork title
  - DELETE `/api/artwork/:id` - delete artwork
- Production frontend served from `backend/dist`
- Automatic request logging middleware
- MongoDB data transform: `_id` -> `id`

## ⚙️ Prerequisites

- Node.js 18+
- npm
- MongoDB connection URI

### Example `backend/.env`
```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.example.mongodb.net/artwork?retryWrites=true&w=majority
PORT=3001
```

## 🛠️ Setup

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📦 Production Build

```bash
cd frontend
npm run build
cd ../backend
npm run build:ui
npm start
```

## 🧾 NPM Scripts

### backend/package.json
- `start`: `node index.js`
- `dev`: `node --watch index.js`
- `build:ui`: `rm -rf dist && cd ../frontend && npm run build && cp -r dist ../backend`

### frontend/package.json
- `dev`: `vite`
- `build`: `vite build`
- `preview`: `vite preview`
- `lint`: `eslint .`

## 🛡️ Notes

- POST `/api/artwork` requires `image`, otherwise 400 error.
- PUT `/api/artwork/:id` updates `title` and returns 404 if not found.
- No tests included yet; `npm test` is placeholder.

## 💡 Improvements

- Add validation with `joi` or `express-validator`
- Add authentication/authorization
- Add pagination and filtering
- Add tests (Jest + Supertest)
- Add image upload integration (S3/Cloudinary)
