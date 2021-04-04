const { userScriptComment, yamlPlugin } = require('./helper');

require('esbuild').build({
  entryPoints: ['src/index.js'],
  outfile: 'dist/easy-seed.user.js',
  bundle: true,
  target: 'chrome58',
  sourcemap: false,
  banner: userScriptComment,
  plugins: [yamlPlugin],
}).catch(() => process.exit(1));
