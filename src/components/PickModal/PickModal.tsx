import React from "react";
import { PickMap } from "../PickMap";
import ModalWrapper from "./ModalWrapper";
import PickMapSearchSidebar from "./PickMapSearchSidebar";

interface PickModalProps {}
const PickModal: React.FC<PickModalProps> = () => {
  return (
    <ModalWrapper
      visible={true}
      onClose={() => {}}
      side={<PickMapSearchSidebar />}
    >
      <div className="contents">
        <PickMap />
      </div>
    </ModalWrapper>
  );
};

export default PickModal;
