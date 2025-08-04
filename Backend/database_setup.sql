-- SQL script to create the events table in PostgreSQL
-- Run this in pgAdmin4 or your PostgreSQL client

CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    timezone VARCHAR(100) DEFAULT 'Asia/Kolkata',
    location VARCHAR(255),
    event_type VARCHAR(100) DEFAULT 'meeting',
    max_participants INTEGER DEFAULT 50,
    organizer_name VARCHAR(255) NOT NULL,
    organizer_email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on event_date for better query performance
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);

-- Create an index on organizer_email for faster lookups
CREATE INDEX IF NOT EXISTS idx_events_organizer ON events(organizer_email);

-- Insert some sample data (optional)
-- INSERT INTO events (
--     title, description, event_date, event_time, timezone, location, 
--     event_type, max_participants, organizer_name, organizer_email
-- ) VALUES 
-- (
--     'Team Standup Meeting', 
--     'Daily team standup to discuss progress and blockers',
--     '2025-08-05',
--     '09:00:00',
--     'Asia/Kolkata',
--     'Conference Room A',
--     'meeting',
--     10,
--     'John Doe',
--     'john.doe@company.com'
-- ),
-- (
--     'Project Planning Session',
--     'Planning session for the new HRMS features',
--     '2025-08-06',
--     '14:00:00',
--     'Asia/Kolkata',
--     'Virtual - Zoom',
--     'planning',
--     25,
--     'Jane Smith',
--     'jane.smith@company.com'
-- ) ON CONFLICT DO NOTHING;
