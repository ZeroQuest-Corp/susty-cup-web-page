import { defineStore } from "pinia";
import { ref } from "vue";
import { UserAPI } from "@/api/user";
import { useAuthStore } from "@/store/auth";
import { handleApiError } from "@/utils/errorHandler";

export const useUserStore = defineStore("user", () => {
  const authStore = useAuthStore();
  const todayTagCount = ref(0);

  const checkZqUser = async (): Promise<boolean> => {
    const response = await UserAPI.checkZqUser();
    if (authStore.userInfo) {
      authStore.userInfo.is_zq_user = response.data.isZqUser;
      authStore.userInfo.zq_user_email = response.data.zqUserEmail;
      return true;
    }
    return false;
  };

  const checkSustycupNft = async (): Promise<boolean> => {
    const response = await UserAPI.checkSustycupNft();
    if (authStore.userInfo) {
      authStore.userInfo.is_sustycup_nft = response.data.isSustycupNft;
      return true;
    }
    return false;
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
