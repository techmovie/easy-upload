const { yamlPlugin, notify } = require('./helper');

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
    outfile: '.cache/easy-seed.user.js',
    bundle: true,
    target: 'es2016',
    define: { $: 'jQuery' },
    plugins: [yamlPlugin],
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
})();
