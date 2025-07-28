<template>
  <div class="modal-overlay" v-if="isOpen" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-content-header">
        <h2 class="text-xl font-bold text-red-600">⚠️ 서비스 이용 제한</h2>
        <button @click="closeModal" class="close-button">
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
      <div class="modal-content-body">
        <div class="mb-4">
          <p class="text-gray-700 mb-2"><strong>에러 코드:</strong> 601</p>
          <p class="text-gray-700 mb-4">
            현재 서스티컵 이용이 제한되었습니다.<br />
            다음 이용 가능 시간까지 기다려주세요.
          </p>
        </div>
        <div class="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
          <p class="text-sm text-blue-800">
            💡 <strong>안내:</strong> 일정 시간 후 다시 시도하거나, 고객센터에
            문의해주세요.
          </p>
        </div>
        <div class="flex gap-3">
          <button
            @click="closeModal"
            class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            확인
          </button>
          <button
            @click="handleContactSupport"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            고객센터
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from "@/store/modal";
import { computed } from "vue";

const modalStore = useModalStore();

const isOpen = computed(() => modalStore.isOpen);

const closeModal = () => {
  modalStore.closeModal();
};

const handleContactSupport = () => {
  // 고객센터 연결 로직
  alert("고객센터에 연결됩니다.");
  closeModal();
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  max-height: 80%;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.modal-content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.close-button {
  padding: 4px;
  border-radius: 4px;
  color: #6b7280;
  transition: all 0.2s;
}

.close-button:hover {
  color: #374151;
  background-color: #f3f4f6;
}

.modal-content-body {
  color: #374151;
}
</style>
