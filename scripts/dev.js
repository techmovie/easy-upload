const { notify, yamlToJSON } = require('./helper');
const chokidar = require('chokidar');

const notifyError = (error) => {
  if (error) {
    const { location, text } = error.errors[0];
    const { file, line, column } = location;
    notify('Build failed', `${file}:${line}:${column} error:${text}`);
  }
};
(async () => {
  require('esbuild').build({
    entryPoints: ['src/index.js'],
    outfile: '.cache/easy-upload.user.js',
    bundle: true,
    target: 'es2016',
    define: { $: 'jQuery' },
    incremental: true,
    watch: {
      onRebuild (error) {
        if (error) {
          notifyError(error);
        }
      },
    },
  }).catch(e => {
    notifyError(e);
  });
  yamlToJSON();
  chokidar.watch(['src/config/*', 'src/i18n/*.yaml'], { awaitWriteFinish: true, ignoreInitial: true }).on('all', (eventName, path) => {
    console.log(`${path}:${eventName}`);
    yamlToJSON();
  });
})();
