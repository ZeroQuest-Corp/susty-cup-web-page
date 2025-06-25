import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/MainPage.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  // 필요하면 추가 라우트 삽입
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
