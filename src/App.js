// src/App.js
import React from 'react';

// 各コンポーネントの読み込み
// ※ src/components フォルダ内にこれらのファイルが存在する必要があります
// import Header from './components/Header';
import FirstView from './components/FirstView';
import Statement from './components/Statement';
import DomesticWholesalers from './components/DomesticWholesalers';
import ProblemsAndSolutions from './components/ProblemsAndSolutions';
import ServiceFlow from './components/ServiceFlow';
import FAQ from './components/FAQ';
import CompanyInfo from './components/CompanyInfo';
import Price from './components/Price';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div
      className="font-sans bg-white text-gray-900"
      style={{
        // 英文: Inter, 日本語: Noto Sans JP, 代替: YuGothic
        // 英文フォントを先に記述することで、英数字はInter、それ以外はNoto Sans JPが適用されます
        fontFamily: "'Inter', 'Noto Sans JP', 'Yu Gothic Medium', 'YuGothic', sans-serif",
        fontWeight: 400
      }}
    >
      {/* <Header /> */}
      <FirstView />
      <Statement />
      <ProblemsAndSolutions />
      <DomesticWholesalers />
      <ServiceFlow />
      <FAQ />
      <CompanyInfo />
      {/* <Price /> */}
      <Contact />
      <Footer />
    </div>
  );
}

export default App;