import { useCallback, useRef } from "react";
import { createMarkerFactory } from "../libs/marker/markerFactory";

export default function useMarkerObject() {
  const markerFactory = useRef<ReturnType<typeof createMarkerFactory> | null>(
    null
  );

  const setFactory = useCallback(
    (factory: ReturnType<typeof createMarkerFactory>, map?: kakao.maps.Map) => {
      markerFactory.current = factory;
      if (map) {
        markerFactory.current.setMap(map);
      }
    },
    []
  );

  const getFactory = useCallback(() => {
    return markerFactory.current;
  }, []);

  return {
    getFactory,
    setFactory,
  };
}
