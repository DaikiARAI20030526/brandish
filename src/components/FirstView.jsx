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
  
  // 角度管理 (SP: 25度, PC: 45度)
  const [rotationAngle, setRotationAngle] = useState(25);

  // 画像リスト
  const productImages = useMemo(() => [
    liquidBottleImage,
    cupNoodleImage,
    jarImage,
    chipsImage
  ], []);

  // レーン管理
  const [lanes, setLanes] = useState([]);

  useEffect(() => {
    const updateLayout = () => {
      const isMobile = window.innerWidth < 768;
      
      setRotationAngle(isMobile ? 25 : 45);

      const laneCount = isMobile ? 2 : 6; 
      
      const newLanes = Array.from({ length: laneCount }).map((_, laneIndex) => {
        let items = [];
        for (let i = 0; i < 4; i++) { 
          const shuffledImages = [...productImages].sort(() => 0.5 - Math.random());
          
          const itemsWithStyle = shuffledImages.map(img => ({
            src: img,
            offsetX: Math.floor(Math.random() * 40) - 20, 
            gap: Math.floor(Math.random() * 60) + 40 
          }));
          items = [...items, ...itemsWithStyle];
        }

        return {
          id: laneIndex,
          items: [...items, ...items],
        };
      });
      setLanes(newLanes);
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);

  }, [productImages]);

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
          animation: flowDown 113s linear infinite; 
        }
      `}</style>

      {/* ■ FVエリア */}
      <section className="relative h-[90vh] w-full bg-white overflow-hidden">

        {/* 背景アニメーションレイヤー */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-1/2 left-1/2 w-[200vw] h-[200vh] flex justify-center gap-0 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translate(-50%, -50%) rotate(${rotationAngle}deg)`, 
            }}
          >
            {lanes.map((lane) => (
              <div key={lane.id} className="flex-1 px-2 relative">
                <div 
                  className="animate-flow-unified flex flex-col items-center w-full"
                  style={{
                    animationDelay: `${lane.id * -15}s`
                  }}
                >
                  {lane.items.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="w-full flex justify-center"
                      style={{
                        paddingBottom: `${item.gap}px`,
                        transform: `translateX(${item.offsetX}%)`
                      }}
                    >
                      <img 
                        src={item.src} 
                        alt="" 
                        className="w-[300px] md:w-[420px] h-auto object-contain opacity-100 drop-shadow-lg" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* コンテンツレイヤー */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-start pt-4 px-4 pointer-events-none">
          
          <h1 className="text-[18px] md:text-[22px] font-bold text-gray-900 text-center leading-[1.8] whitespace-pre-wrap pointer-events-auto">
            <StaticText text={titleText} />
          </h1>

          <div className="w-[200px] md:w-[350px] flex items-center justify-center pointer-events-auto">
            <img 
              src={logoImage} 
              alt="MY BRANDISH" 
              className="w-full h-auto object-contain" 
            />
          </div>

          <p className="text-[14px] md:text-[16px] text-gray-600 text-center font-medium pointer-events-auto">
            <StaticText text={subText} />
          </p>

        </div>
      </section>

      {/* ■ Headerエリア */}
      {/* 修正点:
         - backdrop-blur-sm: ボカシを薄めに
         - pl-2: 左paddingを0.5remに
      */}
      <header className="sticky top-0 z-50 h-[10vh] min-h-[60px] w-full flex items-center pl-2 pr-4 md:px-8 transition-all duration-300 bg-white/60 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none">
        
        {/* 修正点:
           - left-2: 左位置を0.5remに
        */}
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