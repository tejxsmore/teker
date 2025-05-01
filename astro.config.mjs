import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import clerk from '@clerk/astro'
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  integrations: [clerk(), react()],
  // adapter: node({ mode: 'standalone' }),
  adapter: vercel(),
  output: 'server',
  vite: {plugins: [tailwindcss()]},
  site: 'https://teker.vercel.app',
})