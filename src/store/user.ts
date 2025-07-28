import { defineStore } from "pinia";
import { UserAPI } from "@/api/user";
import { useAuthStore } from "@/store/auth";

export const useUserStore = defineStore("user", () => {
  const authStore = useAuthStore();
  const checkSustyCupNft = async (): Promise<boolean> => {
    const response = await UserAPI.checkSustyCupNft();
    if (authStore.userInfo) {
      authStore.userInfo.is_susty_cup_nft = response.data;
      return authStore.userInfo.is_susty_cup_nft;
    }
    return false;
  };

  const updateSustyCupNft = async (
    isSustyCupNft: boolean
  ): Promise<boolean> => {
    const response = await UserAPI.updateSustyCupNft(isSustyCupNft);
    if (authStore.userInfo) {
      authStore.userInfo.is_susty_cup_nft = response.data;
      return authStore.userInfo.is_susty_cup_nft;
    }
    return false;
  };

  return {
    checkSustyCupNft,
    updateSustyCupNft,
  };
});
