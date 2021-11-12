export interface IFreight {
  number: number;
  receiptDate: Date;
  carrierFullname: string;
  clientFirm: string;
  carrierPhoneNumber: string;
  comment: string;
  ATICode: string;
}

export interface ICreateFreight {
  number: number;
  receiptDate: Date;
  carrierFullname: string;
  clientFirm: string;
  carrierPhoneNumber: string;
  ATICode: string;
  comment: string;
}

export interface IDeleteFreight {
  id: string;
}

export interface IUpdateFreight {
  receiptDate: Date;
  carrierFullname: string;
  clientFirm: string;
  carrierPhoneNumber: string;
  ATICode: string;
  comment: string;
}
