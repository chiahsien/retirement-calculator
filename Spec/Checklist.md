# 退休金計算工具 - 開發計畫檢查清單

## 概述

本檢查清單規劃退休金計算工具的 MVP 開發，時間為 3-4 週，目標是實現三步驟 UI、複利計算、圖表展示、數據儲存、多語言支援和 GitHub Pages 部署。計畫按功能模組分拆為 Git feature 分支，每個分支包含具體的 Git commit 任務，確保依賴順序合理，無衝突。

## 總時間表

- **週數**：3-4 週（假設 1-2 名開發者，每週 40 小時）
- **分支數**：6 個主要 feature 分支
- **提交數**：約 20-25 個 commits，涵蓋所有功能
- **部署目標**：GitHub Pages（`username.github.io/retirement-calculator`）

## 檢查清單

### Week 1: 專案初始化與基礎設置

**Feature Branch**: `feature/project-setup`

- [X] **Commit 1: 初始化 Vite + React 專案**
  - 運行 `npm create vite@latest` 創建 React 專案。
  - 配置 `package.json`（添加 `build` 和 `deploy` 腳本）。
  - 設置 `.gitignore`（忽略 `node_modules`, `dist`）。
- [X] **Commit 2: 配置 Tailwind CSS**
  - 安裝 `tailwindcss`, `postcss`, `autoprefixer`。
  - 配置 `tailwind.config.js`（藍色/綠色主調，例如 `#3b82f6`）。
  - 配置 `postcss.config.js` 和 `index.css`（導入 Tailwind）。
- [X] **Commit 3: 配置 Vite 部署路徑**
  - 修改 `vite.config.js`，設置 `base: '/retirement-calculator/'`。
  - 測試本地開發環境（`npm run dev`）。
- [X] **Commit 4: 初始化多語言（react-i18next）**
  - 安裝 `react-i18next` 和 `i18next`。
  - 配置 `src/i18n/i18n.js`，創建 `zh.json` 和 `en.json`（包含基本標籤，如 "Next"）。
  - 測試語言切換（預設根據 `navigator.language`）。
- [X] **Commit 5: 部署初始專案到 GitHub Pages**
  - 安裝 `gh-pages` 套件。
  - 添加部署腳本（`"deploy": "gh-pages -d dist"`）。
  - 運行 `npm run build` 和 `npm run deploy`，驗證 `username.github.io/retirement-calculator`。

**依賴**：無（基礎設置為所有功能的起點）
**完成條件**：專案運行正常，Tailwind CSS 生效，語言切換可用，GitHub Pages 部署成功。

---

### Week 2: 計算邏輯與儲存

**Feature Branch**: `feature/calculation-logic`

- [ ] **Commit 1: 實現按月/年複利計算**
  - 創建 `src/utils/calculateFV.js`。
  - 實現按月複利：`FV = PV * (1 + r_m)^(n*12) + PMT_m * ((1 + r_m)^(n*12) - 1) / r_m`。
  - 實現按年複利：`FV = PV * (1 + r)^n + PMT * ((1 + r)^n - 1) / r`。
  - 測試函數（例如 PV=$50,000, r=6%, PMT=$1,000/月, n=30）。
- [ ] **Commit 2: 實現退休後資金消耗計算**
  - 創建 `src/utils/calculateRetirement.js`。
  - 實現迭代計算：`資產 = 上一年資產 * (1 + 報酬率) - 通膨調整支出`。
  - 輸出可支撐年限和耗盡年紀。
  - 測試函數（例如 FV=$1,264,844, 支出=$40,000/年, 通膨=2%）。
- [ ] **Commit 3: 實現 localStorage 儲存**
  - 創建 `src/utils/storage.js`。
  - 實現 `saveInputs`, `loadInputs`, `resetInputs` 函數。
  - 測試儲存/恢復輸入數據（例如年紀、資產等）。

**Feature Branch**: `feature/input-validation`

- [ ] **Commit 1: 實現輸入驗證邏輯**
  - 創建 `src/utils/validateInputs.js`。
  - 驗證股債比例總和（100%）、退休年紀（> 目前年紀）、無負數/空白。
  - 測試驗證函數（例如無效輸入返回警告訊息）。

**依賴**：專案基礎（Week 1），無其他功能依賴。
**完成條件**：計算邏輯正確（通過單元測試），localStorage 儲存/恢復正常，輸入驗證生效。

---

### Week 3: 三步驟 UI 與圖表

**Feature Branch**: `feature/ui-steps`

- [ ] **Commit 1: 實現主應用與步驟狀態管理**
  - 創建 `src/components/App.jsx`。
  - 使用 `useState` 管理三步驟狀態（step=1,2,3）。
  - 實現基本步驟切換邏輯（「上一步」、「下一步」）。
- [ ] **Commit 2: 實現資產累積表單**
  - 創建 `src/components/AssetAccumulationStep.jsx`。
  - 包含輸入字段：年紀、資產、報酬率、股債比例、定額投資（每月/年）。
  - 整合 `validateInputs.js` 顯示警告。
  - 應用 Tailwind CSS（卡片式設計，垂直排列）。
- [ ] **Commit 3: 實現退休提領表單**
  - 創建 `src/components/RetirementWithdrawalStep.jsx`。
  - 包含輸入字段：退休年紀、通膨率、退休後股債比例、每年支出。
  - 整合 `validateInputs.js` 驗證。
  - 保持一致的 Tailwind CSS 風格。
- [ ] **Commit 4: 實現進度指示器**
  - 創建 `src/components/ProgressBar.jsx`。
  - 顯示「1. 資產累積 > 2. 退休提領 > 3. 計算結果」，高亮當前步驟。
  - 使用 Tailwind CSS（藍色高亮，響應式）。
- [ ] **Commit 5: 實現語言切換選單**
  - 創建 `src/components/LanguageSelector.jsx`。
  - 右上角下拉選單（中文/英文），整合 react-i18next。
  - 測試語言切換（表單標籤、提示文字更新）。

**Feature Branch**: `feature/charts`

- [ ] **Commit 1: 安裝並配置 Chart.js**
  - 安裝 `chart.js` 和 `react-chartjs-2`。
  - 配置基本線圖（藍色/綠色主調，支援交互）。
- [ ] **Commit 2: 實現資產增長曲線**
  - 在 `src/components/ResultStep.jsx` 整合 Chart.js。
  - 調用 `calculateFV.js`，生成每年末數據點（以年為單位）。
  - 測試圖表（例如 30-60 歲，資產從 $50,000 增長到 $1,264,844）。
- [ ] **Commit 3: 實現資金消耗曲線**
  - 在 `src/components/ResultStep.jsx` 添加第二張圖表。
  - 調用 `calculateRetirement.js`，生成每年末資產餘額。
  - 測試圖表（例如 60-95 歲，資產逐年減少）。
- [ ] **Commit 4: 實現結果展示與交互**
  - 在 `src/components/ResultStep.jsx` 顯示文字結果（總資產、可支撐年限、耗盡年紀）。
  - 添加「編輯輸入」（返回步驟 1）和「重置」按鈕。
  - 整合 localStorage 自動載入數據。

**依賴**：

- Week 1（專案基礎、Tailwind CSS、react-i18next）。
- Week 2（計算邏輯、輸入驗證、localStorage）。
  **完成條件**：三步驟 UI 完整，圖表渲染正確，語言切換和數據儲存正常。

---

### Week 4: 優化與部署

**Feature Branch**: `feature/optimization`

- [ ] **Commit 1: 優化打包體積**
  - 配置 PurgeCSS（移除未使用 Tailwind CSS 類）。
  - 使用 Vite 的 tree-shaking 壓縮 JavaScript。
  - 驗證打包體積 < 200KB（`dist` 資料夾）。
- [ ] **Commit 2: 優化圖表性能**
  - 限制圖表數據點（例如投資 > 30 年採樣每 2-3 年）。
  - 測試圖表渲染時間 < 1s（手機和桌面端）。
- [ ] **Commit 3: 添加離線支援**
  - 驗證所有依賴（React、Chart.js、Tailwind CSS）內嵌或緩存。
  - 可選：添加 Service Worker 緩存靜態資源。
- [ ] **Commit 4: 測試響應式設計**
  - 測試手機、平板、桌面端（使用 Tailwind 響應式類）。
  - 確保表單和圖表在小螢幕上清晰（例如縮放圖表、優先顯示結果）。

**Feature Branch**: `feature/final-deployment`

- [ ] **Commit 1: 最終部署到 GitHub Pages**
  - 運行 `npm run build` 和 `npm run deploy`。
  - 驗證 `username.github.io/retirement-calculator` 正常運行。
- [ ] **Commit 2: 撰寫 README**
  - 在 `README.md` 說明專案功能、部署步驟和使用方法。
  - 包含技術棧（React、Tailwind CSS、Chart.js 等）。

**依賴**：Week 1-3（所有功能完成）。
**完成條件**：應用部署成功，離線運行正常，響應式設計通過測試，體積 < 200KB。

---

## Git 分支管理

- **主分支**：`main`（用於最終合併和部署）。
- **Feature 分支**：
  - `feature/project-setup`
  - `feature/calculation-logic`
  - `feature/input-validation`
  - `feature/ui-steps`
  - `feature/charts`
  - `feature/optimization`
  - `feature/final-deployment`
- **提交規範**：
  - 每個 commit 聚焦單一任務（例如「Add AssetAccumulationStep component」）。
  - 提交訊息格式：`[Feature] Description`（例如 `[ui-steps] Add AssetAccumulationStep component`）。
- **合併流程**：
  - 每個 feature 分支完成後，提交 PR（Pull Request）到 `main`。
  - 測試無衝突後合併，確保 `main` 隨時可部署。

## 風險與緩解

- **風險**：功能依賴未完成（例如 UI 需等待計算邏輯）。
  - **緩解**：按計畫順序開發，先完成計算邏輯（Week 2），再實現 UI（Week 3）。
- **風險**：Git 分支衝突。
  - **緩解**：每個分支聚焦單一模組，提交前測試（`git pull origin main`）。
- **風險**：部署失敗（例如路徑錯誤）。
  - **緩解**：配置 `vite.config.js` 的 `base` 路徑，測試本地和 GitHub Pages。

## 完成條件

- 所有檢查清單任務完成。
- 應用在 GitHub Pages 運行正常（`username.github.io/retirement-calculator`）。
- 三步驟 UI、計算邏輯、圖表、儲存和多語言功能通過測試。
- 打包體積 < 200KB，計算時間 < 500ms，圖表渲染 < 1s。
- 支援離線運行，數據儲存和語言切換正常。
