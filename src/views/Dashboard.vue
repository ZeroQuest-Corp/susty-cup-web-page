<template>
  <div
    class="h-screen bg-gradient-to-b from-start from-0% to-end to-90% flex flex-col justify-center items-center"
  >
    <div class="max-w-md mx-auto p-6 text-white text-center">
      <!-- 로그인 성공 메시지 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-4">로그인 성공!</h1>
        <p class="text-lg">환영합니다, {{ userNickname }}님!</p>
      </div>

      <!-- 서스티컵 정보 -->
      <div class="bg-white/20 backdrop-blur-sm rounded-lg p-6 mb-6">
        <h2 class="text-xl font-bold mb-4">서스티컵 현황</h2>
        <div class="grid grid-cols-2 gap-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-emerald-300">
              {{ usageCount }}
            </div>
            <div class="text-sm">사용 횟수</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-emerald-300">
              {{ carbonReduced }}g
            </div>
            <div class="text-sm">탄소 절감량</div>
          </div>
        </div>
      </div>

      <!-- 액션 버튼들 -->
      <div class="space-y-4">
        <button
          @click="goToZeroQuest"
          class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          제로퀘스트 앱에서 리워드 확인하기
        </button>

        <button
          @click="goHome"
          class="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          홈으로 돌아가기
        </button>

        <button
          @click="logout"
          class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          로그아웃
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useKakaoAuth } from "@/composables/useKakaoAuth";
import { useCupStats } from "@/composables/useCupStats";
import { AuthAPI, authStorage } from "@/api/auth";

const router = useRouter();
const { logout: kakaoLogout, getProfile } = useKakaoAuth();
const { usageCount, carbonReduced } = useCupStats();

const userNickname = ref("사용자");

onMounted(async () => {
  try {
    // 먼저 로컬 스토리지에서 사용자 정보 확인
    const localUserInfo = authStorage.getUserInfo();
    if (localUserInfo) {
      userNickname.value = localUserInfo.kakao_account.profile.nickname;
    }

    // 서버에서 최신 사용자 정보 가져오기
    const userStatus = await AuthAPI.getUserStatus();
    if (userStatus.success && userStatus.data.userInfo) {
      userNickname.value =
        userStatus.data.userInfo.kakao_account.profile.nickname;
      authStorage.setUserInfo(userStatus.data.userInfo);
    }
  } catch (error) {
    console.error("사용자 정보 가져오기 실패:", error);
    // 로그인이 필요한 경우 홈으로 리다이렉트
    if (!authStorage.isLoggedIn()) {
      router.push("/");
    }
  }
});

const goToZeroQuest = () => {
  // 제로퀘스트 앱으로 이동 (딥링크 또는 웹사이트)
  // 실제 제로퀘스트 링크로 변경해야 함
  window.open("https://zeroquest.io", "_blank");
};

const goHome = () => {
  router.push("/");
};

const logout = async () => {
  try {
    // 서버에 로그아웃 요청
    await AuthAPI.logout();

    // 카카오 SDK 로그아웃 (선택적)
    if (window.Kakao && window.Kakao.Auth.getAccessToken()) {
      kakaoLogout();
    }

    // 로컬 데이터 정리
    authStorage.clearAll();

    // 홈으로 이동
    router.push("/");
  } catch (error) {
    console.error("로그아웃 실패:", error);
    // 에러가 발생해도 로컬 데이터는 정리
    authStorage.clearAll();
    router.push("/");
  }
};
</script>

<style scoped>
/* Tailwind CSS 사용으로 별도 스타일 불필요 */
</style>
