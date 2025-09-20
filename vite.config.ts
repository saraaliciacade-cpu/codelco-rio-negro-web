import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      'Cache-Control': mode === 'production' ? 'public, max-age=31536000' : 'no-cache'
    }
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    assetsInlineLimit: 0, // Don't inline small assets to allow proper caching
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React (absolute minimum for initial render)
          if (id.includes('react/jsx-runtime') || id.includes('react-dom/client')) {
            return 'react-core';
          }
          // React hooks and utilities (defer)
          if (id.includes('react') && !id.includes('react/jsx-runtime') && !id.includes('react-dom/client')) {
            return 'react-hooks';
          }
          // Router (critical for SPA but can be chunked)
          if (id.includes('react-router')) {
            return 'router';
          }
          // UI essentials (only for visible elements)
          if (id.includes('@radix-ui/react-slot') || id.includes('@radix-ui/react-primitive')) {
            return 'ui-primitives';
          }
          // Toast/notifications (defer until used)
          if (id.includes('@radix-ui/react-toast') || id.includes('sonner')) {
            return 'ui-notifications';
          }
          // Other UI components (defer)
          if (id.includes('@radix-ui')) {
            return 'ui-components';
          }
          // Data fetching (defer completely until needed)
          if (id.includes('@tanstack/react-query')) {
            return 'query-vendor';
          }
          if (id.includes('supabase')) {
            return 'supabase';
          }
          // Essential utilities only
          if (id.includes('clsx') || id.includes('tailwind-merge')) {
            return 'utils-essential';
          }
          // Non-essential utilities (defer)
          if (id.includes('class-variance-authority') || id.includes('date-fns')) {
            return 'utils-extended';
          }
          // Icons (defer until components load)
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          // Heavy features (defer completely)
          if (id.includes('recharts')) {
            return 'charts';
          }
          if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) {
            return 'forms';
          }
          if (id.includes('embla-carousel') || id.includes('vaul')) {
            return 'carousel';
          }
          // Page components (lazy load completely)
          if (id.includes('Gallery') || id.includes('Contact') || id.includes('Map') || 
              id.includes('Services') || id.includes('Company') || id.includes('Clients')) {
            return 'page-components';
          }
          // Non-critical UI (defer completely)
          if (id.includes('ui/')) {
            return 'ui-deferred';
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
        passes: 3,
        unsafe: true,
        unsafe_arrows: true,
        unsafe_methods: true,
        keep_fargs: false,
      },
      mangle: {
        safari10: true,
        properties: {
          regex: /^_/
        }
      },
      format: {
        comments: false,
      },
    },
    // Improve bundle analysis and splitting
    chunkSizeWarningLimit: 300,
    cssCodeSplit: true,
  },
}));
