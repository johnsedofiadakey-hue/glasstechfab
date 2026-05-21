// Build from this worktree, output to main project dist for firebase deploy.
// Deploy command: cd /Users/truth/Developer/glasstechfab && bash deploy.sh
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  build: {
    // Resolve to main project dist regardless of where vite runs from
    outDir: path.resolve(__dirname, '../../../dist'),
    emptyOutDir: true,
  },
  plugins: [
    react(),
  ],
})
