import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  build: {
    outDir: "dist",
  },

  preview: {
    host: "0.0.0.0",                // ✅ required for Render
    port: process.env.PORT,         // ✅ bind to Render port
    allowedHosts: "all"             // ✅ allow Render domain
  }
})
