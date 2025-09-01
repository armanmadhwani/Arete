# Arête Deployment Guide

## Prerequisites Setup

### 1. Install Node.js
1. Download Node.js 18+ from https://nodejs.org/
2. Run the installer and follow the setup wizard
3. Verify installation: `node --version` and `npm --version`

### 2. Install Dependencies
```bash
cd C:\Users\ArmanMadhwani\CascadeProjects\Arete
npm install
```

## Environment Configuration

### 1. Create Production Environment File
Create `.env.production` with your actual values:
```env
VITE_SUPABASE_URL=your_actual_supabase_url
VITE_SUPABASE_ANON_KEY=your_actual_supabase_anon_key
VITE_GEMINI_API_KEY=AIzaSyBYog0ePAO3hCiw8HoI9IPX4ixLLPtg490
VITE_GEMINI_MODEL=gemini-1.5-pro
```

### 2. Update Netlify Configuration
Edit `netlify.toml` with your actual Supabase credentials:
```toml
[context.production.environment]
  VITE_SUPABASE_URL = "your_actual_supabase_url"
  VITE_SUPABASE_ANON_KEY = "your_actual_supabase_anon_key"
  VITE_GEMINI_API_KEY = "AIzaSyBYog0ePAO3hCiw8HoI9IPX4ixLLPtg490"
  VITE_GEMINI_MODEL = "gemini-1.5-pro"
```

## Deployment Options

### Option 1: Netlify CLI (Recommended)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the application
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

### Option 2: Netlify Drag & Drop
1. Build the application: `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag the `dist` folder to deploy
4. Set environment variables in Netlify dashboard

### Option 3: Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Build and deploy
npm run build
vercel --prod
```

### Option 4: GitHub Pages
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Set up GitHub Actions for automatic deployment

## Database Setup (Supabase)

### 1. Create Supabase Project
1. Go to https://supabase.com/
2. Create a new project
3. Copy the project URL and anon key

### 2. Run Database Migration
1. Go to SQL Editor in Supabase dashboard
2. Run the SQL from `supabase-schema.sql`
3. Verify tables are created with sample data

### 3. Configure Authentication
1. Enable Email authentication in Supabase Auth settings
2. Configure email templates (optional)
3. Set up RLS policies (recommended for production)

## Build and Test Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

## Post-Deployment Steps

### 1. Test Core Features
- [ ] User registration and login
- [ ] Project creation and management
- [ ] Task management and progress tracking
- [ ] AI performance analysis
- [ ] Report generation and download

### 2. Configure Custom Domain (Optional)
1. Purchase domain from registrar
2. Configure DNS settings
3. Add custom domain in hosting platform
4. Enable SSL certificate

### 3. Set Up Monitoring
- Enable error tracking (Sentry, LogRocket)
- Set up analytics (Google Analytics, Mixpanel)
- Configure uptime monitoring

## Troubleshooting

### Common Issues

**Build Errors:**
- Ensure all dependencies are installed: `npm install`
- Check Node.js version: `node --version` (should be 18+)
- Clear cache: `npm run build --clean`

**Environment Variables:**
- Verify all VITE_ prefixed variables are set
- Check Supabase URL and keys are correct
- Ensure Gemini API key is valid

**Database Connection:**
- Verify Supabase project is active
- Check database schema is properly migrated
- Ensure RLS policies allow access

**Authentication Issues:**
- Verify Supabase auth is enabled
- Check email provider configuration
- Ensure redirect URLs are configured

### Performance Optimization

**Build Optimization:**
- Enable code splitting in Vite config
- Optimize images and assets
- Use lazy loading for routes

**Runtime Performance:**
- Implement React Query caching
- Use React.memo for expensive components
- Optimize database queries

## Security Checklist

- [ ] Environment variables secured
- [ ] API keys not exposed in client code
- [ ] Supabase RLS policies enabled
- [ ] HTTPS enabled on custom domain
- [ ] Input validation implemented
- [ ] Error messages don't expose sensitive data

## Backup and Recovery

### Database Backup
1. Use Supabase automatic backups
2. Export data regularly via SQL
3. Store backups in secure location

### Code Backup
1. Use Git version control
2. Push to remote repository
3. Tag releases for rollback capability

---

**Ready to Deploy!** 🚀

Your Arête application is now ready for deployment. Follow the steps above based on your preferred hosting platform.
