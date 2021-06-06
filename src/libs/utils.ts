export function loadScript(url: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.onload = function onload() {
      resolve(true);
    };
    script.onerror = function onerror() {
      reject();
    };
    script.src = url;
    if (!document || !document.head) return;
    document.head.appendChild(script);
  });
}

export const getScrollTop = () => {
  if (!document.body) return 0;
  const scrollTop = document.documentElement
    ? document.documentElement.scrollTop || document.body.scrollTop
    : document.body.scrollTop;
  return scrollTop;
};

export const getScrollBottom = () => {
  if (!document.body) return 0;
  const { scrollHeight } = document.body;
  const { innerHeight } = window;
  const scrollTop = getScrollTop();
  return scrollHeight - innerHeight - scrollTop;
};

export const intervalCall = (interval: number) => {
  // interval 시간 안에 다시 호출된 함수 콜은 무시한다
  let elapsed = true;

  return (fn: () => void) => {
    if (!elapsed) {
      return; // 마지막 호출 후 제한된 경과시간이 지나지 않은 경우 리턴
    }
    elapsed = false;
    fn();
    setTimeout(() => {
      elapsed = true;
    }, interval);
  };
};
