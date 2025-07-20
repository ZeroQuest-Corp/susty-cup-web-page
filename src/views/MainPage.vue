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
        <LoginGuideSection :sessionId="sessionId" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
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
const router = useRouter();
const scanUuid = route.query.s as string | undefined;
const sessionIdRaw = route.query.state as string | undefined;

// store의 로그인 상태를 computed로 연결
const isLoggedIn = computed(() => authStore.isLoggedIn);
const userInfo = computed(() => authStore.userInfo);

// URL 파라미터 제거 함수
const removeUrlParams = () => {
  const currentQuery = { ...route.query };
  let shouldReplace = false;

  if (currentQuery.s) {
    delete currentQuery.s;
    shouldReplace = true;
  }

  if (currentQuery.state) {
    delete currentQuery.state;
    shouldReplace = true;
  }

  if (shouldReplace) {
    router.replace({ query: currentQuery });
  }
};

// 컴포넌트 마운트 시에는 아무것도 처리하지 않음 (로그인 상태 확인 후에 처리)
onMounted(async () => {
  console.log("MainPage mounted - 로그인 상태 확인 대기 중");
});

// 로그인 상태가 변경될 때 처리
watch(
  isLoggedIn,
  async (newValue, oldValue) => {
    if (newValue && !oldValue) {
      // 로그인 성공 (false -> true)
      console.log("로그인 상태 확인 - 사용자 정보 조회");
      await authStore.getUserInfo();

      // 로그인 후 sessionIdRaw가 있으면 스캔 세션 완료 처리
      if (sessionIdRaw) {
        console.log(
          "로그인 후 sessionIdRaw 처리 - completeScanSession 호출:",
          sessionIdRaw
        );
        await completeScanSession(sessionIdRaw);
      }

      // 로그인 후 scanUuid가 있으면 태그 완료 처리
      if (scanUuid) {
        console.log("로그인된 상태에서 태그 - completeScanTag 호출");
        await completeScanTag(scanUuid);
      }

      // 처리 완료 후 URL 파라미터 제거
      removeUrlParams();
    } else if (newValue && oldValue === undefined) {
      // 초기 로딩 시 이미 로그인된 상태 (undefined -> true)
      console.log("초기 로딩 시 로그인 상태 확인 - 사용자 정보 조회");
      await authStore.getUserInfo();

      // 초기 로딩 시에도 scanUuid가 있으면 태그 완료 처리
      if (scanUuid) {
        console.log(
          "초기 로딩 시 로그인된 상태에서 태그 - completeScanTag 호출"
        );
        await completeScanTag(scanUuid);
      }

      // 처리 완료 후 URL 파라미터 제거
      removeUrlParams();
    } else if (!newValue && oldValue === undefined && scanUuid) {
      // 초기 로딩 시 로그인되지 않은 상태 (undefined -> false)
      console.log("초기 로딩 시 로그인 전 태그 - getCupInit 호출");
      await getCupInit(scanUuid);

      // 익명 태그는 URL 파라미터를 유지 (로그인 후 처리를 위해)
      // removeUrlParams();
    }
  },
  { immediate: true }
);
</script>

<style scoped>
/* Tailwind CSS 사용으로 별도 스타일 불필요 */
</style>
