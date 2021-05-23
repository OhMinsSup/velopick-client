import React from "react";
import { BiLocationPlus, BiPurchaseTag, BiUserPlus } from "react-icons/bi";

import LabelButton from "./LabelButton";

interface PickHeaderProps {}
const PickHeader: React.FC<PickHeaderProps> = () => {
  return (
    <div className="flex flex-row">
      <LabelButton
        icon={<BiLocationPlus className="w-5 h-5 mr-1 fill-current" />}
        text="장소 추가"
      />
      <LabelButton
        icon={<BiPurchaseTag className="w-5 h-5 mr-1 fill-current" />}
        text="태그 추가"
      />
      <LabelButton
        icon={<BiUserPlus className="w-5 h-5 mr-1 fill-current" />}
        text="친구 추가"
      />
    </div>
  );
};

export default PickHeader;
