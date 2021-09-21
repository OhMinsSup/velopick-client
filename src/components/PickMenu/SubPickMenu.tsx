import React from "react";
import { css } from "@emotion/react";

import TagContainer from "./TagContainer";
import UserTagContainer from "./UserTagContainer";
import PlaceMenuItem from "./PlaceMenuItem";
import { usePlacesValue } from "../../atoms/placeState";

interface SubPickMenuProps {}
const SubPickMenu: React.FC<SubPickMenuProps> = () => {
  const places = usePlacesValue();
  return (
    <>
      <TagContainer label="태그" placeholder="태그를 입력해주세요." />
      <UserTagContainer label="회원" placeholder="회원을 입력해주세요." />
      <ul
        className="divide-y divide-gray-100 overflow-y-scroll"
        css={scrollStyles}
      >
        {places.map((place) => (
          <PlaceMenuItem key={place.id} place={place} />
        ))}
      </ul>
    </>
  );
};

export default SubPickMenu;

const scrollStyles = css`
  height: 630px;
`;
