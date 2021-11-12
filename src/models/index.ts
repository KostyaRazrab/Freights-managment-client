export interface IFreight {
  number: number;
  receiptDate: Date;
  carrierFullname: string;
  clientFirm: string;
  carrierPhoneNumber: string;
  comment: string;
  ATICode: string;
}

export interface IFreightEdit {
  receiptDate: Date;
  carrierFullname: string;
  clientFirm: string;
  carrierPhoneNumber: string;
  ATICode: string;
  comment: string;
}

export interface ISelectedFreightToEdit extends IFreightEdit {
  id: string;
}
