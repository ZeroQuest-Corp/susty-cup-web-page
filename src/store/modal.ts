import { defineStore } from "pinia";
import { ref } from "vue";

export type ModalType = "countdown" | "error" | "info" | "tagCount";

export interface ModalData {
  title?: string;
  message?: string;
  nextEligibleAt?: Date;
  errorCode?: number;
  tagCount?: number;
}

export const useModalStore = defineStore("modal", () => {
  const isOpen = ref(false);
  const modalType = ref<ModalType>("info");
  const modalData = ref<ModalData>({});

  const openModal = (type: ModalType = "info", data: ModalData = {}) => {
    modalType.value = type;
    modalData.value = data;
    isOpen.value = true;
  };

  const openCountdownModal = (nextEligibleAt: Date) => {
    openModal("countdown", { nextEligibleAt });
  };

  const openTagCountModal = (tagCount: number) => {
    openModal("tagCount", { tagCount });
  };

  const openErrorModal = (errorCode: number, message: string) => {
    openModal("error", {
      errorCode,
      message,
      title: `${errorCode} 에러 발생`,
    });
  };

  const closeModal = () => {
    isOpen.value = false;
    modalType.value = "info";
    modalData.value = {};
  };

  return {
    isOpen,
    modalType,
    modalData,
    openModal,
    openCountdownModal,
    openTagCountModal,
    openErrorModal,
    closeModal,
  };
});
