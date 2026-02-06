import React, { useState, useEffect } from 'react';

// 【重要】ファイル名の再確認をお願いします
import logoImage from '../assets/YK_ロゴ仮.png';
import logoheaderImage from '../assets/YK_ロゴ仮2.png';
import liquidBottleImage from '../assets/YK_DS.png';
import cupNoodleImage from '../assets/YK_KM.png';
import jarImage from '../assets/YK_BN.png';
import chipsImage from '../assets/YK_PC.png';

// ■ 高速化設定: コンポーネント外で静的にデータを定義
const IMAGES = [
  liquidBottleImage,
  cupNoodleImage,
  jarImage,
  chipsImage
];

// レーン生成ロジック
const generateLaneData = (laneCount) => {
  return Array.from({ length: laneCount }).map((_, laneIndex) => {
    const offset = laneIndex % IMAGES.length;
    const rotatedImages = [...IMAGES.slice(offset), ...IMAGES.slice(0, offset)];
    
    let items = [];
    for (let i = 0; i < 4; i++) {
      items = [...items, ...rotatedImages];
    }

    return {
      id: laneIndex,
      items: [...items, ...items], 
    };
  });
};

const DATA_SP = generateLaneData(2);
const DATA_PC = generateLaneData(6);

const FirstView = () => {
  const titleText = "あなたの\"うまい\"が、全国の食卓へ\n食の挑戦を、仕組みで支える";
  const subText = "Produce　by　YOKOYAMA";
  const [isSticky, setIsSticky] = useState(false);

  // スクロール検知
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const threshold = window.innerHeight * 0.9;
        setIsSticky(window.scrollY >= threshold);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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
        /* GPU強制使用のための最適化 */
        .hardware-accelerated {
          transform: translateZ(0);
          will-change: transform;
        }

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
          animation: flowDown 62s linear infinite;
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>

      {/* ■ FVエリア */}
      <section className="relative h-[90dvh] w-full bg-white overflow-hidden">

        {/* 背景アニメーションレイヤー */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          
          {/* === SP用レイアウト === */}
          <div 
            className="absolute top-1/2 left-1/2 w-[200vw] h-[200vh] flex md:hidden justify-center gap-0 hardware-accelerated"
            style={{ transform: `translate(-50%, -50%) rotate(25deg)` }}
          >
            {DATA_SP.map((lane) => (
              <div key={lane.id} className="flex-1 px-1 relative h-full">
                <div 
                  className="animate-flow-unified flex flex-col items-center w-full hardware-accelerated"
                  style={{ animationDelay: `${lane.id * -15}s` }}
                >
                  {lane.items.map((src, idx) => (
                    <div 
                      key={idx} 
                      className="w-full flex justify-center flex-shrink-0"
                      style={{ paddingBottom: '60px' }}
                    >
                      <img 
                        src={src} 
                        alt="" 
                        className="w-[280px] h-auto object-contain opacity-60 drop-shadow-lg" 
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* === PC用レイアウト === */}
          <div 
            className="absolute top-1/2 left-1/2 w-[200vw] h-[200vh] hidden md:flex justify-center gap-0 hardware-accelerated"
            style={{ transform: `translate(-50%, -50%) rotate(45deg)` }}
          >
            {DATA_PC.map((lane) => (
              <div key={lane.id} className="flex-1 px-2 relative h-full">
                <div 
                  className="animate-flow-unified flex flex-col items-center w-full hardware-accelerated"
                  style={{ animationDelay: `${lane.id * -10}s` }}
                >
                  {lane.items.map((src, idx) => (
                    <div 
                      key={idx} 
                      className="w-full flex justify-center flex-shrink-0"
                      style={{ paddingBottom: '60px' }}
                    >
                      <img 
                        src={src} 
                        alt="" 
                        className="w-[420px] h-auto object-contain opacity-60 drop-shadow-lg" 
                        loading="eager"
                        decoding="async"
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
          
          <h1 className="text-[22px] md:text-[22px] font-bold text-gray-900 text-center leading-[1.6] md:leading-[1.8] whitespace-pre-wrap pointer-events-auto hardware-accelerated">
            <StaticText text={titleText} />
          </h1>

          <div className="w-[300px] md:w-[350px] flex items-center justify-center pointer-events-auto my-4 md:my-0 hardware-accelerated">
            <img 
              src={logoImage} 
              alt="MY BRANDISH" 
              className="w-full h-auto object-contain"
              loading="eager" 
            />
          </div>

          <p className="text-[18px] md:text-[16px] text-gray-600 text-center font-medium pointer-events-auto hardware-accelerated">
            <StaticText text={subText} />
          </p>

        </div>
      </section>

      {/* ■ Headerエリア */}
      <header className="sticky top-0 z-50 h-[10dvh] min-h-[60px] w-full flex items-center pl-2 pr-4 md:px-8 transition-all duration-300 bg-white/60 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none">
        
        <div className="absolute left-2 md:left-1/2 transform md:-translate-x-1/2 flex justify-start md:justify-center w-auto md:w-full pointer-events-none">
          {isSticky && (
            <img 
              src={logoheaderImage} 
              alt="Logo" 
              className="w-[50px] h-[50px] object-contain animate-fade-in-up" 
            />
          )}
        </div>

        {/* ■ 修正箇所: ナビゲーションメニュー
           - text-[11px] (SP) / md:text-[22px] (PC: 2倍に拡大)
           - gap-6 (SP) / md:gap-10 (PC: 間隔を少し広げる)
        */}
        <div className="ml-auto flex items-center gap-6 md:gap-10 text-[11px] md:text-[22px] font-bold text-gray-800 z-10 cursor-pointer">
          <button onClick={() => scrollToSection('mybrandish')} className="hover:text-amber-500 transition-colors">
            MyBrandishとは？
          </button>
          <button onClick={() => scrollToSection('service')} className="hover:text-amber-500 transition-colors">
            サービス内容について
          </button>
          
          {/* ■ 修正箇所: お問合せボタンの装飾
             - 黄色背景(#FFD014), 丸角, パディング追加
             - テキストは黒
          */}
          <button onClick={() => scrollToSection('contact')}>
            <span className="inline-block bg-[#FFD014] text-black rounded-full py-2 px-6 transition hover:bg-[#e6bb12]">
              お問合せ
            </span>
          </button>
        </div>
      </header>
    </>
  );
};

export default FirstView;