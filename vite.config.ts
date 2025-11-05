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
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
      output: {
        manualChunks: (id) => {
          // Core React (only essential)
          if (id.includes('react-dom/client') || id.includes('react/jsx-runtime')) {
            return 'react-core';
          }
          // React runtime (deferred)
          if (id.includes('react') && !id.includes('react-dom/client') && !id.includes('react/jsx-runtime')) {
            return 'react-vendor';
          }
          // UI framework - split by usage frequency
          if (id.includes('@radix-ui/react-toast') || id.includes('@radix-ui/react-slot') || id.includes('@radix-ui/react-label')) {
            return 'ui-core';
          }
          if (id.includes('@radix-ui')) {
            return 'ui-vendor';
          }
          // Router (critical for SPA)
          if (id.includes('react-router')) {
            return 'router';
          }
          // Data fetching - defer to lazy-loaded pages
          if (id.includes('@tanstack/react-query/build')) {
            return 'query-core';
          }
          if (id.includes('@tanstack/react-query')) {
            return 'query-vendor';
          }
          // Don't bundle Supabase into vendor chunks - let it load with pages that need it
          // This reduces initial bundle size since Supabase is only used in admin/contact pages
          // Utility libraries (defer most)
          if (id.includes('clsx') || id.includes('tailwind-merge')) {
            return 'utils-core';
          }
          if (id.includes('lodash') || id.includes('date-fns') || id.includes('class-variance-authority')) {
            return 'utils';
          }
          // Icons (defer until components load)
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          // Charts (heavy, defer)
          if (id.includes('recharts')) {
            return 'charts';
          }
          // Form libraries (defer)
          if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) {
            return 'forms';
          }
          // Animation libraries (defer)
          if (id.includes('embla-carousel') || id.includes('vaul') || id.includes('sonner')) {
            return 'animations';
          }
          // Heavy components (lazy load)
          if (id.includes('Gallery') || id.includes('Contact') || id.includes('Map') || id.includes('Services')) {
            return 'lazy-components';
          }
          // Non-critical UI components
          if (id.includes('ui/accordion') || id.includes('ui/alert') || id.includes('ui/calendar') || 
              id.includes('ui/chart') || id.includes('ui/command') || id.includes('ui/context-menu') ||
              id.includes('ui/dropdown-menu') || id.includes('ui/hover-card') || id.includes('ui/menubar') ||
              id.includes('ui/navigation-menu') || id.includes('ui/popover') || id.includes('ui/scroll-area') ||
              id.includes('ui/select') || id.includes('ui/sheet') || id.includes('ui/sidebar') ||
              id.includes('ui/table') || id.includes('ui/tabs') || id.includes('ui/tooltip') ||
              id.includes('ui/carousel') || id.includes('ui/drawer') || id.includes('ui/input-otp')) {
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
        pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug'] : [],
        reduce_vars: true,
        reduce_funcs: true,
        passes: 3,
        unsafe: true,
        unsafe_arrows: true,
        unsafe_methods: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        keep_fargs: false,
        dead_code: true,
        unused: true,
        side_effects: true,
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
