import svgr from './plugin-svgr.js';
import esbuild from 'esbuild';
import chokidar from 'chokidar';
import { yamlToJSON } from './helper.js';

const outFile = './.cache/easy-upload.user.js';
yamlToJSON();
const ctx = await esbuild.context({
  entryPoints: ['src/index.tsx'],
  outfile: outFile,
  logLevel: 'info',
  bundle: true,
  target: 'chrome58',
  define: {
    $: 'jQuery',
  },
  alias: {
    path: 'path-browserify',
  },
  minify: false,
  sourcemap: false,
  jsxFactory: 'h',
  jsxFragment: 'Fragment',
  inject: ['./scripts/preact-shim.ts'],
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
          },
        ],
      },
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
    }),
  ],
});

await ctx.watch();
console.log('watching...');

chokidar.watch(['src/config/*', 'src/i18n/*.yaml'], { awaitWriteFinish: true, ignoreInitial: true }).on('all', (eventName, path) => {
  console.log(`${path}:${eventName}`);
  yamlToJSON();
});
