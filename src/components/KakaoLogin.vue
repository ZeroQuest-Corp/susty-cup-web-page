<template>
  <div class="border-red-500 bg-white p-6  rounded-t-3xl text-left">
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
</template>

<script setup lang="ts">
import kakao_login from '@/assets/images/button/kakao_login.png';

const handlePrimaryAction = () => {
  console.log('Primary action');
};
</script>