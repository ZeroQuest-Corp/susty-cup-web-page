// src/composables/useCupStats.ts
import { ref, computed } from "vue";
import { CupAPI } from "@/api";
import { useCupStore } from "@/store/cup";

export function useCupStats() {
  const cupStore = useCupStore();

  const getCupInit = async (cupId: string) => {
    try {
      const response = await CupAPI.getCupInit(cupId);
      if (response.data) {
        cupStore.initializeCup(response.data.cupCount, response.data.sessionId);
        console.log("컵 정보 초기화 완료:", {
          cupCount: response.data.cupCount,
          sessionId: response.data.sessionId,
        });
      }
    } catch (error) {
      console.error("Cup init failed:", error);
    }
  };

  // 로그인 후 스캔 세션 완료 (로그인 전에 태그한 경우)
  const completeScanSession = async (sessionId: string) => {
    if (!sessionId) {
      console.warn("세션 ID가 없어 스캔 세션을 완료할 수 없습니다.");
      return;
    }

    try {
      const response = await CupAPI.completeScanSession(sessionId);
      if (response.data) {
        cupStore.updateAfterScan(
          response.data.cupCount,
          response.data.cupId,
          response.data.nextEligibleAt
        );
        console.log("스캔 세션 완료:", {
          cupCount: response.data.cupCount,
          cupId: response.data.cupId,
          nextEligibleAt: response.data.nextEligibleAt,
        });
      }
    } catch (error) {
      console.error("Complete scan session failed:", error);
    }
  };

  // 로그인된 상태에서 직접 태그 (이미 로그인한 상태에서 태그)
  const completeScanTag = async (cupId: string) => {
    try {
      const response = await CupAPI.completeScanTag(cupId);

      if (response.data) {
        cupStore.updateAfterScan(
          response.data.cupCount,
          response.data.cupId,
          response.data.nextEligibleAt
        );
        console.log("태그 스캔 완료:", {
          cupCount: response.data.cupCount,
          cupId: response.data.cupId,
          nextEligibleAt: response.data.nextEligibleAt,
        });
      }
    } catch (error) {
      console.error("Complete scan tag failed:", error);
    }
  };

  // 1) 사용 횟수와 탄소 절감량 (store에서 가져오기)
  const usageCount = computed(() => cupStore.cupCount);
  const carbonReduced = computed(() => cupStore.carbonReduced);

  // 2) 스텝 목록 & 현재 스텝 인덱스 (0부터 시작)
  const steps = ref([
    "NFC 태그",
    "카카오톡 로그인",
    "탄소감축량 확인 후 사용",
    "제로퀘스트 앱 리워드 확인",
  ]);
  const currentStep = ref(3);

  // 3) 안내문 리스트
  const infoItems = ref<string[]>([
    "서스티컵은 10회 이상 태그 시, 리워드가 지급됩니다. (※ 9회 이하 이용 시 리워드는 지급되지 않습니다.)",
    "서스티컵의 리워드는 1일 최대 2회 지급됩니다.",
    "리워드 적립은 제로퀘스트 앱과 서스티컵 NFT 모두 연결되어야 지급됩니다.",
  ]);

  // 4) 메인 버튼(카카오톡 로그인) 클릭 핸들러
  const handlePrimaryAction = () => {
    // TODO: 카카오톡 로그인 로직 호출
    console.log("카카오톡 로그인 버튼 클릭");
  };

  return {
    getCupInit,
    completeScanSession,
    completeScanTag,
    usageCount,
    carbonReduced,
    steps,
    currentStep,
    infoItems,
    handlePrimaryAction,
    isEligibleForReward: computed(() => cupStore.isEligibleForReward),
    isInitialized: computed(() => cupStore.isInitialized),
    sessionId: computed(() => cupStore.sessionId),
    nextEligibleAt: computed(() => cupStore.nextEligibleAt),
  };
}
