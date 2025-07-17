import { api, type ApiResponse } from "./axios";

export interface CupInitResponse
  extends ApiResponse<{
    cupCount: number;
    sessionId: string;
  }> {}
export class CupAPI {
  static async getCupInit(cupId: string): Promise<CupInitResponse> {
    return api.post(`/cup/init`, { cupId });
  }
}
