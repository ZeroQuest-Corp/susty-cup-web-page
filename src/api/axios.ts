import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

// API 기본 설정
const API_BASE_URL = "http://localhost:3008";

// Axios 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10초 타임아웃
  headers: {
    "Content-Type": "application/json",
  },
});

// Request 인터셉터
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 인증 토큰이 있으면 헤더에 추가
    const token = localStorage.getItem("auth_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 요청 로깅
    console.log(
      `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`,
      {
        data: config.data,
        params: config.params,
      }
    );

    return config;
  },
  (error: AxiosError) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response 인터셉터
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 응답 로깅
    console.log(
      `✅ API Response: ${response.config.method?.toUpperCase()} ${
        response.config.url
      }`,
      {
        status: response.status,
        data: response.data,
      }
    );

    return response;
  },
  (error: AxiosError) => {
    console.error("❌ Response Error:", error);

    // 401 Unauthorized - 토큰 만료 처리
    if (error.response?.status === 401) {
      console.warn("🔑 Token expired or invalid");

      // 토큰 제거
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_info");

      // 로그인 페이지로 리다이렉트 (필요시)
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }

    // 403 Forbidden - 권한 없음
    if (error.response?.status === 403) {
      console.warn("🚫 Access forbidden");
      alert("접근 권한이 없습니다.");
    }

    // 404 Not Found
    if (error.response?.status === 404) {
      console.warn("🔍 Resource not found");
    }

    // 500 Internal Server Error
    if (error.response?.status === 500) {
      console.error("🔥 Server error");
      alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }

    // 네트워크 에러
    if (!error.response) {
      console.error("🌐 Network error");
      alert("네트워크 연결을 확인해주세요.");
    }

    return Promise.reject(error);
  }
);

// API 클라이언트 내보내기
export default apiClient;

// 타입 정의
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
  message: string;
  statusCode?: number;
}

// 공통 API 유틸리티 함수들
export const api = {
  // GET 요청
  get: <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> =>
    apiClient.get(url, config).then((response) => response.data),

  // POST 요청
  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> =>
    apiClient.post(url, data, config).then((response) => response.data),

  // PUT 요청
  put: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> =>
    apiClient.put(url, data, config).then((response) => response.data),

  // DELETE 요청
  delete: <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> =>
    apiClient.delete(url, config).then((response) => response.data),

  // PATCH 요청
  patch: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> =>
    apiClient.patch(url, data, config).then((response) => response.data),
};
