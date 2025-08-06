<template>
  <div
    v-if="isNftRegistered"
    class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4"
  >
    <div class="flex items-center mb-3">
      <svg
        class="w-5 h-5 text-yellow-400 mr-2"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
      <h3 class="text-lg font-semibold text-yellow-800">
        이미 다른 유저의 NFT와 연동된 컵 입니다.
      </h3>
    </div>

    <p class="text-yellow-700 mb-4">
      리워드를 받으려면 등록되지 않은 컵을 태그해주세요.
    </p>
  </div>
  <div v-else class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
    <div class="flex items-center mb-3">
      <svg
        class="w-5 h-5 text-yellow-400 mr-2"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
      <h3 class="text-lg font-semibold text-yellow-800">
        서스티컵 NFT가 필요합니다
      </h3>
    </div>

    <p class="text-yellow-700 mb-4">
      리워드를 받으려면 제로퀘스트 앱에서 서스티컵 NFT를 구매해야 합니다.
    </p>

    <!-- <div class="flex gap-3">
      <button
        @click="handlePurchaseGuide"
        class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
      >
        NFT 구매하러 가기
      </button>

      <button
        @click="handleRefreshNftStatus"
        :disabled="isRefreshing"
        class="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
      >
        {{ isRefreshing ? "확인 중..." : "NFT 상태 재확인" }}
      </button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
const isRefreshing = ref(false);
const props = defineProps<{
  isNftRegistered: boolean;
}>();

const isNftRegistered = computed(() => props.isNftRegistered);

const handlePurchaseGuide = () => {
  // 제로퀘스트 앱으로 이동 또는 안내 페이지 표시
  alert("제로퀘스트 앱에서 서스티컵 NFT를 구매해주세요!");
  // window.open('제로퀘스트 앱 URL', '_blank');
};

const handleRefreshNftStatus = async () => {
  isRefreshing.value = true;

  try {
    const hasNft = await userStore.checkSustycupNft();

    if (hasNft) {
      alert("✅ NFT 연동이 완료되었습니다!");
    } else {
      alert("❌ NFT를 찾을 수 없습니다. 구매를 완료한 후 다시 시도해주세요.");
    }
  } catch (error) {
    console.error("NFT 상태 확인 실패:", error);
    alert("❌ NFT 상태 확인에 실패했습니다. 다시 시도해주세요.");
  } finally {
    isRefreshing.value = false;
  }
};
</script>
