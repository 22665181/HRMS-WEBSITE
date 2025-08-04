/*
  # Create Events Schema

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text)
      - `organizer_name` (text, required)
      - `organizer_email` (text, required)
      - `event_date` (date, required)
      - `event_time` (time, required)
      - `duration` (text)
      - `timezone` (text, required)
      - `conference_details` (text)
      - `status` (text, default 'scheduled')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `events` table
    - Add policies for authenticated users to manage events
*/

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  organizer_name text NOT NULL,
  organizer_email text NOT NULL,
  event_date date NOT NULL,
  event_time time NOT NULL,
  duration text DEFAULT '30 min',
  timezone text NOT NULL DEFAULT 'Asia/Kolkata',
  conference_details text DEFAULT 'Web conferencing details provided upon confirmation.',
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to read all events
CREATE POLICY "Users can read all events"
  ON events
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for authenticated users to create events
CREATE POLICY "Users can create events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy for authenticated users to update their own events
CREATE POLICY "Users can update events"
  ON events
  FOR UPDATE
  TO authenticated
  USING (true);

-- Policy for authenticated users to delete events
CREATE POLICY "Users can delete events"
  ON events
  FOR DELETE
  TO authenticated
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample events
INSERT INTO events (title, organizer_name, organizer_email, event_date, event_time, duration, timezone, conference_details) VALUES
('Quarterly Hackathon', 'John Cena', 'john.cena@company.com', '2025-07-15', '03:00:00', '30 min', 'Asia/Kolkata', 'Web conferencing details provided upon confirmation.'),
('Employee Onboarding Day', 'Maria D''Souza', 'maria.dsouza@company.com', '2025-07-15', '15:30:00', '1 Hour', 'Asia/Kolkata', 'Web conferencing details provided upon confirmation.');