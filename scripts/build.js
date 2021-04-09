const { userScriptComment, yamlToJSON } = require('./helper');
yamlToJSON();
require('esbuild').build({
  entryPoints: ['src/index.js'],
  outfile: 'dist/easy-seed.user.js',
  bundle: true,
  target: 'chrome58',
  sourcemap: false,
  banner: userScriptComment,
}).catch(() => process.exit(1));
