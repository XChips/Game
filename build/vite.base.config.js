import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';

import AutoImport from 'unplugin-auto-import/vite';

import Components from 'unplugin-vue-components/vite';
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';

import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';

import {resolve} from 'path';

const getPath = (dir) => {
  return resolve(__dirname, dir);
};

// 是否重新生成自动导入相关文件及校验规则
const initDts = true;

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': getPath('../src'),
      '@config': getPath('../src/config'),
    },
  },
  envDir: 'build', // 变更环境变量路径后，需要在这里配置才能自动读取添加至node变量中
  envPrefix: 'XC_',
  css: {
    modules: {
      localsConvention: 'dashesOnly', // dashesOnly-仅生成中划线连接
      generateScopedName: '[name]_[local]_[hash:5]', // 生成类名的规则
      globalModulePaths: [], // 不需要模块化的 css 路径
    },
    preprocessorOptions: {
      less: {
        globalVars: {// 全局css变量

        },
      },
      scss: {
        javascriptEnabled: true,
        additionalData: `
            @use "@/init/variables.scss" as *;
          `,
      },
    },
    devSourcemap: true, // 默认需要css引用
    postcss: {},
  },
  server: {
    host: '0.0.0.0',
    port: 8081, // 8080被vite默认服务占用了
    open: false,
  },
  plugins: [
    vue(),
    UnoCSS({
      hmrTopLevelAwait: false,
    }),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue', '@vueuse/core', 'pinia', 'vue-router', 'vue-i18n'],
      resolvers: [
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
      // 指定自定义方法位置
      dirs: ['src/init/initUtils'],
      // 指定自动导入函数TS类型声明文件路径 (false:关闭自动生成)
      dts: false,
      eslintrc: {
        // 是否自动生成 eslint 规则，建议生成之后设置 false
        enabled: initDts,
        // 指定自动导入函数 eslint 规则的文件
        filepath: 'src/init/.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
      // 是否在 vue 模板中自动导入
      vueTemplate: true,
    }),
    Components({
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
        // 自动注册图标组件
        IconsResolver({
          // element-plus图标库，其他图标库 https://icon-sets.iconify.design/
          enabledCollections: ['ep'],
        }),
      ],
      // 指定自定义组件位置(默认:src/components)
      dirs: ['src/init/initComponents'],
      // 指定自动导入组件TS类型声明文件路径 (false:关闭自动生成)
      dts: false,
    }),
    Icons({
      // 自动安装图标库
      autoInstall: true,
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [getPath('../src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  // 预加载项目必需的组件
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'pinia',
      'axios',
      '@vueuse/core',
      'sortablejs',
      'path-to-regexp',
      'echarts',
      '@wangeditor/editor',
      '@wangeditor/editor-for-vue',
      'vue-i18n',
      'path-browserify',
      'element-plus/es/components/form/style/css',
      'element-plus/es/components/loading/style/css',
      'element-plus/es/components/form-item/style/css',
      'element-plus/es/components/button/style/css',
      'element-plus/es/components/input/style/css',
      'element-plus/es/components/input-number/style/css',
      'element-plus/es/components/switch/style/css',
      'element-plus/es/components/upload/style/css',
      'element-plus/es/components/menu/style/css',
      'element-plus/es/components/col/style/css',
      'element-plus/es/components/icon/style/css',
      'element-plus/es/components/row/style/css',
      'element-plus/es/components/tag/style/css',
      'element-plus/es/components/dialog/style/css',
      'element-plus/es/components/loading/style/css',
      'element-plus/es/components/radio/style/css',
      'element-plus/es/components/radio-group/style/css',
      'element-plus/es/components/popover/style/css',
      'element-plus/es/components/scrollbar/style/css',
      'element-plus/es/components/tooltip/style/css',
      'element-plus/es/components/dropdown/style/css',
      'element-plus/es/components/dropdown-menu/style/css',
      'element-plus/es/components/dropdown-item/style/css',
      'element-plus/es/components/sub-menu/style/css',
      'element-plus/es/components/menu-item/style/css',
      'element-plus/es/components/divider/style/css',
      'element-plus/es/components/card/style/css',
      'element-plus/es/components/link/style/css',
      'element-plus/es/components/breadcrumb/style/css',
      'element-plus/es/components/breadcrumb-item/style/css',
      'element-plus/es/components/table/style/css',
      'element-plus/es/components/tree-select/style/css',
      'element-plus/es/components/table-column/style/css',
      'element-plus/es/components/select/style/css',
      'element-plus/es/components/option/style/css',
      'element-plus/es/components/pagination/style/css',
      'element-plus/es/components/tree/style/css',
      'element-plus/es/components/alert/style/css',
      'element-plus/es/components/radio-button/style/css',
      'element-plus/es/components/checkbox-group/style/css',
      'element-plus/es/components/checkbox/style/css',
      'element-plus/es/components/tabs/style/css',
      'element-plus/es/components/tab-pane/style/css',
      'element-plus/es/components/rate/style/css',
      'element-plus/es/components/date-picker/style/css',
      'element-plus/es/components/notification/style/css',
      'element-plus/es/components/image/style/css',
      'element-plus/es/components/statistic/style/css',
      'element-plus/es/components/watermark/style/css',
      'element-plus/es/components/config-provider/style/css',
      'element-plus/es/components/text/style/css',
      'element-plus/es/components/drawer/style/css',
      'element-plus/es/components/color-picker/style/css',
      'element-plus/es/components/backtop/style/css',
    ],
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'static/[name].[hash].js',
        chunkFileNames: 'static/js/[name].[hash].js',
        // assetFileNames: 'static/[ext]/[name].[hash][extname]',
        // 用于输出静态资源的命名，[ext]表示文件扩展名
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          let extType = info[info.length - 1];
          // console.log('文件信息', assetInfo.name)
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'media';
          } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
            extType = 'img';
          } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
            extType = 'fonts';
          }
          return `static/${extType}/[name].[hash].[ext]`;
        },
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    outDir: 'docs',
    assetsDir: 'static',
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
  },
});
