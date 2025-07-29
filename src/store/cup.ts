import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { CupAPI } from "@/api";
import { handleApiError } from "@/utils";
import { useAuthStore } from "@/store/auth";

export const useCupStore = defineStore("cup", () => {
  const authStore = useAuthStore();

  const cupCount = ref(0);
  const sessionId = ref("");
  const cupId = ref("");
  const isInitialized = ref(false);

  // localStorage에서 cupCount 초기화
  const initCupCount = () => {
    const stored = localStorage.getItem("cupCount");
    if (stored) {
      try {
        const storedCount = parseInt(stored, 10);
        if (storedCount >= 0 && !isNaN(storedCount)) {
          cupCount.value = storedCount;
          console.log("localStorage에서 cupCount 복원:", storedCount);
        } else {
          localStorage.removeItem("cupCount");
          console.log("잘못된 cupCount localStorage 제거");
        }
      } catch (error) {
        console.error("cupCount localStorage 파싱 에러:", error);
        localStorage.removeItem("cupCount");
      }
    }
  };

  // cupCount를 localStorage에 저장
  const saveCupCount = (count: number) => {
    localStorage.setItem("cupCount", count.toString());
    console.log("cupCount localStorage 저장:", count);
  };

  // cupCount 업데이트 (localStorage 저장 포함)
  const updateCupCount = (count: number) => {
    cupCount.value = count;
    saveCupCount(count);
  };

  // Store 초기화 시 localStorage에서 cupCount 복원
  initCupCount();

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
  const updateAfterScan = (count: number, id: string) => {
    updateCupCount(count);
    cupId.value = id;
    isInitialized.value = true;
  };

  // 리셋 함수
  const reset = () => {
    updateCupCount(0);
    sessionId.value = "";
    cupId.value = "";
    isInitialized.value = false;
    localStorage.removeItem("cupCount");
    console.log("Cup store 리셋 완료 - localStorage 정리");
  };

  // API 호출 함수들 - 비즈니스 로직을 store에서 관리
  const getCupInfo = async (cupId: string) => {
    try {
      const response = await CupAPI.getCupInfo(cupId);
      console.log("🚀 ~ getCupInfo ~ response:", response);
      if (response.data) {
        updateCupCount(response.data.total_count);
        console.log("컵 정보 조회 완료:", {
          cupCount: response.data.total_count,
        });
        return response.data;
      }
    } catch (error) {
      handleApiError(error);
      throw error; // 에러를 다시 던져서 호출하는 곳에서 처리할 수 있게 함
    }
  };

  // 로그인 전 태그 - 안전한 초기화 (601 에러 시 익명 기록 생성 안함)
  const safeInitCup = async (cupId: string) => {
    try {
      // 1단계: 먼저 컵 정보만 확인
      console.log("1단계: 컵 정보 확인 중...");
      await getCupInfo(cupId);

      // 2단계: 정상적인 태그인 경우에만 익명 기록 생성
      console.log("2단계: 정상적인 태그 - 익명 기록 생성 중...");
      try {
        const response = await CupAPI.initCup(cupId);
        console.log("🚀 ~ safeInitCup ~ initCup response:", response);
        if (response.data) {
          sessionId.value = response.data;
          console.log("안전한 컵 정보 초기화 완료:", sessionId.value);
        }
      } catch (initError) {
        // initCup에서 601 에러가 발생한 경우, 생성된 세션 정리
        console.log("initCup에서 601 에러 발생 - 세션 정리");
        sessionId.value = "";
        handleApiError(initError);
        throw initError; // 에러를 다시 던져서 외부 catch에서 처리
      }
    } catch (error) {
      // getCupInfo나 initCup에서 601 에러가 발생한 경우
      console.log("비정상적인 태그 (601 에러) - 익명 기록 생성하지 않음");
      // 에러는 이미 처리됨
    }
  };

  // 로그인 전 태그 - 컵 정보 초기화 (익명 기록 생성)
  const initCup = async (cupId: string) => {
    try {
      const response = await CupAPI.initCup(cupId);
      console.log("🚀 ~ initCup ~ response:", response);
      if (response.data) {
        sessionId.value = response.data;
        console.log("컵 정보 초기화 완료:", sessionId.value);
      }
    } catch (error) {
      handleApiError(error);
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
        updateAfterScan(response.data.cupCount, response.data.cupId);

        // auth store의 nextEligibleAt도 업데이트 (localStorage 저장 포함)
        authStore.updateNextEligibleAt(new Date(response.data.nextEligibleAt));

        console.log("스캔 세션 완료:", {
          cupCount: response.data.cupCount,
          cupId: response.data.cupId,
          nextEligibleAt: response.data.nextEligibleAt,
        });
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  // 로그인된 상태에서 직접 태그 (이미 로그인한 상태에서 태그)
  const completeScanTag = async (cupId: string) => {
    try {
      const response = await CupAPI.completeScanTag(cupId);

      if (response.data) {
        updateAfterScan(response.data.cupCount, response.data.cupId);

        // auth store의 nextEligibleAt도 업데이트 (localStorage 저장 포함)
        authStore.updateNextEligibleAt(new Date(response.data.nextEligibleAt));

        console.log("태그 스캔 완료:", {
          cupCount: response.data.cupCount,
          cupId: response.data.cupId,
          nextEligibleAt: response.data.nextEligibleAt,
        });
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  return {
    // 상태
    cupCount,
    sessionId,
    cupId,
    isInitialized,
    // computed
    carbonReduced,
    isEligibleForReward,
    // 상태 조작 함수
    initializeCup,
    updateAfterScan,
    updateCupCount,
    reset,
    // API 호출 함수
    getCupInfo,
    initCup,
    safeInitCup,
    completeScanSession,
    completeScanTag,
  };
});
