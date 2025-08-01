import { api, type ApiResponse } from "./axios";

export interface CupInitResponse extends ApiResponse<string> {}

export interface CupInfoResponse
  extends ApiResponse<{
    total_count: number;
    cupId: string;
  }> {}

export interface CompleteScanSessionResponse
  extends ApiResponse<{
    cupCount: number;
    cupId: string;
    nextEligibleAt: Date;
  }> {}

export class CupAPI {
  static async initCup(cupId: string): Promise<CupInitResponse> {
    return api.post(`/cup/init`, { cupId });
  }

  static async getCupInfo(cupId: string): Promise<CupInfoResponse> {
    return api.get(`/cup/info/${cupId}`);
  }

  static async completeScanSession(
    scanSessionId: string
  ): Promise<CompleteScanSessionResponse> {
    return api.patch(`/cup/${scanSessionId}/attach-user`);
  }

  static async completeScanTag(
    cupId: string
  ): Promise<CompleteScanSessionResponse> {
    return api.post(`/cup/tag`, { cupId });
  }
}
