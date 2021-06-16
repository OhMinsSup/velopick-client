import React from "react";
import Modal from "../common/Modal";
import TagEditor from "./TagEditor";

interface TagModalProps {
  visible: boolean;
  onClose: () => void;
}
const TagModal: React.FC<TagModalProps> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} onClose={onClose}>
      <TagEditor />
    </Modal>
  );
};

export default TagModal;
