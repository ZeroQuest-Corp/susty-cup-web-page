// API 인덱스 파일 - 모든 API 모듈을 한 곳에서 export

// Axios 인스턴스와 공통 API 함수들
export {
  default as apiClient,
  api,
  type ApiResponse,
  type ApiError,
} from "./axios";

// 인증 관련 API
export {
  AuthAPI,
  authStorage,
  TokenManager,
  loginWithKakaoCode,
  getCurrentUser,
  getUserStatus,
  refreshToken,
  logout,
  validateToken,
  deleteAccount,
  type KakaoUserInfo,
  type LoginResponse,
  type RefreshTokenResponse,
  type UserStatusResponse,
} from "./auth";

// 향후 추가될 다른 API 모듈들
// export * from './susty-cup';
// export * from './rewards';
// export * from './analytics';
