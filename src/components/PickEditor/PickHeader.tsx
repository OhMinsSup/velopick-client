import React, { useCallback } from "react";
import { BiLocationPlus, BiPurchaseTag, BiUserPlus } from "react-icons/bi";

import LabelButton from "./LabelButton";

interface PickHeaderProps {
  onShowPickModal: () => void;
  onShowTagModal: () => void;
  onShowUserModal: () => void;
}
const PickHeader: React.FC<PickHeaderProps> = ({
  onShowPickModal,
  onShowTagModal,
  onShowUserModal,
}) => {
  const onClickLabel = useCallback(
    (e: React.MouseEvent<HTMLLabelElement, MouseEvent>, name: string) => {
      switch (name) {
        case "place":
          onShowPickModal();
          break;
        case "tag":
          onShowTagModal();
          break;
        case "user":
          onShowUserModal();
          break;
        default:
          break;
      }
    },
    []
  );

  return (
    <div>
      <div className="flex flex-row">
        <LabelButton
          name="place"
          icon={<BiLocationPlus className="w-5 h-5 mr-1 fill-current" />}
          text="장소 추가"
          onClickLabel={onClickLabel}
        />
        <LabelButton
          name="tag"
          icon={<BiPurchaseTag className="w-5 h-5 mr-1 fill-current" />}
          text="태그 추가"
          onClickLabel={onClickLabel}
        />
        <LabelButton
          name="user"
          icon={<BiUserPlus className="w-5 h-5 mr-1 fill-current" />}
          text="회원 추가"
          onClickLabel={onClickLabel}
        />
      </div>
    </div>
  );
};

export default PickHeader;
