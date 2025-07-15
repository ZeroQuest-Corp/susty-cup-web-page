import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { createPinia } from "pinia";
import "@/assets/tailwind.css"; // 전역 스타일
import kakaoPlugin from "@/plugins/kakao";
import { useAuthStore } from "@/store/auth";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(kakaoPlugin);

const authStore = useAuthStore();
await authStore.init();
app.mount("#app");
