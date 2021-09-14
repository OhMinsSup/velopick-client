import { Marker } from "./Marker";

export class Line {
  static makeLine(kakaoMap: kakao.maps.Map, allMarkers: Marker[]) {
    // all markers sorting by seq
    allMarkers = allMarkers.sort((a, b) => {
      return a.getSeq() - b.getSeq();
    });

    const lineLine = new kakao.maps.Polyline({
      path: [],
    });
    let linePath: kakao.maps.LatLng[] = [];
    let distance = 0;
    for (let i = 0; i < allMarkers.length; i++) {
      if (i !== 0) {
        linePath = [
          allMarkers[i - 1].getPosition(),
          allMarkers[i].getPosition(),
        ];
      }
      lineLine.setPath(linePath);
      distance = Math.round(lineLine.getLength());
      const drawLine = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 2,
        endArrow: true,
        strokeColor: "#495057",
        strokeOpacity: 1,
        strokeStyle: "solid",
      });
      drawLine.setMap(kakaoMap);
      if (distance > 0) {
        const overlay = new kakao.maps.CustomOverlay({
          content: `<div class="distance">${distance}m</div>`,
          position: allMarkers[i].getPosition(),
          yAnchor: 1,
          xAnchor: 0.5,
        });
        overlay.setMap(kakaoMap);
      }
    }
  }
}
