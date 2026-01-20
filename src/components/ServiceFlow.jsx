import React, { useState } from 'react';
import mainImage from '../assets/YK_図.jpg';
// ■ 修正点: SP用の画像をインポート
import mainImageSP from '../assets/YK_SP.jpg';
import step1Image from '../assets/YK_図1.jpg';
import step2Image from '../assets/YK_図2.jpg';
import step3Image from '../assets/YK_図3.jpg';
import step4Image from '../assets/YK_図4.jpg';

const ServiceFlow = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const services = [
    {
      step: '0〜2ヶ月',
      title: '企画開発 & テイスティング',
      description: 'まずは初回ヒアリングで、あなたの世界観。こだわり、ファン層を徹底的に理解します。市場のトレンドを掛け合わせ、ブランドのコアとなるコンセプトと商品を決定。すぐに試作品を手配し、試食会を通じて「これだ！」という1本を追求します。',
      items: ['初回ヒアリング', '企画方針決定', '試食会実施'],
      image: step1Image
    },
    {
      step: '2〜4ヶ月',
      title: 'クリエイティブ＆法務チェック',
      description: 'ファンが「欲しい」と思えるパッケージデザインを制作します。同時に、食品表示法などの専門的な法務チェックをクリア。店舗で目を引くPOP（販促物）のデザインもこの段階で決定し、ブランドの「顔」を固めます。',
      items: ['パッケージデザイン作成', '表示法チェック', 'POP等販促物制作'],
      image: step2Image
    },
    {
      step: '4〜5ヶ月',
      title: '販売準備 & EC構築',
      description: 'ECサイトの出品準備（商品撮影・説明文作成）を進めます。また、ファンが商品をもっと楽しめるよう、アレンジレシピの開発なども並行して行い、ローンチに向けた「仕掛け」を準備します。',
      items: ['ロジ構築', 'EC出品準備', 'レシピ開発'],
      image: step3Image
    },
    {
      step: '6ヶ月',
      title: 'ブランド公開',
      description: 'ECサイトを公開し、いよいよ一般販売開始です。あなたの商品力を最大限に活かす戦略を実行し、初速をブーストします。その後は、データに基づき、EC、そして全国の小売りへと販路を拡大していきます。',
      items: ['一般告知開始', 'ECページ公開'],
      image: step4Image
    }
  ];

  return (
    <section id="service" className="pb-20 pt-0 px-4 bg-white">
      <div className="max-w-[1400px] mx-auto">
        
        <h2 className="text-[24px] font-bold text-left md:pl-[7rem] mb-4 max-[530px]:text-[18px]">
          サービス内容について
        </h2>
        
        <div className="w-full mb-10">
          {/* ■ 修正点: 画像の切り替え処理 */}
          <div className="mb-5">
            {/* PC版 (530px超で表示) */}
            <img 
              src={mainImage} 
              alt="サービスフロー全体図(PC)" 
              className="w-full h-auto block max-[530px]:hidden" 
            />
            {/* SP版 (530px以下で表示) */}
            <img 
              src={mainImageSP} 
              alt="サービスフロー全体図(SP)" 
              className="w-full h-auto hidden max-[530px]:block" 
            />
          </div>

          <p className="text-[18px] leading-relaxed text-left md:pl-[7rem] md:pr-6 pb-4 border-b-[0.3px] border-[#D9D9D9] break-all
            max-[530px]:text-[14px] max-[530px]:leading-[27px]">
            企画立案から、商品発売まで全てお任せください。売れる商品企画＆施策からブランド公開まで、最短6ヶ月。私たちは、あなたの情熱とスピード感に寄り添い、複雑なプロセスをシンプルにエスコートします。全体のスケジュールは、私たちが責任を持って進行管理します。
          </p>
        </div>

        <div className="text-[14px] font-bold text-left md:pl-[7rem] mb-6
          max-[530px]:text-[14px] max-[530px]:leading-[27px]">
          サービスフロー
        </div>

        <div className="w-full">
          {services.map((service, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="w-full border-b-[0.3px] border-[#D9D9D9]">
                
                <div 
                  onClick={() => toggleAccordion(idx)}
                  className="group w-full py-4 flex justify-between items-baseline cursor-pointer transition-colors duration-0"
                >
                  <div className={`
                    text-[14px] font-bold transition-colors duration-0
                    md:pl-[7rem] 
                    max-[530px]:text-[14px] max-[530px]:leading-[27px]
                    ${isOpen ? 'text-black' : 'text-[#D9D9D9] group-hover:text-black'}
                  `}>
                    {service.step}
                  </div>

                  <div className={`
                    text-[14px] font-bold transition-colors duration-0
                    text-right md:pr-6
                    max-[530px]:text-[14px] max-[530px]:leading-[27px]
                    ${isOpen ? 'text-black' : 'text-[#D9D9D9] group-hover:text-black'}
                  `}>
                    {service.title}
                  </div>
                </div>

                <div 
                  className={`
                    w-full overflow-hidden transition-all duration-500 ease-in-out
                    ${isOpen ? 'max-h-[1000px] opacity-100 pb-2 md:pb-12' : 'max-h-0 opacity-0'}
                  `}
                >
                  <div className="flex flex-col md:flex-row w-full items-start pt-2 md:pt-12">
                    
                    {/* テキストエリア */}
                    <div className="w-full md:w-[68%] flex flex-col justify-center md:pl-[32%] md:pr-16 px-0">
                      
                      <p className="text-[16px] leading-[31px] text-gray-700 text-justify mb-6 md:mb-8
                        max-[530px]:text-[14px] max-[530px]:leading-[27px]">
                        {service.description}
                      </p>

                      <ul className="text-[16px] leading-[31px] space-y-2 list-none text-gray-700 text-left
                        max-[530px]:text-[14px] max-[530px]:leading-[27px]">
                        {service.items.map((item, i) => (
                          <li key={i}>・ {item}</li>
                        ))}
                      </ul>
                    </div>

                    {/* 画像エリア */}
                    <div className="w-full md:w-[32%] flex justify-center md:justify-end md:pr-6 mt-0">
                      <div className="w-[300px] h-[300px] bg-[#D9D9D9] flex items-center justify-center">
                         <img 
                           src={service.image} 
                           alt={`${service.title}のイメージ`} 
                           className="w-full h-full object-cover" 
                         />
                      </div>
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

export default ServiceFlow;