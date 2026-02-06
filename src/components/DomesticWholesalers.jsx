import React, { useEffect, useRef, useState } from 'react';

// 画像のインポート
import imageBN from '../assets/YK_BN.png';
import imageDS from '../assets/YK_DS.png';
import imageKM from '../assets/YK_KM.png';
import imagePC from '../assets/YK_PC.png';

const DomesticWholesalers = () => {
  // スクロール連動用のState
  const [activeIndices, setActiveIndices] = useState(new Set());
  const cardRefs = useRef([]);

  // カードに対応する画像の配列 (上から順に BN, DS, KM, PC)
  const cardBgImages = [imageBN, imageDS, imageKM, imagePC];

  // カードデータ
  const cards = [
    {
      title: "SUPER MARKET",
      detailTitle: "参考例",
      groupA: { name: "イオンリテール", count: "約3500店舗" },
      groupB: { name: "ドン・キホーテ系列", count: "約1000店舗" },
      total: { name: "国内総店舗", count: "23000店舗" },
    },
    {
      title: "DRUG STORE",
      detailTitle: "参考例",
      groupA: { name: "マツキヨココカラ", count: "約3400店舗" },
      groupB: { name: "ウエルシアHD", count: "約2800店舗" },
      total: { name: "国内総店舗", count: "22000店舗" },
    },
    {
      title: "CONVENIENCE STORE",
      detailTitle: "参考例",
      groupA: { name: "セブンイレブン", count: "約21000店舗" },
      groupB: { name: "ファミリーマート", count: "約16000店舗" },
      total: { name: "国内総店舗", count: "57000店舗" },
    },
    {
      title: "GAME CENTER",
      detailTitle: "参考例",
      groupA: { name: "バンダイナムコ", count: "約250店舗" },
      groupB: { name: "GiGO", count: "約200店舗" },
      total: { name: "国内総店舗", count: "4000店舗" },
    }
  ];

  // スクロール監視エフェクト
  useEffect(() => {
    const handleScroll = () => {
      // 530px以下の場合のみ処理を実行
      if (window.innerWidth > 530) return;

      const threshold = window.innerHeight * 0.50; 
      const newActiveIndices = new Set();

      cardRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();

        if (rect.top <= threshold) {
          newActiveIndices.add(index);
        }
      });

      setActiveIndices(prev => {
        if (prev.size !== newActiveIndices.size) return newActiveIndices;
        for (let idx of newActiveIndices) {
          if (!prev.has(idx)) return newActiveIndices;
        }
        return prev;
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section className="pb-20 pt-32 max-[530px]:pt-[4rem] bg-white w-full">
      
      <div className="w-full text-left pl-32 max-[530px]:pl-[20px]">
        <h2 className="mb-12 max-[530px]:mb-[2rem]">
          <span className="inline-block bg-[#FFD014] text-black rounded-full py-[9px] px-[25px] text-[24px] font-bold max-[530px]:text-[18px]">
            国内提案先例
          </span>
        </h2>
      </div>

      {/* カードリスト */}
      <div className="flex flex-col w-full text-left">
        {cards.map((card, index) => {
          const isScrollActive = activeIndices.has(index);

          // 画像の個別スタイル調整
          let imageStyleClass = "";
          switch (index) {
            case 0: // BN (瓶)
              imageStyleClass = "translate-x-[20px] translate-y-[10px]";
              break;
            case 1: // DS (ボトル)
              imageStyleClass = "rotate-[70deg] scale-110";
              break;
            case 2: // KM (カップ麺)
              imageStyleClass = "translate-x-[30px] translate-y-[15px] rotate-[-10deg]";
              break;
            case 3: // PC (ポテチ)
              imageStyleClass = "rotate-[15deg] scale-95";
              break;
            default:
              imageStyleClass = "";
          }

          // ■ 修正: 画像サイズのレスポンシブ定義
          // PC版 (lg:) は以前のサイズを維持
          const pcImageSizeClass = index === 1 
            ? "lg:max-h-[112%] lg:max-w-[112%]" 
            : "lg:max-h-[80%] lg:max-w-[80%]";

          // SP版は指定通り縮小 (通常: ~1.3倍小, ボトル: ~1.5倍小)
          const spImageSizeClass = index === 1
            ? "max-h-[75%] max-w-[75%]" // ボトル (112% / 1.5 ≈ 75%)
            : "max-h-[62%] max-w-[62%]"; // 通常 (80% / 1.3 ≈ 62%)

          // クラスを結合
          const finalImageSizeClass = `${spImageSizeClass} ${pcImageSizeClass}`;


          return (
            <div 
              key={index}
              ref={el => cardRefs.current[index] = el}
              className="group relative w-full h-[450px] max-[530px]:h-[255px] overflow-hidden cursor-pointer"
              style={{
                borderTop: '1.5px solid #d1d5db',
                borderBottom: '1.5px solid #d1d5db',
                marginTop: index !== 0 ? '-1.5px' : '0'
              }}
            >
              
              {/* ■ 1. 裏面（詳細レイヤー） */}
              <div className="absolute inset-0 text-gray-900 z-10 p-6 max-[530px]:p-4">
                
                {/* 画像表示 (SP/PC共通化) */}
                <div className="absolute flex inset-0 items-center justify-center pl-[30%] pointer-events-none z-0">
                  <img 
                    src={cardBgImages[index]} 
                    alt="" 
                    // ■ 修正: レスポンシブ対応したサイズクラスを適用
                    className={`${finalImageSizeClass} object-contain transform transition-transform duration-500 ${imageStyleClass}`} 
                  />
                </div>

                {/* --- テキスト要素 (SP版テキストサイズ修正) --- */}
                
                {/* 1. Detail Title */}
                <p className="absolute font-bold opacity-90 z-10
                  left-32 top-12 text-[12px] 
                  max-[530px]:left-4 max-[530px]:top-4 max-[530px]:transform-none max-[530px]:text-[10px] max-[530px]:leading-[19px]"
                >
                  {card.detailTitle}
                </p>
                
                {/* 2. Title */}
                {/* ■ 修正: SP版テキストサイズを3px拡大 (18px -> 21px) */}
                <h4 className="absolute font-bold leading-tight z-10
                  left-32 top-20 text-left text-[26px]
                  max-[530px]:left-4 max-[530px]:top-10 max-[530px]:transform-none 
                  max-[530px]:text-[21px] max-[530px]:leading-[24px] max-[530px]:w-auto max-[530px]:text-left"
                >
                  {card.title}
                </h4>

                {/* 3. Total */}
                {/* ■ 修正: SP版の店舗名サイズを2px縮小 (18px -> 16px) */}
                <div className="absolute z-10
                  left-32 top-32 text-left
                  max-[530px]:left-4 max-[530px]:top-20 max-[530px]:bottom-auto max-[530px]:right-auto max-[530px]:text-left"
                >
                  <p className="font-bold mb-2 text-[24px] 
                    max-[530px]:mb-1 max-[530px]:text-[16px] max-[530px]:leading-[19px]">
                    {card.total.name}
                  </p>
                  <p className="text-[18px] 
                    max-[530px]:text-[14px] max-[530px]:leading-[27px]">
                    {card.total.count}
                  </p>
                </div>

                {/* 4. Group A & B */}
                {/* ■ 修正: SP版のテキストサイズを約1.2倍縮小
                    店名: 15px -> 13px
                    店舗数: 12px -> 10px
                */}
                <div className="absolute text-left flex flex-col gap-4 z-10
                  left-32 bottom-12
                  max-[530px]:bottom-4 max-[530px]:left-4 max-[530px]:gap-3"
                >
                  <div className="max-[530px]:block">
                    <p className="font-bold mb-2 text-[20px] 
                      max-[530px]:mb-1 max-[530px]:text-[13px] max-[530px]:leading-[16px]">
                      {card.groupA.name}
                    </p>
                    <p className="text-[15px] 
                      max-[530px]:text-[10px] max-[530px]:leading-[14px]">
                      {card.groupA.count}
                    </p>
                  </div>
                  
                  <div className="max-[530px]:block">
                    <p className="font-bold mb-2 text-[20px] 
                      max-[530px]:mb-1 max-[530px]:text-[13px] max-[530px]:leading-[16px]">
                      {card.groupB.name}
                    </p>
                    <p className="text-[15px] 
                      max-[530px]:text-[10px] max-[530px]:leading-[14px]">
                      {card.groupB.count}
                    </p>
                  </div>
                </div>

              </div>

              {/* ■ 2. 前面（シャッターレイヤー） */}
              <div 
                className={`absolute inset-0 bg-[#FFFFFB] z-20 flex items-center justify-center transition-transform duration-[1200ms] ease-in-out
                  ${isScrollActive ? '-translate-y-full' : 'group-hover:-translate-y-full'}
                `}
                style={{
                  backgroundImage: 'linear-gradient(to bottom, #d1d5db 1px, transparent 1px)',
                  backgroundSize: '100% 113px',
                  backgroundPosition: 'top center'
                }}
              >
                <h3 className="text-[32px] md:text-[60px] font-semibold tracking-wide text-gray-900 text-center uppercase px-4 max-[530px]:text-[24px]">
                  {card.title}
                </h3>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};

export default DomesticWholesalers;