import { IFreight } from "../../../models";

export const fakeFreights: IFreight[] = [
  {
    number: 1,
    receiptDate: new Date(Date.now()),
    clientFirm: "ООО Ромашка",
    carrierFullname: "Овчинников Константин Геннадьевич",
    carrierPhoneNumber: "89837369978",
    comment: "Комментарий",
    ATICode: '678'
  },
  {
    number: 2,
    receiptDate: new Date(Date.now()),
    clientFirm: "ООО Ромашка",
    carrierFullname: "Овчинников Константин Геннадьевич",
    carrierPhoneNumber: "89836459978",
    comment: "Комментарий",
    ATICode: '678'
  },
  {
    number: 3,
    receiptDate: new Date(Date.now()),
    clientFirm: "ООО Ромашка",
    carrierFullname: "Овчинников Константин Геннадьевич",
    carrierPhoneNumber: "89836459978",
    comment: "Комментарий",
    ATICode: '678'
  },
];
