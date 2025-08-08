# Vessel Emissions Dashboard

This project is an interactive dashboard for monitoring vessel emissions and analyzing their deviations from baseline values according to the Poseidon Principles.

## 📋 Table of Contents

- [Project Description](#-project-description)
- [Technology Stack](#-technology-stack)
- [Installation and Setup](#-installation-and-setup)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [License](#-license)

## 📝 Project Description

The project consists of two main components:

1. **Backend (NestJS)** - Provides an API for retrieving vessel data, emissions, and calculates deviations from baseline values.
2. **Frontend (Next.js + Highcharts)** - Interactive interface for data visualization.

## 🛠 Technology Stack

### Backend

- **Node.js** (v18+)
- **NestJS** - Framework for building server-side applications
- **Prisma** - ORM for database operations
- **PostgreSQL** - Relational database
- **TypeScript** - Typed superset of JavaScript

### Frontend

- **Next.js** - React framework with SSR/SSG support
- **React Query** - State management and data caching
- **Highcharts** - Library for creating interactive charts
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - JavaScript with type checking

## 🚀 Installation and Setup

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL (or another Prisma-supported database)
- npm or yarn

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd vessel-test-task
   ```

2. **Set up the database**

   - Create a PostgreSQL database
   - Update the database connection in the `.env` file

3. **Install dependencies and start the backend**

   ```bash
   cd backend
   npm install
   npx prisma generate
   npx prisma migrate dev
   npm run start:dev
   ```

4. **Install dependencies and start the frontend**

   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

5. **Open your browser**
   - Frontend will be available at: http://localhost:3001
   - API will be available at: http://localhost:3003
   - Documentation will be available at: http://localhost:3003/api

## 📁 Project Structure

```
vessel-test-task/
├── backend/                 # NestJS Backend
│   ├── src/
│   │   ├── app/            # Main application module
│   │   ├── common/         # Shared modules and utilities
│   │   ├── emissions/      # Emissions module
│   │   ├── pp/            # Poseidon Principles calculations module
│   │   ├── prisma/        # Database schema and migrations
│   │   └── vessel/        # Vessels module
│   └── prisma/
│       └── schema.prisma  # Database schema
│
└── frontend/              # Next.js Frontend
    ├── src/
    │   ├── app/          # Application pages (App Router)
    │   ├── components/   # React components
    │   └── lib/          # Utilities and API client
    └── public/           # Static files
```

## 🌐 API Endpoints

### Vessels

- `GET /vessels` - Get all vessels
- `GET /vessels/:id` - Get vessel details by ID

### Emissions

- `GET /emissions` - Get emissions data
- `GET /emissions/by-vessel` - Get total emissions by vessel
- `GET /emissions/by-date` - Get emissions by date

### Poseidon Principles

- `GET /poseidon-principles/references` - Get reference data
- `GET /poseidon-principles/deviations` - Get deviations for all vessels
- `GET /poseidon-principles/deviations/vessel/:vesselId` - Get deviations for a specific vessel

## 🚀 Deployment

### Production Build

```bash
# Backend
cd backend
npm run build
npm run start:prod

# Frontend
cd ../frontend
npm run build
npm start
```

### Docker

```bash
# Run with Docker Compose
docker-compose up --build
```

## 📄 License

@Developed for a test assignment by Vasyl Liutan. 2025.
