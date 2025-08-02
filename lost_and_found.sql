-- PostgreSQL database dump
-- Normalized version with user_profile table

-- Drop legacy tables if needed
DROP TABLE IF EXISTS lost_items CASCADE;
DROP TABLE IF EXISTS found_items CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;

-- Create user_profiles (normalized)
CREATE TABLE public.user_profiles (
    user_id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    phone_number VARCHAR(15),
    address TEXT,
    email TEXT UNIQUE NOT NULL
);

-- Create lost_items table
CREATE TABLE public.lost_items (
    id SERIAL PRIMARY KEY,
    item_name TEXT NOT NULL,
    lost_date DATE NOT NULL,
    line TEXT,
    station TEXT,
    remarks TEXT,
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER REFERENCES user_profiles(user_id) ON DELETE CASCADE
);

-- Create found_items table
CREATE TABLE public.found_items (
    id SERIAL PRIMARY KEY,
    item_name TEXT NOT NULL,
    found_date DATE NOT NULL,
    line TEXT,
    station TEXT,
    remarks TEXT,
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER REFERENCES user_profiles(user_id) ON DELETE CASCADE
);

-- Create primary key constraints
ALTER TABLE ONLY public.lost_items ADD CONSTRAINT lost_items_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.found_items ADD CONSTRAINT found_items_pkey PRIMARY KEY (id);

-- Set sequences (optional: PostgreSQL does this automatically for SERIAL)
SELECT pg_catalog.setval('lost_items_id_seq', 1, false);
SELECT pg_catalog.setval('found_items_id_seq', 1, false);

-- Completed normalized schema setup
