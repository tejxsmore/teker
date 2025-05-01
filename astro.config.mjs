import { defineConfig } from 'astro/config'
import vercelServerless from '@astrojs/vercel/serverless';
import clerk from '@clerk/astro'
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';

export default defineConfig({
  integrations: [clerk(), react()],
  output: 'server',
  adapter: vercelServerless({
    webAnalytics: {
      enabled: true,
    },
    maxDuration: 8,
  }),
  vite: {plugins: [tailwindcss()]},
  site: 'https://teker.vercel.app',
})