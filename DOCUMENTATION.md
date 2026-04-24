# Barbershop Application

A modern barbershop booking and management application built with React, Vite, and Node.js.

## 📋 Overview

This application provides a complete platform for:
- **Clients**: Browse barbershops, view services, book appointments, and leave reviews
- **Barbershop Owners**: Manage services, appointments, gallery, and customer relationships

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Next generation build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible component library
- **React Query** - Data fetching and caching
- **React Hook Form** - Form state management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication

## 📁 Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── api/            # API client utilities
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and context
│   │   └── utils/          # Helper functions
│   ├── index.html          # Entry HTML
│   ├── vite.config.js      # Vite configuration
│   └── tailwind.config.js  # Tailwind CSS config
│
└── backend/
    ├── src/
    │   ├── routes/         # API endpoints
    │   ├── middleware/     # Express middleware
    │   ├── db/             # Database connection
    │   ├── config/         # Configuration files
    │   ├── utils/          # Helper functions
    │   └── server.js       # Entry point
    ├── schema.sql          # Database schema
    └── package.json        # Dependencies
```

## 🔐 Features

### Authentication & Security
- JWT-based authentication
- Protected routes
- Role-based access (Client/Owner)
- Secure password handling

### Core Functionality
- **Appointments**: Book, manage, and track appointments
- **Services**: Create and manage barbershop services
- **Gallery**: Upload and manage shop photos
- **Reviews**: Client feedback system
- **Coupons**: Promotional code management

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run database migrations
npm run migrate

# Start development server
npm run dev
```

## 📖 API Documentation

See [backend/api-contract.md](backend/api-contract.md) for detailed API endpoints and contracts.

## 🗄️ Database Schema

The database schema is defined in [backend/schema.sql](backend/schema.sql).

Key entities:
- **Users** - Application users (clients and owners)
- **Barbershops** - Shop information and details
- **Services** - Services offered by barbershops
- **Appointments** - Bookings and scheduling
- **Reviews** - Customer feedback
- **Coupons** - Promotional codes
- **GalleryPhotos** - Shop gallery images

## 🔄 Entity Structure

Entities are defined in the [entities/](entities/) directory:
- `Appointment` - Booking information
- `Barbershop` - Shop details
- `Coupon` - Promotional offers
- `GalleryPhoto` - Gallery images
- `Review` - Customer reviews
- `Service` - Service offerings

## 🚢 Deployment

### Frontend
- Can be deployed to Vercel, Netlify, GitHub Pages, or any static hosting
- Build: `npm run build`
- Output: `dist/` directory

### Backend
- Deploy to Node.js hosting (Heroku, AWS, DigitalOcean, etc.)
- Requires PostgreSQL database
- Set environment variables for production

## 🧪 Development

### Code Quality
```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run typecheck
```

### Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues
- `npm run typecheck` - Run TypeScript type checking

**Backend:**
- `npm run dev` - Start development server
- `npm run migrate` - Run database migrations

## 📝 Environment Variables

### Frontend
`.env.local` or `.env`:
```
VITE_API_URL=http://localhost:3000
```

### Backend
`.env`:
```
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/barbershop
JWT_SECRET=your-secret-key
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## 📄 License

This project is private and confidential.

## 📞 Support

For issues and questions, please contact the development team.
