import React, { useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { useGeolocationState } from "../../atoms/geolocationState";
import { createMarkerFactory } from "../../libs/marker/markerFactory";

interface PickMapProps {}
const PickMap: React.FC<PickMapProps> = () => {
  const [currentGeolocation, setCurrentGeolocation] = useGeolocationState();
  const divRef = useRef<HTMLDivElement | null>(null);
  const markerFactory = useRef<ReturnType<typeof createMarkerFactory> | null>(
    null
  );
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
    if (
      divRef.current &&
      [currentGeolocation.longitude, currentGeolocation.latitude].every(Boolean)
    ) {
      const { longitude, latitude } = currentGeolocation;
      const mapOption = {
        center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

      const map = new kakao.maps.Map(divRef.current, mapOption);

      markerFactory.current = createMarkerFactory();
      markerFactory.current.setMap(map);
    }
  }, [
    currentGeolocation,
    currentGeolocation.latitude,
    currentGeolocation.longitude,
  ]);

  return (
    <>
      <div css={pickMapStyles} ref={divRef} />
      <div css={pickMapControllerStyles}>controller</div>
    </>
  );
};

export default PickMap;

const pickMapStyles = css`
  height: 100%;
  width: 100%;
`;

const pickMapControllerStyles = css`
  position: absolute;
  top: 70px;
  left: 50px;
  z-index: 420;
  width: 40px;
`;
