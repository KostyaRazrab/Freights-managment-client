import {
  BaseResponse,
  ICreateFreight,
  IFreight,
  IUpdateFreight,
} from "../models";

export type FreightAPI = {
    getAllFreights(): Promise<BaseResponse<IFreight[]>>
    createFreight(freight: ICreateFreight): Promise<BaseResponse<IFreight>>
    deleteFreight(freightId: string): Promise<BaseResponse<IFreight>>
    updateFreight(freightId: string, freight: IUpdateFreight): Promise<BaseResponse<IFreight>>
  }