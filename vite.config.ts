import path from "path";
import fs from "fs";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import { imagetools } from "vite-imagetools";
import ttf2woff2 from "ttf2woff2";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
import * as lightningcss from 'lightningcss';

const __dirname = fileURLToPath(new URL(".", import.meta.url));

function fontsPlugin() {
  const fontsDir = path.resolve(__dirname, 'src/assets/fonts');
  return {
    name: 'vite-plugin-fonts-generator',
    buildStart() {
      if (!fs.existsSync(fontsDir)) return;
      const files = fs.readdirSync(fontsDir);
      files.forEach(file => {
        if (file.endsWith('.ttf')) {
          const ttfPath = path.join(fontsDir, file);
          const woff2Path = ttfPath.replace('.ttf', '.woff2');
          if (!fs.existsSync(woff2Path)) {
            try {
              const ttfBuffer = fs.readFileSync(ttfPath);
              const woff2Buffer = ttf2woff2(ttfBuffer);
              fs.writeFileSync(woff2Path, woff2Buffer);
              console.log(`[Fonts] Generated: ${file}`);
            } catch (err) {
              console.error(`[Fonts] Error:`, err);
            }
          }
        }
      });
    }
  };
}

function forceCssSourcemap(): Plugin {
  return {
    name: 'vite-plugin-force-css-sourcemap',
    apply: 'build',
    enforce: 'post',
    async writeBundle(_options, bundle) {
      for (const fileName in bundle) {
        if (fileName.endsWith('.css')) {
          const file = bundle[fileName] as any;
          const cssPath = path.resolve(__dirname, 'dist', fileName);
          
          if (file.type === 'asset' && typeof file.source === 'string') {
            try {
              const inlineMapMatch = file.source.match(/\/\*# sourceMappingURL=data:application\/json;base64,([a-zA-Z0-9+/=]+)/);
              let inputSourceMap = undefined;
              let cleanCss = file.source;

              if (inlineMapMatch) {
                const base64 = inlineMapMatch[1];
                inputSourceMap = JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'));
                cleanCss = file.source.replace(/\/\*# sourceMappingURL=data:application\/json;base64,([a-zA-Z0-9+/=]+)\s*\*\//, '').trim();
              }

              const result = lightningcss.transform({
                filename: fileName,
                code: Buffer.from(cleanCss),
                minify: true,
                sourceMap: true,
                inputSourceMap: inputSourceMap,
              });

              const mapFileName = fileName + '.map';
              const mapPath = path.resolve(__dirname, 'dist', mapFileName);
              
              const cssWithMapLink = result.code.toString() + `\n/*# sourceMappingURL=${mapFileName} */`;

              fs.writeFileSync(cssPath, cssWithMapLink);
              fs.writeFileSync(mapPath, result.map ? Buffer.from(result.map).toString('utf-8') : '');
              
              console.log(`[CSS] Generated map: ${fileName}.map`);

            } catch (e) {
              console.error(`CSS Sourcemap Error:`, e);
            }
          }
        }
      }
    }
  };
}

export default defineConfig(({ command }) => {

  const isDev = command === 'serve';

  return {
    publicDir: path.resolve(__dirname, 'public'),

    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          sourceMap: true,
        } as any,
      },
    },

    server: {
      host: true,
      port: 5173,
      strictPort: true,
      watch: {
        usePolling: true, 
        interval: 100,  
      },
    },

    plugins: [
      react(),
      tailwindcss(),
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      }),

      !isDev && imagetools({
        defaultDirectives: () => new URLSearchParams(),
      }),

      fontsPlugin(),
      forceCssSourcemap(),
    ].filter(Boolean),

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@assets": path.resolve(__dirname, './src/assets'),
        "@components": path.resolve(__dirname, './src/components'),
        "@hooks": path.resolve(__dirname, './src/hooks'),
        "@context": path.resolve(__dirname, './src/context'),
        "@services": path.resolve(__dirname, './src/services'),
        "@styles": path.resolve(__dirname, './src/styles'),
        "@utils": path.resolve(__dirname, './src/utils'),
        "@models": path.resolve(__dirname, './src/models'),
      },
    },

    build: {
      sourcemap: true, 
      minify: 'terser',
      cssMinify: false,
      
      rollupOptions: {
        output: {
          entryFileNames: `assets/js/[name]-[hash].js`,
          chunkFileNames: `assets/js/[name]-[hash].js`,
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name ?? '';
            if (/\.(png|jpe?g|svg|gif|webp|avif)$/i.test(name)) return `assets/images/[name]-[hash][extname]`;
            if (/\.(woff2?|eot|ttf|otf)$/i.test(name)) return `assets/fonts/[name]-[hash][extname]`;
            if (/\.css$/i.test(name)) return `assets/css/[name]-[hash][extname]`;
            return `assets/[name]-[hash][extname]`;
          }
        }
      }
    }
  };
});