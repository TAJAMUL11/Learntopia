import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // The repo lives on a Windows drive (/mnt/c/...) but the dev server runs in
    // WSL. WSL can't receive inotify file-change events across the Windows mount,
    // so HMR silently never fires. Polling makes Vite detect saves and hot-reload.
    watch: {
      usePolling: true,
      interval: 120,
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Split large third-party libraries into their own long-lived chunks.
        // These rarely change, so browsers keep them cached across app updates,
        // and the main app bundle stays small.
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'firebase-app': ['firebase/app'],
          'firebase-auth': ['firebase/auth'],
          'firebase-firestore': ['firebase/firestore'],
          'gsap-vendor': ['gsap', '@gsap/react'],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
})
