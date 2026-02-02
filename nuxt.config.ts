// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['./app/assets/css/main.css'],
  typescript: { typeCheck: false },
  vite: {
    plugins: [tailwindcss()]
  },
  modules: ['@pinia/nuxt']
});
