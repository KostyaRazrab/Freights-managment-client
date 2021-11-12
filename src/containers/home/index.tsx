import React, { useState } from "react";
import { IFreight } from "../../models";
import { observer } from "mobx-react-lite";
import Switch from "../../components/switch";
import { adminMode } from "../../store/admin-mode-store";
import { freightStore } from "../../store/freight-store";
import AddingFreightDialog from "../adding-freight-dialog";
import InfoFreightDialog from "../../components/info-freight-dialog";
import FreigthsTable from "../freigths-table";
import "./style.scss";

function Home() {
  const [openAddingDialog, setOpenAddingDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openInfoDialog, setOpenInfoDialog] = useState<boolean>(false);
  const [selectedFreight, setSelectedFreight] = useState<IFreight | null>(null);

  function onFreightSelect(freight: IFreight) {
    setSelectedFreight(freight);
    setOpenInfoDialog(true);
  }

  function handleChangeMode() {
    adminMode.setAdminMode();
    setOpenInfoDialog(false);
    setOpenAddingDialog(false);
  }

  function handleOpenEditDialog() {
    setOpenAddingDialog(true);
    setOpenEditDialog(true);
  }

  function handleOpenAddingDialog() {
    setOpenAddingDialog(true);
    setOpenEditDialog(false);
  }

  function onClose() {
    setOpenAddingDialog(false);
    setOpenEditDialog(false);
  }
  return(
    <div className="App">
      <div className="mode">
        <p>Режим администратора</p>
        <Switch checked={adminMode.adminMode} onChange={handleChangeMode} />
      </div>
      <div className="freights-counter-container">
        <h3>{`Количество заявок: ${freightStore.freights.length}`}</h3>
        {adminMode.adminMode && (
          <button
            className="adding-freight-button"
            onClick={handleOpenAddingDialog}
          >
            Добавить
          </button>
        )}
      </div>
      <FreigthsTable
        onFreightSelect={onFreightSelect}
        openEditDialog={handleOpenEditDialog}
      />
      <AddingFreightDialog
        isOpen={openAddingDialog}
        onClose={onClose}
        isEditDialogOpen={openEditDialog}
      />
      <InfoFreightDialog
        isOpen={openInfoDialog}
        onClose={() => setOpenInfoDialog(false)}
        freight={selectedFreight}
      />
    </div>
  )
}

export default observer(Home);
