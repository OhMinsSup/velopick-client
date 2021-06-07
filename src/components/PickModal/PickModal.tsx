import React from "react";
import { PickMap } from "../PickMap";
import ModalWrapper from "./ModalWrapper";
import PickMapSearchSidebar from "./PickMapSearchSidebar";

interface PickModalProps {
  visible: boolean;
  onClose: () => void;
}
const PickModal: React.FC<PickModalProps> = ({ visible, onClose }) => {
  return (
    <ModalWrapper
      visible={visible}
      onClose={onClose}
      side={<PickMapSearchSidebar />}
    >
      <div className="contents">
        <PickMap />
      </div>
    </ModalWrapper>
  );
};

export default PickModal;
