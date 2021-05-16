import React, { useEffect, useRef } from "react";
import { css } from "@emotion/react";

const pickMapStyles = css`
  border-radius: 25px;
  height: 100%;
  width: 100%;
`;

interface PickMapProps {}
const PickMap: React.FC<PickMapProps> = () => {
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (divRef.current) {
      const mapOption = {
        center: new kakao.maps.LatLng(37.32502994669613, 127.10825624869119), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

      const map = new kakao.maps.Map(divRef.current, mapOption);
      console.log(map);
    }
  }, []);

  return <div css={pickMapStyles} ref={divRef} />;
};

export default PickMap;
