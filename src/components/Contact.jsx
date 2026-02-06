import React from 'react';

const Contact = () => {
  // 共通スタイル定義
  // テキストサイズを text-sm(14px) -> text-[17px] (約1.2倍) に変更
  const labelStyle = "block text-[17px] font-medium mb-2";
  // 枠線をグレーから黄色(#FFD014)に変更。フォーカス時のリングも黄色に統一。
  const inputStyle = "w-full px-4 py-3 border border-[#FFD014] rounded-lg text-[17px] focus:ring-2 focus:ring-[#FFD014] focus:border-transparent outline-none";
  const checkboxLabelStyle = "text-[17px]";

  return (
    <section id="contact" className="pb-20 pt-0 bg-white">
      
      <div className="px-4 md:pl-32 md:pr-8">
        
        {/* ■ 修正: タイトル背景に黄色いオブジェクトを追加 */}
        <h2 className="text-left mb-12">
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
            <label className="flex items-center">
              {/* チェックボックスのアクセントカラーも黄色に設定 */}
              <input type="checkbox" className="mr-2 accent-[#FFD014]" />
              <span className={checkboxLabelStyle}>話が聞きたい</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 accent-[#FFD014]" />
              <span className={checkboxLabelStyle}>見積もりをしたい</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 accent-[#FFD014]" />
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
            {/* ■ 修正: 送信ボタンのデザイン変更（枠線なし、黄色背景） */}
            <button 
              onClick={() => {
                alert('フォームが送信されました（デモ版）');
              }}
              className="px-12 py-4 bg-[#FFD014] text-gray-900 font-bold rounded-full transition transform hover:-translate-y-0.5"
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