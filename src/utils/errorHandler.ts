import { AxiosError } from "axios";
import { useModalStore } from "@/store/modal";

export interface ErrorContext {
  operation: string;
  customMessages?: {
    [statusCode: number]: string;
  };
}

/**
 * 전역 API 에러 처리 함수
 * @param error - 발생한 에러
 * @param context - 에러 발생 컨텍스트 (operation 이름과 커스텀 메시지)
 */
export const handleApiError = (
  error: unknown,
  context: ErrorContext | string = ""
) => {
  const modalStore = useModalStore();

  // context가 문자열이면 기본 ErrorContext로 변환
  const errorContext: ErrorContext =
    typeof context === "string" ? { operation: context } : context;

  console.error(`${errorContext.operation} failed:`, error);

  if (error instanceof AxiosError && error.response) {
    const status = error.response.status;
    const errorData = error.response.data;

    // 커스텀 메시지가 있으면 우선 사용
    if (errorContext.customMessages?.[status]) {
      modalStore.openErrorModal(status, errorContext.customMessages[status]);
      return;
    }

    switch (status) {
      case 601:
        // 601 에러 - 카운트다운 모달 표시
        console.log("601 에러 - 사용 제한 시간 확인");
        const nextEligibleAt = errorData?.nextEligibleAt
          ? new Date(errorData.nextEligibleAt)
          : new Date(Date.now() + 5 * 60 * 1000); // 기본 5분 후
        modalStore.openCountdownModal(nextEligibleAt);
        break;

      case 400:
        modalStore.openErrorModal(
          400,
          "잘못된 요청입니다. 입력 내용을 다시 확인해주세요."
        );
        break;

      case 401:
        modalStore.openErrorModal(
          401,
          "인증이 필요합니다. 다시 로그인해주세요."
        );
        break;

      case 403:
        modalStore.openErrorModal(
          403,
          "접근 권한이 없습니다. 로그인 상태를 확인해주세요."
        );
        break;

      case 404:
        modalStore.openErrorModal(404, "요청한 리소스를 찾을 수 없습니다.");
        break;

      case 409:
        modalStore.openErrorModal(409, "이미 처리된 요청입니다.");
        break;

      case 429:
        modalStore.openErrorModal(
          429,
          "요청이 너무 많습니다. 잠시 후 다시 시도해주세요."
        );
        break;

      case 500:
        modalStore.openErrorModal(
          500,
          "서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
        );
        break;

      case 502:
      case 503:
      case 504:
        modalStore.openErrorModal(
          status,
          "서버가 일시적으로 사용할 수 없습니다. 잠시 후 다시 시도해주세요."
        );
        break;

      default:
        // 기타 에러
        modalStore.openErrorModal(
          status,
          errorData?.message || `알 수 없는 오류가 발생했습니다. (${status})`
        );
        break;
    }
  } else {
    // 네트워크 에러 등
    modalStore.openErrorModal(0, "네트워크 연결을 확인해주세요.");
  }
};

/**
 * 컵 관련 API 에러 처리 (컨텍스트에 따른 커스텀 메시지)
 */
export const handleCupApiError = (
  error: unknown,
  operation: "init" | "session" | "tag"
) => {
  const customMessages: { [key: number]: string } = {};

  switch (operation) {
    case "init":
      customMessages[404] =
        "해당 컵을 찾을 수 없습니다. 올바른 QR코드인지 확인해주세요.";
      customMessages[400] = "잘못된 QR코드입니다. 다시 확인해주세요.";
      break;

    case "session":
      customMessages[404] = "세션을 찾을 수 없습니다. 다시 태그해주세요.";
      customMessages[403] =
        "세션을 완료할 권한이 없습니다. 로그인 상태를 확인해주세요.";
      break;

    case "tag":
      customMessages[404] =
        "해당 컵을 찾을 수 없습니다. 올바른 QR코드인지 확인해주세요.";
      customMessages[403] =
        "이 컵을 사용할 권한이 없습니다. 로그인 상태를 확인해주세요.";
      break;
  }

  handleApiError(error, {
    operation: `Cup ${operation}`,
    customMessages,
  });
};
