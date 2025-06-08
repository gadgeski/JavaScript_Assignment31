const resizableBox = document.getElementById("resizableBox");
const resizer = document.getElementById("resizer");

let isResizing = false; // リサイズ中かどうかを示すフラグ
let startX, startY; // リサイズ開始時のマウス位置
let startWidth, startHeight; // リサイズ開始時の要素の幅と高さ

const minWidth = 100;
const minHeight = 80;

resizer.addEventListener("mousedown", (e) => {
  isResizing = true;

  // イベントのデフォルト動作をキャンセル (テキスト選択などを防ぐ)
  e.preventDefault();

  // リサイズ開始時のマウス位置
  startX = e.clientX;
  startY = e.clientY;

  // リサイズ開始時の要素の現在の幅と高さ
  startWidth = resizableBox.offsetWidth;
  startHeight = resizableBox.offsetHeight;

  // ドラッグ中にmousemoveとmouseupイベントをdocumentに追加
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});

function onMouseMove(e) {
  if (!isResizing) return;

  // マウスの移動量
  const deltaX = e.clientX - startX;
  const deltaY = e.clientY - startY;

  // 新しい幅と高さを計算
  let newWidth = startWidth + deltaX;
  let newHeight = startHeight + deltaY;

  // 最小サイズ制限
  newWidth = Math.max(minWidth, newWidth);
  newHeight = Math.max(minHeight, newHeight);

  // 要素のスタイルを更新してリサイズ
  resizableBox.style.width = `${newWidth}px`;
  resizableBox.style.height = `${newHeight}px`;
}

function onMouseUp() {
  isResizing = false;
  // リサイズ終了時はmousemoveとmouseupイベントリスナーを削除
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
}
