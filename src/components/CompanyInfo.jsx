import React from 'react';

const CompanyInfo = () => {
  const companyData = [
    { label: '名称', value: '株式会社YOKOYAMA' },
    { 
      label: '所在地', 
      value: (
        <>
          〒169-0051 東京都新宿区<br />
          西早稲田3-1-6-402
        </>
      )
    },
    { label: '設立', value: '2022年1月11日' },
    { label: '事業内容', value: '食品の卸売業、加工食品の企画販売' },
    { label: '資本金', value: '30,000,000円' },
    { 
      label: '主要取引先', 
      // ■ 修正: whitespace-nowrapを追加し、単語途中での改行を完全に禁止
      value: (
        <>
          <span className="inline-block whitespace-nowrap">三菱食品株式会社/</span>
          <span className="inline-block whitespace-nowrap">三井物産株式会社/</span>
          <span className="inline-block whitespace-nowrap">国分グループ本社株式会社/</span>
          <span className="inline-block whitespace-nowrap">加藤産業株式会社</span>
        </>
      )
    },
    { 
      label: '取引先銀行', 
      // ■ 修正: 取引先銀行も同様に span + whitespace-nowrap で分割
      value: (
        <>
          <span className="inline-block whitespace-nowrap">みずほ銀行/</span>
          <span className="inline-block whitespace-nowrap">西武信用金庫/</span>
          <span className="inline-block whitespace-nowrap">GMOあおぞらネット銀行</span>
        </>
      ) 
    }
  ];

  return (
    <section className="pb-20 pt-0 bg-white">
      
      <div className="px-4 md:pl-32 md:pr-8">
        
        <h2 className="text-left mb-8">
          <span className="inline-block bg-[#FFD014] text-black rounded-full py-[9px] px-[25px] text-xl md:text-[24px] md:leading-[47px] font-bold">
            会社情報
          </span>
        </h2>
        
        <div className="space-y-6">
          {companyData.map((item, idx) => (
            <div key={idx} className="flex border-b border-[#FFD014] pb-4 justify-between items-center">
              
              <div className="w-40 font-medium flex-shrink-0 text-[17px] leading-[32px]">
                {item.label}
              </div>
              
              <div className="flex-1 text-right text-[17px] leading-[32px]">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;