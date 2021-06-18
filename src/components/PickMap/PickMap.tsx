import React, { useCallback, useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  BiCog,
  BiCurrentLocation,
  BiPlus,
  BiMinus,
  BiLocationPlus,
} from "react-icons/bi";

import { useGeolocationState } from "../../atoms/geolocationState";
import { createMarkerFactory } from "../../libs/marker/markerFactory";
import palette from "../../libs/style/palette";
import useMarkerObject from "../../hooks/useMarkerObject";

interface PickMapProps {}
const PickMap: React.FC<PickMapProps> = () => {
  const [picker, setPicker] = useState(false);
  const [currentGeolocation, setCurrentGeolocation] = useGeolocationState();

  const divRef = useRef<HTMLDivElement | null>(null);

  const { setFactory, getFactory } = useMarkerObject();

  const onClickPicker = useCallback(() => {
    setPicker((prev) => !prev);
  }, []);

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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
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
      setFactory(createMarkerFactory(), map);
      const markerFactory = getFactory();
      markerFactory?.mount();
    }

    return () => {
      const markerFactory = getFactory();
      markerFactory?.unmount();
    };
  }, [
    currentGeolocation,
    currentGeolocation.latitude,
    currentGeolocation.longitude,
  ]);

  return (
    <>
      <div css={pickMapStyles} ref={divRef} />
      <div css={pickMapControllerStyles}>
        <MapControllerButtonBlock
          type="button"
          className="shadow"
          active={false}
        >
          <div className="controller-wrapper">
            <BiCurrentLocation />
          </div>
        </MapControllerButtonBlock>

        <ZoomControllerBlock className="shadow">
          <div className="controller-wrapper">
            <ZoomButtonBlock type="button">
              <BiPlus />
            </ZoomButtonBlock>
            <ZoomButtonBlock type="button">
              <BiMinus />
            </ZoomButtonBlock>
          </div>
        </ZoomControllerBlock>

        <MapControllerButtonBlock
          type="button"
          className="shadow"
          active={picker}
          onClick={onClickPicker}
        >
          <div className="controller-wrapper">
            <BiLocationPlus />
          </div>
        </MapControllerButtonBlock>

        <MapControllerButtonBlock
          type="button"
          className="shadow mt-2"
          active={false}
        >
          <div className="controller-wrapper">
            <BiCog />
          </div>
        </MapControllerButtonBlock>
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

const MapControllerButtonBlock = styled.button<{ active: boolean }>`
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
      ${(props) =>
        props.active
          ? css`
              color: ${palette.amber400};
            `
          : css`
              color: ${palette.blueGray600};
            `}
    }
  }

  &:hover {
    .controller-wrapper {
      & > svg {
        ${(props) =>
          props.active
            ? css`
                color: ${palette.amber400};
              `
            : css`
                color: ${palette.blueGray600};
              `}
      }
    }
  }
`;
