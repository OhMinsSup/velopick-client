import React, { useCallback } from "react";
import { BiMap } from "react-icons/bi";
import { Document } from "../../api/kakao/kakao.typedef";

interface PlaceCardProps {
  document: Document;
  onClickPlaceLocation: (document: Document) => void;
}
const PlaceCard: React.FC<PlaceCardProps> = ({
  document,
  onClickPlaceLocation,
}) => {
  const onClickKakaoPlaceMove = useCallback(() => {
    const win = window.open(document.place_url, "_blank");
    if (!win) return;
    win.focus();
  }, []);

  const onClickMapIcon = useCallback(() => {
    onClickPlaceLocation(document);
  }, []);

  return (
    <div className="p-4 flex space-x-4">
      <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
        <h2 className="text-lg font-semibold text-black mb-0.5">
          <span
            onClick={onClickKakaoPlaceMove}
            className="underline cursor-pointer"
          >
            {document.place_name}
          </span>
        </h2>
        <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
          <div className="flex-none w-full mt-0.5 font-normal">
            <dd className="inline text-gray-700">{document.address_name}</dd>
          </div>
          <div className="flex-none w-full mt-0.5 font-normal">
            <dd className="inline text-gray-400">
              {document.category_group_name}
            </dd>
          </div>
          <div
            className="absolute top-0 right-0 rounded-full py-0.5 hidden sm:flex xl:flex items-center space-x-1"
            onClick={onClickMapIcon}
          >
            <BiMap className="mx-5 w-5 h-5 rounded-full cursor-pointer" />
          </div>
        </dl>
      </div>
    </div>
  );
};

export default PlaceCard;
