import chalk from 'chalk';
import bump from '@jsdevtools/version-bump-prompt';
import execa from 'execa';
import ora from 'ora';

const CURRENT_BRANCH = 'master';
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
bump({
  tag: false,
  commit: 'chore: update pkg version %s',
}).then(data => {
  const { newVersion } = data;
  const spinner = ora({
    text: '📦 打包中...',
    color: 'blue',
  }).start();
  execa.sync('yarn', ['changelog']);
  execa.sync('yarn', ['build']);
  spinner.text = '🔨 提交代码...';
  spinner.color = 'green';
  execa.sync('git', ['add', '.']);
  execa.sync('git', ['commit', '-m', `chore(release): ${newVersion}`]);
  execa.sync('git', ['pull', '--rebase']);
  execa.sync('git', ['push']);
  setTimeout(() => {
    spinner.succeed(`🎉 v${newVersion}发布成功!`);
  }, 600);
});
