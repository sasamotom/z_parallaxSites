// *****************************************************
// セクションのアニメーション関連
// *****************************************************
// デフォルトのクラス名
namespace Const {
  export const CLASS_CONTAINER = '-sectionAnimation031';   // コンテナクラス名
  export const CLASS_SECTION = 'sec';                       // セクションクラス名
  export const CLASS_SCROLL = 'scrollCont';                 // スクロール用クラス名
}

export class SectionAnimation {
  private _secList:  NodeListOf<HTMLElement>;   // セクションリスト
  private _container: HTMLElement | null;       // セクションリストを含むコンテナ
  // ----------------------------------------------------
  // 機能：コンストラクタ
  // 引数：なし
  // 返値：なし
  //----------------------------------------------------
  constructor() {
    // クラス変数の初期化
    this._secList = document.querySelectorAll('.' + Const.CLASS_SECTION);
    this._container = document.querySelector('.' + Const.CLASS_CONTAINER);
    if (this._secList.length > 0 && this._container !== null) {
      this._setPaperSection();
    }
  }

  // ----------------------------------------------------
  // 機能：紙のように前後に配置
  // 引数：なし
  // 返値：なし
  // ----------------------------------------------------
  private _setPaperSection() {
    // セクション一覧を取得
    const secCnt = this._secList.length;    // セクション数

    // セクション用のスクロール領域を定義
    const scrollSecOrg = document.createElement('div');
    scrollSecOrg.classList.add(Const.CLASS_SCROLL);
    scrollSecOrg.style.height = '100vh';  // 高さの指定
    for (let i = 0; i < secCnt; i++) {
      const scrollSec = scrollSecOrg.cloneNode();
      (<HTMLElement>scrollSec).setAttribute('data-scrollcnt', i.toString());
      (this._container?.parentNode)?.appendChild(scrollSec);
    }

    // スクロールのイベント登録（次の紙を表示）
    const secArea = document.querySelectorAll('.' + Const.CLASS_SCROLL);
    const options = {
      root: null, // 今回はビューポートをルート要素とする
      threshold: 0.51, // 閾値は0
    };
    const observer = new IntersectionObserver(this._scrollEventHandler.bind(this), options);
    secArea.forEach(
      function (area) {
        observer.observe(area);
      }
    );
  }

  // ----------------------------------------------------
  // 機能：紙のように前後に配置
  // 引数：el   スタイルを調整する要素
  //      no   何番目か（メインの表示は0番目。一つ後ろは1）
  // 返値：なし
  // ----------------------------------------------------
  private _setStyle(el: HTMLElement, no: number) {
    if (no === 0) {
      // メイン表示はスタイル無し
      el.style.filter = 'none';
      el.style.boxShadow = 'none';
      el.style.transform = 'none';
    }
    else if(no < 0) {
      // 手前にくるもの
      el.style.filter = 'blur(' + -5 * no + 'px)';
      el.style.boxShadow = no * 20 + 'px ' + no * 20 + 'px 40px rgba(0, 0, 0, 0.03)';
      el.style.transform = 'translate3d(' + 88 * no + '%, 0, ' +  -120 * no + 'px) rotate(' + 7 * no + 'deg)';
    }
    else {
      // 後ろに行くもの
      el.style.filter = 'blur(' + no + 'px)';
      el.style.boxShadow = no * 20 + 'px ' + no * 20 + 'px 40px rgba(0, 0, 0, 0.03)';
      el.style.transform = 'translate3d(' + 30 * no + '%, ' + 25 * no + '%, ' + -150 * no + 'px) rotate(' + 7 * no + 'deg)';
    }
  }

  // ----------------------------------------------------
  // 機能：紙のように前後に配置
  // 引数：el   スタイルを調整する要素
  //      no   何番目か（メインの表示は0番目。一つ後ろは1）
  // 返値：なし
  // ----------------------------------------------------
  private _scrollEventHandler(entries: any) {
    entries.forEach((entry: any, i: number) => {
        const target = entry.target;
        if (entry.isIntersecting) {
          const frontNo = target.dataset.scrollcnt;   // 現在表示させるセクションがどれか判断する
           // セクションにスタイルをつける
          for (let i = 0; i < this._secList.length; i++) {
            this._setStyle(this._secList[i], i - frontNo);
          }
        }
      }
    );
  }
}
