import type { App } from 'vue';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default {
  install(app: App) {
    const key = import.meta.env.VITE_APP_KAKAO_APP_KEY as string;
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(key);
      console.log('Kakao SDK initialized:', window.Kakao.isInitialized());
    }
  }
};
