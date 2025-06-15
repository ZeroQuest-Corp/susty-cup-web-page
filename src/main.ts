import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import { createPinia } from 'pinia';
import '@/assets/tailwind.css';  // 전역 스타일

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');