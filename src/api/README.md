# API 모듈 사용 가이드

이 디렉토리에는 서버와의 통신을 위한 API 모듈들이 포함되어 있습니다.

## 📁 파일 구조

```
src/api/
├── axios.ts      # Axios 인스턴스 설정 및 인터셉터
├── auth.ts       # 인증 관련 API
├── index.ts      # 모든 API 모듈 재export
└── README.md     # 이 파일
```

## 🚀 기본 사용법

### 1. API 클라이언트 import

```typescript
// 개별 모듈 import
import { AuthAPI, authStorage } from "@/api/auth";
import { api, apiClient } from "@/api/axios";

// 또는 인덱스에서 모든 것 import
import { AuthAPI, authStorage, api } from "@/api";
```

### 2. 인증 API 사용

#### 카카오 로그인

```typescript
// 카카오 로그인 시작 (서버에서 직접 리다이렉트)
window.location.href = "http://localhost:3008/auth/kakao/login";

// Authorization code로 로그인 처리 (서버 콜백에서 사용)
const loginResult = await AuthAPI.loginWithKakaoCode(code, state);
if (loginResult.success) {
  authStorage.setToken(loginResult.data.token);
  authStorage.setUserInfo(loginResult.data.userInfo);
}
```

#### 사용자 정보 관리

```typescript
// 현재 사용자 정보 가져오기
const userInfo = await AuthAPI.getCurrentUser();

// 사용자 상태 정보 가져오기 (사용횟수, 탄소감축량 등)
const status = await AuthAPI.getUserStatus();

// 로그아웃
await AuthAPI.logout();
authStorage.clearAll();
```

#### 로컬 스토리지 관리

```typescript
// 토큰 관리
authStorage.setToken("your-token");
const token = authStorage.getToken();
authStorage.removeToken();

// 사용자 정보 관리
authStorage.setUserInfo(userInfo);
const userInfo = authStorage.getUserInfo();
authStorage.removeUserInfo();

// 로그인 상태 확인
const isLoggedIn = authStorage.isLoggedIn();

// 모든 데이터 정리
authStorage.clearAll();
```

### 3. 공통 API 사용

```typescript
// GET 요청
const response = await api.get<UserData>("/users/me");

// POST 요청
const result = await api.post<CreateResponse>("/data", { name: "test" });

// 직접 axios 인스턴스 사용
const response = await apiClient.get("/custom-endpoint");
```

## 🔧 설정

### Axios 인스턴스 설정

`src/api/axios.ts`에서 다음 사항들이 자동으로 처리됩니다:

- **Base URL**: `http://localhost:3008`
- **타임아웃**: 10초
- **인증 토큰**: 자동으로 Authorization 헤더에 추가
- **에러 처리**: 401, 403, 404, 500 등 자동 처리
- **로깅**: 모든 요청/응답 자동 로깅

### 인터셉터 기능

#### Request 인터셉터

- 자동 토큰 추가
- 요청 로깅
- 에러 처리

#### Response 인터셉터

- 응답 로깅
- 401 에러 시 자동 로그아웃 처리
- 다양한 HTTP 에러 상태 처리
- 네트워크 에러 처리

## 🔐 토큰 관리

### 자동 토큰 갱신

```typescript
import { TokenManager } from "@/api/auth";

// 토큰 자동 갱신 시작 (만료 5분 전에 갱신)
TokenManager.startAutoRefresh(expiresIn, refreshToken);

// 토큰 자동 갱신 중지
TokenManager.stopAutoRefresh();
```

### 토큰 유효성 검증

```typescript
const isValid = await AuthAPI.validateToken(token);
if (!isValid.data.valid) {
  // 토큰이 유효하지 않음 - 재로그인 필요
  authStorage.clearAll();
  router.push("/login");
}
```

## 📝 타입 정의

### 공통 응답 타입

```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

interface ApiError {
  success: false;
  error: string;
  message: string;
  statusCode?: number;
}
```

### 카카오 사용자 정보 타입

```typescript
interface KakaoUserInfo {
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
```

## 🎯 실제 사용 예시

### 컴포넌트에서 사용

```vue
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { AuthAPI, authStorage } from "@/api/auth";

const userInfo = ref(null);
const loading = ref(false);

const handleLogin = () => {
  // 서버의 카카오 로그인 엔드포인트로 직접 이동
  window.location.href = "http://localhost:3008/auth/kakao/login";
};

const handleLogout = async () => {
  try {
    await AuthAPI.logout();
    authStorage.clearAll();
    userInfo.value = null;
  } catch (error) {
    console.error("로그아웃 실패:", error);
  }
};

onMounted(async () => {
  if (authStorage.isLoggedIn()) {
    try {
      const response = await AuthAPI.getCurrentUser();
      if (response.success) {
        userInfo.value = response.data;
      }
    } catch (error) {
      console.error("사용자 정보 가져오기 실패:", error);
    }
  }
});
</script>
```

## ⚠️ 주의사항

1. **에러 처리**: 모든 API 호출은 try-catch로 감싸주세요
2. **토큰 관리**: 자동으로 처리되지만, 필요시 수동으로 관리할 수 있습니다
3. **타입 안정성**: TypeScript 타입을 활용해 안전한 코딩을 하세요
4. **로깅**: 개발 환경에서는 모든 요청/응답이 콘솔에 로깅됩니다

## 🔮 향후 확장

이 API 모듈은 다음과 같이 확장할 수 있습니다:

- `susty-cup.ts`: 서스티컵 관련 API
- `rewards.ts`: 리워드 관련 API
- `analytics.ts`: 분석 데이터 API
- `notifications.ts`: 알림 관련 API
