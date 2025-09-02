<template>
  <p class="text-lg mb-4">
    <template v-if="props.usageCount === 0">
      서스티컵을 사용해보세요!
    </template>
    <template v-else-if="props.usageCount >= 1 && props.usageCount <= 10">
      본 서스티컵은
      <span class="text-emerald-300 font-bold">{{ props.usageCount }}회</span>
      사용으로<br />
      <span class="text-emerald-300 font-bold">{{ props.carbonReduced }}g</span
      >의 탄소를 증가시키고 있습니다
    </template>
    <template v-else>
      본 서스티컵은
      <span class="text-emerald-300 font-bold">{{ props.usageCount }}회</span>
      사용으로<br />
      <span class="text-emerald-300 font-bold">{{ props.carbonReduced }}g</span
      >의 탄소를 감소시키고 있습니다
    </template>
  </p>
  <div class="flex-1 flex items-center justify-center mb-4">
    <div class="relative">
      <!-- 컵 이미지 -->
      <img
        :src="main_cup"
        alt="Sustycup"
        class="w-[70%] h-auto object-contain mx-auto"
      />
      <!-- 사용 횟수 텍스트 오버레이 -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center mt-8">
          <span class="text-8xl font-bold text-count">{{
            props.usageCount
          }}</span>
          <span class="text-2xl font-semibold text-gray-500">회</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import main_cup from "@/assets/images/main_cup.png";
import { defineProps } from "vue";

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
