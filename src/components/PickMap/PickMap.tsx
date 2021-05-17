import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import { useGeolocationState } from "../../atoms/geolocationState";

const pickMapStyles = css`
  border-radius: 25px;
  height: 100%;
  width: 100%;
`;

interface PickMapProps {}
const PickMap: React.FC<PickMapProps> = () => {
  const [currentGeolocation, setCurrentGeolocation] = useGeolocationState();
  const divRef = useRef<HTMLDivElement | null>(null);

  const handleGeoError: PositionErrorCallback = (positionError) => {
    console.log(positionError);
  };

  const handleGeoSucces: PositionCallback = (position) => {
    const {
      coords: { latitude, longitude },
    } = position;
    setCurrentGeolocation({
      latitude,
      longitude,
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // useEffect(() => {
  //   console.log("current", currentGeolocation);
  //   if (
  //     divRef.current &&
  //     [currentGeolocation.longitude, currentGeolocation.latitude].every(Boolean)
  //   ) {
  //     const { longitude, latitude } = currentGeolocation;
  //     const mapOption = {
  //       center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
  //       level: 3, // 지도의 확대 레벨
  //     };

  //     const map = new kakao.maps.Map(divRef.current, mapOption);
  //     console.log(map);
  //   }
  // }, [
  //   currentGeolocation,
  //   currentGeolocation.latitude,
  //   currentGeolocation.longitude,
  // ]);

  return <div css={pickMapStyles} ref={divRef} />;
};

export default PickMap;
