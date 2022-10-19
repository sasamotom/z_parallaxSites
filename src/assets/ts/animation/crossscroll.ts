// *****************************************************
// 横へのスクロール関連
// *****************************************************

import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

export class CrossScroll {
  // ----------------------------------------------------
  // 機能：コンストラクタ
  // 引数：なし
  // 返値：なし
  //----------------------------------------------------
  constructor() {
    gsap.registerPlugin(ScrollTrigger); // gsapにScrollTrigerを登録

    // 水平に移動
    const wrappers = document.querySelectorAll('.horizontalScrollWrapper');
    wrappers.forEach((wrapper) => {
      const elem = wrapper.querySelector('.horizontalScrollContents');
      if (wrapper && elem) {
        gsap.to(elem, {
          x: () => -(elem.clientWidth - wrapper.clientWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: '#' + wrapper.getAttribute('id'),  // 横スクロールするセクションを指す
            start: 'top top',
            end: () => `+=${elem.clientWidth - wrapper.clientWidth}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    });
    // 斜めに移動
    const diagonalWrappers = document.querySelectorAll('.diagonalScrollWrapper');
    diagonalWrappers.forEach((wrapper) => {
      const elem = wrapper.querySelector('.diagonalScrollContents');
      if (wrapper && elem) {
        gsap.to(elem, {
          x: () => -(elem.clientWidth - wrapper.clientWidth),
          y: () => -(elem.clientHeight - wrapper.clientHeight),
          ease: 'none',
          scrollTrigger: {
            trigger: '#' + wrapper.getAttribute('id'),  // 横スクロールするセクションを指す
            start: 'top top',
            end: () => `+=${elem.clientWidth - wrapper.clientWidth}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    });
  }
}
