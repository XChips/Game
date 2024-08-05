import {defineConfig, mergeConfig, loadEnv} from 'vite';
import viteBaseConfig from './build/vite.base.config.js';
import envResolver from './build/envResolver.js';

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  // envDir 变更后，需要在第二个参数内改变读取路径
  const env = loadEnv(mode, `${process.cwd()}\\${viteBaseConfig.envDir || ''}`, ``);
  process.env.XC_BASE_URL = env[`${env.XC_ENV_TYPE}_BASE_URL`];
  const viteConfig = envResolver[command](mode);
  // console.info(viteConfig);
  return mergeConfig(viteBaseConfig, viteConfig);
});
