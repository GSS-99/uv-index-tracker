-- Clean up existing tables during local dev resets (drops in correct dependency order)
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS users;

-- 1. Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Profiles Table (1-to-1 relationship with Users)
CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  fitzpatrick_type INT CHECK (fitzpatrick_type BETWEEN 1 AND 6),
  preferred_spf INT DEFAULT 30
);

-- 3. Locations Table (1-to-Many relationship with Users)
CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  city_name VARCHAR(100) NOT NULL,
  latitude DECIMAL(9,6) NOT NULL,
  longitude DECIMAL(9,6) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Development Seed Data
-- Creates a baseline dev user (ID 1) so locations can be saved before Auth is built
INSERT INTO users (id, email) 
VALUES (1, 'dev@example.com') 
ON CONFLICT (id) DO NOTHING;

-- Seed an initial saved location
INSERT INTO locations (user_id, city_name, latitude, longitude) 
VALUES (1, 'San Francisco', 37.774900, -122.419400);