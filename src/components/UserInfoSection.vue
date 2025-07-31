<template>
  <div class="w-full flex flex-col justify-start items-start">
    <!--  유저 정보보 박스 -->
    <div
      v-if="isZqUser && isSustyCupNft"
      class="w-full h-full flex flex-col items-center justify-between bg-[#69CEBF] rounded-xl p-4 mb-6"
    >
      <div class="w-full h-full flex items-center justify-between mb-4">
        <div class="w-1/2">
          <img src="@/assets/images/zeroquest_text.png" alt="logo" />
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-2">
            <div class="text-white text-xl">ZQ 계정</div>
            <img src="@/assets/images/icon/check_icon.png" alt="check" />
          </div>
          <div class="flex items-center gap-2">
            <div class="text-white text-xl">NFT 연동</div>
            <img src="@/assets/images/icon/check_icon.png" alt="check" />
          </div>
        </div>
      </div>
      <div
        class="w-full h-full flex justify-center items-center bg-[#141414]/32 rounded-3xl p-1 gap-4"
      >
        <div>
          <img src="@/assets/images/icon/user_icon.png" alt="logo" />
        </div>
        <div class="flex items-center gap-2">
          <div class="text-white text-xl">{{ zqUserEmail }}</div>
        </div>
      </div>
    </div>
    <div
      v-else-if="isZqUser && !isSustyCupNft"
      class="w-full h-full flex flex-col items-center justify-between bg-[#cecb69] rounded-xl p-4 mb-6"
    >
      <div class="w-full h-full flex items-center justify-between mb-4">
        <div class="w-1/2">
          <img src="@/assets/images/zeroquest_text.png" alt="logo" />
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-2">
            <div class="text-white text-xl">ZQ 계정</div>
            <img src="@/assets/images/icon/check_icon.png" alt="check" />
          </div>
          <div class="flex items-center gap-2">
            <div class="text-white text-xl">NFT 연동</div>
            <img src="@/assets/images/icon/close_icon.png" alt="check" />
          </div>
        </div>
      </div>
      <div
        class="w-full h-full flex justify-center items-center bg-[#141414]/32 rounded-3xl p-1 gap-4"
      >
        <div>
          <img src="@/assets/images/icon/user_icon.png" alt="logo" />
        </div>
        <div class="flex items-center gap-2">
          <div class="text-white text-xl">{{ zqUserEmail }}</div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="w-full h-full flex flex-col items-center justify-between bg-[#FE7273] rounded-xl p-4 mb-6"
    >
      <div class="w-full h-full flex items-center justify-between mb-4">
        <div class="w-1/2">
          <img src="@/assets/images/zeroquest_text.png" alt="logo" />
        </div>
        <div class="flex items-center gap-2">
          <div class="text-white text-xl">연결안됨</div>
          <img src="@/assets/images/icon/close_icon.png" alt="close" />
        </div>
      </div>
      <div
        class="w-full h-full flex justify-center items-center bg-[#141414]/32 rounded-3xl p-1 gap-4"
      >
        <div>
          <img src="@/assets/images/icon/user_icon.png" alt="logo" />
        </div>
        <div class="flex items-center gap-2">
          <div class="text-white text-xl">{{ zqUserEmail }}</div>
        </div>
      </div>
    </div>
    <!-- NFT 구매 안내 (리워드 자격이 있지만 NFT가 없는 경우) -->
    <div v-if="isEligibleForReward && !isSustyCupNft" class="mt-4">
      <NftPurchaseGuide />
    </div>
    <DownloadBox />
    <NotificationBox />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { type UserInfo } from "@/api/auth";
import DownloadBox from "@/components/DownloadBox.vue";
import NotificationBox from "@/components/NotificationBox.vue";
import NftPurchaseGuide from "@/components/NftPurchaseGuide.vue";
import { useCupStats } from "@/composables/useCupStats";

const props = defineProps<{
  user: UserInfo | null;
}>();

const { isEligibleForReward } = useCupStats();
const isZqUser = computed(() => props.user?.is_zq_user);
const zqUserEmail = computed(() => props.user?.zq_user_email);
const isSustyCupNft = computed(() => props.user?.is_sustycup_nft);
</script>
