import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 3000,     // có thể đổi sang 5173 hoặc 3001
    open: true,     // tự động mở trình duyệt khi chạy
    host: true      // cho phép truy cập từ bên ngoài (IP LAN)
  },
  define: {
    global: "globalThis",   // ← fixes "global is not defined" for SockJS
  },
})
