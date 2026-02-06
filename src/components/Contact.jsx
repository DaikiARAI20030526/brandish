import React from 'react';

const Contact = () => {
  // テキストサイズ設定 (SP: 14px / PC: 17px)
  const labelStyle = "block text-sm md:text-[17px] font-medium mb-2";
  const inputStyle = "w-full px-4 py-3 border border-[#FFD014] rounded-lg text-sm md:text-[17px] focus:ring-2 focus:ring-[#FFD014] focus:border-transparent outline-none";
  const checkboxLabelStyle = "text-sm md:text-[17px]";

  // カスタムチェックボックスコンポーネント
  const CustomCheckbox = () => (
    <div className="relative flex items-center justify-center w-5 h-5 mr-2">
      <input 
        type="checkbox" 
        className="peer appearance-none w-5 h-5 border border-[#FFD014] rounded bg-white checked:bg-[#FFD014] cursor-pointer transition-colors"
      />
      <svg 
        className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  );

  return (
    <section id="contact" className="pb-20 pt-0 bg-white">
      
      <div className="px-4 md:pl-32 md:pr-8">
        
        {/* ■ 修正: マージンをレスポンシブ対応に変更 (mb-12 -> mb-8 md:mb-12) */}
        <h2 className="text-left mb-8 md:mb-12">
          <span className="inline-block bg-[#FFD014] text-black rounded-full py-[9px] px-[25px] text-[24px] font-bold max-[530px]:text-[18px]">
            お問い合わせ
          </span>
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className={labelStyle}>法人名/組織名</label>
            <input 
              type="text" 
              className={inputStyle}
            />
          </div>

          <div className="flex gap-4 flex-wrap">
            <label className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
              <CustomCheckbox />
              <span className={checkboxLabelStyle}>話が聞きたい</span>
            </label>
            <label className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
              <CustomCheckbox />
              <span className={checkboxLabelStyle}>見積もりをしたい</span>
            </label>
            <label className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
              <CustomCheckbox />
              <span className={checkboxLabelStyle}>資料請求をしたい</span>
            </label>
          </div>

          <div>
            <label className={labelStyle}>氏名</label>
            <input 
              type="text" 
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>電話番号</label>
            <input 
              type="tel" 
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>メールアドレス</label>
            <input 
              type="email" 
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>お問い合わせ内容</label>
            <textarea 
              rows={6}
              className={`${inputStyle} resize-none`}
            ></textarea>
          </div>

          <div className="text-center pt-0">
            <button 
              onClick={() => {
                alert('フォームが送信されました（デモ版）');
              }}
              className="px-12 py-4 bg-[#FFD014] text-gray-900 font-bold rounded-full transition transform hover:-translate-y-0.5 text-sm md:text-[17px]"
            >
              送信
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;