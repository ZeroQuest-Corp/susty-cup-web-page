// src/composables/useKakaoAuth.ts

declare global {
  interface Window {
    Kakao: any;
  }
}

export function useKakaoAuth() {
  async function login() {
    return new Promise<any>((resolve, reject) => {
      window.Kakao.Auth.login({
        scope: 'profile_nickname, account_email',
        success: authObj => resolve(authObj),
        fail: err => reject(err)
      });
    });
  }

  async function getProfile() {
    return new Promise<any>((resolve, reject) => {
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: res => resolve(res),
        fail: err => reject(err)
      });
    });
  }

  function logout() {
    if (window.Kakao && window.Kakao.Auth.getAccessToken()) {
      window.Kakao.Auth.logout();
    }
  }

  return { login, getProfile, logout };
}
