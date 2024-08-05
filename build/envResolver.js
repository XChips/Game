import {defineConfig} from 'vite';
import colors from 'picocolors';
// import mockDevServerPlugin from 'vite-plugin-mock-dev-server';

// https://devtools-next.vuejs.org/
import VueDevTools from 'vite-plugin-vue-devtools';

export default {
  build: (mode) => {
    console.info(colors.cyan(`************ build_mode ${mode} ************`));
    return defineConfig({
      css: {
        devSourcemap: mode !== 'production', // 是否需要css引用
      },
      esbuild: {
        // 构建模式时，如果构建的是生产环境，则去除 console 和 debugger 函数
        drop: mode === 'production' ? ['console', 'debugger'] : [],
      },
      build: {
        minify: mode === 'production' ? 'esbuild' : false, // 指定使用哪种混淆器
      },
    });
  },
  serve: (mode) => {
    console.info(colors.cyan(`************ serve_mode ${mode} ************`));
    return defineConfig({
      server: {
        // proxy: {
        //   /** 代理前缀为 /dev-api 的请求  */
        //   '/dev-api': {
        //     changeOrigin: true,
        //     // 接口地址
        //     target: 'http://localhost:8989',
        //     rewrite: (path) => path.replace(new RegExp(`^/dev-api`), ''),
        //   },
        // },
      },
      plugins: [
        // MOCK 服务
        // mockDevServerPlugin(),
        // vue 开发分析工具
        VueDevTools(),
      ],
    });
  },
};
