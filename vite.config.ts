import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React ecosystem
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-vendor';
          }
          // UI framework
          if (id.includes('@radix-ui')) {
            return 'ui-vendor';
          }
          // Router
          if (id.includes('react-router')) {
            return 'router';
          }
          // Query/data fetching
          if (id.includes('@tanstack/react-query') || id.includes('supabase')) {
            return 'data-vendor';
          }
          // Utility libraries
          if (id.includes('lodash') || id.includes('date-fns') || id.includes('clsx') || id.includes('class-variance-authority')) {
            return 'utils';
          }
          // Icons and assets
          if (id.includes('lucide-react') || id.includes('recharts')) {
            return 'icons-charts';
          }
          // Heavy components that are conditionally loaded
          if (id.includes('Gallery') || id.includes('Contact') || id.includes('Map')) {
            return 'lazy-components';
          }
        },
      },
    },
    // Enhanced tree shaking and minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        pure_funcs: mode === 'production' ? ['console.log', 'console.info'] : [],
        reduce_vars: true,
        reduce_funcs: true,
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
    },
    // Improve bundle analysis
    chunkSizeWarningLimit: 500,
  },
}));
