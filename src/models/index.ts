export interface IFreight {
  _id: string;
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

export interface IFreightCreate {
  number: number;
  receiptDate: Date;
  carrierFullname: string;
  clientFirm: string;
  carrierPhoneNumber: string;
  comment: string;
  ATICode: string;
}

export interface ISelectedFreightToEdit extends IFreightEdit {
  id: string;
}
