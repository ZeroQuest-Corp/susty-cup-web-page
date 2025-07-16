import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/views/MainPage.vue";

const routes = [
  { path: "/", name: "MainPage", component: MainPage },
  // 필요하면 추가 라우트 삽입
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 로그인 성공/실패 처리를 위한 글로벌 가드
router.beforeEach((to, from, next) => {
  // URL 파라미터에서 토큰 또는 에러 확인
  const token = to.query.token;
  const error = to.query.error;

  if (token) {
    // 카카오 로그인 성공 - 서버에서 쿠키로 refresh_token을 설정했으므로
    // 별도 처리 없이 홈으로 이동 (store.init()에서 자동으로 토큰 갱신)
    console.log("카카오 로그인 성공 - 홈으로 이동");

    // 홈으로 이동 (쿼리 파라미터 제거)
    if (to.path !== "/") {
      next({ path: "/" });
      return;
    }
  }

  if (error) {
    // 에러가 있으면 홈으로 이동하고 에러 표시
    console.error("로그인 에러:", error);
    alert("로그인에 실패했습니다. 다시 시도해주세요.");

    if (to.path !== "/") {
      next({ path: "/" });
      return;
    }
  }

  next();
});

export default router;
