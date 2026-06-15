# 驗證清單

- `node --check script.js`
- `git diff --check`
- 本機 HTTP server 開啟 `daylily.html#ar-game`
- UI 修改必須產出並實際檢視截圖；依影響範圍至少包含手機截圖，版面跨裝置時需同時檢查桌面截圖
- 確認 3D 地圖可拖曳、旋轉、傾斜與縮放
- 確認「回到校園」、「俯視」、「金針花位置」按鈕可用
- 確認資訊按鈕會更新右側介紹卡
- 確認窄螢幕版面不溢出

## 2026-06-15 驗證結果

- `node --check script.js`：通過
- `git diff --check`：通過
- 桌面版 Playwright 視覺檢查：通過
- 390px 行動版 Playwright 視覺檢查：通過
- 「金針花位置」與「花朵介紹」互動：通過
- Console：僅 `favicon.ico` 404，不影響功能
- 移除藍色示意建築後重新檢查：停車場與主要道路無自訂建築遮擋，Console 0 errors
- 手機 390px 檢查停車場側定位：標記與「汽車停車場」文字可同時看到，Console 0 errors
- 使用者指定後續 UI 驗證改以截圖作為主要視覺驗收依據
- 手機版停車場定位驗收截圖：`codex/artifacts/手機版_停車場定位_驗收.png`
- 金針花模型 Blender 渲染：`codex/artifacts/金針花3D模型_驗收.png`
- 金針花模型網站桌面截圖：`codex/artifacts/金針花3D模型_網站桌面驗收.png`
- 金針花模型網站手機截圖：`codex/artifacts/金針花3D模型_網站手機驗收.png`
- 新 GLB 重新匯入 Blender：42 個 Mesh，通過
- 新模型網站桌面／手機截圖：完整顯示、無裁切，Console 0 errors
- 斜坡道路 3D 花帶桌面截圖：`codex/artifacts/斜坡道路花帶_桌面定位.png`
- 斜坡道路 3D 花帶手機截圖：`codex/artifacts/斜坡道路花帶_手機定位.png`
- 兩排 GLB 模型可辨識、定位圖示位於斜坡道路、主要車道未被遮住，Console 0 errors
- 已知非阻塞警告：model-viewer／Three.js 重複載入提示、公開底圖缺少機車停車圖示
- 沿道路花帶初步桌面截圖：`codex/artifacts/沿道路花帶_桌面驗收.png`
- 沿道路花帶初步手機截圖：`codex/artifacts/沿道路花帶_手機驗收.png`
- 道路界線桌面俯視檢查：`codex/artifacts/道路界線檢查_桌面俯視.png`
- 道路界線桌面斜角檢查：`codex/artifacts/道路界線檢查_桌面斜角.png`
- 道路界線手機俯視檢查：`codex/artifacts/道路界線檢查_手機俯視.png`
- 道路界線截圖驗收：失敗。俯視可見花帶呈近水平排列並偏離實際彎曲道路，斜角視圖會造成位置接近道路的錯覺。
- Console：0 errors；已知非阻塞警告不影響本次位置判定。
- 實際道路圖徵桌面俯視：`codex/artifacts/實際道路圖徵_桌面俯視.png`
- 實際道路圖徵桌面斜角：`codex/artifacts/實際道路圖徵_桌面斜角.png`
- 實際道路圖徵手機斜角：`codex/artifacts/實際道路圖徵_手機斜角.png`
- OpenFreeMap 道路圖徵驗收：通過。俯視確認兩排花帶沿底圖彎曲道路線形排列。
- 執行階段來源檢查：`window.roadsideDaylilySource === "openfreemap"`，取得 5 個道路線形節點，3D 花排圖層存在。
- 模型貼地驗收：通過。桌面與手機斜角截圖確認花排底部貼地，未再隨南北位置浮空。
- 修正後 Console：0 errors；保留既有非阻塞警告。
- 旋轉展示影片：`codex/artifacts/金針花3D地圖旋轉展示_LINE版_2026-06-15.mp4`
- 影片規格：41.56 秒、1280x720、H.264、yuv420p、約 5 MB，適合 LINE 傳送。
- 影片抽格檢查：`codex/artifacts/金針花3D地圖旋轉展示_影片檢查.jpg`，多角度旋轉畫面正常。
