import React, { useCallback, useState } from "react";
import { BiLocationPlus } from "react-icons/bi";
import uniqBy from "lodash/uniqBy";
import { usePlacesState } from "../atoms/placeState";

import { PickEditor } from "../components/PickEditor";
import { PickModal } from "../components/PickModal";
import LabelButton from "../components/ui/LabelButton";

import { createMarkerFactory } from "../libs/marker/markerFactory";

interface PickPageProps {}
const PickPage: React.FC<PickPageProps> = () => {
  const [, setPlaces] = usePlacesState();
  const [visiblePickModal, setVisiblePickModal] = useState<boolean>(false);

  const onShowPickModal = useCallback(() => {
    setVisiblePickModal(true);
  }, []);

  const onClosePickModal = useCallback(() => {
    setVisiblePickModal(false);

    const factory = createMarkerFactory();

    for (const place of factory.places) {
      setPlaces((olds) => uniqBy([...olds, place], "id"));
    }

    factory.unmount();
  }, []);

  return (
    <>
      <div className="w-full pt-5 md:px-5">
        <div>
          <div className="flex flex-row">
            <LabelButton
              name="place"
              icon={<BiLocationPlus className="w-5 h-5 mr-1 fill-current" />}
              text="장소 추가"
              onClickLabel={onShowPickModal}
            />
          </div>
        </div>
        <PickEditor />
      </div>
      <PickModal visible={visiblePickModal} onClose={onClosePickModal} />
    </>
  );
};

export default PickPage;
