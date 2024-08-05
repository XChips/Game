/**
 * @description 路由守卫
 * 目前两种模式 all-后端完全控制 intelligence-后端仅控制(permissions)
 * token 进行登录状态校验后 由 permissions 进行路由加载判断 使单个 token 的路由配置只进行首次加载
 */

import router from '@/router';
import NProgress from '@/router/nprogress';
import config from '@config/index';
const {title, progressBar} = config;
export function setupRouterIns() {
  router.beforeResolve(async(to, from, next) => {
    // 需要进度条时 进度条开始
    if (progressBar) NProgress.start();
    next();
    if (progressBar) NProgress.done();
    document.title = to.meta.title ? `${to.meta.title}-${title}` : title;
  });

  router.afterEach(() => {
    if (progressBar) NProgress.done();
  });
}
