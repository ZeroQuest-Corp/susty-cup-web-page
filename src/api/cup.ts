import { api, type ApiResponse } from "./axios";

export interface CupInitResponse
  extends ApiResponse<{
    cupCount: number;
    sessionId: string;
  }> {}

export interface CompleteScanSessionResponse
  extends ApiResponse<{
    cupCount: number;
    cupId: string;
    nextEligibleAt: Date;
  }> {}

export class CupAPI {
  static async getCupInit(cupId: string): Promise<CupInitResponse> {
    return api.post(`/cup/init`, { cupId });
  }

  static async completeScanSession(
    scanSessionId: string
  ): Promise<CompleteScanSessionResponse> {
    return api.patch(`/cup/${scanSessionId}/attach-user`);
  }

  static async completeScanTag(
    cupId: string,
    nextEligibleAt: Date
  ): Promise<CompleteScanSessionResponse> {
    return api.post(`/cup/tag`, { cupId, nextEligibleAt });
  }
}
