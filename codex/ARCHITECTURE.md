# 架構

## 免費 3D 地圖

- MapLibre GL JS 在瀏覽器內提供旋轉、傾斜、縮放與 3D 擠出。
- OpenFreeMap 提供以 OpenStreetMap 為來源的向量底圖。
- `script.js` 從 OpenFreeMap `transportation` 圖徵選取金針花標記附近的實際道路線形，並以公尺偏移和間距產生道路兩側花帶座標。
- 若公開道路圖徵暫時無法取得，才使用內建斜坡道路折線作為載入失敗備援。
- `map-models.js` 使用 Three.js 自訂 MapLibre 3D 圖層，載入並複製 `images/daylily-bloom.glb`。
- 頁面必須保留 OpenStreetMap / OpenFreeMap 資料來源標示。

## 金針花 3D 模型

- 網站模型：`images/daylily-bloom.glb`
- Blender 原始檔：`codex/artifacts/daylily-plant.blend`
- 建模腳本：`codex/tmp/build_daylily_model.py`
- 舊模型備份：`codex/archive/daylily-bloom-original-2026-06-15.glb`
- 模型包含六片花瓣、花蕊、兩個花苞、花莖與葉叢，採低多邊形教學展示風格。
- 地圖花帶以放大展示比例呈現，目的是讓模型在手機與桌面地圖上可辨識，不代表實際植株尺寸。
- 道路花帶不要直接維護兩排獨立座標；正常情況由公開道路圖徵與 `createRoadsideRows` 自動產生兩側位置。
- Three.js 場景使用 Y 軸作高度，模型南北位置使用 Z 軸；模型載入後以 bounding box 最低點校正貼地高度。
