import { defineStore } from "pinia";
import { ref } from "vue";
import { AuthAPI, type UserInfo } from "@/api/auth";
import axios from "@/api/axios";

export const useAuthStore = defineStore("auth", () => {
  const isLoggedIn = ref(false);
  const accessToken = ref<string | null>(null);
  const exp = ref<number | null>(null);
  const userInfo = ref<UserInfo | null>(null);

  /** 앱 부팅 시 호출 → refresh_token(쿠키) → 새 access_token */
  const init = async () => {
    await refresh();

    // 401 응답 오면 자동 재발급 → 원 요청 재시도
    axios.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (error.response?.status === 401) {
          await refresh();

          // 토큰 갱신 성공 시에만 재시도
          if (accessToken.value) {
            error.config.headers.Authorization = `Bearer ${accessToken.value}`;
            return axios(error.config);
          }

          // 토큰 갱신 실패 시 (로그인되지 않은 상태) 에러 그대로 반환
          console.log("토큰 갱신 실패 - 401 에러 반환");
        }
        return Promise.reject(error);
      }
    );
  };

  /** 토큰 만료 1분 전이거나 없는 경우 → 재발급 */
  const refresh = async () => {
    if (accessToken.value && Date.now() < (exp.value ?? 0) - 60_000) return;

    try {
      // refresh_token 은 HttpOnly·Secure 쿠키에 들어 있으므로 그냥 POST
      const response = await AuthAPI.refreshToken();
      console.log("토큰 갱신 결과:", response);

      accessToken.value = response.data.accessToken;
      // exp는 서버 응답에 포함되지 않음 (필요시 서버에서 추가해야 함)
      // exp.value = result.data.exp * 1000;
      isLoggedIn.value = true;

      axios.defaults.headers.Authorization = `Bearer ${accessToken.value}`;
      console.log("토큰 갱신 성공");
    } catch (error) {
      // 토큰 갱신 실패 시 로그인 전 상태로 설정 (에러 발생시키지 않음)
      console.log("토큰 갱신 실패 - 로그인 전 상태로 처리", error);
      accessToken.value = null;
      exp.value = null;
      isLoggedIn.value = false;

      // Authorization 헤더 제거
      delete axios.defaults.headers.Authorization;
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await AuthAPI.getCurrentUser();
      userInfo.value = response.data;
      console.log("사용자 정보 조회 결과:", response);

      // NFT 상태가 false이거나 없는 경우 블록체인에서 재확인
      if (!userInfo.value?.is_susty_cup_nft) {
        console.log("NFT 상태 확인 필요 - checkSustyCupNft 호출 권장");
        // 여기서 직접 호출하면 순환 참조 가능성이 있으므로
        // MainPage나 다른 컴포넌트에서 처리하는 것이 좋음
      }
    } catch (error) {
      console.error("사용자 정보 조회 실패:", error);
    }
  };

  return { accessToken, isLoggedIn, init, refresh, getUserInfo, userInfo };
});
