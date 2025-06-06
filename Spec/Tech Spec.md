# 退休金計算工具 - 技術規格書 (Tech Spec)

## 1. 概述

本技術規格書描述退休金計算工具的技術實現細節，確保應用完全離線運行、模組化設計、減少第三方依賴，並支援快速迭代（MVP 3-4 週）。應用將部署於 GitHub Pages（`username.github.io/repo-name`），未來可轉為 Chrome Extension。

## 2. 技術選型

### 2.1 前端框架

- **技術**：React（18.x）
- **理由**：
  - 組件化設計，實現三步驟 UI（資產累積、退休提領、計算結果）。
  - 模組化結構，支援未來轉為 Chrome Extension。
  - 透過 Vite 打包為靜態文件，或使用 CDN（unpkg）載入，支援離線運行。
- **實現細節**：
  - 使用 `useState` 管理三步驟切換，無需複雜路由。
  - 每個步驟為獨立組件（例如 `AssetAccumulationStep`, `RetirementWithdrawalStep`, `ResultStep`）。

### 2.2 樣式

- **技術**：Tailwind CSS（3.x）
- **理由**：
  - 實現清新、簡潔的 UI，支援響應式設計（手機、平板、桌面）。
  - 使用 PurgeCSS 優化，CSS 體積 &lt; 50KB。
  - 透過 CDN 或 Vite 打包，支援 GitHub Pages 和離線運行。
- **實現細節**：
  - 採用卡片式設計（圓角、陰影），藍色/綠色主調（例如 `#3b82f6`）。
  - 響應式類（`sm:`, `md:`）適配不同設備。
  - 進度條和語言切換使用 Tailwind 組件。

### 2.3 圖表

- **技術**：Chart.js（4.x，透過 react-chartjs-2）
- **理由**：
  - 輕量（約 60KB），支援線圖和交互（懸停顯示數據）。
  - 透過 CDN 或打包，支援離線運行。
  - 與 React 整合簡單，滿足資產增長/資金消耗曲線需求。
- **實現細節**：
  - 數據點以年為單位（即使按月複利計算，匯總為每年末數值）。
  - 配置：藍色/綠色主調，支援暗/亮模式，自動調整 Y 軸。
  - 優化性能：限制數據點（例如投資 &gt; 30 年採樣每 2-3 年）。

### 2.4 多語言

- **技術**：react-i18next（最新版）
- **理由**：
  - 專為 React 設計，支援中文/英文，語言文件（JSON）內嵌。
  - 輕量（約 10KB），支援離線運行。
  - 便於擴展其他語言。
- **實現細節**：
  - 語言文件內嵌（`zh.json`, `en.json`），包含表單標籤、提示和結果文字。
  - 右上角下拉選單切換語言，預設根據瀏覽器語言（`navigator.language`）。
  - 使用 `useTranslation` 鉤子動態渲染多語言內容。

### 2.5 數據儲存

- **技術**：localStorage
- **理由**：
  - 瀏覽器內建，無第三方依賴，支援離線儲存。
  - 適合儲存簡單 JSON 數據（年紀、金額、報酬率等）。
- **實現細節**：
  - 儲存所有輸入數據（例如 `{ currentAge: 30, totalAssets: 50000, ... }`）。
  - 頁面載入時自動恢復數據，支援「重置」功能清空。

### 2.6 計算邏輯

- **技術**：純 JavaScript
- **理由**：
  - 實現按月/年複利公式，無第三方依賴。
  - 計算時間 &lt; 500ms，滿足性能要求。
  - 模組化函數，易於測試和重用。
- **實現細節**：
  - 按月複利：`FV = PV * (1 + r_m)^(n*12) + PMT_m * ((1 + r_m)^(n*12) - 1) / r_m`
    - `r_m = (1 + r)^(1/12) - 1`
  - 按年複利：`FV = PV * (1 + r)^n + PMT * ((1 + r)^n - 1) / r`
  - 封裝為模組（例如 `calculateFV.js`），輸入參數（PV, r, PMT, n, frequency）。
  - 退休後資金消耗：迭代計算每年資產變動（資產 \* (1 + 報酬率) - 通膨調整支出）。

### 2.7 打包與部署

- **技術**：Vite + GitHub Pages
- **理由**：
  - Vite 提供快速構建和熱重載，生成靜態文件，適配 GitHub Pages。
  - GitHub Pages 免費托管，支援 HTTPS，與純前端應用契合。
  - 打包體積 &lt; 200KB（經 PurgeCSS 和 tree-shaking 優化）。
- **部署流程**：
  1. 初始化 GitHub 儲存庫（例如 `retirement-calculator`）。
  2. 配置 Vite（`vite.config.js`）：

     ```javascript
     import { defineConfig } from 'vite'
     import react from '@vitejs/plugin-react'
     export default defineConfig({
       plugins: [react()],
       base: '/retirement-calculator/' // 儲存庫名稱
     })
     ```
  3. 安裝 `gh-pages` 套件，添加部署腳本（`package.json`）：

     ```json
     "scripts": {
       "build": "vite build",
       "deploy": "gh-pages -d dist"
     }
     ```
  4. 打包並部署：

     ```bash
     npm run build
     npm run deploy
     ```
  5. 訪問 `https://username.github.io/retirement-calculator/`。
- **離線支援**：
  - 所有依賴（React、Chart.js、Tailwind CSS、react-i18next）內嵌或緩存。
  - 可選：添加 Service Worker 緩存靜態資源，增強離線體驗。

### 2.8 Chrome Extension 兼容

- **實現細節**：
  - React 組件和計算邏輯可直接重用。
  - 添加 `manifest.json` 配置擴展（例如 popup 視窗，尺寸 600x800px）。
  - 調整 UI 適配小視窗（使用 Tailwind CSS 響應式類）。
  - 靜態文件直接打包為擴展，無需修改核心邏輯。

## 3. 模組化設計

- **組件結構**：
  - `App.jsx`：主應用，管理三步驟狀態（`useState`）。
  - `AssetAccumulationStep.jsx`：資產累積表單組件，處理年紀、資產、報酬率等輸入。
  - `RetirementWithdrawalStep.jsx`：退休提領表單組件，處理退休年紀、通膨率等輸入。
  - `ResultStep.jsx`：結果展示組件，顯示文字結果和圖表。
  - `ProgressBar.jsx`：進度指示器組件，顯示當前步驟。
  - `LanguageSelector.jsx`：語言切換下拉選單組件。
- **計算模組**：
  - `calculateFV.js`：封裝按月/年複利計算邏輯。
  - `calculateRetirement.js`：封裝退休後資金消耗計算邏輯。
- **語言模組**：
  - `i18n.js`：初始化 react-i18next，載入語言文件。
  - `zh.json`, `en.json`：中文和英文語言文件。
- **儲存模組**：
  - `storage.js`：封裝 localStorage 操作（保存、讀取、重置輸入數據）。
- **檔案架構樹狀圖**：

  ```
  retirement-calculator/
  ├── public/
  │   ├── index.html         # 主 HTML 文件，載入 React
  │   └── favicon.ico        # 網站圖標
  ├── src/
  │   ├── components/        # React 組件
  │   │   ├── App.jsx        # 主應用，管理三步驟狀態
  │   │   ├── AssetAccumulationStep.jsx  # 資產累積表單
  │   │   ├── RetirementWithdrawalStep.jsx # 退休提領表單
  │   │   ├── ResultStep.jsx # 結果和圖表展示
  │   │   ├── ProgressBar.jsx # 進度指示器
  │   │   └── LanguageSelector.jsx # 語言切換選單
  │   ├── utils/             # 工具函數
  │   │   ├── calculateFV.js # 按月/年複利計算
  │   │   ├── calculateRetirement.js # 退休後資金消耗計算
  │   │   └── storage.js     # localStorage 操作
  │   ├── i18n/              # 多語言配置
  │   │   ├── i18n.js        # react-i18next 初始化
  │   │   ├── zh.json        # 中文語言文件
  │   │   └── en.json        # 英文語言文件
  │   ├── assets/            # 靜態資源（可選）
  │   │   └── logo.png       # 應用圖標（若需要）
  │   ├── main.jsx           # React 入口，渲染 App
  │   └── index.css          # 全局 CSS（Tailwind CSS 導入）
  ├── vite.config.js         # Vite 配置文件，設置 base 路徑
  ├── tailwind.config.js     # Tailwind CSS 配置文件
  ├── postcss.config.js      # PostCSS 配置文件（用於 Tailwind）
  ├── package.json           # 項目依賴和腳本（build, deploy）
  ├── .gitignore             # Git 忽略文件（node_modules, dist）
  └── README.md              # 項目說明
  
  ```
- **檔案說明**：
  - **public/**：靜態資源，`index.html` 作為應用入口，`favicon.ico` 提供網站圖標。
  - **src/components/**：React 組件，實現三步驟 UI 和交互功能。
  - **src/utils/**：封裝計算和儲存邏輯，模組化設計便於測試和重用。
  - **src/i18n/**：多語言配置，內嵌 JSON 文件，支援離線運行。
  - **src/assets/**：可選靜態資源（如圖標），保持結構靈活性。
  - **vite.config.js**：配置 Vite 的 `base` 路徑（例如 `/retirement-calculator/`），確保 GitHub Pages 部署正確。
  - **tailwind.config.js**：定義 Tailwind CSS 主題（例如藍色/綠色配色）。
  - **package.json**：包含依賴（React、Chart.js、react-i18next）和部署腳本（`npm run deploy`）。

## 4. 技術約束

- 僅支援靜態內容，無法使用後端 API（與純前端設計相符）。
- 打包體積需 &lt; 200KB，確保載入速度。
- 瀏覽器需支援 ES6+（React、Chart.js 要求）。
- GitHub Pages 部署需配置正確的 `base` 路徑（例如 `/retirement-calculator/`）。

## 5. 風險與緩解措施

- **風險**：第三方依賴（React、Chart.js）更新導致兼容性問題。
  - **緩解**：鎖定穩定版本（React 18.x、Chart.js 4.x），透過 CDN 指定版本。
- **風險**：GitHub Pages 相對路徑導致資源載入失敗。
  - **緩解**：配置 `vite.config.js` 的 `base` 路徑，測試所有資源。
- **風險**：打包體積過大，影響載入速度。
  - **緩解**：使用 PurgeCSS 優化 Tailwind CSS，Vite 的 tree-shaking 壓縮 JS。
- **風險**：手機端圖表渲染性能不足。
  - **緩解**：限制數據點（以年為單位，採樣間隔可調），優化 Chart.js 配置。
- **風險**：首次載入 CDN 依賴（若使用）無法緩存，影響離線體驗。
  - **緩解**：優先使用 Vite 打包內嵌依賴；可選添加 Service Worker。
