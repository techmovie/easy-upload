import svgr from './plugin-svgr.js';
import esbuild from 'esbuild';
import chokidar from 'chokidar';
import { yamlToJSON, userScriptComment } from './helper.js';

const cmd = process.argv.slice(2)[0];
const isDev = cmd === 'dev';
const isProd = cmd === 'build';
const outFile = isDev ? './.cache/easy-upload.user.js' : 'dist/easy-upload.user.js';
yamlToJSON();
esbuild.build({
  entryPoints: ['src/index.tsx'],
  outfile: outFile,
  logLevel: 'info',
  bundle: true,
  target: 'chrome58',
  define: {
    $: 'jQuery',
  },
  ...isProd
    ? {
      banner: { js: userScriptComment },
    }
    : [],
  minify: false,
  sourcemap: false,
  jsxFactory: 'h',
  jsxFragment: 'Fragment',
  inject: ['./scripts/preact-shim.ts'],
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
          },
        ],
      },
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
    }),
  ],
}).catch(() => {
  process.exit(1);
});
if (isDev) {
  chokidar.watch(['src/config/*', 'src/i18n/*.yaml'], { awaitWriteFinish: true, ignoreInitial: true }).on('all', (eventName, path) => {
    console.log(`${path}:${eventName}`);
    yamlToJSON();
  });
}
