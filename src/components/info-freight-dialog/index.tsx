import SimpleDialog from "../dialog";
import { IFreight } from "../../models";
import {format} from 'date-fns'
import './style.scss'

type Props = {
  isOpen: boolean;
  onClose: () => void;
  freight: IFreight | null;
};

export default function InfoFreightDialog(props: Props) {
  return props.freight !== null ? (
    <SimpleDialog isOpen={props.isOpen} onClose={props.onClose}>
      <div className='info-freight-dialog'>
      <h3>Номер заявки: {props.freight.number}</h3>
      <p>Фирма клиента: {props.freight.clientFirm}</p>
      <p>Дата получения заявки: {format(new Date(props.freight.receiptDate), 'dd.MM.yyyy hh:mm')}</p>
      <p>ФИО перевозчика: {props.freight.carrierFullname}</p>
      <p>Телефон перевозчика: {props.freight.carrierPhoneNumber}</p>
      <p>
        ATI код сети перевозчика:{" "}
        <a href={`https://ati.su/firms/${props.freight.ATICode}/info`} target='_blank' rel="noreferrer">
          {props.freight.ATICode}
        </a>
      </p>

      <p>Комментарий: {props.freight.comment}</p>
      <button onClick={props.onClose}>Закрыть</button>
      </div>
    </SimpleDialog>
  ) : null;
}
