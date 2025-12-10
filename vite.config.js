import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // For a user/organization site or custom domain, assets should be served from the root.
  // GitHub Pages will host this at https://arshja.in/ (via CNAME), so base must be '/'.
  base: '/',
})
