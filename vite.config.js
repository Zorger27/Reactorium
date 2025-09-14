import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import Sitemap from 'vite-plugin-sitemap';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = env.VITE_SITE_URL;

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: false
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,txt}']
        },
        includeAssets: [
          'favicon.png',
          'favicon.ico',
          'apple-touch-icon.png',
          'robots.txt'
        ],
        manifest: {
          name: 'Reactorium',
          short_name: 'Reactorium',
          description: 'Reactorium (a blend of "React" (the UI library) and "laboratorium" (Latin for "laboratory, a place for experiments"), meaning "React laboratory") — a secret laboratory of React experiments.',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: 'standalone',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        }
      }),
      Sitemap({
        hostname: siteUrl,
        dynamicRoutes: [
          '/about',
          '/project1',
          '/project2',
          '/project3',
          '/project4'
        ],
        exclude: [
          // можно явно указать, например, "/404" или пути, которые не должны быть в sitemap
        ],
        readable: true,
        changefreq: {
          '/': 'daily',
          '/about': 'monthly',
          '/project1': 'weekly',
          '/project2': 'weekly',
          '/project3': 'weekly',
          '/project4': 'weekly'
        },
        priority: {
          '/': 1.0,
          '/about': 0.8,
          '/project1': 0.6,
          '/project2': 0.6,
          '/project3': 0.6,
          '/project4': 0.6
        },
        // lastmod: new Date(), // или можно задать вручную
        generateRobotsTxt: true
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  };
});