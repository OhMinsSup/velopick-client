import React, { useCallback, useState } from "react";

import { PickEditor, PickHeater } from "../components/PickEditor";
import { PickModal } from "../components/PickModal";
import { TagModal } from "../components/TagModal";
import { UserModal } from "../components/UserModal";

interface PickPageProps {}
const PickPage: React.FC<PickPageProps> = () => {
  const [visiblePickModal, setVisiblePickModal] = useState<boolean>(false);
  const [visibleTagModal, setVisibleTagModal] = useState<boolean>(false);
  const [visibleUserModal, setVisibleUserModal] = useState<boolean>(false);

  const onShowPickModal = useCallback(() => {
    setVisiblePickModal(true);
  }, []);

  const onClosePickModal = useCallback(() => {
    setVisiblePickModal(false);
  }, []);

  const onShowTagModal = useCallback(() => {
    setVisibleTagModal(true);
  }, []);

  const onCloseTagModal = useCallback(() => {
    setVisibleTagModal(false);
  }, []);

  const onShowUserModal = useCallback(() => {
    setVisibleUserModal(true);
  }, []);

  const onCloseUserModal = useCallback(() => {
    setVisibleUserModal(false);
  }, []);

  return (
    <>
      <div className="w-full pt-5">
        <PickHeater
          onShowPickModal={onShowPickModal}
          onShowTagModal={onShowTagModal}
          onShowUserModal={onShowUserModal}
        />
        <PickEditor />
      </div>
      <PickModal visible={visiblePickModal} onClose={onClosePickModal} />
      <TagModal visible={visibleTagModal} onClose={onCloseTagModal} />
      <UserModal visible={visibleUserModal} onClose={onCloseUserModal} />
    </>
  );
};

export default PickPage;
