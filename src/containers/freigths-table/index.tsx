import React, {useEffect, MouseEvent } from "react";
import { freightStore } from "../../store/freight-store";
import { adminMode } from "../../store/admin-mode-store";
import { IFreight, ISelectedFreightToEdit } from "../../models";
import { observer } from "mobx-react-lite";
import { format } from 'date-fns'
import BinIcon from "../../assets/images/bin.svg";
import EditIcon from "../../assets/images/editing.svg";
import Loader from "../../components/loader";
import "./style.scss";

type Props = {
  onFreightSelect: (freight: IFreight) => void;
  openEditDialog: () => void
};



function FreigthsTable(props: Props) {

  useEffect(() => {
    freightStore.getAllFreights();
  }, []);

  function deleteFreight(e: MouseEvent, id: string){
    e.stopPropagation()
    freightStore.deleteFreight(id)
  }

  function openEditDialog(e: MouseEvent, freight: ISelectedFreightToEdit){
    e.stopPropagation()
    props.openEditDialog()
    freightStore.setSelectedFreightToEdit(freight)
  }

  return !freightStore.loading?(
    <table className="freight-table">
      <thead>
        <tr>
          <th>Номер</th>
          <th>Дата получения</th>
          <th>Фирма клиента</th>
          <th>ФИО перевозчика</th>
          <th>Телефон перевозчика</th>
          {adminMode.adminMode && <th>Действия</th>}
        </tr>
      </thead>
      <tbody>
        {freightStore.freights.map((freight: any) => (
          <tr
            key={freight.number}
            onClick={() =>
              adminMode.adminMode ? props.onFreightSelect(freight) : null
            }
            style={{ cursor: adminMode.adminMode ? "pointer" : "default" }}
          >
            <td>{freight.number}</td>
            <td>{format(new Date(freight.receiptDate), 'dd.MM.yyyy hh:mm')}</td>
            <td>{freight.clientFirm}</td>
            <td>{freight.carrierFullname}</td>
            <td>{freight.carrierPhoneNumber}</td>
            {adminMode.adminMode && (
              <td>
                <button className="freight-edit-button" onClick={(e: MouseEvent) => openEditDialog(e, {
                  id: freight._id,
                  clientFirm: freight.clientFirm,
                  carrierFullname: freight.carrierFullname,
                  carrierPhoneNumber: freight.carrierPhoneNumber,
                  receiptDate: freight.receiptDate,
                  ATICode: freight.ATICode,
                  comment: freight.comment
                })}>
                  <img src={EditIcon} alt="Edit" width={20} height={20} />
                </button>
                <button
                  onClick={ (e: MouseEvent) => deleteFreight(e, freight._id)}
                  className="freight-remove-button"
                >
                  <img src={BinIcon} alt="Bin" width={20} height={20} />
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  ): <Loader />;
}

export default observer(FreigthsTable);