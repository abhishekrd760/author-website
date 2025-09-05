# Admin System Documentation

## Overview
The admin system provides secure authentication and management capabilities for the author website. It includes a complete dashboard for managing reviews, contact messages, and user interactions.

## Features

### 🔐 Admin Authentication
- **Fixed Username/Password**: `admin` / `admin123` (pre-configured in database)
- **No New User Registration**: Only existing admin users can access the system
- **Session Management**: Secure cookie-based sessions with 24-hour expiration
- **Auto-redirect**: Authenticated users are redirected to dashboard

### 📊 Dashboard Overview
- **Real-time Statistics**: View total messages, unread count, reviews, and activity
- **Quick Actions**: Direct access to review and message management
- **Recent Activity Tracking**: Monitor new messages and reviews from the last 7 days

### 💬 Review Management
- **View All Reviews**: Paginated list of customer reviews with book information
- **Reply to Reviews**: Send public replies that appear on the website
- **Reply Tracking**: See which reviews have been replied to
- **Star Rating Display**: Visual rating representation for each review

### 📧 Message Management
- **Contact Message Inbox**: View all messages from the contact form
- **Filtering Options**: Filter by All, Unread, Read, or Replied messages
- **Mark as Read**: Track which messages have been reviewed
- **Email Reply Button**: Placeholder for email integration (shows alert currently)
- **Status Tracking**: Monitor reply status for each message

## Access URLs

### Admin Login
```
http://localhost:3000/admin/login
```
**Credentials:**
- Username: `admin`
- Password: `admin123`

### Admin Dashboard
```
http://localhost:3000/admin/dashboard
```

### Review Management
```
http://localhost:3000/admin/reviews
```

### Message Management
```
http://localhost:3000/admin/messages
```

## Database Schema

### Admin Users Table
```sql
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP
);
```

### Admin Sessions Table
```sql
CREATE TABLE admin_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES admin_users(id) ON DELETE CASCADE,
    session_token TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Enhanced Contact Messages
```sql
-- Added columns to existing table
ALTER TABLE contact_messages ADD COLUMN is_read BOOLEAN DEFAULT FALSE;
ALTER TABLE contact_messages ADD COLUMN replied BOOLEAN DEFAULT FALSE;
```

### Replies Table
```sql
CREATE TABLE replies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
    reply_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## Security Features

- **Password Hashing**: bcrypt with salt for secure password storage
- **Session Tokens**: Cryptographically secure random tokens
- **HTTP-Only Cookies**: Prevent XSS attacks on session tokens
- **Row Level Security**: Database-level access controls
- **Session Expiration**: Automatic cleanup of expired sessions

## Public Integration

### Review Replies
Admin replies to reviews are automatically displayed on:
- Individual book pages (`/books/[id]`)
- Reviews page (`/reviews`)
- Styled with distinct blue/author theme

### Visual Integration
- Replies show "Author Reply:" label
- Date timestamps for both review and reply
- Responsive design matching site theme
- Blue highlight to distinguish admin responses

## Development Notes

### API Endpoints
- `POST /api/admin/login` - Admin authentication
- `POST /api/admin/logout` - Session termination
- `GET /api/admin/verify` - Session verification
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/messages` - Contact messages (with filtering)
- `PATCH /api/admin/messages` - Update message status
- `GET /api/admin/reviews` - Reviews with pagination
- `POST /api/admin/reviews` - Submit reply to review

### Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### File Structure
```
src/
├── app/admin/
│   ├── layout.tsx          # Admin provider wrapper
│   ├── login/page.tsx      # Login form
│   ├── dashboard/page.tsx  # Main dashboard
│   ├── reviews/page.tsx    # Review management
│   └── messages/page.tsx   # Message management
├── app/api/admin/
│   ├── login/route.ts      # Authentication API
│   ├── logout/route.ts     # Logout API
│   ├── verify/route.ts     # Session verification
│   ├── dashboard/route.ts  # Dashboard data
│   ├── messages/route.ts   # Message operations
│   └── reviews/route.ts    # Review operations
├── lib/
│   ├── admin-api.ts        # Admin database operations
│   └── admin-context.tsx   # React context & hooks
└── database/
    └── schema.sql          # Complete database schema
```

## Usage Instructions

1. **Initial Setup**: Database schema is already configured with sample admin user
2. **Login**: Navigate to `/admin/login` and use credentials above
3. **Dashboard**: Review overview statistics and quick actions
4. **Manage Reviews**: Reply to customer reviews (appears publicly)
5. **Handle Messages**: Mark messages as read and track replies
6. **Logout**: Use logout button to end session securely

## Future Enhancements

- Email integration for direct message replies
- Multiple admin user support
- Advanced analytics and reporting
- Automated response templates
- Message priority system
- Review moderation capabilities
