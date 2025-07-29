<template>
  <div
    v-if="isOpen"
    @click="closeModal"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]"
  >
    <div
      @click.stop
      class="bg-white rounded-xl max-w-sm w-[90%] max-h-[80%] overflow-y-auto shadow-2xl"
    >
      <!-- 601 에러 - 카운트다운 모달 -->
      <div v-if="modalType === 'countdown'" class="py-8 px-6 text-center">
        <div class="mb-8">
          <p class="text-xl text-[#39383D] leading-relaxed">
            일정 시간이 지난 후<br />
            재사용할 수 있습니다.
          </p>
        </div>

        <div class="bg-[#F6F6F6] rounded-xl p-4 mb-8">
          <p class="text-xl font-semibold text-[#39383D] mb-4">
            보상받고 사용하기 남은 시간
          </p>

          <div class="flex justify-center items-center gap-2 mb-8">
            <div
              class="bg-[#9B9B9B] rounded-lg w-12 h-16 flex items-center justify-center"
            >
              <span class="text-white text-2xl font-bold font-mono">{{
                minutes[0] || "0"
              }}</span>
            </div>
            <div
              class="bg-[#9B9B9B] rounded-lg w-12 h-16 flex items-center justify-center"
            >
              <span class="text-white text-2xl font-bold font-mono">{{
                minutes[1] || "0"
              }}</span>
            </div>
            <div class="text-gray-700 text-2xl font-bold mx-1">:</div>
            <div
              class="bg-[#9B9B9B] rounded-lg w-12 h-16 flex items-center justify-center"
            >
              <span class="text-white text-2xl font-bold font-mono">{{
                seconds[0]
              }}</span>
            </div>
            <div
              class="bg-[#9B9B9B] rounded-lg w-12 h-16 flex items-center justify-center"
            >
              <span class="text-white text-2xl font-bold font-mono">{{
                seconds[1]
              }}</span>
            </div>
          </div>
        </div>

        <button
          @click="closeModal"
          class="bg-[#11473F] text-white font-medium py-3 px-12 rounded-lg transition-colors w-full"
        >
          확인
        </button>
      </div>

      <!-- 일반 에러 모달 -->
      <div v-else-if="modalType === 'error'" class="p-6">
        <div
          class="flex justify-between items-center mb-4 pb-3 border-b border-gray-200"
        >
          <h2 class="text-xl font-bold text-red-600">
            ⚠️ {{ modalData.title || "에러 발생" }}
          </h2>
          <button
            @click="closeModal"
            class="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-all"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="text-gray-700">
          <p class="font-semibold mb-2 text-red-600">
            에러 코드: {{ modalData.errorCode }}
          </p>
          <p class="mb-6 leading-relaxed">{{ modalData.message }}</p>
          <div class="flex justify-end">
            <button
              @click="closeModal"
              class="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-12 rounded-lg transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from "@/store/modal";
import { computed, ref, watch, onUnmounted } from "vue";

const modalStore = useModalStore();

const isOpen = computed(() => modalStore.isOpen);
const modalType = computed(() => modalStore.modalType);
const modalData = computed(() => modalStore.modalData);

// 카운트다운 타이머 상태
const minutes = ref("00");
const seconds = ref("00");
let countdownInterval: number | null = null;

const closeModal = () => {
  modalStore.closeModal();
};

// 카운트다운 계산 함수
const updateCountdown = () => {
  if (!modalData.value.nextEligibleAt) return;

  const now = new Date().getTime();
  const target = new Date(modalData.value.nextEligibleAt).getTime();
  const difference = target - now;

  if (difference <= 0) {
    // 시간이 만료되면 모달 자동 닫기
    clearInterval(countdownInterval!);
    closeModal();
    return;
  }

  // 시간을 고려하여 분과 초 계산 (분은 최대 59분까지만 표시)
  const totalSeconds = Math.floor(difference / 1000);
  const minutesLeft = Math.floor(totalSeconds / 60) % 60; // 60으로 나눈 나머지로 0-59 범위
  const secondsLeft = totalSeconds % 60;

  // 분과 초를 2자리 문자열로 변환 (각 자리수에 접근하기 위해)
  minutes.value = minutesLeft.toString().padStart(2, "0");
  seconds.value = secondsLeft.toString().padStart(2, "0");
};

// 카운트다운 모달이 열릴 때 타이머 시작
watch([isOpen, modalType], ([newIsOpen, newModalType]) => {
  if (newIsOpen && newModalType === "countdown") {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000); // 1초 간격으로 업데이트
  } else if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
});

// 컴포넌트 언마운트 시 타이머 정리
onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});
</script>
