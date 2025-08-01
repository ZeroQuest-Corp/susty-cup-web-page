<template>
  <div class="h-screen bg-gradient-to-b from-start from-0% to-end to-90%">
    <div
      class="max-w-full mx-auto p-6 text-white text-center h-auto flex flex-col justify-between relative"
    >
      <!-- 배경 이미지 -->
      <div class="absolute inset-0 bg-no-repeat bg-center bg-contain">
        <img
          :src="backgroundCup"
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
      <UserInfoSection v-if="isLoggedIn" :user="userInfo" />
      <LoginGuideSection v-else :sessionId="sessionId" />
    </div>

    <Modal />
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { useUserStore } from "@/store/user";
import { useModalStore } from "@/store/modal";
import backgroundCup from "@/assets/images/background_cup.png";
import { useCupStats } from "@/composables/useCupStats";
import CupCount from "@/components/CupCount.vue";
import CupMeritBox from "@/components/CupMeritBox.vue";
import LoginGuideSection from "@/components/LoginGuideSection.vue";
import UserInfoSection from "@/components/UserInfoSection.vue";
import Modal from "@/components/Modal.vue";

// Composable & Store
const {
  safeInitCup,
  completeScanSession,
  completeScanTag,
  usageCount,
  carbonReduced,
  sessionId,
} = useCupStats();
const authStore = useAuthStore();
const userStore = useUserStore();
const modalStore = useModalStore();

// Router & Query Params
const route = useRoute();
const router = useRouter();
const cupId = route.query.s as string | undefined;
const sessionIdRaw = route.query.sid as string | undefined;

// Reactive State
const isLoggedIn = computed(() => authStore.isLoggedIn);
const userInfo = computed(() => authStore.userInfo);
const isSustycupNft = computed(() => userInfo.value?.is_sustycup_nft);
const isZqUser = computed(() => userInfo.value?.is_zq_user);

// URL 파라미터 제거
function removeUrlParams() {
  const query = { ...route.query };
  if (query.s) delete query.s;
  if (query.sid) delete query.sid;
  router.replace({ query });
}

// 로그인 사용자 흐름 처리
async function handleAuthenticatedFlow(): Promise<boolean> {
  await authStore.getUserInfo();

  await userStore.checkCupTagLimit();

  if (isZqUser.value) {
    await userStore.checkZqUser();
  }

  // NFT 상태가 없거나 false인 경우 블록체인에서 확인
  if (isSustycupNft.value) {
    await userStore.checkSustycupNft();
  }

  if (!authStore.canTagNow()) {
    modalStore.openCountdownModal(authStore.nextEligibleAt!);
    return true;
  }

  if (sessionIdRaw) {
    await completeScanSession(sessionIdRaw);
  }

  if (cupId) {
    await completeScanTag(cupId);
  }

  return false;
}

// 익명 사용자 초기화 흐름 처리
async function handleAnonymousInit() {
  if (!cupId) return;
  await safeInitCup(cupId);
  if (!sessionId.value) {
    removeUrlParams();
  }
}

// 로그인 상태 변동 감시
watch(
  isLoggedIn,
  async (newVal, oldVal) => {
    if (newVal) {
      const interrupted = await handleAuthenticatedFlow();
      if (interrupted) {
        removeUrlParams();
        return;
      }
    } else if (oldVal === undefined) {
      await handleAnonymousInit();
      return;
    }

    removeUrlParams();
  },
  { immediate: true }
);
</script>

<style scoped>
/* Tailwind를 사용하므로 별도 스타일 불필요 */
</style>
