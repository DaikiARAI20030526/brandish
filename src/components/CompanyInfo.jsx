import React from 'react';

const CompanyInfo = () => {
  const companyData = [
    { label: '名称', value: '株式会社YOKOYAMA' },
    { label: '所在地', value: '〒169-0051 東京都新宿区西早稲田3-1-6-402' },
    { label: '設立', value: '2022年1月11日' },
    { label: '事業内容', value: '食品の卸売業、加工食品の企画販売' },
    { label: '資本金', value: '30,000,000円' },
    { label: '主要取引先', value: '三菱食品株式会社/三井物産株式会社/国分グループ本社株式会社/加藤産業株式会社' },
    { label: '取引先銀行', value: 'みずほ銀行、西武信用金庫、GMOあおぞらネット銀行' }
  ];

  return (
    // ■ 修正点: 背景無色(bg-white), padding-top削除(pt-0)
    <section className="pb-20 pt-0 bg-white">
      
      {/* ■ 修正点: PC版 padding-left 8rem(pl-32), padding-right 2rem(pr-8) */}
      <div className="px-4 md:pl-32 md:pr-8">
        
        {/* ■ 修正点: 
            - 絵文字削除
            - 左寄せ (text-left)
            - 24px / leading-[47px]
        */}
        <h2 className="text-xl md:text-[24px] md:leading-[47px] font-bold text-left mb-12">
          会社情報
        </h2>
        
        <div className="space-y-6 text-sm">
          {companyData.map((item, idx) => (
            <div key={idx} className="flex border-b border-gray-200 pb-4 justify-between items-center">
              {/* ラベル: 14px / leading-[27px] */}
              <div className="w-40 font-medium flex-shrink-0 leading-[27px]">
                {item.label}
              </div>
              
              {/* 値: 14px / leading-[27px] */}
              <div className="flex-1 text-right leading-[27px]">
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