import fg from 'fast-glob';
import prompts from 'prompts';
import colors from 'picocolors';
import shellTools from './shellTools.mjs';

;(async () => {
  const command = process.argv[2];
  console.log(colors.bgGreen(`************ ${command} start! ************`));
  const envList = fg.sync(['./build/.env.*']).map(item => {
    const env = item.replace('./build/.env.', '');
    return {title: env, value: env};
  });
  // prompts.options: type-模式 name-返回的属性key message-提示语 choices-可选配置
  // options.type text-文字 password-密文 invisible-隐藏文字 number-数字 confirm-确认项(y/n)(需输入)
  // list-字符串数组 toggle-确认项(y/n)(无需输入) select-单选 multiselect-多选 date-日期
  // 生产环境-production 准生产环境-pre 验收测试环境-uat 集成测试环境-sit 开发环境-dev
  const {env} = await prompts([
    {
      type: 'select',
      name: 'env',
      message: `请选择${command}环境？`,
      choices: envList,
    },
  ]);
  console.log(colors.blue(`************ ${env} ************`));
  const {confirm} = await prompts([
    {
      type: 'toggle',
      name: 'confirm',
      message: `当前配置为【${env}】，请确认`,
      initial: true,
      active: 'Yes',
      inactive: 'No',
    },
  ]);
  if (!confirm) return;
  const message = `vite ${command === 'build' ? 'build ' : ''}--mode ${env}`;
  console.log(colors.cyan(`************ ${message} ************`));
  shellTools.exec(message, (err) => {
    if (err) {
      console.log(colors.bgRed(`************ ${command} error! ************`));
      console.log(err);
      return;
    }
    console.log(colors.bgGreen(`************ ${command} end! ************`));
  });
})();
