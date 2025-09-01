# Quick Deploy Guide for Arête

## 🚀 Fastest Deployment Method (No Node.js Required)

### Option 1: Use GitHub Codespaces (Recommended)
1. Push your code to GitHub
2. Open GitHub Codespaces
3. Run deployment commands in the cloud environment

### Option 2: Use Netlify Drop (Manual)
1. Download a pre-built version from releases
2. Drag and drop to Netlify

### Option 3: Install Node.js and Deploy Locally

#### Step 1: Install Node.js
- Download from: https://nodejs.org/en/download/
- Choose "Windows Installer (.msi)" for 64-bit
- Run installer with default settings
- Restart your terminal/command prompt

#### Step 2: Deploy Your App
```bash
cd C:\Users\ArmanMadhwani\CascadeProjects\Arete
npm install
npm run build
```

#### Step 3: Deploy to Netlify
- Go to https://app.netlify.com/drop
- Drag the `dist` folder that was created
- Your app will be live instantly!

## 🔧 Environment Setup Required

Before deployment, you need:

1. **Supabase Account**: https://supabase.com/
   - Create new project
   - Copy URL and anon key
   - Run the SQL from `supabase-schema.sql`

2. **Update netlify.toml** with your Supabase credentials:
```toml
[context.production.environment]
  VITE_SUPABASE_URL = "your_actual_supabase_url"
  VITE_SUPABASE_ANON_KEY = "your_actual_supabase_anon_key"
  VITE_GEMINI_API_KEY = "AIzaSyBYog0ePAO3hCiw8HoI9IPX4ixLLPtg490"
  VITE_GEMINI_MODEL = "gemini-1.5-pro"
```

## ⚡ Alternative: Cloud-Based Deployment

### Using GitHub Codespaces:
1. Create GitHub repository
2. Push your Arête code
3. Open in Codespaces
4. Run: `npm install && npm run build`
5. Deploy the `dist` folder

### Using StackBlitz:
1. Go to https://stackblitz.com/
2. Import your project
3. Build and deploy directly from browser

Your Arête app is ready to deploy! 🎉
