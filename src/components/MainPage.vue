<!-- src/components/MainPage.vue -->
<template>
  <div class="max-w-full mx-auto p-6 text-white text-center h-full flex flex-col justify-between relative">
    <!-- 배경 이미지 -->
    <div class="absolute inset-0 bg-no-repeat bg-center bg-contain pointer-events-none">
      <img :src="background_cup" alt="Background Cup" class="w-full h-full object-contain grayscale" />
    </div>

    <!-- 컨텐츠 (z-index로 배경 위에 표시) -->
    <div class="relative z-10 flex flex-col h-full justify-between">
      <!-- 1) 헤더 로고 -->
      <h1 class="text-4xl mb-8 font-bold tracking-wide" style="font-family: 'Brush Script MT', cursive;">Sustycup</h1>

      <!-- 2) 서브타이틀 -->
      <p class="text-lg leading-relaxed">
        본 서스티컵은 <span class="text-emerald-300 font-bold">{{ usageCount }}회</span> 사용하여<br>
        <span class="text-emerald-300 font-bold">{{ carbonReduced }}g</span>의 탄소를 줄이고 있습니다
      </p>

      <!-- 3) 중앙 컵 이미지와 사용 횟수 -->
      <div class="flex-1 flex items-center justify-center">
        <div class="relative">
          <!-- 컵 이미지 -->
          <img :src="main_cup" alt="Sustycup" class="w-3/4 h-auto object-contain mx-auto" />
          <!-- 사용 횟수 텍스트 오버레이 -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center mt-8">
              <span class="text-8xl font-bold text-count">{{ usageCount }}</span>
              <span class="text-2xl font-semibold text-gray-500">회</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 4) 하단 안내 박스 -->
      <div class="bg-[#141414]/24 p-2 rounded-xl text-center text-[12px] tracking-tight mb-6">
        <p>다회용컵은 일회용 컵 보다 <span class="text-emerald-300 font-bold">9배</span>의 탄소를 더 배출하기때문에</p>
        <p><span class="text-emerald-300 font-bold">10회</span> 사용부터는 탄소를 감축합니다.</p>
        <p>깨끗이 세척 후 재사용해주세요.</p>
        <p>플라스틱 사용량과 탄소발생량이 줄어듭니다.</p>
      </div>

      <!-- 5) 카카오톡 로그인 박스 -->
      <div class="bg-white p-4 rounded-lg text-left mb-4">
        <!-- 카카오톡 로그인 버튼 -->
        <button class="w-full flex items-center justify-center cursor-pointer mb-3" @click="handlePrimaryAction">
          <img :src="kakao_login" alt="Kakao Login" class="h-12 w-auto object-contain" />
        </button>
        
        <!-- 하단 설명 -->
        <div class="text-xs text-[#39383D] text-center">
          <p>본 서스티컵은 제로퀘스트와 같은</p>
          <p>카카오톡 로그인 시 리워드가 적립됩니다.</p>
        </div>
      </div>

      <!-- 6) 푸터 로고 -->
      <footer class="mt-4">
        <img :src="zq_logo" alt="ZeroQuest Logo" class="h-8 w-auto object-contain mx-auto opacity-80" />
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCupStats } from '@/composables/useCupStats';
import zq_logo from '@/assets/images/logo/zq_logo.png';
import kakao_login from '@/assets/images/button/kakao_login.png';
import main_cup from '@/assets/images/main_cup.png';
import background_cup from '@/assets/images/background_cup.png';


const {
  usageCount,
  carbonReduced,
  handlePrimaryAction,
} = useCupStats();
</script>

<style scoped>
/* Tailwind CSS 필터 유틸리티로 대체됨 */
</style>
