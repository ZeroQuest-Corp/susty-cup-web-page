import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCupStore = defineStore("cup", () => {
  const cupCount = ref(0);
  const sessionId = ref("");
  const cupId = ref("");
  const nextEligibleAt = ref<Date | null>(null);
  const isInitialized = ref(false);

  // 탄소 절감량 계산 (컵 1개당 240g)
  const carbonReduced = computed(() => cupCount.value * 240);

  // 리워드 자격 여부 (10회 이상)
  const isEligibleForReward = computed(() => cupCount.value >= 10);

  // 초기화 함수 (로그인 전 태그)
  const initializeCup = (count: number, session: string) => {
    cupCount.value = count;
    sessionId.value = session;
    isInitialized.value = true;
  };

  // 스캔 완료 후 업데이트 (로그인 후 또는 직접 태그)
  const updateAfterScan = (count: number, id: string, nextEligible: Date) => {
    cupCount.value = count;
    cupId.value = id;
    nextEligibleAt.value = nextEligible;
    isInitialized.value = true;
  };

  // 리셋 함수
  const reset = () => {
    cupCount.value = 0;
    sessionId.value = "";
    cupId.value = "";
    nextEligibleAt.value = null;
    isInitialized.value = false;
  };

  return {
    cupCount,
    sessionId,
    cupId,
    nextEligibleAt,
    isInitialized,
    carbonReduced,
    isEligibleForReward,
    initializeCup,
    updateAfterScan,
    reset,
  };
});
