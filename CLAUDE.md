# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Explore Nepal** (YatraLens) — full-stack MERN tourism platform for Nepal travel discovery.
Repository: `git@github.com:subashstha/yatralens.git`

## Quick Start

```bash
# Install all dependencies (root + backend + frontend)
npm run install:all

# Copy and configure environment
cp backend/.env.example backend/.env
# Edit backend/.env: set MONGO_URI, JWT_SECRET, Cloudinary credentials

# Start both dev servers
npm run dev

# Seed the database
npm run seed
```

Dev servers: **Backend** http://localhost:5000 | **Frontend** http://localhost:5173

Demo credentials (after seeding): `admin@explorenepal.com / Admin@123` | `user@explorenepal.com / User@123`

## Frontend (`frontend/`)

- **Stack**: React 18, Vite, Tailwind CSS v3, React Router v6, Framer Motion, Leaflet, Axios
- **Install:** `cd frontend && npm install`
- **Dev server:** `npm run dev` (port 5173, proxies /api to backend)
- **Build:** `npm run build`

## Frontend Architecture

```
frontend/src/
  App.jsx                  # Root with React Router v6 routes
  context/
    AuthContext.jsx         # Auth state (login/register/logout/isAdmin)
    ThemeContext.jsx        # Dark/light mode toggle (localStorage)
  services/
    api.js                  # Axios instance with JWT interceptor
    destinationService.js
    authService.js
    blogService.js
    categoryService.js
    adminService.js
  components/
    layout/                 # Navbar, Footer, Layout
    common/                 # SearchBar, Pagination, StarRating, Badge, LoadingSkeleton
    home/                   # HeroSection, FeaturedDestinations, TrendingPlaces, CategoriesGrid, Stats, Newsletter, BlogPreview
    destinations/           # DestinationCard, DestinationFilters, MapView, ReviewCard, ReviewForm
    blog/                   # BlogCard
    auth/                   # ProtectedRoute, AdminRoute
  pages/
    Home, Explore, DestinationDetails, Categories, CategoryDetails
    Blog, BlogDetails, About, Contact, Login, Register
    UserDashboard, NotFound
    admin/                  # AdminDashboard, ManageDestinations, ManageUsers, ManageBlogs
  utils/
    constants.js            # REGIONS, DIFFICULTIES, CATEGORIES, SEASONS, NEPAL_CENTER
    helpers.js              # formatBudget, formatDate, truncateText, cn(), etc.
```

## Design System

- **Primary color:** Nepal crimson `#DC143C` (custom `primary` scale + `nepal.*` tokens)
- **Dark mode:** Tailwind `class` strategy via ThemeContext
- **Fonts:** Inter (body), Playfair Display (headings) from Google Fonts
- **Map:** OpenStreetMap via react-leaflet (no API key needed)
- **Animations:** Framer Motion (`motion.div` with `initial/animate/whileInView`)

## Pages & Routes

| Path | Component | Auth |
|---|---|---|
| `/` | Home | — |
| `/explore` | Explore (filters/search/map) | — |
| `/destinations/:id` | DestinationDetails | — |
| `/categories` | Categories | — |
| `/categories/:slug` | CategoryDetails | — |
| `/blog` | Blog | — |
| `/blog/:slug` | BlogDetails | — |
| `/about`, `/contact` | About, Contact | — |
| `/login`, `/register` | Login, Register | — |
| `/dashboard` | UserDashboard | ProtectedRoute |
| `/admin` | AdminDashboard | AdminRoute |
| `/admin/destinations` | ManageDestinations | AdminRoute |
| `/admin/users` | ManageUsers | AdminRoute |
| `/admin/blogs` | ManageBlogs | AdminRoute |

## Backend (`backend/`)

- **Stack**: Node.js, Express 4, Mongoose 8, MongoDB
- **Install:** `cd backend && npm install`
- **Dev server:** `npm run dev` (nodemon, port 5000)
- **Start:** `npm start`
- **Seed DB:** `npm run seed` (creates 2 users, 8 categories, 12 destinations, 5 blogs, 6 reviews)
- **Env setup:** Copy `backend/.env.example` to `backend/.env` and fill in values

## Backend Architecture

```
backend/
  server.js              # Express app entry point
  seed.js                # Database seeder
  config/
    db.js                # MongoDB connection
    cloudinary.js        # Cloudinary + multer upload config
  middleware/
    auth.js              # JWT protect + optionalAuth
    admin.js             # adminOnly role guard
    errorHandler.js      # Global error handler
  models/
    User.js              # Users (user/admin roles, saved destinations)
    Destination.js       # Destinations with geo-index, slug, categories
    Review.js            # Reviews with avg rating aggregation
    Blog.js              # Blogs with comments, likes, readTime
    Category.js          # Categories with slug, icon, color
    Newsletter.js        # Newsletter subscriptions
  controllers/           # Route handlers (auth, destinations, reviews, blogs, categories, users, admin, upload, newsletter)
  routes/                # Express routers mounted at /api/v1/
  utils/
    generateToken.js     # JWT token generator
    apiFeatures.js       # Query filter/sort/paginate helper
```

## API Base URL

`http://localhost:5000/api/v1/`

Key endpoints: `/auth`, `/destinations`, `/destinations/:id/reviews`, `/blogs`, `/categories`, `/users`, `/admin/stats`, `/upload`, `/newsletter`
