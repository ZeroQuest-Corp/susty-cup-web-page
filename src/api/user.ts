import { api, type ApiResponse } from "./axios";

export class UserAPI {
  static async checkSustyCupNft(): Promise<ApiResponse<boolean>> {
    return api.get("/user/check/sustycup-nft");
  }

  static async updateSustyCupNft(
    isSustyCupNft: boolean
  ): Promise<ApiResponse<boolean>> {
    return api.post("/user/update/sustycup-nft", {
      is_susty_cup_nft: isSustyCupNft,
    });
  }
}
