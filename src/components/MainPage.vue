<!-- src/components/Home.vue -->
<template>
  <div class="max-w-sm mx-auto p-4 text-white text-center rounded-xl">
    <!-- 1) 헤더 로고 -->
    <h1 class="text-2xl mb-2" style="font-family: 'Brush Script MT', cursive;">Sustycup</h1>

    <!-- 2) 서브타이틀 -->
    <p class="text-sm leading-relaxed">
      본 서스티컵은
      <span class="text-emerald-300 font-bold">{{ usageCount }}회</span> 사용하여
      <span class="text-emerald-300 font-bold">{{ carbonReduced }}g</span>의 탄소를 줄이고 있습니다
    </p>

    <!-- 3) 팁 배너 -->
    <div class="inline-flex items-center bg-black/30 px-3 py-1.5 rounded-full text-xs my-3">
      <i class="mr-1.5"></i>
      깨끗히 세척 후 재사용하면 탄소가 줄어듭니다!
    </div>

    <!-- 4) 큰 사용 횟수 -->
    <div class="text-5xl my-3">{{ usageCount }}회</div>

    <!-- 5) 스텝 진행 표시 -->
    <div class="flex justify-between mb-4">
      <div
        v-for="(label, idx) in steps"
        :key="idx"
        class="flex-1 mx-1 p-2 text-xs rounded-full border-2 border-emerald-300 bg-white text-gray-800 flex items-center justify-center min-w-[60px] h-[60px] text-center"
        :class="stepClass(idx)"
      >
        {{ label }}
      </div>
    </div>

    <!-- 6) 안내 사항 -->
    <div class="bg-white/10 p-3 rounded-lg text-left text-xs mb-4">
      <h3 class="mb-1.5 text-sm">안내 사항</h3>
      <ul class="list-disc list-inside">
        <li v-for="(item, i) in infoItems" :key="i" class="mb-1">{{ item }}</li>
      </ul>
    </div>

    <!-- 7) 카카오톡 로그인 박스 -->
    <div class="bg-white p-3 rounded-lg text-left text-xs mb-4">
      <!-- 카카오톡 로그인 버튼 -->
      <button class="w-full items-center justify-center cursor-pointer mb-2" @click="handlePrimaryAction">
        <img :src="kakao_login_lw" alt="Kakao Login" class="h-10 w-auto object-contain mx-auto" />
      </button>
  
      <!-- 하단 설명 -->
      <p class="text-xs text-black opacity-80 mb-3">
        본 서스티컵은 제로퀘스트와 같은 카카오톡 로그인 시 리워드가 적립됩니다.
      </p>
    </div>

    <!-- 9) 푸터 로고 -->
    <footer class="mt-2">
      <img :src="zq_logo" alt="ZeroQuest Logo" class="h-10 w-auto object-contain mx-auto" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useCupStats } from '@/composables/useCupStats';
import zq_logo from '@/assets/zq_logo.png';
import kakao_login_lw from '@/assets/button/kakao_login_lw.png';

const {
  usageCount,
  carbonReduced,
  steps,
  currentStep,
  infoItems,
  handlePrimaryAction,
} = useCupStats();

// 스텝별 클래스 계산
const stepClass = (idx: number) => {
  if (idx < currentStep.value) return 'bg-emerald-300 text-white';
  if (idx === currentStep.value) return 'bg-emerald-400 text-white shadow-emerald-400/60 shadow-md';
  return 'opacity-50';
};
</script>

<style scoped>
/* Tailwind CSS로 모든 스타일이 대체됨 */
</style>
