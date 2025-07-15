<template>
  <div class="h-screen bg-gradient-to-b from-start from-0% to-end to-90%">
    <div
      class="max-w-full mx-auto p-6 text-white text-center h-auto flex flex-col justify-between relative"
    >
      <!-- 배경 이미지 -->
      <div class="absolute inset-0 bg-no-repeat bg-center bg-contain">
        <img
          :src="background_cup"
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
      <div v-if="isLoggedIn">
        <UserInfoSection />
      </div>
      <div v-else>
        <LoginGuideSection />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCupStats } from "@/composables/useCupStats";
import background_cup from "@/assets/images/background_cup.png";
import CupCount from "@/components/CupCount.vue";
import CupMeritBox from "@/components/CupMeritBox.vue";
import LoginGuideSection from "@/components/LoginGuideSection.vue";
import UserInfoSection from "@/components/UserInfoSection.vue";

const { usageCount, carbonReduced } = useCupStats();

const isLoggedIn = ref(true);
</script>

<style scoped>
/* Tailwind CSS 사용으로 별도 스타일 불필요 */
</style>
