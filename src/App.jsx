import { useState } from 'react'
import { useTranslation } from 'react-i18next';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="p-4">
      {/* Header with Language Selector */}
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-primary">{t('app.title')}</h1>
        <div className="relative">
          <select
            className="appearance-none bg-gray-200 border border-gray-300 rounded py-1 px-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="en">{t('language.english')}</option>
            <option value="zh">{t('language.chinese')}</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <p className="text-secondary">{t('welcome')}</p>
      <button className="mt-2 px-4 py-2 bg-primary text-white rounded">
        {t('next')}
      </button>
    </div>
  );
}

export default App
