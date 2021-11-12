import React, { ReactNode } from "react";
import "./style.scss";

type Props = {
  isOpen: boolean;
  onClose:() => void
  children?: ReactNode;
};

export default function SimpleDialog(props: Props) {
  return props.isOpen ? (
    <div className="dialog-wrapper" onClick={props.onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>{props.children}</div>
    </div>
  ) : null;
}
