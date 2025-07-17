import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCupStore = defineStore("cup", () => {
  const cupCount = ref(0);
  const sessionId = ref("");
  const isInitialized = ref(false);

  // 탄소 절감량 계산 (컵 1개당 240g)
  const carbonReduced = computed(() => cupCount.value * 240);

  // 리워드 자격 여부 (10회 이상)
  const isEligibleForReward = computed(() => cupCount.value >= 10);

  // 초기화 함수
  const initializeCup = (count: number, session: string) => {
    cupCount.value = count;
    sessionId.value = session;
    isInitialized.value = true;
  };

  // 리셋 함수
  const reset = () => {
    cupCount.value = 0;
    sessionId.value = "";
    isInitialized.value = false;
  };

  return {
    cupCount,
    sessionId,
    isInitialized,
    carbonReduced,
    isEligibleForReward,
    initializeCup,
    reset,
  };
});
