import React, { useCallback, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { BiCurrentLocation, BiPlus, BiMinus, BiRefresh } from "react-icons/bi";

import palette from "../../libs/style/palette";
import { useGeolocationState } from "../../atoms/geolocationState";
import { createMarkerFactory } from "../../libs/marker/markerFactory";
import { usePlacesClearState, usePlacesValue } from "../../atoms/placeState";

interface PickMapProps {}
const PickMap: React.FC<PickMapProps> = () => {
  const places = usePlacesValue();
  const { placesClear } = usePlacesClearState();
  const [currentGeolocation, setCurrentGeolocation] = useGeolocationState();

  const divRef = useRef<HTMLDivElement | null>(null);

  const gelocation = () => {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
  };

  const handleGeoError: PositionErrorCallback = (positionError) => {
    console.error(positionError);
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

  const onClickPlusZoom = useCallback(() => {
    const factory = createMarkerFactory();
    if (!factory.kakaoMapObj) return;

    const level = factory.kakaoMapObj.getLevel();
    factory.kakaoMapObj.setLevel(level + 1);
  }, []);

  const onClickMinusZoom = useCallback(() => {
    const factory = createMarkerFactory();
    if (!factory.kakaoMapObj) return;

    const level = factory.kakaoMapObj.getLevel();
    factory.kakaoMapObj.setLevel(level - 1);
  }, []);

  const onClickCurrentLocation = useCallback(() => {
    gelocation();
  }, []);

  const onRefreshMap = useCallback(() => {
    const factory = createMarkerFactory();
    if (!factory.kakaoMapObj) {
      gelocation();
      return;
    }
    placesClear();
    factory.unmount();
    gelocation();
  }, []);

  // gelocation info
  useEffect(() => {
    gelocation();
  }, []);

  // maker object logical
  useEffect(() => {
    if (
      divRef.current &&
      [currentGeolocation.longitude, currentGeolocation.latitude].every(Boolean)
    ) {
      const { longitude, latitude } = currentGeolocation;
      const factory = createMarkerFactory();
      if (!factory.kakaoMapObj) {
        const mapOption = {
          center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

        const map = new kakao.maps.Map(divRef.current, mapOption);
        factory.setMap(map);
      } else {
        factory.kakaoMapObj.setCenter(
          new kakao.maps.LatLng(latitude, longitude)
        );
      }

      // set select places
      if (places.length) {
        factory.setPlaces(places);
      }

      factory.mount();
    }
  }, [
    currentGeolocation,
    currentGeolocation.latitude,
    currentGeolocation.longitude,
  ]);

  return (
    <>
      <div css={pickMapStyles} className="bg-gray-50" ref={divRef} />
      <div css={pickMapControllerStyles}>
        <ControllerButtonBlock
          type="button"
          className="shadow"
          onClick={onClickCurrentLocation}
        >
          <div className="controller-wrapper">
            <BiCurrentLocation />
          </div>
        </ControllerButtonBlock>

        <ZoomControllerBlock className="shadow">
          <div className="controller-wrapper">
            <ZoomButtonBlock type="button" onClick={onClickMinusZoom}>
              <BiPlus />
            </ZoomButtonBlock>
            <ZoomButtonBlock type="button" onClick={onClickPlusZoom}>
              <BiMinus />
            </ZoomButtonBlock>
          </div>
        </ZoomControllerBlock>

        <ControllerButtonBlock
          type="button"
          className="shadow"
          onClick={onRefreshMap}
        >
          <div className="controller-wrapper">
            <BiRefresh />
          </div>
        </ControllerButtonBlock>
      </div>
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
  left: 30px;
  z-index: 420;
  width: 40px;
`;

const ZoomControllerBlock = styled.div`
  position: relative;
  width: 32px;
  margin: 7px 0.2px;
  border-radius: 5px;
  .controller-wrapper {
    width: 32px;
    border-radius: 3px;
  }
`;

const ZoomButtonBlock = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  user-select: none;
  border-bottom: 1px solid rgb(226, 226, 226);
  border-radius: 3px 3px 0px 0px;
  background: ${palette.blueGray100};
  & > svg {
    color: ${palette.blueGray600};
  }

  &:hover {
    & > svg {
      color: ${palette.blueGray400};
    }
  }
`;

const ControllerButtonBlock = styled.button<{ active?: boolean }>`
  display: block;
  position: relative;
  width: 32px;
  height: 32px;
  padding: 3px 3px 5px;
  background: ${palette.blueGray100};
  border-radius: 5px;
  user-select: none;

  .controller-wrapper {
    display: flex;
    justify-content: center;

    & > svg {
      color: ${palette.blueGray600};
    }
  }

  &:hover {
    .controller-wrapper {
      & > svg {
        color: ${palette.amber400};
      }
    }
  }
`;
