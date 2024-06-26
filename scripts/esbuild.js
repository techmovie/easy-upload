import svgr from './plugin-svgr.js';
import esbuild from 'esbuild';
import { yamlToJSON, userScriptComment } from './helper.js';

yamlToJSON();
esbuild.build({
  entryPoints: ['src/index.tsx'],
  outfile: 'dist/easy-upload.user.js',
  logLevel: 'info',
  bundle: true,
  target: 'chrome58',
  define: {
    $: 'jQuery',
  },
  alias: {
    path: 'path-browserify',
  },
  banner: { js: userScriptComment },
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
}).catch(() => {
  process.exit(1);
});
