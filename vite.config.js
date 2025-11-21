import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const REPO_NAME = 'karim-resume'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? `/${REPO_NAME}/` : '/',
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    sourcemap: false,
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            if (id.includes('react-icons')) {
              return 'icons-vendor'
            }
            return 'vendor'
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) {
            return `assets/[ext]/[name]-[hash][extname]`
          }
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`
          }
          return `assets/[ext]/[name]-[hash][extname]`
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: true,
    assetsInlineLimit: 4096,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-icons'],
    exclude: [],
  },
  server: {
    hmr: {
      overlay: true,
    },
  },
})
