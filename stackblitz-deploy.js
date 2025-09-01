// StackBlitz deployment configuration for Arête
// This file helps deploy the project to StackBlitz for instant cloud deployment

const projectConfig = {
  title: 'Arête - Personal Project Manager',
  description: 'AI-powered personal project and task management application',
  template: 'react-ts',
  files: {
    // This would contain all the project files
    // StackBlitz will automatically detect and import them
  },
  dependencies: {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.15.0",
    "@supabase/supabase-js": "^2.38.0",
    "@tanstack/react-query": "^4.35.0",
    "date-fns": "^2.30.0",
    "lucide-react": "^0.279.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^1.14.0",
    "@google/generative-ai": "^0.2.1",
    "xlsx": "^0.18.5",
    "jspdf": "^2.5.1"
  },
  devDependencies: {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "typescript": "^5.0.2",
    "vite": "^4.4.5",
    "tailwindcss": "^3.3.3",
    "autoprefixer": "^10.4.15",
    "postcss": "^8.4.29"
  }
};

// Instructions for manual StackBlitz deployment:
// 1. Go to https://stackblitz.com/
// 2. Click "Create a new project"
// 3. Select "React TypeScript"
// 4. Replace the default files with your Arête project files
// 5. Install dependencies via the terminal
// 6. Run the development server

console.log('Arête project ready for StackBlitz deployment!');
console.log('Visit: https://stackblitz.com/ to deploy');
