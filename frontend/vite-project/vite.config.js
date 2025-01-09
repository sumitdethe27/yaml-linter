import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['monaco-editor'],
  },
  build: {
    rollupOptions: {
      external: ['monaco-editor'],
      output: {
        // Ensure proper module formats and file naming
        format: 'es',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    // Ensure source maps are generated
    sourcemap: true,
    // Optimize output
    minify: 'esbuild',
    // Ensure proper chunks
    chunkSizeWarningLimit: 1000,
  },
  define: {
    'process.env': {},
  },
  server: {
    // Handle CORS during development
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/javascript'
    }
  }
})
