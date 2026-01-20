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

      // アニメーション開始位置: 画面の50%
      const threshold = window.innerHeight * 0.50; 
      const newActiveIndices = new Set();

      cardRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();

        // カードの上辺(rect.top)が、画面の50%ライン(threshold)を通過したらアクティブ化
        if (rect.top <= threshold) {
          newActiveIndices.add(index);
        }
      });

      // 状態に変更がある場合のみ更新
      setActiveIndices(prev => {
        if (prev.size !== newActiveIndices.size) return newActiveIndices;
        for (let idx of newActiveIndices) {
          if (!prev.has(idx)) return newActiveIndices;
        }
        return prev;
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // リサイズ時も判定
    
    // 初回実行
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    // SP版 pt-[4rem]
    <section className="pb-20 pt-32 max-[530px]:pt-[4rem] bg-white w-full">
      
      <div className="w-full text-left pl-32 max-[530px]:pl-[20px]">
        
        {/* SP版 mb-[2rem] */}
        <h2 className="text-[24px] font-bold mb-12 max-[530px]:mb-[2rem] inline-block
          max-[530px]:text-[18px] max-[530px]:font-semibold 
          max-[530px]:p-0
          border-none px-0 py-0
          ">
          国内提案先例
        </h2>

      </div>

      {/* カードリスト */}
      <div className="flex flex-col w-full text-left">
        {cards.map((card, index) => {
          const isScrollActive = activeIndices.has(index);

          // ■ 追加: インデックスごとに個別のスタイル（位置・回転・サイズ）を定義
          let imageStyleClass = "";
          switch (index) {
            case 0: // SUPER MARKET -> BN (瓶)
              // 指示: 右に100px、下に20px移動
              imageStyleClass = "translate-x-[100px] translate-y-[20px]";
              break;
            case 1: // DRUG STORE -> DS (ボトル)
              // 指示: 70°傾け、より大きく (scale-125)
              imageStyleClass = "rotate-[70deg] scale-125";
              break;
            case 2: // CONVENIENCE STORE -> KM (カップ麺)
              // 指示: 右に100px、下に20px移動
            
              imageStyleClass = "translate-x-[200px] translate-y-[40px]";
              break;
            case 3: // GAME CENTER -> PC (ポテチ)
              // 指示: 右に50px移動、斜め45°、見切れないようにサイズ調整 (scale-90)
              imageStyleClass = "translate-x-[250px] rotate-[2deg] scale-90";
              break;
            default:
              imageStyleClass = "";
          }

          return (
            <div 
              key={index}
              ref={el => cardRefs.current[index] = el}
              // SP版 h-[255px]
              className="group relative w-full h-[450px] max-[530px]:h-[255px] overflow-hidden cursor-pointer"
              style={{
                borderTop: '1.5px solid #d1d5db',
                borderBottom: '1.5px solid #d1d5db',
                marginTop: index !== 0 ? '-1.5px' : '0'
              }}
            >
              
              {/* ■ 1. 裏面（詳細レイヤー） */}
              <div 
                className="absolute inset-0 text-gray-900 z-10 p-6 max-[530px]:p-4"
              >
                {/* ■ 修正点: 画像配置エリア
                    - lg:flex: PC版のみ表示
                    - inset-0 items-center justify-center: 中央配置
                    - z-0: テキストの下層に配置
                */}
                <div className="absolute hidden lg:flex inset-0 items-center justify-center pointer-events-none z-0">
                  <img 
                    src={cardBgImages[index]} 
                    alt="" 
                    // ■ 修正点: 画像スタイル
                    // - max-h-[90%] max-w-[90%]: ベースサイズ制限
                    // - object-contain: アスペクト比維持
                    // - transform: 個別のスタイル(imageStyleClass)を適用
                    className={`max-h-[90%] max-w-[90%] object-contain transform ${imageStyleClass}`} 
                  />
                </div>

                {/* --- テキスト要素（前面に表示させるため z-10 を付与） --- */}
                
                {/* --- 参考例 --- */}
                <p className="absolute transform -translate-x-1/2 font-bold opacity-90 z-10
                  left-1/2 top-4 text-[12px] 
                  max-[530px]:top-4 max-[530px]:text-[10px] max-[530px]:leading-[19px]"
                >
                  {card.detailTitle}
                </p>
                
                {/* --- タイトル (SUPER MARKET等) --- */}
                <h4 className="absolute font-bold leading-tight z-10
                  right-8 top-12 text-right text-[24px] w-1/2
                  max-[530px]:right-auto max-[530px]:top-[2.5rem] max-[530px]:left-1/2 max-[530px]:-translate-x-1/2 
                  max-[530px]:text-[18px] max-[530px]:leading-[18px] max-[530px]:w-full max-[530px]:text-center"
                >
                  {card.title}
                </h4>

                {/* --- Group A & B --- */}
                <div className="absolute text-left flex flex-col gap-10 z-10
                  bottom-8 left-32
                  max-[530px]:bottom-4 max-[530px]:left-4 max-[530px]:gap-3"
                >
                  <div className="max-[530px]:block">
                    <p className="font-bold mb-2 text-[24px] 
                      max-[530px]:mb-1 max-[530px]:text-[18px] max-[530px]:leading-[18px]">
                      {card.groupA.name}
                    </p>
                    <p className="text-[18px] 
                      max-[530px]:text-[14px] max-[530px]:leading-[27px]">
                      {card.groupA.count}
                    </p>
                  </div>
                  
                  <div className="max-[530px]:block">
                    <p className="font-bold mb-2 text-[24px] 
                      max-[530px]:mb-1 max-[530px]:text-[18px] max-[530px]:leading-[18px]">
                      {card.groupB.name}
                    </p>
                    <p className="text-[18px] 
                      max-[530px]:text-[14px] max-[530px]:leading-[27px]">
                      {card.groupB.count}
                    </p>
                  </div>
                </div>

                {/* --- Group C (Total) --- */}
                <div className="absolute text-right z-10
                  bottom-8 right-8
                  max-[530px]:bottom-4 max-[530px]:right-4"
                >
                  <p className="font-bold mb-2 text-[24px] 
                    max-[530px]:mb-1 max-[530px]:text-[18px] max-[530px]:leading-[18px]">
                    {card.total.name}
                  </p>
                  <p className="text-[18px] 
                    max-[530px]:text-[14px] max-[530px]:leading-[27px]">
                    {card.total.count}
                  </p>
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
                {/* シャッターテキスト */}
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