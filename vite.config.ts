import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Lovable-compatible Vite configuration. No secrets or API keys here.
export default defineConfig({
  plugins: [react()],
})
