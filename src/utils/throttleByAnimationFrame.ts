/* eslint-disable @typescript-eslint/no-explicit-any */
// [코드 9] 코드 8을 개선한 함수

export const throttleByAnimationFrame = (handler: (...args: any[]) => void) =>
  function (this: any, ...args: any[]) {
    window.requestAnimationFrame(() => {
      handler.apply(this, args);
    });
  };
