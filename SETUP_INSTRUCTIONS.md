# Supabase Database Setup Instructions

## Step 1: Access Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Select your project: `zsqrkausciflkzyddkhk`

## Step 2: Run the Database Schema
1. Click on "SQL Editor" in the left sidebar
2. Click "New query"
3. Copy and paste the ENTIRE content from `/database/schema.sql`
4. Click "Run" to execute the schema

## Step 3: Get Your Service Role Key
1. Go to "Settings" → "API" in your Supabase dashboard
2. Copy the "service_role" key (NOT the anon key)
3. Update your `.env.local` file:

```bash
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key_here
```

## Step 4: Test Admin Login
After completing the above steps:
- Username: `admin`
- Password: `admin123`

## What the Schema Creates:
- ✅ Authors table with sample data
- ✅ Books table with sample books
- ✅ Reviews table with sample reviews
- ✅ Contact messages table
- ✅ Admin users table with admin user
- ✅ Admin sessions table
- ✅ Replies table for admin responses
- ✅ Row Level Security policies

## If You Can't Access Supabase Dashboard:
If you don't have access to the Supabase dashboard, we can:
1. Switch to a local SQLite database, or
2. Use mock data for development

Let me know which option you prefer!
