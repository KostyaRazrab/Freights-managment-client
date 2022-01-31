import React, { useEffect, FormEvent } from "react";
import { useInput } from "../../hooks/use-input";
import { IFreightEdit, IFreightCreate } from "../../models/index";
import { freightStore } from "../../store/freight-store";
import { observer } from "mobx-react-lite";
import SimpleDialog from "../../components/dialog";
import { format } from "date-fns";
import "./style.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  isEditDialogOpen: boolean;
};

function FreightDialog(props: Props) {
  const clientFirm = useInput("", {
    isEmpty: true,
    minLength: 4,
    maxLength: 100,
  });
  const carrierFullname = useInput("", {
    isEmpty: true,
    minLength: 6,
    isFullName: true,
    isContainsOnlyLetters: true,
  });

  const carrierPhoneNumber = useInput("", {
    isEmpty: true,
    minLength: 11,
    maxLength: 11,
    isNumber: true,
  });

  const receiptDate = useInput("", {});

  const atiCode = useInput("", {
    isEmpty: true,
    maxLength: 5,
  });

  const comment = useInput("", {});

  function handleAddFreight() {
    const newFreight: IFreightCreate = {
      number:
        freightStore.freights.length > 0 ? freightStore.freights.length + 1 : 1,
      receiptDate: receiptDate.value,
      clientFirm: clientFirm.value,
      carrierFullname: carrierFullname.value,
      carrierPhoneNumber: carrierPhoneNumber.value,
      comment: comment.value,
      ATICode: atiCode.value,
    };

    freightStore.createFreight(newFreight);
  }

  function handleEditFreight(id: string) {
    const editedFreight: IFreightEdit = {
      receiptDate: receiptDate.value,
      clientFirm: clientFirm.value,
      carrierFullname: carrierFullname.value,
      carrierPhoneNumber: carrierPhoneNumber.value,
      ATICode: atiCode.value,
      comment: comment.value,
    };

    freightStore.editFreight(id, editedFreight);
  }

  function onEnter(e: FormEvent) {
    e.preventDefault();

    if (props.isEditDialogOpen && freightStore.selectedFreightToEdit !== null) {
      handleEditFreight(freightStore.selectedFreightToEdit.id);
    } else {
      handleAddFreight();
    }

    onCloseDialog();
  }

  function fillInputsEditableFreight() {
    if (freightStore.selectedFreightToEdit !== null) {
      clientFirm.takeValue(freightStore.selectedFreightToEdit.clientFirm);
      carrierFullname.takeValue(
        freightStore.selectedFreightToEdit.carrierFullname
      );
      carrierPhoneNumber.takeValue(
        freightStore.selectedFreightToEdit.carrierPhoneNumber
      );
      receiptDate.takeValue(
        format(
          new Date(freightStore.selectedFreightToEdit.receiptDate),
          "yyyy-MM-dd"
        ) +
          "T" +
          format(
            new Date(freightStore.selectedFreightToEdit.receiptDate),
            "hh:mm"
          )
      );
      atiCode.takeValue(freightStore.selectedFreightToEdit.ATICode);
      comment.takeValue(freightStore.selectedFreightToEdit.comment);
    }
  }

  function onCloseDialog() {
    clientFirm.onClear();
    carrierFullname.onClear();
    carrierPhoneNumber.onClear();
    receiptDate.onClear();
    atiCode.onClear();
    comment.onClear();
    props.onClose();
  }

  useEffect(() => {
    if (props.isEditDialogOpen) fillInputsEditableFreight();
  }, [props.isEditDialogOpen]);

  return (
    <SimpleDialog isOpen={props.isOpen} onClose={onCloseDialog}>
      <form className="adding-freight-form" onSubmit={onEnter}>
        {clientFirm.isEmpty && clientFirm.isDirty && (
          <div className="form-walid-error">Поле не должно быть пустым</div>
        )}
        {clientFirm.maxLengthError && clientFirm.isDirty && (
          <div className="form-walid-error">
            Превышено максимальное количество символов
          </div>
        )}
        {clientFirm.minLengthError && clientFirm.isDirty && (
          <div className="form-walid-error">
            Слишком маленькое количество символов
          </div>
        )}

        <input
          required={true}
          type="text"
          placeholder="Фирма клиента"
          value={clientFirm.value}
          onChange={(e) => clientFirm.onChange(e)}
          onBlur={(e) => clientFirm.onBlur(e)}
        />
        {carrierFullname.isEmpty && carrierFullname.isDirty && (
          <div className="form-walid-error">Поле не должно быть пустым</div>
        )}
        {carrierFullname.minLengthError && carrierFullname.isDirty && (
          <div className="form-walid-error">
            Слишком маленькое количество символов
          </div>
        )}
        {!carrierFullname.isContainsOnlyLetters && carrierFullname.isDirty && (
          <div className="form-walid-error">
            Присутствуют недопустимые символы
          </div>
        )}
        {!carrierFullname.isFullName && carrierFullname.isDirty && (
          <div className="form-walid-error">
            Введите необходимое количество слов
          </div>
        )}
        <input
          type="text"
          placeholder="ФИО перевозчика"
          value={carrierFullname.value}
          onChange={(e) => carrierFullname.onChange(e)}
          onBlur={(e) => carrierFullname.onBlur(e)}
        />

        {carrierPhoneNumber.isEmpty && carrierPhoneNumber.isDirty && (
          <div className="form-walid-error">Поле не должно быть пустым</div>
        )}
        {(carrierPhoneNumber.minLengthError ||
          carrierPhoneNumber.maxLengthError) &&
          carrierPhoneNumber.isDirty && (
            <div className="form-walid-error">
              Номер должен состоять из 11 символов
            </div>
          )}
        {!carrierPhoneNumber.isNumber && carrierPhoneNumber.isDirty && (
          <div className="form-walid-error">
            Присутствуют недопустимые символы
          </div>
        )}
        <input
          type="text"
          placeholder="Телефон перевозчика"
          value={carrierPhoneNumber.value}
          onChange={(e) => carrierPhoneNumber.onChange(e)}
          onBlur={(e) => carrierPhoneNumber.onBlur(e)}
        />
        {atiCode.isEmpty && atiCode.isDirty && (
          <div className="form-walid-error">Поле не должно быть пустым</div>
        )}
        {atiCode.maxLengthError && atiCode.isDirty && (
          <div className="form-walid-error">
            Превышено максимальное количество символов
          </div>
        )}
        <input
          type="text"
          placeholder="ATI код сети перевозчика"
          value={atiCode.value}
          onChange={(e) => atiCode.onChange(e)}
          onBlur={(e) => atiCode.onBlur(e)}
        />
        <input
          type="datetime-local"
          placeholder="Дата получения"
          value={receiptDate.value}
          onChange={(e) => receiptDate.onChange(e)}
          onBlur={(e) => receiptDate.onBlur(e)}
        />
        <input
          type="text"
          placeholder="Комментарий"
          value={comment.value}
          onChange={(e) => comment.onChange(e)}
          onBlur={(e) => comment.onBlur(e)}
        />

        <button
          type="submit"
          disabled={
            clientFirm.isEmpty ||
            clientFirm.maxLengthError ||
            clientFirm.minLengthError ||
            carrierFullname.isEmpty ||
            !carrierFullname.isContainsOnlyLetters ||
            !carrierFullname.isFullName ||
            carrierFullname.minLengthError ||
            carrierPhoneNumber.isEmpty ||
            !carrierPhoneNumber.isNumber ||
            carrierPhoneNumber.maxLengthError ||
            carrierPhoneNumber.minLengthError ||
            !receiptDate.value ||
            atiCode.isEmpty ||
            atiCode.maxLengthError
          }
        >
          {props.isEditDialogOpen ? "Редактировать" : "Создать"}
        </button>
        <button type="button" onClick={onCloseDialog}>
          Отмена
        </button>
      </form>
    </SimpleDialog>
  );
}

export default observer(FreightDialog);
