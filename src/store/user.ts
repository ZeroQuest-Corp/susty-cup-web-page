import { defineStore } from "pinia";
import { ref } from "vue";
import { UserAPI } from "@/api/user";
import { useAuthStore } from "@/store/auth";
import { handleApiError } from "@/utils/errorHandler";

export const useUserStore = defineStore("user", () => {
  const authStore = useAuthStore();
  const todayTagCount = ref(0);

  const checkZqUser = async (): Promise<boolean> => {
    try {
      const response = await UserAPI.checkZqUser();
      if (authStore.userInfo) {
        authStore.userInfo.is_zq_user = response.data.isZqUser;
        authStore.userInfo.zq_user_email = response.data.zqUserEmail;
        console.log("checkZqUser 성공:", response.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error("checkZqUser 실패:", error);
      // API 호출 실패 시 ZQ 사용자 상태를 false로 초기화
      if (authStore.userInfo) {
        authStore.userInfo.is_zq_user = false;
        authStore.userInfo.zq_user_email = "";
        console.log("ZQ 사용자 상태 초기화 완료");
      }
      // 에러를 다시 던지지 않고 false를 반환하여 앱이 계속 동작하도록 함
      return false;
    }
  };

  const checkSustycupNft = async (): Promise<boolean> => {
    try {
      const response = await UserAPI.checkSustycupNft();
      if (authStore.userInfo) {
        authStore.userInfo.is_sustycup_nft = response.data.isSustycupNft;
        console.log("checkSustycupNft 성공:", response.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error("checkSustycupNft 실패:", error);
      // API 호출 실패 시 NFT 상태를 false로 초기화
      if (authStore.userInfo) {
        authStore.userInfo.is_sustycup_nft = false;
        console.log("Sustycup NFT 상태 초기화 완료");
      }
      // 에러를 다시 던지지 않고 false를 반환하여 앱이 계속 동작하도록 함
      return false;
    }
  };

  const checkCupTagLimit = async () => {
    try {
      const response = await UserAPI.checkCupTagLimit();
      console.log("checkCupTagLimit", response.data.todayTagCount);
      todayTagCount.value = response.data.todayTagCount;
      return response.data.isCupTagLimitExceeded;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };

  return {
    checkZqUser,
    checkSustycupNft,
    checkCupTagLimit,
    todayTagCount,
  };
});
