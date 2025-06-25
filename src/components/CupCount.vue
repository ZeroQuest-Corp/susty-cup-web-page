<template>
  <p class="text-lg mb-4">
    본 서스티컵은 <span class="text-emerald-300 font-bold">{{ props.usageCount }}회</span> 사용하여<br>
    <span class="text-emerald-300 font-bold">{{ props.carbonReduced }}g</span>의 탄소를 줄이고 있습니다
  </p>
  <div class="flex-1 flex items-center justify-center mb-4">
    <div class="relative">
      <!-- 컵 이미지 -->
      <img :src="main_cup" alt="Sustycup" class="w-[70%] h-auto object-contain mx-auto" />
      <!-- 사용 횟수 텍스트 오버레이 -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center mt-8">
          <span class="text-8xl font-bold text-count">{{ props.usageCount }}</span>
          <span class="text-2xl font-semibold text-gray-500">회</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import main_cup from '@/assets/images/main_cup.png';
import { defineProps } from 'vue';

const props = defineProps({
  usageCount: {
    type: Number,
    required: true,
  },
  carbonReduced: {
    type: Number,
    required: true,
  },
});
</script>