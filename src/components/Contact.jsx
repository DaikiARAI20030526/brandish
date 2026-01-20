import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="pb-20 pt-0 bg-white">
      
      {/* PC版: pl-32 (8rem), pr-8 (2rem) / SP版: px-4 */}
      <div className="px-4 md:pl-32 md:pr-8">
        
        {/* ■ 修正点: SP版 text-[18px] を追加 */}
        <h2 className="text-[24px] font-bold text-left mb-12 max-[530px]:text-[18px]">
          お問い合わせ
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">法人名/組織名</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="flex gap-4 flex-wrap">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">話が聞きたい</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">見積もりをしたい</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">資料請求をしたい</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">氏名</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">電話番号</label>
            <input 
              type="tel" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">メールアドレス</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">お問い合わせ内容</label>
            <textarea 
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none"
            ></textarea>
          </div>

          <div className="text-center pt-0">
            <button 
              onClick={() => {
                alert('フォームが送信されました（デモ版）');
              }}
              className="px-12 py-4 bg-white text-gray-900 font-bold rounded-full border-[0.25px] border-black hover:bg-gray-50 transition transform hover:-translate-y-0.5"
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