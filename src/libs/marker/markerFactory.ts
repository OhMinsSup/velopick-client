import { v4 as uuidv4 } from "uuid";
import { Subscribable } from "./subscribable";

export class MarkerFactory extends Subscribable {
  private id: string;

  private kakaoMap: kakao.maps.Map | null;

  private markerObject: Map<string, kakao.maps.Marker>;

  private markerObjectIds: string[];

  private removeMarkerEventListener?: () => void;

  private unsubscribeMarker?: () => void;

  constructor() {
    super();

    this.id = uuidv4();

    this.kakaoMap = null;

    this.markerObjectIds = [];

    this.markerObject = new Map();
  }

  setMap(map: kakao.maps.Map) {
    this.kakaoMap = map;
  }

  setMapClicks() {
    this.unsubscribeMarker = this.subscribe(() => {
      console.log("event");
    });
  }

  mount(): void {
    // this.unsubscribeMarker = this.subscribe(() => {
    //   console.log("mount");
    // });
  }

  unmount(): void {
    // if (this.unsubscribeMarker) {
    //   this.unsubscribeMarker();
    // }

    this.markerObject.clear();
    this.markerObjectIds = [];
  }

  handleClickMap = (event: any): void => {
    // 지도를 클릭한 위치에 표출할 마커입니다
    const marker = new kakao.maps.Marker({
      position: event.latLng,
    });

    // 지도에 마커를 표시합니다
    marker.setMap(this.kakaoMap);

    // 생성한 마커를 캐시형태로 저장한다.
    const markerObjectId = uuidv4();
    this.markerObject.set(markerObjectId, marker);
    this.markerObjectIds.push(markerObjectId);

    console.log("markerObject", this.markerObject);
    console.log("markerObjectIds", this.markerObjectIds);
  };

  protected onSubscribe(): void {
    this.setEventListener();
  }

  setMarkerEventListener(
    setup: (setEvent: (...args: any[]) => void) => () => void
  ): void {
    if (this.removeMarkerEventListener) {
      this.removeMarkerEventListener();
    }

    this.removeMarkerEventListener = setup(this.handleClickMap);
  }

  private setEventListener() {
    if (!this.kakaoMap) return;

    const kakaoMap = this.kakaoMap;

    this.setMarkerEventListener((onClick) => {
      const listener = (event: any) => onClick(event);
      // Listen to visibillitychange and focus
      kakao.maps.event.addListener(kakaoMap, "click", listener);

      return () => {
        // Be sure to unsubscribe if a new handler is set
        kakao.maps.event.removeListener(kakaoMap, "click", listener);
      };
    });
  }
}

let markerFactory: MarkerFactory | null = null;

export function createMarkerFactory() {
  return markerFactory || (markerFactory = new MarkerFactory());
}
