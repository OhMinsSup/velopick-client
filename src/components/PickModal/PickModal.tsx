import React from "react";
import { PickMap } from "../PickMap";
import Modal from "./Modal";

interface PickModalProps {}
const PickModal: React.FC<PickModalProps> = () => {
  return (
    <Modal visible={true} onClose={() => {}} side={() => <div>사이드</div>}>
      <div className="contents">
        <PickMap />
      </div>
    </Modal>
  );
};

export default PickModal;
