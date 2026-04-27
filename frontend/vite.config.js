import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    outDir: "dist",
  },

  preview: {
    host: "0.0.0.0",
    port: process.env.PORT,
    allowedHosts: [
      "candidai-version-1-1.onrender.com"
    ]
  }
})
