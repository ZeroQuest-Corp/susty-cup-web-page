<!-- src/components/Home.vue -->
<template>
  <div class="home-container">
    <!-- 1) 헤더 로고 -->
    <h1 class="logo">Sustycup</h1>

    <!-- 2) 서브타이틀 -->
    <p class="subtitle">
      본 서스티컵은
      <span class="highlight">{{ usageCount }}회</span> 사용하여
      <span class="highlight">{{ carbonReduced }}g</span>의 탄소를 줄이고 있습니다
    </p>

    <!-- 3) 팁 배너 -->
    <div class="tip-banner">
      <i class="icon-recycle"></i>
      깨끗히 세척 후 재사용하면 탄소가 줄어듭니다!
    </div>

    <!-- 4) 큰 사용 횟수 -->
    <div class="big-count">{{ usageCount }}회</div>

    <!-- 5) 스텝 진행 표시 -->
    <div class="steps">
      <div
        v-for="(label, idx) in steps"
        :key="idx"
        class="step-item"
        :class="stepClass(idx)"
      >
        {{ label }}
      </div>
    </div>

    <!-- 6) 안내 사항 -->
    <div class="info-box">
      <h3>안내 사항</h3>
      <ul>
        <li v-for="(item, i) in infoItems" :key="i">{{ item }}</li>
      </ul>
    </div>

    <!-- 7) 카카오톡 로그인 버튼 -->
    <button class="primary-btn" @click="handlePrimaryAction">
      <i class="icon-chat"></i>
      카카오톡 로그인
    </button>

    <!-- 8) 하단 설명 -->
    <p class="footer-note">
      본 서스티컵은 제로퀘스트와 같은 카카오톡 로그인 시 리워드가 적립됩니다.
    </p>

    <!-- 9) 푸터 로고 -->
    <footer class="footer-logo">
      <img src="/zq_logo.png" alt="ZeroQuest Logo" class="logo-image" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useCupStats } from '@/composables/useCupStats';

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
  if (idx < currentStep.value) return 'completed';
  if (idx === currentStep.value) return 'active';
  return 'upcoming';
};
</script>

<style scoped>
.home-container {
  max-width: 360px;
  margin: 0 auto;
  padding: 16px;
  font-family: sans-serif;
  background: linear-gradient(180deg, #0f4c3a, #004e2a);
  color: #fff;
  text-align: center;
  border-radius: 12px;
}
/* 1) 로고 */
.logo {
  font-size: 1.5rem;
  font-family: 'Brush Script MT', cursive;
  margin-bottom: 8px;
}
/* 2) 서브타이틀 */
.subtitle {
  font-size: 0.875rem;
  line-height: 1.4;
}
.highlight {
  color: #3be8b0;
  font-weight: bold;
}
/* 3) 팁 배너 */
.tip-banner {
  display: inline-flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  margin: 12px 0;
}
.icon-recycle {
  /* 아이콘 폰트나 SVG 적용 */
  margin-right: 6px;
}
/* 4) 큰 횟수 */
.big-count {
  font-size: 3rem;
  margin: 12px 0;
}
/* 5) 스텝 */
.steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}
.step-item {
  flex: 1;
  margin: 0 4px;
  padding: 8px;
  font-size: 0.625rem;
  border-radius: 50%;
  border: 2px solid #3be8b0;
  background: #fff;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  height: 60px;
  text-align: center;
}
/* 완료된 스텝 */
.step-item.completed {
  background: #3be8b0;
  color: #fff;
}
/* 현재 스텝 */
.step-item.active {
  background: #00e287;
  color: #fff;
  box-shadow: 0 0 6px rgba(0, 226, 135, 0.6);
}
/* 아직 안 된 스텝 */
.step-item.upcoming {
  opacity: 0.5;
}
/* 6) 안내 박스 */
.info-box {
  background: rgba(255, 255, 255, 0.1);
  padding: 12px;
  border-radius: 8px;
  text-align: left;
  font-size: 0.75rem;
  margin-bottom: 16px;
}
.info-box h3 {
  margin-bottom: 6px;
  font-size: 0.8125rem;
}
.info-box ul {
  list-style: inside disc;
}
.info-box li {
  margin-bottom: 4px;
}
/* 7) 메인 버튼 */
.primary-btn {
  width: 100%;
  background: #ffd54f;
  color: #333;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 8px;
}
.primary-btn .icon-chat {
  margin-right: 6px;
}
/* 8) 푸터 노트 */
.footer-note {
  font-size: 0.6875rem;
  opacity: 0.8;
  margin-bottom: 12px;
}
/* 9) 로고 푸터 */
.footer-logo {
  margin-top: 8px;
}
</style>
