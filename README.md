# Retirement Calculator

A lightweight, offline-capable web application to help users plan their retirement by calculating asset growth and withdrawal sustainability. Built with a clean, intuitive three-step UI, it supports monthly/yearly compound interest calculations, interactive charts, and multilingual (English/Chinese) interfaces.

## Features

* **Three-Step UI** :
  * **Step 1: Asset Accumulation** : Input current age, total assets, stock/bond rates, allocation, and periodic investments (monthly/yearly).
  * **Step 2: Retirement Withdrawal** : Input retirement age, inflation rate, post-retirement allocation, and annual expenses.
  * **Step 3: Results** : View total assets at retirement, sustainable withdrawal years, and depletion age, with interactive charts.
* **Calculations** :
  * Monthly or yearly compound interest for asset growth.
  * Retirement withdrawal simulation with inflation-adjusted expenses.
* **Interactive Charts** : Visualize asset growth and withdrawal curves using Chart.js.
* **Local Storage** : Automatically saves user inputs for persistence across sessions.
* **Multilingual Support** : Toggle between English and Chinese interfaces.
* **Offline Capability** : Runs entirely in the browser with no backend dependencies.
* **Responsive Design** : Optimized for mobile, tablet, and desktop devices.
* **Future Extensibility** : Designed for easy conversion to a Chrome Extension.

## Tech Stack

* **Frontend Framework** : React (18.x)
* **Styling** : Tailwind CSS (3.x)
* **Charts** : Chart.js (4.x, via react-chartjs-2)
* **Internationalization** : react-i18next
* **Data Storage** : localStorage
* **Calculations** : Pure JavaScript
* **Build Tool** : Vite
* **Deployment** : GitHub Pages

## Setup Instructions

### Prerequisites

* Node.js (v16 or higher)
* npm (v8 or higher)
* Git

### Installation

1. **Clone the Repository** :

2. **Install Dependencies** :

```bash
npm install
```

3. **Run Locally** :

```bash
npm run dev
```

Open **http://localhost:5173/retirement-calculator/** in your browser.

### Deployment to GitHub Pages

1. **Configure Base Path** : Ensure **vite.config.js** has the correct base path:

```javascript
export default {
    plugins: [react()],
    base: '/retirement-calculator/'
}
```

2. **Install gh-pages** :

```bash
npm install -D gh-pages
```

3. **Add Deploy Script** : In **package.json**, ensure the following script:

```json
"scripts": {
    "deploy": "gh-pages -d dist"
}
```

4. **Build and Deploy** :

```bash
npm run build
npm run deploy
```

The app will be live at **https://username.github.io/retirement-calculator**.

## Usage

1. **Step 1: Asset Accumulation** :

* Enter your current age, total assets, stock/bond return rates, allocation percentages (must sum to 100%), and periodic investment (monthly or yearly).
* Click "Next" to proceed.

2. **Step 2: Retirement Withdrawal** :

* Enter your retirement age, inflation rate, post-retirement allocation, and annual expenses.
* Click "Previous" to edit or "Next" to calculate.

3. **Step 3: Results** :

* View your total assets at retirement, sustainable withdrawal years, and depletion age.
* Interactive charts display asset growth and withdrawal curves.
* Click "Edit Inputs" to modify data or "Reset" to clear all inputs.

4. **Language Toggle** :

* Use the dropdown in the top-right corner to switch between English and Chinese.

5. **Persistence** :

* Inputs are saved automatically via localStorage and restored on page reload.

## Project Structure

```
retirement-calculator/
├── public/
│   ├── index.html         # Main HTML file
│   └── favicon.ico        # Site favicon
├── src/
│   ├── components/        # React components
│   │   ├── App.jsx        # Main app with step management
│   │   ├── AssetAccumulationStep.jsx  # Step 1 form
│   │   ├── RetirementWithdrawalStep.jsx # Step 2 form
│   │   ├── ResultStep.jsx # Results and charts
│   │   ├── ProgressBar.jsx # Progress indicator
│   │   └── LanguageSelector.jsx # Language toggle
│   ├── utils/             # Utility functions
│   │   ├── calculateFV.js # Compound interest calculations
│   │   ├── calculateRetirement.js # Withdrawal calculations
│   │   └── storage.js     # localStorage operations
│   ├── i18n/              # Multilingual configuration
│   │   ├── i18n.js        # react-i18next setup
│   │   ├── zh.json        # Chinese translations
│   │   └── en.json        # English translations
│   ├── assets/            # Static assets (optional)
│   ├── main.jsx           # React entry point
│   └── index.css          # Global CSS (Tailwind)
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── package.json           # Dependencies and scripts
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (**git checkout -b feature/your-feature**).
3. Commit changes (**git commit -m "[Feature] Add your feature"**).
4. Push to the branch (**git push origin feature/your-feature**).
5. Open a Pull Request.

Please ensure code follows the existing structure and includes tests for new features.

## License

This project is licensed under the MIT License. See the [LICENSE] file for details.

## Contact

For issues or suggestions, please open an issue on GitHub.
