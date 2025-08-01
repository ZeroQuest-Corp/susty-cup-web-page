import { api, type ApiResponse } from "./axios";

// 사용자 정보 타입 정의
export interface KakaoUserInfo {
  id: number;
  connected_at: string;
  kakao_account: {
    profile_nickname_needs_agreement: boolean;
    profile: {
      nickname: string;
      thumbnail_image_url?: string;
      profile_image_url?: string;
    };
    has_email: boolean;
    email_needs_agreement: boolean;
    is_email_valid?: boolean;
    is_email_verified?: boolean;
    email?: string;
  };
}

export interface UserInfo {
  uid: string;
  email: string;
  is_zq_user: boolean;
  is_sustycup_nft: boolean;
  zq_user_email: string;
  next_eligible_at: Date;
  today_tag_count: number;
}

// 로그인 응답 타입
export interface LoginResponse
  extends ApiResponse<{
    token: string;
    userInfo: KakaoUserInfo;
    expiresIn: number;
  }> {}

// 토큰 갱신 응답 타입
export interface RefreshTokenResponse
  extends ApiResponse<{
    accessToken: string;
  }> {}

export interface UserInfoResponse extends ApiResponse<UserInfo> {}

// 사용자 상태 응답 타입
export interface UserStatusResponse
  extends ApiResponse<{
    usageCount: number;
    carbonReduced: number;
    isLoggedIn: boolean;
    userInfo?: KakaoUserInfo;
  }> {}

// Auth API 클래스
export class AuthAPI {
  /**
   * 카카오 authorization code로 로그인 처리
   * @param code 카카오에서 받은 authorization code
   * @param state 상태값 (선택적)
   */
  static async loginWithKakaoCode(
    code: string,
    state?: string
  ): Promise<LoginResponse> {
    return api.post("/auth/kakao/callback", { code, state });
  }

  /**
   * 현재 로그인된 사용자 정보 가져오기
   */
  static async getCurrentUser(): Promise<UserInfoResponse> {
    return api.get("/auth/me");
  }

  /**
   * 사용자 상태 정보 가져오기 (사용횟수, 탄소감축량 등)
   */
  static async getUserStatus(): Promise<UserStatusResponse> {
    return api.get("/auth/status");
  }

  /**
   * 토큰 갱신
   */
  static async refreshToken(): Promise<RefreshTokenResponse> {
    return api.post("/auth/refresh");
  }

  /**
   * 로그아웃
   */
  static async logout(): Promise<ApiResponse<{ message: string }>> {
    return api.post("/auth/logout");
  }

  /**
   * 토큰 유효성 검증
   * @param token 검증할 토큰
   */
  static async validateToken(
    token: string
  ): Promise<ApiResponse<{ valid: boolean }>> {
    return api.post("/auth/validate", { token });
  }

  /**
   * 회원 탈퇴
   */
  static async deleteAccount(): Promise<ApiResponse<{ message: string }>> {
    return api.delete("/auth/account");
  }
}

// 편의를 위한 개별 함수들도 export
export const {
  loginWithKakaoCode,
  getCurrentUser,
  getUserStatus,
  refreshToken,
  logout,
  validateToken,
  deleteAccount,
} = AuthAPI;

// 로컬 스토리지 관련 유틸리티 함수들
export const authStorage = {
  // 토큰 저장
  setToken: (token: string): void => {
    localStorage.setItem("auth_token", token);
  },

  // 토큰 가져오기
  getToken: (): string | null => {
    return localStorage.getItem("auth_token");
  },

  // 토큰 제거
  removeToken: (): void => {
    localStorage.removeItem("auth_token");
  },

  // 사용자 정보 저장
  setUserInfo: (userInfo: KakaoUserInfo): void => {
    localStorage.setItem("user_info", JSON.stringify(userInfo));
  },

  // 사용자 정보 가져오기
  getUserInfo: (): KakaoUserInfo | null => {
    const userInfo = localStorage.getItem("user_info");
    return userInfo ? JSON.parse(userInfo) : null;
  },

  // 사용자 정보 제거
  removeUserInfo: (): void => {
    localStorage.removeItem("user_info");
  },

  // 모든 인증 데이터 제거
  clearAll: (): void => {
    authStorage.removeToken();
    authStorage.removeUserInfo();
  },

  // 로그인 상태 확인
  isLoggedIn: (): boolean => {
    return !!authStorage.getToken();
  },
};

// 토큰 자동 갱신 관리 클래스
export class TokenManager {
  private static refreshTimer: number | null = null;

  /**
   * 토큰 자동 갱신 시작
   * @param expiresIn 토큰 만료 시간 (초)
   * @param refreshToken 리프레시 토큰
   */
  static startAutoRefresh(expiresIn: number, refreshToken: string): void {
    // 기존 타이머가 있다면 정리
    if (TokenManager.refreshTimer) {
      clearTimeout(TokenManager.refreshTimer);
    }

    // 만료 5분 전에 갱신 시도
    const refreshTime = Math.max(0, (expiresIn - 300) * 1000);

    TokenManager.refreshTimer = setTimeout(async () => {
      try {
        const response = await AuthAPI.refreshToken(refreshToken);
        if (response.success) {
          authStorage.setToken(response.data.token);
          // 다음 갱신 예약
          TokenManager.startAutoRefresh(response.data.expiresIn, refreshToken);
        }
      } catch (error) {
        console.error("토큰 자동 갱신 실패:", error);
        // 갱신 실패 시 로그아웃 처리
        authStorage.clearAll();
        window.location.href = "/";
      }
    }, refreshTime);
  }

  /**
   * 토큰 자동 갱신 중지
   */
  static stopAutoRefresh(): void {
    if (TokenManager.refreshTimer) {
      clearTimeout(TokenManager.refreshTimer);
      TokenManager.refreshTimer = null;
    }
  }
}
