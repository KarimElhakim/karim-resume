# Karim Elhakim - Resume Website

A modern, responsive resume website built with React and Vite, inspired by HTML5 UP templates.

## Features

- 🎨 Modern, clean design inspired by HTML5 UP templates
- 📱 Fully responsive layout
- ⚡ Fast and optimized with Vite
- 🚀 Easy deployment to GitHub Pages

## Tech Stack

- React 19
- Vite
- HTML5/CSS3

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd react-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Deployment to GitHub Pages

### Option 1: Automatic Deployment with GitHub Actions (Recommended)

1. Push your code to GitHub
2. Go to your repository Settings → Pages
3. Under "Source", select "GitHub Actions"
4. The workflow will automatically deploy when you push to the `main` branch

### Option 2: Manual Deployment

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Update `vite.config.js` base path to match your repository name:
```js
base: '/your-repo-name/',
```

3. Deploy:
```bash
npm run deploy
```

### Option 3: Using Vercel or Netlify

For easier deployment with custom domains:

- **Vercel**: Connect your GitHub repo at [vercel.com](https://vercel.com)
- **Netlify**: Connect your GitHub repo at [netlify.com](https://netlify.com)

Both platforms will automatically deploy on every push.

## Configuration

### Update Base Path

If deploying to a custom domain or root path, update `vite.config.js`:

```js
base: '/', // For custom domain or root deployment
```

### Update Repository Name

If your GitHub repository has a different name, update the base path in `vite.config.js`:

```js
base: '/your-repo-name/',
```

## License

This project is open source and available under the MIT License.
