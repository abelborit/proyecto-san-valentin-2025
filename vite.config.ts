import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/proyecto-san-valentin-2025/", // especificar la ruta base para la aplicación para usar rutas relativas
})
