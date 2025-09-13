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

-- Index
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_created_by ON events(created_by);

-- Sample data
INSERT INTO events (created_by, title, description, duration, start_time, end_time, event_date) VALUES
(1, 'John Birthday Party', 'Birthday celebration at the park', 180, '14:00:00', '17:00:00', '2025-10-15'),
(2, '5th Wedding Anniversary', 'Romantic dinner celebration', 120, '19:00:00', '21:00:00', '2025-09-20'),
(3, 'Graduation Milestone', 'Celebrating college graduation', 240, '16:00:00', '20:00:00', '2025-12-10');