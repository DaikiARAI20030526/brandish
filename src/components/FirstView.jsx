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
        // ランダム性を排除し、固定の並び順で生成
        // レーンごとに少し開始位置（画像インデックス）をずらすことで、
        // 全く同じ並びが横に並ばないように調整（見た目のバランス確保のため）
        const offsetIndex = laneIndex % productImages.length;
        
        // ループ用のベース配列を作成
        // 4つの画像を順番に並べる構成を基本とする
        const baseImages = [
            ...productImages.slice(offsetIndex),
            ...productImages.slice(0, offsetIndex)
        ];

        // 縦に十分な高さを確保するために繰り返す
        for (let i = 0; i < 4; i++) { 
          const itemsWithStyle = baseImages.map(img => ({
            src: img,
            offsetX: 0, // ランダムな横ズレを削除（中央揃え）
            gap: 60     // ランダムな間隔を削除（固定値）
          }));
          items = [...items, ...itemsWithStyle];
        }

        return {
          id: laneIndex,
          // 無限スクロール用に配列を複製
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
          /* 113s から 60s に変更 */
          animation: flowDown 60s linear infinite; 
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
                    // レーンごとの開始タイミングのズレも固定化（あるいは削除）する場合はここを調整
                    // 今回は「特定の配置」として、レーンごとの進行ズレは残しつつ画像順序を固定しました
                    animationDelay: `${lane.id * -10}s` 
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
                        // opacity-100 -> opacity-60 に変更（透過処理）
                        className="w-[300px] md:w-[420px] h-auto object-contain opacity-60 drop-shadow-lg" 
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
          
          {/* タイトル: text-[18px] -> text-[28px] (約1.5倍)
            mdサイズは元のまま維持
          */}
          <h1 className="text-[28px] md:text-[22px] font-bold text-gray-900 text-center leading-[1.6] md:leading-[1.8] whitespace-pre-wrap pointer-events-auto">
            <StaticText text={titleText} />
          </h1>

          {/* ロゴコンテナ: w-[200px] -> w-[300px] (1.5倍)
            mdサイズは元のまま維持
          */}
          <div className="w-[300px] md:w-[350px] flex items-center justify-center pointer-events-auto my-4 md:my-0">
            <img 
              src={logoImage} 
              alt="MY BRANDISH" 
              className="w-full h-auto object-contain" 
            />
          </div>

          {/* サブテキスト: text-[14px] -> text-[22px] (約1.5倍)
            mdサイズは元のまま維持
          */}
          <p className="text-[22px] md:text-[16px] text-gray-600 text-center font-medium pointer-events-auto">
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