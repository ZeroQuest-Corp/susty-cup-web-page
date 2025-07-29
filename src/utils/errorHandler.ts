import { AxiosError } from "axios";
import { useModalStore } from "@/store/modal";

export interface ErrorContext {
  operation: string;
  customMessages?: {
    [errorCode: number]: string;
  };
}

// 서버 에러 응답 타입
export interface ServerErrorResponse {
  code: number;
  key: string;
  message: string;
  nextEligibleAt?: string; // 601 에러 시 다음 사용 가능 시간 (ISO 8601 문자열)
}

/**
 * 전역 API 에러 처리 함수
 * @param error - 발생한 에러
 * @param context - 에러 발생 컨텍스트 (operation 이름과 커스텀 메시지)
 */
export const handleApiError = (error: unknown) => {
  const modalStore = useModalStore();

  if (error instanceof AxiosError && error.response) {
    const httpStatus = error.response.status;
    const errorData = error.response.data as ServerErrorResponse;

    // 서버에서 커스텀 에러 코드를 보냈는지 확인
    if (errorData?.code && errorData?.key && errorData?.message) {
      const serverErrorCode = errorData.code;
      const errorKey = errorData.key;
      const errorMessage = errorData.message;

      console.log(
        `서버 에러 코드: ${serverErrorCode}, 키: ${errorKey}, 메시지: ${errorMessage}`
      );

      // 커스텀 메시지가 있으면 우선 사용
      if (errorMessage) {
        modalStore.openErrorModal(serverErrorCode, errorMessage);
        return;
      }

      // 서버 커스텀 에러 코드별 처리
      switch (serverErrorCode) {
        case 601:
          modalStore.openErrorModal(601, errorMessage);
          break;

        case 602:
          // TODO: 사용자가 정의할 에러 처리
          modalStore.openErrorModal(602, errorMessage);
          break;

        case 603:
          // TODO: 사용자가 정의할 에러 처리
          modalStore.openErrorModal(603, errorMessage);
          break;

        case 604:
          // TODO: 사용자가 정의할 에러 처리
          modalStore.openErrorModal(604, errorMessage);
          break;

        case 605:
          // TODO: 사용자가 정의할 에러 처리
          modalStore.openErrorModal(605, errorMessage);
          break;

        default:
          // 정의되지 않은 서버 에러 코드
          modalStore.openErrorModal(
            serverErrorCode,
            errorMessage ||
              `서버 에러가 발생했습니다. (코드: ${serverErrorCode})`
          );
          break;
      }

      return;
    }

    // 서버에서 커스텀 에러 포맷을 보내지 않은 경우 기존 HTTP 상태코드로 처리
    console.log("HTTP 상태코드로 에러 처리:", httpStatus);

    switch (httpStatus) {
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
          httpStatus,
          "서버가 일시적으로 사용할 수 없습니다. 잠시 후 다시 시도해주세요."
        );
        break;

      default:
        // 기타 HTTP 에러
        modalStore.openErrorModal(
          httpStatus,
          errorData?.message ||
            `알 수 없는 오류가 발생했습니다. (HTTP ${httpStatus})`
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
// export const handleCupApiError = (
//   error: unknown,
//   operation: "init" | "session" | "tag"
// ) => {
//   const customMessages: { [key: number]: string } = {};

//   switch (operation) {
//     case "init":
//       // 서버 에러 코드별 커스텀 메시지
//       customMessages[601] =
//         "해당 컵을 찾을 수 없습니다. 올바른 QR코드인지 확인해주세요.";
//       customMessages[602] = "잘못된 QR코드입니다. 다시 확인해주세요.";
//       break;

//     case "session":
//       customMessages[601] = "세션을 찾을 수 없습니다. 다시 태그해주세요.";
//       customMessages[602] =
//         "세션을 완료할 권한이 없습니다. 로그인 상태를 확인해주세요.";
//       break;

//     case "tag":
//       customMessages[601] =
//         "해당 컵을 찾을 수 없습니다. 올바른 QR코드인지 확인해주세요.";
//       customMessages[602] =
//         "이 컵을 사용할 권한이 없습니다. 로그인 상태를 확인해주세요.";
//       break;
//   }

//   handleApiError(error);
// };
