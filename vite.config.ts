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
          // UI framework - split further
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
          // Icons and charts (separate for better caching)
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          if (id.includes('recharts')) {
            return 'charts';
          }
          // Heavy components that are conditionally loaded
          if (id.includes('Gallery') || id.includes('Contact') || id.includes('Map')) {
            return 'lazy-components';
          }
          // Split UI components that aren't used on initial load
          if (id.includes('ui/accordion') || id.includes('ui/alert') || id.includes('ui/calendar') || 
              id.includes('ui/chart') || id.includes('ui/command') || id.includes('ui/context-menu') ||
              id.includes('ui/dropdown-menu') || id.includes('ui/hover-card') || id.includes('ui/menubar') ||
              id.includes('ui/navigation-menu') || id.includes('ui/popover') || id.includes('ui/scroll-area') ||
              id.includes('ui/select') || id.includes('ui/sheet') || id.includes('ui/sidebar') ||
              id.includes('ui/table') || id.includes('ui/tabs') || id.includes('ui/tooltip')) {
            return 'ui-extended';
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
