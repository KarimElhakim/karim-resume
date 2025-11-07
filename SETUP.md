# Quick Setup for GitHub Deployment

Follow these steps to deploy your resume website:

## 1. Update Repository Name

Edit `vite.config.js` and change `REPO_NAME` to your GitHub repository name:

```js
const REPO_NAME = 'your-repo-name' // Change this!
```

## 2. Initialize Git (if not already done)

```bash
git init
git add .
git commit -m "Initial commit: Resume website"
```

## 3. Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (remember the name!)
3. **Don't** initialize with README, .gitignore, or license

## 4. Connect and Push to GitHub

```bash
# Replace YOUR_USERNAME and YOUR_REPO_NAME
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## 5. Enable GitHub Pages

1. Go to your repository → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Wait 1-2 minutes for deployment

## 6. Your Site is Live!

Visit: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

---

**Need help?** Check `DEPLOYMENT.md` for detailed instructions and alternatives.

