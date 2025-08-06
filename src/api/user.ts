import { api, type ApiResponse } from "./axios";

// ZQ 사용자 확인 응답 타입
export interface CheckZqUserResponse {
  isZqUser: boolean;
  zqUserEmail: string;
}

// SustyCup NFT 확인 응답 타입
export interface CheckSustycupNftResponse {
  isSustycupNft: boolean;
  alreadyRegistered?: boolean;
}

// 컵 태그 제한 확인 응답 타입
export interface CheckCupTagLimitResponse {
  isCupTagLimitExceeded: boolean;
  todayTagCount: number;
}

export class UserAPI {
  static async checkZqUser(): Promise<ApiResponse<CheckZqUserResponse>> {
    return api.post("/user/check/zq-user");
  }

  static async checkSustycupNft(): Promise<
    ApiResponse<CheckSustycupNftResponse>
  > {
    return api.post("/user/check/sustycup-nft");
  }

  static async checkCupTagLimit(): Promise<
    ApiResponse<CheckCupTagLimitResponse>
  > {
    return api.post("/user/check/cup-tag-limit");
  }
}
