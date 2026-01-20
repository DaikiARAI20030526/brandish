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
      
      {/* PC版: ml-32 (8rem), mr-12 (3rem) */}
      <div className="mx-4 md:ml-32 md:mr-12">
        
        <h2 className="text-xl md:text-[24px] font-bold text-left mb-6">
          FAQ
        </h2>
        
        <div className="space-y-8">
          {faqs.map((faq, idx) => (
            // ■ 修正点: 
            // 1. pb-4 (1rem) [PCはmd:pb-6で維持]
            // 2. flex flex-col gap-2 (0.5rem) [PCはmd:gap-0で維持]
            <div key={idx} className="border-b border-gray-200 pb-4 md:pb-6 flex flex-col gap-2 md:gap-0">
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