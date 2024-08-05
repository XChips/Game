/**
 * 全局初始化引入,勿随意修改
 */
import 'uno.css';
import './chips.scss';
import {setupRouter} from '@/router';
import {setupElIcons} from './initIcons.js';
import {setupRouterIns} from './initRouterIns';

export default {
  install(app) {
    // 路由(router)
    setupRouter(app);
    // Element-plus图标
    setupElIcons(app);
    // 路由守卫
    setupRouterIns();
  },
};
