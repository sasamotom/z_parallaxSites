// *****************************************************
// スクロールスナップ関連
// *****************************************************

export class ScrollSnap {
  private _ancIdList: string[];
  // ----------------------------------------------------
  // 機能：コンストラクタ
  // 引数：なし
  // 返値：なし
  //----------------------------------------------------
  constructor() {
    // アンカーリンク一覧作成と現在位置を示すクラスをスクロールで付け替えるよう設定
    const ancLinks = document.getElementById('anchorList');   // アンカーリンク領域
    // IntersectionObserverのオプション設定
    const options = {
      root: null,
      rootMargin: "-49% 0%",
      threshold: 0,
    };
    // アンカーリンクのID一覧初期化
    this._ancIdList = new Array();
    // IntersectionObserverのコールバック関数登録
    const observer = new IntersectionObserver(this._setActiveLink, options);
    if (ancLinks) {
      const secs = document.querySelectorAll('.sec'); // セクション一覧
      if (secs) {
        secs.forEach((sec, index) => {
          // 現在位置を示すクラスをスクロールで付け替えるよう設定
          observer.observe(sec);
          // アンカーリンクのID一覧作成
          const ancId = sec.getAttribute('id');
          if (ancId) {
            this._ancIdList.push(ancId);
          }
        });
      }
    }
  }

  // ----------------------------------------------------
  // 機能：アクティブなリンク・要素にクラスをつける
  // 引数：entries
  // 返値：なし
  // ----------------------------------------------------
  private _setActiveLink = (entries: any) => {
    if (entries.length > 0) {
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const ancLink = document.querySelector('#anchorList a[href="#' + entry.target.getAttribute('id') + '"]');
        if (entry.isIntersecting) {
          entry.target.classList.add("-active");
          if (ancLink) {
            ancLink.classList.add("-active");
          }
          // アンカーリンクの表示index変更
          let selectedIndex = -1; // 選択中のアンカーリンクIndex
          for (let j = 0; j < this._ancIdList.length; j++) {
            if (this._ancIdList[j] === entry.target.getAttribute('id')) {
              selectedIndex = j;
              break;
            }
          }
          document.getElementById('anchorList')!.dataset.activerow = selectedIndex.toString();
        }
        else {
          entry.target.classList.remove('-active');
          if (ancLink) {
            ancLink.classList.remove("-active");
          }
        }
      }
    }
  }
}
