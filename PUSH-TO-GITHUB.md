# Push to GitHub - Quick Commands

After creating your GitHub repository, run these commands:

## Option 1: Using the script (Windows)

Just double-click: `deploy-to-github.bat`

## Option 2: Manual commands

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/karim-resume.git
git push -u origin main
```

If you get an error that remote already exists, use:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/karim-resume.git
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to: https://github.com/YOUR_USERNAME/karim-resume/settings/pages
2. Under "Source", select **"GitHub Actions"**
3. Wait 1-2 minutes for deployment

## Your site will be live at:

https://YOUR_USERNAME.github.io/karim-resume/

---

**Note:** If you used a different repository name, update `vite.config.js` and change `REPO_NAME` to match your repository name.

