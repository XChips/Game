import {createRouter, createWebHashHistory} from 'vue-router';
import constantRoutes from './constantRoutes.js';

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({left: 0, top: 0}),
});

// 全局注册 router
export function setupRouter(app) {
  app.use(router);
}

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({path: '/'});
}

export default router;
