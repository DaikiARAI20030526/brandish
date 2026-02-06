import React, { useState, useEffect } from 'react';

// PC用画像
import logoImage from '../assets/YK_ロゴ仮.png';
import logoheaderImage from '../assets/YK_ロゴ仮2.png';
import liquidBottleImage from '../assets/YK_DS.png';
import cupNoodleImage from '../assets/YK_KM.png';
import jarImage from '../assets/YK_BN.png';
import chipsImage from '../assets/YK_PC.png';

// SP用画像
import liquidBottleImageSP from '../assets/YK_DS_SP.png';
import cupNoodleImageSP from '../assets/YK_KM_SP.png';
import jarImageSP from '../assets/YK_BN_SP.png';
import chipsImageSP from '../assets/YK_PC_SP.png';

const IMAGES_PC = [
  liquidBottleImage,
  cupNoodleImage,
  jarImage,
  chipsImage
];

const IMAGES_SP = [
  liquidBottleImageSP,
  cupNoodleImageSP,
  jarImageSP,
  chipsImageSP
];

// レーン生成ロジック
const generateLaneData = (laneCount, sourceImages, repeatCount = 4) => {
  return Array.from({ length: laneCount }).map((_, laneIndex) => {
    let currentImages = [...sourceImages];
    
    // 2列目（奇数レーン）は逆順にする
    if (laneIndex % 2 !== 0) {
      currentImages.reverse();
    }

    const offset = laneIndex % currentImages.length;
    const rotatedImages = [...currentImages.slice(offset), ...currentImages.slice(0, offset)];
    
    let items = [];
    for (let i = 0; i < repeatCount; i++) {
      items = [...items, ...rotatedImages];
    }

    return {
      id: laneIndex,
      items: [...items, ...items], 
    };
  });
};

// SP版データ生成
const DATA_SP = generateLaneData(2, IMAGES_SP, 3); 
const DATA_PC = generateLaneData(6, IMAGES_PC, 4);

const FirstView = () => {
  const titleText = "あなたの\"うまい\"が、全国の食卓へ\n食の挑戦を、仕組みで支える";
  const subText = "Produce　by　YOKOYAMA";
  const [isSticky, setIsSticky] = useState(false);

  // 画像プリロード
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      IMAGES_SP.forEach((src) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    } else {
      IMAGES_PC.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }

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
        .force-gpu {
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
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
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
        }
      `}</style>

      {/* ■ FVエリア */}
      <section className="relative h-[90dvh] w-full bg-white overflow-hidden">

        {/* 背景アニメーションレイヤー */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          
          {/* === SP用レイアウト === */}
          <div 
            className="absolute top-1/2 left-1/2 w-[200vw] h-[200vh] flex md:hidden justify-center gap-0 force-gpu"
            style={{ transform: `translate(-50%, -50%) rotate(25deg)` }}
          >
            {DATA_SP.map((lane) => (
              <div key={lane.id} className="flex-1 px-1 relative h-full">
                <div 
                  className="animate-flow-unified flex flex-col items-center w-full force-gpu"
                  style={{ 
                    animationDelay: `${lane.id * -15}s`,
                    // ■ 修正: 速度を1.25倍減速 (20s * 1.25 = 25s)
                    animationDuration: '35s'
                  }}
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
                        className="w-[220px] h-auto object-contain opacity-60 drop-shadow-lg force-gpu" 
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* === PC用レイアウト === */}
          <div 
            className="absolute top-1/2 left-1/2 w-[200vw] h-[200vh] hidden md:flex justify-center gap-0 force-gpu"
            style={{ transform: `translate(-50%, -50%) rotate(45deg)` }}
          >
            {DATA_PC.map((lane) => (
              <div key={lane.id} className="flex-1 px-2 relative h-full">
                <div 
                  className="animate-flow-unified flex flex-col items-center w-full force-gpu"
                  style={{ animationDelay: `${lane.id * -20}s` }}
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
                        className="w-[420px] h-auto object-contain opacity-60 drop-shadow-lg force-gpu" 
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
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
          
          <h1 className="text-[22px] md:text-[22px] font-bold text-gray-900 text-center leading-[1.6] md:leading-[1.8] whitespace-pre-wrap pointer-events-auto">
            <StaticText text={titleText} />
          </h1>

          <div className="w-[300px] md:w-[350px] flex items-center justify-center pointer-events-auto my-4 md:my-0">
            <img 
              src={logoImage} 
              alt="MY BRANDISH" 
              className="w-full h-auto object-contain"
              loading="eager" 
              fetchPriority="high"
            />
          </div>

          <p className="text-[18px] md:text-[16px] text-gray-600 text-center font-medium pointer-events-auto">
            <StaticText text={subText} />
          </p>

        </div>
      </section>

      {/* ■ Headerエリア */}
      <header className="sticky top-0 z-50 h-[10dvh] min-h-[60px] w-full flex items-center pl-2 pr-4 md:px-8 transition-all duration-300 bg-white/60 backdrop-blur-sm">
        
        <div className="absolute left-2 md:left-8 flex items-center justify-start pointer-events-none">
          {isSticky && (
            <img 
              src={logoheaderImage} 
              alt="Logo" 
              className="w-[50px] h-[50px] object-contain animate-fade-in-up" 
            />
          )}
        </div>

        <div className="ml-auto flex items-center gap-4 md:gap-[50px] text-[9.5px] md:text-[17px] font-bold text-gray-800 z-10 cursor-pointer">
          <button onClick={() => scrollToSection('statement')} className="hover:text-amber-500 transition-colors">
            MyBrandishとは？
          </button>
          <button onClick={() => scrollToSection('service')} className="hover:text-amber-500 transition-colors">
            サービス内容について
          </button>
          
          <button onClick={() => scrollToSection('contact')}>
            <span className="inline-block bg-[#FFD014] text-black rounded-full py-2 px-[22px] md:px-6 transition hover:bg-[#e6bb12]">
              お問い合わせ
            </span>
          </button>
        </div>
      </header>
    </>
  );
};

export default FirstView;