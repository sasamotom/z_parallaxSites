// *****************************************************
// 背景要素のアニメーション関連
// *****************************************************

import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

export class BackgroundAnime {
  // ----------------------------------------------------
  // 機能：コンストラクタ
  // 引数：なし
  // 返値：なし
  //----------------------------------------------------
  constructor() {
    gsap.registerPlugin(ScrollTrigger); // gsapにScrollTrigerを登録

    // スクロールに合わせて要素を上に移動させる
    this._upWithScroll('.-anime01', 500, -500);
    this._upWithScroll('.-anime02', 70, -70);
    this._upWithScroll('.-anime03', 30, -30);
    this._upWithScroll('.bg01', 100, -100);
    // スクロールに合わせて要素を下に移動させる
    this._upWithScroll('.-anime11', -200, 200);
    this._upWithScroll('.-anime12', -100, 100);
    this._upWithScroll('.-anime13', -50, 50);
    this._upWithScroll('.bg02', -100, 100);
    // 表示位置にきたらアニメーションを開始する
    this._up('.-anime21', -1000, 1);  // 上に移動
    this._up('.-anime22', -1000, 7);
    this._up('.-anime23', -1000, 10);
    this._up('.-anime24', 1000, 2);   // 下に移動
    this._up('.-anime25', 1000, 1);
    this._up('.-anime26', 1000, 1.5);

    // スクロールに合わせて要素を右に移動させる
    this._toRightWithScroll('.-animeH01', -700, 700);
    this._toRightWithScroll('.-animeH02', -200, 200);
    this._toRightWithScroll('.-animeH03', -50, 100);
    this._toRightWithScroll('.bg_h01', 0, 100);
     // スクロールに合わせて要素を左に移動させる
    this._toRightWithScroll('.-animeH11', 300, -300);
    this._toRightWithScroll('.-animeH12', 100, -100);
    this._toRightWithScroll('.-animeH13', 50, -50);
    this._toRightWithScroll('.bg_h02', 50, -50);
    // 表示位置にきたらアニメーションを開始する
    this._toRight('.-animeH21', 2000, 1);     // 右に移動
    this._toRight('.-animeH22', 2000, 4);
    this._toRight('.-animeH23', 2000, 8);
    this._toRight('.-animeH24', -2000, 3);    // 左に移動
    this._toRight('.-animeH25', -2000, 1.5);
    this._toRight('.-animeH26', -2000, 5);
  }

  // ----------------------------------------------------
  // 機能：装飾をスクロールと一緒に上に移動させる
  // 引数：selecter  セレクタ（ここに指定したもの全てにアニメーション）
  //      from      開始位置
  //      to        終了位置
  // 返値：なし
  //----------------------------------------------------
  _upWithScroll(selector: string, from: number, to: number) {
    const elements = document.querySelectorAll(selector);
    let start = "top bottom";   // startに設定する値
    let end ="bottom top"       // endに設定する値
    elements.forEach((elem) => {
      if (from < to) {
        // 上から下に移動する場合は、endの調整が必要
        // end = topの位置 + (移動px数 + 要素の高さ)
        end = `top+=${to - from + elem.clientHeight} top`;
      }
      gsap.fromTo(
        elem,
        { y:  from},
        {
          y: to,
          ease: "none", // イージングなし
          scrollTrigger: {
            trigger: elem,
            start: start,         // 1つ目の値がtriggerで指定した要素の開始位置。2つ目の値が画面の開始位置
            end: end,             // 1つ目の値がtriggerで指定した要素の終了位置。2つ目の値が画面の終了位置
            scrub: true,          // 要素をスクロールに合わせて移動させる
            // markers: true,        // 開始位置、終了位置を調整確認する際に使用します
          },
        },
      );
    });
  }

  // ----------------------------------------------------
  // 機能：装飾を上に移動させる
  // 引数：selecter  セレクタ（ここに指定したもの全てにアニメーション）
  //      to        終了位置
  //      duration  アニメーション動作時間（単位：秒）
  // 返値：なし
  //----------------------------------------------------
  _up(selector: string, to: number, duration: number) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((elem) => {
      gsap.to(
        elem,
        {
          y: to,
          duration: duration,   // 何秒かけてアニメーションするか指定
          ease: "none", // イージングなし
          scrollTrigger: {
            trigger: elem,
            start: 'top bottom+=100px',
            // once: true,     //  この指定によって１度だけアニメーションされる
            // markers: true,        // 開始位置、終了位置を調整確認する際に使用します
          },
          // repeat: -1,     // -1とすると無限ループ
          // repeatDelay: 1  // 繰り返し時のdelay（単位：秒）
        },
      );
    });
  }

  // ----------------------------------------------------
  // 機能：装飾をスクロールと一緒に右に移動させる
  // 引数：selecter  セレクタ（ここに指定したもの全てにアニメーション）
  //      from      開始位置
  //      to        終了位置
  // 返値：なし
  //----------------------------------------------------
  _toRightWithScroll(selector: string, from: number, to: number) {
    const elements = document.querySelectorAll(selector);
    let start = "top bottom";   // startに設定する値
    let end ="bottom top"       // endに設定する値
    elements.forEach((elem) => {
      gsap.fromTo(
        elem,
        { x:  from},
        {
          x: to,
          ease: "none", // イージングなし
          scrollTrigger: {
            trigger: elem,
            start: start,         // 1つ目の値がtriggerで指定した要素の開始位置。2つ目の値が画面の開始位置
            end: end,             // 1つ目の値がtriggerで指定した要素の終了位置。2つ目の値が画面の終了位置
            scrub: true,          // 要素をスクロールに合わせて移動させる
            // markers: true,        // 開始位置、終了位置を調整確認する際に使用します
          },
        },
      );
    });
  }

  // ----------------------------------------------------
  // 機能：装飾を上に移動させる
  // 引数：selecter  セレクタ（ここに指定したもの全てにアニメーション）
  //      to        終了位置
  //      duration  アニメーション動作時間（単位：秒）
  // 返値：なし
  //----------------------------------------------------
  _toRight(selector: string, to: number, duration: number) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((elem) => {
      gsap.to(
        elem,
        {
          x: to,
          duration: duration,   // 何秒かけてアニメーションするか指定
          ease: "none", // イージングなし
          scrollTrigger: {
            trigger: elem,
            start: 'top bottom+=100px',
            // once: true,     //  この指定によって１度だけアニメーションされる
            // markers: true,        // 開始位置、終了位置を調整確認する際に使用します
          },
          // repeat: -1,     // -1とすると無限ループ
          // repeatDelay: 1  // 繰り返し時のdelay（単位：秒）
        },
      );
    });
  }

}
