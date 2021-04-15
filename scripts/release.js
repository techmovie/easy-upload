const chalk = require('chalk');
const bump = require('@jsdevtools/version-bump-prompt');
const execa = require('execa');
const ora = require('ora');
const CURRENT_BRANCH = 'main';
const log = console.log;
const showCurrentBranch = () => {
  return execa.sync('git', ['branch', '--show-current']).stdout;
};
const checkGitTreeClean = () => {
  const { stdout } = execa.sync('git', ['status', '--porcelain']);
  const infos = stdout.split('\n');
  if (infos.length && !!stdout) {
    infos.unshift('Git working directory is not clean.');
    infos.forEach(info => log(chalk.red('ERR!'), info.trim()));
    process.exit();
  }
};
const currentBranch = showCurrentBranch();
if (currentBranch !== CURRENT_BRANCH) {
  log(chalk.red('ERR!'), `请先切换到「${CURRENT_BRANCH}」分支再进行发布操作`);
  process.exit();
}
checkGitTreeClean();
bump().then(data => {
  const { newVersion } = data;
  const spinner = ora({
    text: '📦 打包中...',
    color: 'blue',
  }).start();
  execa.sync('npm', ['run', 'build']);
  spinner.text = '🔨 提交代码...';
  spinner.color = 'green';
  execa.sync('git', ['add', '.']);
  execa.sync('git', ['commit', '-m', `chore(release): ${newVersion}`]);
  execa.sync('git', ['push']);
  setTimeout(() => {
    spinner.succeed(`🎉 v${newVersion}发布成功!`);
  }, 600);
});
