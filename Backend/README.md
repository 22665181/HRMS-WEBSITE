# HRMS Backend Setup Guide

## 🚀 Quick Setup

### 1. Prerequisites
- PostgreSQL installed and running
- Node.js installed
- pgAdmin4 (optional but recommended)

### 2. Database Setup

#### Create Database in PostgreSQL:
```sql
CREATE DATABASE hrms_database;
```

#### Run the SQL script:
1. Open pgAdmin4
2. Connect to your PostgreSQL server
3. Navigate to the `hrms_database`
4. Open Query Tool
5. Copy and paste the content from `database_setup.sql`
6. Execute the script

### 3. Environment Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update `.env` with your PostgreSQL credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hrms_database
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
PORT=5000
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Start the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## 📋 API Endpoints

### Events API
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event

### Health Check
- `GET /api/health` - Check server status

## 🧪 Testing the API

### Create Event (POST /api/events)
```json
{
  "title": "Team Meeting",
  "description": "Weekly team sync",
  "event_date": "2025-08-05",
  "event_time": "10:00",
  "timezone": "Asia/Kolkata",
  "location": "Conference Room A",
  "event_type": "meeting",
  "max_participants": 20,
  "organizer_name": "John Doe",
  "organizer_email": "john@example.com"
}
```

### Test with curl:
```bash
curl -X POST http://localhost:5000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Event",
    "description": "Test Description",
    "event_date": "2025-08-05",
    "event_time": "14:00",
    "organizer_name": "Test User",
    "organizer_email": "test@example.com"
  }'
```

## 🐛 Troubleshooting

### Common Issues:

1. **Server crashes on startup**
   - Check if PostgreSQL is running
   - Verify database credentials in `.env`
   - Ensure database exists

2. **Database connection errors**
   - Check PostgreSQL service status
   - Verify user permissions
   - Check firewall settings

3. **Port already in use**
   - Change PORT in `.env` file
   - Kill existing process: `npx kill-port 5000`

### Database Connection Test:
```bash
# Test database connection
psql -h localhost -U your_username -d hrms_database
```

## 📊 Database Schema

The `events` table structure:
- `id` (SERIAL PRIMARY KEY)
- `title` (VARCHAR NOT NULL)
- `description` (TEXT)
- `event_date` (DATE NOT NULL)
- `event_time` (TIME NOT NULL)
- `timezone` (VARCHAR)
- `location` (VARCHAR)
- `event_type` (VARCHAR)
- `max_participants` (INTEGER)
- `organizer_name` (VARCHAR NOT NULL)
- `organizer_email` (VARCHAR NOT NULL)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)
