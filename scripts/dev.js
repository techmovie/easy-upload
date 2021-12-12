import svgr from './plugin-svgr.js';
import esbuild from 'esbuild';
import chokidar from 'chokidar';
import { yamlToJSON } from './helper.js';

const cmd = process.argv.slice(2)[0];
const isDev = cmd === 'dev';
const isProd = cmd === 'build';

esbuild.build({
  entryPoints: ['src/index.tsx'],
  outfile: './.cache/easy-upload.user.js',
  bundle: true,
  target: 'es2016',
  define: {
    $: 'jQuery',
    'process.env.NODE_ENV': '"development"',
  },
  minify: isProd,
  sourcemap: isDev && 'inline',
  jsxFactory: 'h',
  jsxFragment: 'Fragment',
  inject: ['./scripts/preact-shim.ts'],
  incremental: true,
  watch: isDev,
  plugins: [
    svgr({
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                prefixIds: false,
              },
            },
          }
        ],
      },
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
    }),
  ],
}).catch(() => {
  process.exit(1);
});
yamlToJSON();
chokidar.watch(['src/config/*', 'src/i18n/*.yaml'], { awaitWriteFinish: true, ignoreInitial: true }).on('all', (eventName, path) => {
  console.log(`${path}:${eventName}`);
  yamlToJSON();
});
