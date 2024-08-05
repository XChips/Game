import colors from 'picocolors';
import {exec} from 'node:child_process';
import readline from 'node:readline';

const shellTools = {
  exec: shellExec,
  write: shellWrite(),
};

/**
 * 创建一个子进程并监听消息
 * @param message
 * @param callback
 */
function shellExec(message, callback) {
  // 以下是直接使用 child_process 完成，更简便的方式是引入 zxJs 或者 shellJs
  const shell = exec(message, (err, stdout, stderr) => {
    if (callback) callback(err, stdout, stderr);
  });
  shell.stdout.on('data', data => {
    // process.stdout.write(data);
    shellTools.write(data);
  });
  shell.stderr.on('data', data => {
    // process.stderr.write(data);
    shellTools.write(data);
  });
}

/**
 * 控制台打印，自动去重
 * @returns {(function(*): void)|*}
 */
function shellWrite() {
  let lastMsg = '';
  let sameCount = 1;
  return (msg) => {
    if (typeof msg !== 'string') return console.log(colors.gray(`${typeof msg}:`), msg);
    const checkMsg = msg.replace(/^.*\[vite]/, '');
    if (checkMsg === lastMsg) {
      // 如果当前是 vite 输出的
      if (process.stdout.isTTY && !process.env.CI) {
        const repeatCount = process.stdout.rows - 7;
        const blank = repeatCount > 0 ? '\n'.repeat(repeatCount) : '';
        console.log(blank);
        readline.cursorTo(process.stdout, 0, 3);
        readline.clearScreenDown(process.stdout);
      }
      sameCount++;
      console.log(msg.replace(/\s$/g, ''), colors.yellow(`(x${sameCount})`));
    } else {
      sameCount = 1;
      console.log(msg);
    }
    lastMsg = checkMsg;
  };
}

export default shellTools;
