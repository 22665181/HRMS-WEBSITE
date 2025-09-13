# HRMS Backend

A **Human Resource Management System Backend** built with **Node.js, Express, PostgreSQL**.  
This service provides APIs for managing events and can be extended to handle other HRMS modules.

---

##  Features

- Event Management (CRUD APIs)
- PostgreSQL database integration (Dockerized setup)
- Environment configuration with **dotenv**
- API security with **CORS**

---

##  Tech Stack

- **Backend Framework**: [Express.js](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (Dockerized)


---

##  Setup & Installation

- **npm install**

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=Pass@admin

# Server Configuration
PORT=3000
NODE_ENV=development

# Docker Configuration
docker run --name postgres-db \
  -e POSTGRES_PASSWORD=Pass@admin \
  -p 5432:5432 \
  -d postgres

# Database Schema
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    created_by INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration INTEGER,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    event_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

# Start Development Server
 - npm run dev 
 - npm start




