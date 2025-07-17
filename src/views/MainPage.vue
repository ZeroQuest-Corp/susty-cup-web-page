<template>
  <div class="h-screen bg-gradient-to-b from-start from-0% to-end to-90%">
    <div
      class="max-w-full mx-auto p-6 text-white text-center h-auto flex flex-col justify-between relative"
    >
      <!-- 배경 이미지 -->
      <div class="absolute inset-0 bg-no-repeat bg-center bg-contain">
        <img
          :src="background_cup"
          alt="Background Cup"
          class="w-full h-full object-contain grayscale"
        />
      </div>

      <!-- 컨텐츠 (z-index로 배경 위에 표시) -->
      <div class="relative z-10 flex flex-col h-auto justify-between">
        <!-- 1) 헤더 로고 -->
        <h1
          class="text-4xl mb-8 font-bold tracking-wide"
          style="font-family: 'Brush Script MT', cursive"
        >
          Sustycup
        </h1>

        <!-- 2) 서브타이틀 및 중앙 컵 이미지와 사용 횟수 -->
        <CupCount :usageCount="usageCount" :carbonReduced="carbonReduced" />

        <!-- 4) 하단 안내 박스 -->
        <CupMeritBox />
      </div>
    </div>
    <div
      class="z-10 px-5 pt-8 pb-14 relative bg-white rounded-tl-2xl rounded-tr-2xl shadow-[0px_-8px_12px_0px_rgba(0,0,0,0.08)] flex flex-col justify-center items-center gap-14"
    >
      <div v-if="isLoggedIn">
        <UserInfoSection :user="userInfo" />
      </div>
      <div v-else>
        <LoginGuideSection />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/store/auth";
import background_cup from "@/assets/images/background_cup.png";
import { useCupStats } from "@/composables/useCupStats";
import CupCount from "@/components/CupCount.vue";
import CupMeritBox from "@/components/CupMeritBox.vue";
import LoginGuideSection from "@/components/LoginGuideSection.vue";
import UserInfoSection from "@/components/UserInfoSection.vue";

const {
  getCupInit,
  completeScanSession,
  completeScanTag,
  usageCount,
  carbonReduced,
  sessionId,
} = useCupStats();
const authStore = useAuthStore();

const route = useRoute();
const scanUuid = route.query.s as string | undefined;

// store의 로그인 상태를 computed로 연결
const isLoggedIn = computed(() => authStore.isLoggedIn);
const userInfo = computed(() => authStore.userInfo);

// 컴포넌트 마운트 시 scanUuid가 있으면 로그인 상태에 따라 적절한 API 호출
onMounted(async () => {
  if (scanUuid) {
    console.log("스캔된 UUID 감지:", scanUuid);

    if (isLoggedIn.value) {
      // 이미 로그인된 상태: 바로 태그 완료
      console.log("로그인된 상태에서 태그 - completeScanTag 호출");
      await completeScanTag(scanUuid);
    } else {
      // 로그인되지 않은 상태: 컵 정보만 초기화
      console.log("로그인 전 태그 - getCupInit 호출");
      await getCupInit(scanUuid);
    }
  }
});

// 로그인 상태가 변경될 때 처리
watch(
  isLoggedIn,
  async (newValue, oldValue) => {
    if (newValue && !oldValue) {
      // 로그인 성공
      console.log("로그인 상태 확인 - 사용자 정보 조회");
      await authStore.getUserInfo();

      // 세션 ID가 있으면 스캔 세션 완료 (로그인 전에 태그했던 경우)
      if (sessionId.value) {
        console.log("로그인 후 스캔 세션 완료 - completeScanSession 호출");
        await completeScanSession();
      }
    }
  },
  { immediate: true }
); // immediate: true로 초기 로딩 시에도 체크
</script>

<style scoped>
/* Tailwind CSS 사용으로 별도 스타일 불필요 */
</style>
