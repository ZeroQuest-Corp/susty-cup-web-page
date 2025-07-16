<script setup lang="ts">
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

// 앱 초기화 시 인증 상태를 복원
onMounted(async () => {
  await authStore.init();
});
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>

<style scoped>
/* Tailwind CSS로 대체되어 더 이상 필요 없음 */
</style>
