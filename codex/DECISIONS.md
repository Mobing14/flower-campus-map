# 決策

## ADR-0001：採用免費開源 3D 地圖

- 狀態：accepted
- 日期：2026-06-15
- 背景：使用者希望把拖曳全景改成類 Google 地圖 3D 檢視，但不希望產生 Google Maps 計費。
- 決策：使用 MapLibre GL JS、OpenFreeMap、OpenStreetMap 與本機 GeoJSON。
- 原因：可部署於 GitHub Pages，不需 API Key 或計費帳戶。
- 後果：無法提供 Google Photorealistic 3D 的真實航拍模型，校園建築需以示意模型補足。
