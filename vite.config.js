import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// For GitHub Pages: Update the base path to match your repository name
// Example: if your repo is 'my-resume', change to '/my-resume/'
// For custom domain or root deployment, use: base: '/'
const REPO_NAME = 'karim-resume' // Change this to your GitHub repository name

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? `/${REPO_NAME}/` : '/',
})
