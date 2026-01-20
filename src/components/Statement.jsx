import React from 'react';

const Statement = () => {
  return (
    // ■ 修正点: 
    // 1. PC版上下パディング: pt-[60px] pb-[80px] に変更
    // 2. 左右パディング: md:px-32 を追加して max-w-6xl 削除分の余白を確保
    <section className="pt-[60px] pb-[80px] max-[530px]:pt-[40px] max-[530px]:pb-[30px] px-4 md:px-32 bg-white">
      
      {/* ■ 修正点: max-w-6xl mx-auto を削除し、w-full に変更 */}
      <div className="w-full text-left">
        
        {/* SP版 gap-[2rem] は維持 */}
        <div className="flex flex-col gap-16 max-[530px]:gap-[2rem] text-left">
          
          {/* 上段のテキストブロック（太字） */}
          <div className="w-full">
            <p className="leading-relaxed font-bold text-[24px] max-[530px]:text-[18px]">
              私たちは、あなただけの食品ブランドを持つための「すべて」を提供するパートナーです。
            </p>
          </div>

          {/* 下段のテキストブロック（細字） */}
          <div className="w-full">
            <p className="text-[18px] max-[530px]:text-[14px] leading-[35px] max-[530px]:leading-[27px]">
              一時的なPR案件ではない、ファンに愛されリピートされる「食」という名の資産。企画、製造、物流、そしてコンビニやスーパーへの販路開拓まで。あなたのアイデアを日本中の食卓へ届けるインフラが、ここにあります。知識やリソースは不要です。必要なのはあなたの好きと熱意だけ。
            </p>
            
            <p className="text-gray-600 mt-8 text-[18px] max-[530px]:text-[14px]">
              MY BRANDISH with YOKOYAMA
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Statement;