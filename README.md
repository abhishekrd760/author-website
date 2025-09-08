# 🌟 Cosmic Author Website

A modern, cosmic-themed author website built with Next.js 15, featuring stunning 3D animations, visitor tracking, and a complete admin dashboard. Experience the intersection of spirituality and technology with cosmic cursors, floating books, and ethereal backgrounds.

## ✨ Features

### 🌌 Cosmic Experience
- **Custom Cosmic Cursor** - Interactive cursor with glow effects and perfect positioning
- **3D Floating Books** - Animated book covers with physics-based movement
- **Cosmic Background** - Animated starfield with particle effects
- **Spiritual Typography** - Custom fonts with cosmic gradients and animations

### 📚 Public Features
- **Hero Landing Page** - Cosmic-themed introduction with animated elements
- **About Page** - Author journey with consciousness philosophy and cosmic design
- **Books Showcase** - 3D book gallery with hover effects and detailed pages
- **Individual Book Pages** - Detailed book information with review system
- **Reviews System** - Readers can leave reviews and ratings without registration
- **Contact Form** - Email integration with auto-replies
- **Responsive Design** - Works perfectly on all devices

### Admin Features
- **Protected Dashboard** - Login-protected admin area
- **Review Management** - View and reply to reader reviews
- **Contact Management** - View and respond to contact form submissions
- **Analytics Dashboard** - View stats and metrics

### Technical Features
- **Framer Motion Animations** - Smooth, professional animations throughout
- **Database Integration** - PostgreSQL with Supabase
- **Email Integration** - Nodemailer for contact form notifications
- **Authentication** - JWT-based admin authentication
- **SEO Optimized** - Meta tags, structured data, and performance optimized

## 🛠 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library

### Backend
- **Next.js API Routes** - Serverless backend functions
- **Supabase** - PostgreSQL database with real-time features
- **Nodemailer** - Email functionality
- **JWT** - Authentication tokens

### Deployment Ready
- **Vercel** - Optimized for Vercel deployment
- **Environment Variables** - Secure configuration management

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd author-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database Configuration (Supabase)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

   # Email Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password

   # Author Email
   AUTHOR_EMAIL=author@example.com

   # Authentication Secret
   JWT_SECRET=your_jwt_secret_here

   # Site Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Set up the database**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Run the SQL script in `database/schema.sql` in your Supabase SQL editor
   - Update the environment variables with your Supabase credentials

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄 Database Schema

The application uses the following PostgreSQL tables:

- **authors** - Author profile information
- **books** - Book details and metadata
- **reviews** - Reader reviews and ratings
- **replies** - Author replies to reviews
- **contact_messages** - Contact form submissions
- **users** - Admin authentication

See `database/schema.sql` for the complete schema with sample data.

## 🔐 Admin Access

### Demo Credentials
- **Username**: `author`
- **Password**: `authorpass123`

### Dashboard Features
- View and manage reader reviews
- Respond to contact form messages
- View website analytics and stats

Access the dashboard at: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

## 📧 Email Configuration

The contact form uses Nodemailer to send emails. Configure your email provider:

### Gmail Setup
1. Enable 2-factor authentication
2. Generate an app password
3. Use the app password in `SMTP_PASS`

### Other Providers
Update the SMTP settings in `.env.local` according to your email provider's documentation.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The application can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📁 Project Structure

```
author-website/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/             # About page
│   │   ├── books/             # Books listing and detail pages
│   │   ├── contact/           # Contact form
│   │   ├── dashboard/         # Admin dashboard
│   │   ├── reviews/           # Reviews page
│   │   └── api/               # API routes
│   ├── components/            # Reusable React components
│   ├── lib/                   # Utility functions and configurations
│   └── types/                 # TypeScript type definitions
├── public/
│   └── images/                # Static images and assets
├── database/
│   └── schema.sql             # Database schema and sample data
└── README.md
```

## 🎨 Customization

### Styling
- Update colors in `tailwind.config.js`
- Modify global styles in `src/app/globals.css`
- Customize animations in component files

### Content
- Update author information in component files
- Replace placeholder images in `public/images/`
- Modify book data in the database or fallback data

### Features
- Add new pages by creating files in `src/app/`
- Extend the database schema as needed
- Add new API routes in `src/app/api/`

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features
1. Create new components in `src/components/`
2. Add new pages in `src/app/`
3. Update types in `src/types/`
4. Add API routes in `src/app/api/`

## 📈 Performance

The website is optimized for performance:
- **Image Optimization** - Next.js automatic image optimization
- **Code Splitting** - Automatic code splitting by Next.js
- **SEO** - Meta tags and structured data
- **Caching** - Proper caching headers and strategies

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check Supabase credentials in `.env.local`
   - Ensure database schema is properly set up

2. **Email Not Sending**
   - Verify SMTP credentials
   - Check email provider settings
   - Look for errors in server logs

3. **Authentication Issues**
   - Ensure JWT_SECRET is set
   - Check cookie settings in browser

4. **Images Not Loading**
   - Verify image files exist in `public/images/`
   - Check file extensions match imports

## 📞 Support

For questions or issues:
- Check the troubleshooting section above
- Review the Next.js documentation
- Check the Supabase documentation
- Open an issue in the project repository

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**
