import React, { useState, useEffect, useMemo } from 'react';

import logoImage from '../assets/YK_ロゴ仮.png';
import logoheaderImage from '../assets/YK_ロゴ仮2.png';
import liquidBottleImage from '../assets/YK_DS.png';
import cupNoodleImage from '../assets/YK_KM.png';
import jarImage from '../assets/YK_BN.png';
import chipsImage from '../assets/YK_PC.png';

const FirstView = () => {
  const titleText = "あなたの\"うまい\"が、全国の食卓へ\n食の挑戦を、仕組みで支える";
  const subText = "Produce　by　YOKOYAMA";
  const [isSticky, setIsSticky] = useState(false);
  
  // 画像リスト
  const productImages = useMemo(() => [
    liquidBottleImage,
    cupNoodleImage,
    jarImage,
    chipsImage
  ], []);

  // ■ 高速化対応: 
  // 画面サイズ判定(useEffect)を待たずに、PC用とSP用のレーンデータを事前に作成しておく。
  // これにより表示のラグを極限まで減らします。

  // レーン生成関数
  const generateLanes = (count, images) => {
    return Array.from({ length: count }).map((_, laneIndex) => {
      let items = [];
      const offsetIndex = laneIndex % images.length;
      
      const baseImages = [
          ...images.slice(offsetIndex),
          ...images.slice(0, offsetIndex)
      ];

      for (let i = 0; i < 4; i++) { 
        const itemsWithStyle = baseImages.map(img => ({
          src: img,
          offsetX: 0, 
          gap: 60
        }));
        items = [...items, ...itemsWithStyle];
      }

      return {
        id: laneIndex,
        items: [...items, ...items],
      };
    });
  };

  // SP用レーン（2本）
  const spLanes = useMemo(() => generateLanes(2, productImages), [productImages]);
  // PC用レーン（6本）
  const pcLanes = useMemo(() => generateLanes(6, productImages), [productImages]);

  // スクロール検知
  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.9;
      setIsSticky(window.scrollY >= threshold);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = window.innerHeight * 0.1; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const StaticText = ({ text, className }) => (
    <span className={`inline-block ${className}`}>
      {text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index !== text.split('\n').length - 1 && <br />}
        </React.Fragment>
      ))}
    </span>
  );

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        
        @keyframes flowDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0%); }
        }
        
        .animate-flow-unified {
          /* 60s -> 62s (2秒遅く) */
          animation: flowDown 62s linear infinite; 
        }
      `}</style>

      {/* ■ FVエリア */}
      <section className="relative h-[90vh] w-full bg-white overflow-hidden">

        {/* 背景アニメーションレイヤー */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          
          {/* 【高速化のポイント】
            SP用とPC用をCSSの display (md:hidden / md:flex) で出し分けます。
            JSの計算待ちが発生しないため、読み込み直後から表示されます。
          */}

          {/* === SP用レイアウト (md:hidden) === */}
          {/* 回転: 25度, 画像幅: 160px (見切れ対策) */}
          <div 
            className="absolute top-1/2 left-1/2 w-[200vw] h-[200vh] flex md:hidden justify-center gap-0"
            style={{ transform: `translate(-50%, -50%) rotate(25deg)` }}
          >
            {spLanes.map((lane) => (
              <div key={lane.id} className="flex-1 px-1 relative">
                <div 
                  className="animate-flow-unified flex flex-col items-center w-full"
                  style={{ animationDelay: `${lane.id * -10}s` }}
                >
                  {lane.items.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="w-full flex justify-center"
                      style={{ paddingBottom: `${item.gap}px` }}
                    >
                      <img 
                        src={item.src} 
                        alt="" 
                        // SPサイズ: w-[160px] (見切れ防止のため縮小)
                        className="w-[160px] h-auto object-contain opacity-60 drop-shadow-lg" 
                        loading="eager" // 画像を優先読み込み
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* === PC用レイアウト (hidden md:flex) === */}
          {/* 回転: 45度, 画像幅: 420px */}
          <div 
            className="absolute top-1/2 left-1/2 w-[200vw] h-[200vh] hidden md:flex justify-center gap-0"
            style={{ transform: `translate(-50%, -50%) rotate(45deg)` }}
          >
            {pcLanes.map((lane) => (
              <div key={lane.id} className="flex-1 px-2 relative">
                <div 
                  className="animate-flow-unified flex flex-col items-center w-full"
                  style={{ animationDelay: `${lane.id * -10}s` }}
                >
                  {lane.items.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="w-full flex justify-center"
                      style={{ paddingBottom: `${item.gap}px` }}
                    >
                      <img 
                        src={item.src} 
                        alt="" 
                        className="w-[420px] h-auto object-contain opacity-60 drop-shadow-lg" 
                        loading="eager"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* コンテンツレイヤー */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-start pt-10 px-4 pointer-events-none">
          
          {/* タイトル: 
              前回SP: text-[28px] -> 今回: text-[22px] (約1.25倍縮小)
              PC: text-[22px] (維持)
          */}
          <h1 className="text-[22px] md:text-[22px] font-bold text-gray-900 text-center leading-[1.6] md:leading-[1.8] whitespace-pre-wrap pointer-events-auto">
            <StaticText text={titleText} />
          </h1>

          <div className="w-[300px] md:w-[350px] flex items-center justify-center pointer-events-auto my-4 md:my-0">
            <img 
              src={logoImage} 
              alt="MY BRANDISH" 
              className="w-full h-auto object-contain" 
            />
          </div>

          {/* サブテキスト: 
              前回SP: text-[22px] -> 今回: text-[18px] (約1.25倍縮小)
              PC: text-[16px] (維持)
          */}
          <p className="text-[18px] md:text-[16px] text-gray-600 text-center font-medium pointer-events-auto">
            <StaticText text={subText} />
          </p>

        </div>
      </section>

      {/* ■ Headerエリア */}
      <header className="sticky top-0 z-50 h-[10vh] min-h-[60px] w-full flex items-center pl-2 pr-4 md:px-8 transition-all duration-300 bg-white/60 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none">
        
        <div className="absolute left-2 md:left-1/2 transform md:-translate-x-1/2 flex justify-start md:justify-center w-auto md:w-full pointer-events-none">
          {isSticky && (
            <img 
              src={logoheaderImage} 
              alt="Logo" 
              className="w-[50px] h-[50px] object-contain animate-fade-in-up" 
            />
          )}
        </div>

        <div className="ml-auto flex items-center gap-6 text-[11px] font-bold text-gray-800 z-10 cursor-pointer">
          <button onClick={() => scrollToSection('mybrandish')} className="hover:text-amber-500 transition-colors">
            MyBrandishとは？
          </button>
          <button onClick={() => scrollToSection('service')} className="hover:text-amber-500 transition-colors">
            サービス内容について
          </button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-amber-500 transition-colors">
            お問合せ
          </button>
        </div>
      </header>
    </>
  );
};

export default FirstView;