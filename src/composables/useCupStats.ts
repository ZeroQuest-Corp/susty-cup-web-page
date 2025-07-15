// src/composables/useCupStats.ts
import { ref, computed } from "vue";

export function useCupStats() {
  // 1) 사용 횟수와 탄소 절감량
  const usageCount = ref(25);
  const carbonReduced = computed(() => 240); // 예시: 고정값 또는 API 호출 결과 바인딩

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
    usageCount,
    carbonReduced,
    steps,
    currentStep,
    infoItems,
    handlePrimaryAction,
  };
}
