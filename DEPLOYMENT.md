# Deployment Guide

This guide will help you deploy your resume website to GitHub Pages so it can be accessed by everyone.

## Quick Start - GitHub Pages Deployment

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it (e.g., `karim-resume` or `my-resume`)
3. **Don't** initialize with README, .gitignore, or license (we already have these)

### Step 2: Update Repository Name in Config

1. Open `vite.config.js`
2. Change `REPO_NAME` to match your GitHub repository name:
```js
const REPO_NAME = 'your-repo-name' // Change this!
```

### Step 3: Initialize Git and Push to GitHub

```bash
# Navigate to your project
cd react-app

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Resume website"

# Add your GitHub repository as remote
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual values
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The GitHub Actions workflow will automatically deploy your site

### Step 5: Access Your Website

After deployment (usually takes 1-2 minutes), your site will be available at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

## Alternative: Deploy to Custom Domain

If you have a custom domain:

1. Update `vite.config.js`:
```js
base: '/', // Change from '/REPO_NAME/' to '/'
```

2. Add a `CNAME` file in the `public` folder with your domain name
3. Configure DNS settings with your domain provider

## Alternative: Deploy to Vercel or Netlify

### Vercel (Recommended for React apps)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Deploy! (It's automatic)

Your site will be available at: `https://your-project.vercel.app`

### Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Deploy!

## Troubleshooting

### Assets not loading correctly?

- Make sure the `base` path in `vite.config.js` matches your repository name
- Check that all paths start with the correct base path

### 404 errors?

- Ensure GitHub Actions workflow completed successfully
- Check the Actions tab in your GitHub repository

### Want to update the site?

Just push changes to the `main` branch - GitHub Actions will automatically redeploy!

## Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Build and deploy
npm run deploy
```

Then in GitHub Settings → Pages, select the `gh-pages` branch as source.

