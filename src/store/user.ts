import { defineStore } from "pinia";
import { UserAPI } from "@/api/user";
import { useAuthStore } from "@/store/auth";

export const useUserStore = defineStore("user", () => {
  const authStore = useAuthStore();
  const checkSustyCupNft = async (): Promise<boolean> => {
    const response = await UserAPI.checkSustyCupNft();
    if (authStore.userInfo) {
      authStore.userInfo.is_sustycup_nft = response.data.isSustycupNft;
      authStore.userInfo.is_zq_user = response.data.isZqUser;
      return true;
    }
    return false;
  };

  const updateSustyCupNft = async (): Promise<boolean> => {
    const response = await UserAPI.updateSustyCupNft();
    if (authStore.userInfo) {
      authStore.userInfo.is_sustycup_nft = response.data.isSustycupNft;
      authStore.userInfo.is_zq_user = response.data.isZqUser;
      return true;
    }
    return false;
  };

  return {
    checkSustyCupNft,
    updateSustyCupNft,
  };
});
