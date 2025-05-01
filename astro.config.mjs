import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import clerk from '@clerk/astro'
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';

export default defineConfig({
  integrations: [clerk(), react()],
  adapter: node({ mode: 'standalone' }),
  output: 'server',
  vite: {plugins: [tailwindcss()]},
  server: {
    port: 3000,
  },
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
})