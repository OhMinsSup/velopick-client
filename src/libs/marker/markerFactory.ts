import { v4 as uuidv4 } from "uuid";
import markerItem from "./markerItem";
import { Subscribable } from "./subscribable";

export class MarkerFactory extends Subscribable {
  private id: string;

  private kakaoMap: kakao.maps.Map | null;

  private markers: markerItem[];

  private removeMarkerEventListener?: () => void;

  private unsubscribeMarker?: () => void;

  constructor() {
    super();

    this.id = uuidv4();

    this.kakaoMap = null;

    this.markers = [];
  }

  setMap(map: kakao.maps.Map) {
    this.kakaoMap = map;
  }

  mount(): void {
    this.unsubscribeMarker = this.subscribe(() => {
      console.log("mount");
    });
  }

  unmount(): void {
    if (this.unsubscribeMarker) {
      this.unsubscribeMarker();
    }
  }

  handleClickMap = (event: any): void => {
    // 지도를 클릭한 위치에 표출할 마커입니다
    const marker = new kakao.maps.Marker({
      position: event.latLng,
    });
    // 지도에 마커를 표시합니다
    console.log(marker);

    marker.setMap(this.kakaoMap);
  };

  setMarkerEventListener(
    setup: (setEvent: (...args: any[]) => void) => () => void
  ): void {
    if (this.removeMarkerEventListener) {
      this.removeMarkerEventListener();
    }

    this.removeMarkerEventListener = setup(this.handleClickMap);
  }

  protected onSubscribe(): void {
    if (!this.removeMarkerEventListener) {
      this.setDefaultEventListener();
    }
  }

  private setDefaultEventListener() {
    this.setMarkerEventListener((onClick) => {
      const listener = (event: any) => onClick(event);
      // Listen to visibillitychange and focus
      kakao.maps.event.addListener(this.kakaoMap!, "click", listener);

      return () => {
        // Be sure to unsubscribe if a new handler is set
        kakao.maps.event.removeListener(this.kakaoMap!, "click", listener);
      };
    });
  }
}

let markerFactory: MarkerFactory | null = null;

export function createMarkerFactory() {
  return markerFactory || (markerFactory = new MarkerFactory());
}
