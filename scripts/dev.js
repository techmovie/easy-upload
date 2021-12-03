import svgr from './plugin-svgr.js';
import esbuild from 'esbuild';
import chokidar from 'chokidar';
import { yamlToJSON } from './helper.js';

const cmd = process.argv.slice(2)[0];
const isDev = cmd === 'dev';
const isProd = cmd === 'build';
const notifyError = (error) => {
  if (error) {
    const { location, text } = error.errors[0];
    const { file, line, column } = location;
    notify('Build failed', `${file}:${line}:${column} error:${text}`);
  }
};

esbuild.build({
  entryPoints: ['src/index.tsx'],
  outfile: '.cache/easy-upload.user.js',
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
  watch: {
    onRebuild (error) {
      if (error) {
        notifyError(error);
      }
    },
  },
  plugins: [
    svgr({
      svgoConfig: {
        plugins: {
          prefixIds: false,
          removeViewBox: false,
        },
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
