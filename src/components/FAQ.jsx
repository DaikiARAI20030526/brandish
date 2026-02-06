import React from 'react';

const FAQ = () => {
  const faqs = [
    {
      q: '既に自社製品を持っているのですが、販促部分の支援だけ依頼することは可能ですか？',
      a: '可能です。どのようなお手伝いができるかは一度ご相談ください。'
    },
    {
      q: '製造できる食料品はどのようなものがありますか？',
      a: '基本的には全ての食料品に対応可能です。※アルコール類のみ一部対応不可の場合あり。'
    },
    {
      q: '料金について教えてください',
      a: '詳細をお伺いしてお見積を提出しますので、下記お問い合わせフォームよりお問い合わせください'
    }
  ];

  return (
    <section className="pb-20 pt-0 bg-white">
      
      {/* ■ 修正: 右マージンを削除してLineを画面右端まで伸ばす
          元: mx-4 (ml-4 mr-4) md:ml-32 md:mr-12
          新: ml-4 mr-0 md:ml-32 md:mr-0
      */}
      <div className="ml-4 mr-0 md:ml-32 md:mr-0">
        
        {/* ■ 修正: タイトル背景に黄色いオブジェクトを追加 */}
        <h2 className="text-left mb-6">
          <span className="inline-block bg-[#FFD014] text-black rounded-full py-[9px] px-[25px] text-xl md:text-[24px] font-bold">
            FAQ
          </span>
        </h2>
        
        <div className="space-y-8">
          {faqs.map((faq, idx) => (
            // ■ 修正: 
            // 1. border-gray-200 -> border-[#FFD014] (黄色に変更)
            // 2. pr-4 md:pr-12 を追加 (枠線は右端まで行くが、テキストには余白を持たせる)
            <div key={idx} className="border-b border-[#FFD014] pb-4 md:pb-6 flex flex-col gap-2 md:gap-0 pr-4 md:pr-12">
              <div className="text-sm md:text-[24px] md:leading-[47px] font-bold">
                Q. {faq.q}
              </div>
              <div className="text-sm md:text-[18px] md:leading-[35px] text-gray-600">
                A. {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;