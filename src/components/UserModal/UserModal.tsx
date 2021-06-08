import React from "react";
import Modal from "../common/Modal";
import UserEditor from "./UserEditor";

interface UserModalProps {
  visible: boolean;
  onClose: () => void;
}
const UserModal: React.FC<UserModalProps> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} onClose={onClose}>
      <UserEditor />
    </Modal>
  );
};

export default UserModal;
