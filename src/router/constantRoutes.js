/**
 * @description 无需权限的路由
 */
export default [
  {
    path: '/',
    name: 'GameData',
    redirect: '/Pets',
    alwaysShow: true,
    meta: {title: '游戏数据', icon: 'house'},
    children: [
      {
        path: '/Pets',
        name: 'Pets',
        component: () => import('@/views/modules/Game/Pets.vue'),
        meta: {title: '宠物合成', icon: ''},
      },
    ],
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/home/401.vue'),
    meta: {hidden: true},
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/home/404.vue'),
    meta: {hidden: true},
  },
  {path: '/:pathMatch(.*)', redirect: '/404', hidden: true},
];
