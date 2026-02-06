import React, { useEffect, useRef, useState } from 'react';

// itemsをコンポーネント外に定義して再レンダリング時の参照変更を防ぐ
const items = [
  {
    problem: "自分のブランドを作ってみたいけど、何から始めれば良いか分からない",
    solution: "仕組み化されたサポートで、スタートダッシュを誰でも気軽に"
  },
  {
    problem: "作っても売り先がない/流通先を持っていない",
    solution: "全国の小売/コンビニ/ドラッグストアとの販路ネットワーク"
  },
  {
    problem: "自分の世界観を活かし信頼できるパートナーと形にしたい",
    solution: "自社食品メーカー機能によるスピード開発体制"
  }
];

const ProblemsAndSolutions = () => {
  const [pcScrollProgress, setPcScrollProgress] = useState(0);
  const [mobileItemProgress, setMobileItemProgress] = useState([0, 0, 0]);
  const [isMobile, setIsMobile] = useState(false);
  
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);

  // 画面サイズ監視
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 530);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // スクロールハンドラ
  useEffect(() => {
    const handleScroll = () => {
      // --- SP (530px以下) のロジック ---
      if (isMobile) {
        const newProgresses = items.map((_, i) => {
          const el = itemRefs.current[i];
          if (!el) return 0;
          
          const rect = el.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          const start = windowHeight * 0.50;
          const end = windowHeight * 0.27; 
          
          let p = (start - rect.top) / (start - end);
          return Math.min(Math.max(p, 0), 1);
        });

        setMobileItemProgress(prev => {
          const isDifferent = newProgresses.some((val, idx) => val !== prev[idx]);
          return isDifferent ? newProgresses : prev;
        });
      } 
      // --- PC (530px超) のロジック ---
      else {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionHeight = sectionRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

        if (rect.top <= 0 && rect.bottom >= windowHeight) {
          const progress = Math.abs(rect.top) / (sectionHeight - windowHeight);
          setPcScrollProgress(Math.min(Math.max(progress, 0), 1));
        } else if (rect.top > 0) {
          setPcScrollProgress(0);
        } else if (rect.bottom < windowHeight) {
          setPcScrollProgress(1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初期実行
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const getProgress = (index) => {
    if (isMobile) {
      const p = mobileItemProgress[index] || 0;
      return 1 - Math.pow(1 - p, 3);
    } else {
      const duration = 0.15; 
      const start = 0.15 + (index * 0.30);
      const end = start + duration;
      
      let p = (pcScrollProgress - start) / (end - start);
      p = Math.min(Math.max(p, 0), 1);
      return 1 - Math.pow(1 - p, 3);
    }
  };

  const isSolutionPhase = isMobile 
    ? (mobileItemProgress[0] > 0.1) 
    : (pcScrollProgress > 0.10);

  return (
    <section 
      ref={sectionRef} 
      className="relative" 
      // ■ 修正点1: PC版の高さを240vhに変更
      style={{ height: isMobile ? 'auto' : '240vh' }}
    >
      
      <div className={`
        w-full flex flex-col justify-start items-center
        ${isMobile ? 'relative pt-10' : 'sticky top-0 h-screen overflow-hidden'}
      `}>
        
        {/* タイトルエリア */}
        <div className={`
          w-full transition-all duration-500 z-10 
          ${isMobile 
            ? 'text-center mb-8' 
            : 'text-left pl-32 mt-[12vh]' 
          }
        `}>
          <h2 className={`font-semibold transition-all duration-700 ${isMobile ? 'text-[18px]' : 'text-[24px] h-[40px]'}`}>
            {isSolutionPhase ? (
               // ■ 修正点2: 背景色(#FFD014)、文字色(#FFF)、余白、角丸を追加
               <span className="inline-block bg-[#FFD014] text-white rounded-full py-[5px] px-[8px] animate-fade-in">
                 YOKOYAMAにお任せください
               </span>
            ) : (
               // ■ 修正点2: 同上
               <span className="inline-block bg-[#FFD014] text-white rounded-full py-[5px] px-[8px]">
                 こんなお悩みありませんか？
               </span>
            )}
          </h2>
        </div>

        {/* リストエリア */}
        <div className={`
          w-full flex flex-col justify-center 
          ${isMobile ? '' : 'mt-8'}
        `}>
          {items.map((item, idx) => {
            const progress = getProgress(idx);
            
            return (
              // 外側のWrapper
              <div 
                key={idx}
                ref={el => itemRefs.current[idx] = el}
                className={`
                  w-full relative flex items-stretch
                  ${isMobile ? 'h-auto' : 'h-[24vh]'}
                `}
                style={{
                  ...(isMobile ? { minHeight: '120px' } : {}),
                  borderTop: '0.3px solid #D9D9D9',
                  borderBottom: '0.3px solid #D9D9D9'
                }}
              >

                {/* 1. 左側：数字エリア */}
                <div className={`
                  flex-none flex items-center relative
                  ${isMobile 
                    ? 'w-[15vw] justify-center' 
                    : 'w-[15%] justify-start ml-32' 
                  }
                `}>
                  <span 
                    className={`absolute font-semibold text-[#D9D9D9] transition-opacity duration-0`}
                    style={{ 
                      fontSize: isMobile ? '24px' : '56px',
                      opacity: 1 - progress 
                    }}
                  >
                    {idx + 1}
                  </span>
                  
                  <span 
                    className={`absolute font-semibold text-black transition-opacity duration-0`}
                    style={{ 
                      fontSize: isMobile ? '24px' : '56px',
                      opacity: progress 
                    }}
                  >
                    {idx + 1}
                  </span>
                </div>

                {/* 2. 右側：コンテンツエリア */}
                <div className="flex-1 relative h-full overflow-hidden">
                  
                  <div className={`
                    w-full h-full relative
                    ${isMobile 
                      ? 'grid grid-cols-1 grid-rows-1' 
                      : 'flex items-center'
                    }
                  `}>

                    {/* --- 背景アニメーションレイヤー --- */}
                    <div
                      className={`
                        absolute inset-0 pointer-events-none flex items-center justify-end px-4 md:px-12
                        ${isMobile ? 'col-start-1 row-start-1 z-0' : ''}
                      `}
                      style={{
                        transform: `translateX(${100 - (progress * 100)}%)`, 
                        opacity: progress, 
                      }}
                    >
                    </div>

                    {/* --- Problem Text --- */}
                    <div 
                      className={`
                        transition-all duration-75 px-4 md:px-12
                        ${isMobile 
                          ? 'col-start-1 row-start-1 text-right relative z-10 flex items-center justify-end' 
                          : 'absolute right-0 w-full text-right'
                        }
                      `}
                      style={{
                        transform: `translateX(-${progress * 50}vw)`,
                        opacity: 1 - progress, 
                        color: '#D9D9D9'
                      }}
                    >
                      <p className={`font-semibold whitespace-pre-wrap ${isMobile ? 'text-[18px] leading-[35px] py-8' : 'text-[24px] leading-[47px]'}`}>
                        {item.problem}
                      </p>
                    </div>

                    {/* --- Solution Text & Checkmark --- */}
                    <div 
                      className={`
                        transition-all duration-75 px-4 md:px-12
                        ${isMobile 
                          ? 'col-start-1 row-start-1 flex justify-between items-center relative z-20' 
                          : 'absolute left-0 w-full text-left'
                        }
                      `}
                      style={{
                        transform: `translateX(${50 - (progress * 50)}px)`, 
                        opacity: progress, 
                        color: '#111827'
                      }}
                    >
                      <div className={`${isMobile ? 'flex-1 pr-4 py-8' : 'w-full'}`}>
                        <p className={`font-semibold whitespace-pre-wrap ${isMobile ? 'text-[18px] leading-[35px]' : 'text-[24px] leading-[47px]'}`}>
                          {item.solution}
                        </p>
                      </div>

                      {isMobile && (
                        <div className="flex-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path d="M5 13l4 4L19 7" /> 
                          </svg>
                        </div>
                      )}

                      {!isMobile && (
                        <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path d="M5 13l4 4L19 7" /> 
                          </svg>
                        </div>
                      )}
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProblemsAndSolutions;