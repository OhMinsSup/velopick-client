import { Subscribable } from "./subscribable";

class KakaoMapClickManager extends Subscribable {
  private kakaoMap?: kakao.maps.Map;

  private removeEventListener?: () => void;

  protected onSubscribe(): void {
    if (!this.removeEventListener) {
      this.setDefaultEventListener();
    }
  }

  protected onUnsubscribe(): void {
    console.log("onUnsubscribe => start");
    if (this.removeEventListener) {
      console.log("onUnsubscribe => removeEventListener");
      this.removeEventListener();
      this.removeEventListener = undefined;
    }
  }

  setKakaoMap(kakaoMap: kakao.maps.Map) {
    this.kakaoMap = kakaoMap;
  }

  setEventListener(
    setup: (setEvent: (...args: any[]) => void) => () => void
  ): void {
    if (this.removeEventListener) {
      this.removeEventListener();
    }

    this.removeEventListener = setup((event) => {
      this.onClick(event);
    });
  }

  onClick(event: any): void {
    this.listeners.forEach((listener) => listener(event));
  }

  private setDefaultEventListener() {
    if (!this.kakaoMap) return;

    const kakaoMap = this.kakaoMap;

    this.setEventListener((onClick) => {
      const listener = (event: any) => onClick(event);
      // Listen to visibillitychange and focus
      kakao.maps.event.addListener(kakaoMap, "click", listener);
      return () => {
        console.log("eventListener => clear");
        // Be sure to unsubscribe if a new handler is set
        kakao.maps.event.removeListener(kakaoMap, "click", listener);
      };
    });
  }
}

export const kakaoMapClickManager = new KakaoMapClickManager();
