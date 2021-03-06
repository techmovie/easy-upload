const { userScriptComment, yamlPlugin } = require('./helper');

require('esbuild').build({
  entryPoints: ['src/index.js'],
  outfile: 'dist/easy-seed.user.js',
  bundle: true,
  sourcemap: true,
  banner: userScriptComment,
  minify: true, // 是否压缩
  plugins: [yamlPlugin],
}).catch(() => process.exit(1));
