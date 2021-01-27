const { userScriptComment, yamlPlugin } = require('./helper');

require('esbuild').build({
  entryPoints: ['src/index.js'],
  outfile: 'dist/index.js',
  bundle: true,
  banner: userScriptComment,
  minify: true, // 是否压缩
  plugins: [yamlPlugin],
}).catch(() => process.exit(1));
