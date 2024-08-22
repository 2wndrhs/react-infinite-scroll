/* eslint-disable @typescript-eslint/no-explicit-any */
// [코드 4] 직접 구현한 Throttle 함수

export const throttle = (handler: (...args: any[]) => void, timeout = 300) => {
  let invokedTime: number;
  let timer: number;

  return function (this: any, ...args: any[]) {
    if (!invokedTime) {
      handler.apply(this, args);
      invokedTime = Date.now();
    } else {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (Date.now() - invokedTime >= timeout) {
          handler.apply(this, args);
          invokedTime = Date.now();
        }
      }, Math.max(timeout - (Date.now() - invokedTime), 0));
    }
  };
};
