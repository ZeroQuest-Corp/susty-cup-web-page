<template>
  <!-- 다운로드드 박스 -->
  <div class="w-full h-full flex flex-col justify-between mb-9">
    <div class="text-xl text-gray-700 font-bold mb-2">제로퀘스트 다운로드</div>
    <div class="w-full h-full flex items-center justify-between mb-4 gap-4">
      <div class="w-1/2">
        <img
          src="@/assets/images/button/android_download.png"
          alt="android_download"
          class="cursor-pointer hover:opacity-80 transition-opacity"
          @click="openAndroidDownload"
        />
      </div>
      <div class="w-1/2">
        <img
          src="@/assets/images/button/ios_download.png"
          alt="ios_download"
          class="cursor-pointer hover:opacity-80 transition-opacity"
          @click="openIosDownload"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 제로퀘스트 앱 다운로드 URL (실제 앱 URL로 변경 필요)
const ANDROID_DOWNLOAD_URL =
  "https://play.google.com/store/search?q=%EC%A0%9C%EB%A1%9C%ED%80%98%EC%8A%A4%ED%8A%B8&c=apps";
const IOS_DOWNLOAD_URL =
  "https://apps.apple.com/kr/app/%EC%A0%9C%EB%A1%9C%ED%80%98%EC%8A%A4%ED%8A%B8-zeroquest/id6473518337";

const openAndroidDownload = () => {
  window.open(ANDROID_DOWNLOAD_URL, "_blank");
};

const openIosDownload = () => {
  window.open(IOS_DOWNLOAD_URL, "_blank");
};
</script>
