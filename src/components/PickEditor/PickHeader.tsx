import React, { useCallback, useState } from "react";
import { BiLocationPlus, BiPurchaseTag, BiUserPlus } from "react-icons/bi";

import LabelButton from "./LabelButton";
import TagEditor from "./TagEditor";

interface PickHeaderProps {
  onShowPickModal: () => void;
}
const PickHeader: React.FC<PickHeaderProps> = ({ onShowPickModal }) => {
  const [visibleTagEditor, setVisibleTagEditor] = useState<boolean>(false);
  const [visibleUserEditor, setVisibleUserEditor] = useState<boolean>(false);

  const onClickLabel = useCallback(
    (e: React.MouseEvent<HTMLLabelElement, MouseEvent>, name: string) => {
      switch (name) {
        case "place":
          onShowPickModal();
          break;
        case "tag":
          setVisibleTagEditor((prev) => !prev);
          break;
        case "user":
          setVisibleUserEditor((prev) => !prev);
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
          text="친구 추가"
          onClickLabel={onClickLabel}
        />
      </div>
      {visibleTagEditor && <TagEditor tags={[]} />}
    </div>
  );
};

export default PickHeader;
