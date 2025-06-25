<template>
  <div class="bg-white p-6">
    <h2 class="text-xl font-bold text-gray-800 mb-6 text-left">참여 방법</h2>
    
    <div class="space-y-4">
      <!-- 1단계: NFC 터치 -->
      <div class="flex items-center bg-gray-50 rounded-2xl p-4">
        <div class="flex-shrink-0 mr-4">
          <img :src="part1NumImg" alt="1" class="w-12 h-12" />
        </div>
        <div class="flex-shrink-0 mr-4">
          <img :src="part1Img" alt="NFC" class="w-12 h-12" />
        </div>
        <div class="flex-1">
          <p class="text-gray-800 font-medium">휴대폰으로 <span class="font-bold text-teal-600">NFC</span>를 터치해주세요.</p>
        </div>
      </div>

      <!-- 2단계: 카카오톡 로그인 -->
      <div class="flex items-center bg-gray-50 rounded-2xl p-4">
        <div class="flex-shrink-0 mr-4">
          <img :src="part2NumImg" alt="2" class="w-12 h-12" />
        </div>
        <div class="flex-shrink-0 mr-4">
          <img :src="part2Img" alt="카카오톡" class="w-12 h-12" />
        </div>
        <div class="flex-1">
          <p class="text-gray-800 font-medium">카카오톡 로그인을 진행해주세요.</p>
        </div>
      </div>

      <!-- 3단계: 사용횟수 확인 -->
      <div class="flex items-center bg-gray-50 rounded-2xl p-4">
        <div class="flex-shrink-0 mr-4">
          <img :src="part3NumImg" alt="3" class="w-12 h-12" />
        </div>
        <div class="flex-shrink-0 mr-4">
          <img :src="part3Img" alt="사용횟수" class="w-12 h-12" />
        </div>
        <div class="flex-1">
          <p class="text-gray-800 font-medium">서스티컵 사용횟수와 탄소감축량을</p>
          <p class="text-gray-800 font-medium">확인합니다.</p>
          <p class="text-sm text-gray-500 mt-1">(제로퀘스트 데이터 연결필요)</p>
        </div>
      </div>

      <!-- 4단계: NFT 리워드 확인 -->
      <div class="flex items-center bg-gray-50 rounded-2xl p-4">
        <div class="flex-shrink-0 mr-4">
          <img :src="part4NumImg" alt="4" class="w-12 h-12" />
        </div>
        <div class="flex-shrink-0 mr-4">
          <img :src="part4Img" alt="ZeroQuest" class="w-12 h-12" />
        </div>
        <div class="flex-1">
          <p class="text-gray-800 font-medium">제로퀘스트 '<span class="font-bold text-teal-600">서스티컵 NFT</span>' 페이지에서</p>
          <p class="text-gray-800 font-medium">리워드를 확인해보세요!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import part1NumImg from '@/assets/images/participate-guide/part1_num_img.png';
import part1Img from '@/assets/images/participate-guide/part1_img.png';
import part2NumImg from '@/assets/images/participate-guide/part2_num_img.png';
import part2Img from '@/assets/images/participate-guide/part2_img.png';
import part3NumImg from '@/assets/images/participate-guide/part3_num_img.png';
import part3Img from '@/assets/images/participate-guide/part3_img.png';
import part4NumImg from '@/assets/images/participate-guide/part4_num_img.png';
import part4Img from '@/assets/images/participate-guide/part4_img.png';
</script>

<style scoped>
/* Tailwind CSS 사용으로 별도 스타일 불필요 */
</style>
