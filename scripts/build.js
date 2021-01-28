const { userScriptComment, yamlPlugin } = require('./helper');

require('esbuild').build({
  entryPoints: ['src/index.js'],
  outfile: 'dist/index.js',
  bundle: true,
  sourcemap: true,
  banner: userScriptComment,
  minify: false, // 是否压缩
  plugins: [yamlPlugin],
}).catch(() => process.exit(1));
