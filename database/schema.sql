-- Authors table
CREATE TABLE authors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  bio TEXT,
  photo_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Books table
CREATE TABLE books (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  author_id UUID REFERENCES authors(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  cover_image_url VARCHAR(500),
  publication_date DATE,
  buy_link VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  reviewer_name VARCHAR(255) NOT NULL,
  review_text TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Replies table
CREATE TABLE replies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
  reply_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Messages table
CREATE TABLE contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  replied BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Users table (separate from regular users)
CREATE TABLE admin_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin Sessions table for session management
CREATE TABLE admin_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  admin_id UUID REFERENCES admin_users(id) ON DELETE CASCADE,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table (for author login)
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample author data
INSERT INTO authors (id, name, bio, photo_url) VALUES 
(
  '550e8400-e29b-41d4-a716-446655440000',
  'Jane Doe',
  'Jane Doe is a bestselling author with over 10 years of experience writing captivating fiction novels. Her works have been translated into multiple languages and have touched the hearts of readers worldwide.',
  '/images/author-photo.jpg'
);

-- Insert sample books
INSERT INTO books (author_id, title, description, cover_image_url, publication_date, buy_link) VALUES 
(
  '550e8400-e29b-41d4-a716-446655440000',
  'The Midnight Garden',
  'A haunting tale of mystery and romance set in Victorian England. When Sarah inherits her grandmother''s estate, she discovers secrets that have been buried for generations.',
  '/images/book1-cover.jpg',
  '2023-03-15',
  'https://amazon.com/midnight-garden'
),
(
  '550e8400-e29b-41d4-a716-446655440000',
  'Whispers in the Wind',
  'An epic fantasy adventure that follows a young mage on her quest to save her kingdom from an ancient evil. Magic, friendship, and courage collide in this unforgettable story.',
  '/images/book2-cover.jpg',
  '2022-11-08',
  'https://amazon.com/whispers-wind'
),
(
  '550e8400-e29b-41d4-a716-446655440000',
  'City of Dreams',
  'A contemporary romance set in bustling New York City. Two ambitious professionals find love in the most unexpected places while chasing their dreams.',
  '/images/book3-cover.jpg',
  '2024-01-20',
  'https://amazon.com/city-dreams'
);

-- Insert sample reviews
INSERT INTO reviews (book_id, reviewer_name, review_text, rating) VALUES 
(
  (SELECT id FROM books WHERE title = 'The Midnight Garden'),
  'BookLover123',
  'Absolutely captivating! I couldn''t put this book down. The characters were so well-developed and the mystery kept me guessing until the very end.',
  5
),
(
  (SELECT id FROM books WHERE title = 'The Midnight Garden'),
  'ReadingEnthusiast',
  'Beautiful writing and atmospheric setting. The Victorian England backdrop was perfectly researched and brought to life.',
  4
),
(
  (SELECT id FROM books WHERE title = 'Whispers in the Wind'),
  'FantasyFan',
  'Amazing world-building and magical system. The protagonist''s journey was inspiring and the supporting characters were memorable.',
  5
);

-- Insert sample user (password: 'authorpass123')
INSERT INTO users (username, password_hash) VALUES 
('author', '$2b$10$rN7VX7o6.gJ4lN9m2L8GJeOt4U5F6P2Q8R9S3T0U1V2W3X4Y5Z6A7B');

-- Insert admin user (username: 'admin', password: 'admin123')
INSERT INTO admin_users (username, password_hash, full_name, role) VALUES 
('admin', '$2b$10$7gNkSqNgngVPdW2/s5GsWuvg2D2AivYDCDPbrOOKNnj.jjsOZHxtC', 'Kazutoshi Yoshida', 'super_admin');

-- Insert sample contact messages
INSERT INTO contact_messages (name, email, subject, message, is_read) VALUES 
('John Reader', 'john@example.com', 'Book Signing Event', 'Hi Tori, I loved your latest book! Will you be doing any book signing events in New York?', false),
('Sarah Wilson', 'sarah.w@email.com', 'Interview Request', 'Hello, I''m a journalist with BookWorld Magazine. Would you be interested in an interview about your writing process?', false),
('Mike Thompson', 'mike.t@bookclub.com', 'Book Club Invitation', 'Our book club has selected your novel for next month. Would you like to join our virtual discussion?', true);

-- Enable Row Level Security
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for authors" ON authors FOR SELECT USING (true);
CREATE POLICY "Public read access for books" ON books FOR SELECT USING (true);
CREATE POLICY "Public read access for reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public read access for replies" ON replies FOR SELECT USING (true);

-- Allow public inserts for reviews and contact messages
CREATE POLICY "Public insert access for reviews" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access for contact messages" ON contact_messages FOR INSERT WITH CHECK (true);

-- Admin policies
CREATE POLICY "Admin read access for contact messages" ON contact_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin update access for contact messages" ON contact_messages FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin insert access for replies" ON replies FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin read access for admin users" ON admin_users FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin access for sessions" ON admin_sessions FOR ALL TO authenticated USING (true);
