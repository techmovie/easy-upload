const { yamlPlugin } = require('./helper');
const chokidar = require('chokidar');

(async () => {
  const builder = await require('esbuild').build({
    entryPoints: ['src/index.js'],
    outfile: '.cache/easy-seed.user.js',
    bundle: true,
    plugins: [yamlPlugin],
    incremental: true,
  });
  chokidar.watch('src/**/*', { awaitWriteFinish: true, ignoreInitial: true }).on('all', (eventName, path) => {
    console.log(`${path}:${eventName}`);
    builder.rebuild();
  });
})();
