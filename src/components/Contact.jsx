import React, { useState } from 'react';
// ロゴ画像をassetsフォルダから読み込む設定
import logo from '../assets/YK_ロゴ仮.png';

const Contact = () => {
  // ■ 1. クライアントのメールアドレス
  const CLIENT_EMAIL = "ayataka184519@gmail.com"; 
  const ENDPOINT = `https://formsubmit.co/ajax/${CLIENT_EMAIL}`;

  // 状態管理
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false); // モーダルの表示/非表示を管理

  // テキスト・入力欄のスタイル設定
  const labelStyle = "block text-sm md:text-[17px] font-medium mb-2";
  const inputStyle = "w-full px-4 py-3 border border-[#FFD014] rounded-lg text-sm md:text-[17px] focus:ring-2 focus:ring-[#FFD014] focus:border-transparent outline-none";
  const checkboxLabelStyle = "text-sm md:text-[17px]";

  // 送信処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // 送信成功したらフォームを空にして、モーダルを表示する
        e.target.reset();
        setShowModal(true);
      } else {
        alert("送信に失敗しました。時間をおいて再度お試しください。");
      }
    } catch (error) {
      console.error(error);
      alert("通信エラーが発生しました。");
    } finally {
      setIsSubmitting(false); // 送信完了（またはエラー）でボタンの無効化を解除
    }
  };

  // カスタムチェックボックス
  const CustomCheckbox = ({ name, value }) => (
    <div className="relative flex items-center justify-center w-5 h-5 mr-2">
      <input 
        type="checkbox" 
        name={name}
        value={value}
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
    <>
      {/* お問い合わせフォーム部分 */}
      <section id="contact" className="pb-20 pt-0 bg-white">
        <div className="px-4 md:pl-32 md:pr-8">
          <h2 className="text-left mb-8 md:mb-12">
            <span className="inline-block bg-[#FFD014] text-black rounded-full py-[9px] px-[25px] text-[24px] font-bold max-[530px]:text-[18px]">
              お問い合わせ
            </span>
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" name="_honey" style={{ display: 'none' }} />
            <input type="hidden" name="_subject" value="Webサイトから新しいお問い合わせがありました" />
            
            <div>
              <label className={labelStyle}>法人名/組織名</label>
              <input type="text" name="法人名" className={inputStyle} required />
            </div>

            <div className="flex gap-4 flex-wrap">
              <label className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
                <CustomCheckbox name="ご希望内容" value="話が聞きたい" />
                <span className={checkboxLabelStyle}>話が聞きたい</span>
              </label>
              <label className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
                <CustomCheckbox name="ご希望内容" value="見積もりをしたい" />
                <span className={checkboxLabelStyle}>見積もりをしたい</span>
              </label>
              <label className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
                <CustomCheckbox name="ご希望内容" value="資料請求をしたい" />
                <span className={checkboxLabelStyle}>資料請求をしたい</span>
              </label>
            </div>

            <div>
              <label className={labelStyle}>氏名</label>
              <input type="text" name="氏名" className={inputStyle} required />
            </div>

            <div>
              <label className={labelStyle}>電話番号</label>
              <input type="tel" name="電話番号" className={inputStyle} />
            </div>

            <div>
              <label className={labelStyle}>メールアドレス</label>
              <input type="email" name="email" className={inputStyle} required />
            </div>

            <div>
              <label className={labelStyle}>お問い合わせ内容</label>
              <textarea rows={6} name="お問い合わせ内容" className={`${inputStyle} resize-none`} required></textarea>
            </div>

            <div className="text-center pt-0">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="px-12 py-4 bg-[#FFD014] text-gray-900 font-bold rounded-full transition transform hover:-translate-y-0.5 text-sm md:text-[17px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '送信中...' : '送信'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 送信完了モーダル */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-xl shadow-2xl p-10 md:p-14 max-w-[600px] w-full text-center relative animate-fade-in-up">
            
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl leading-none"
              aria-label="閉じる"
            >
              &times;
            </button>

            <div className="space-y-3 text-[16px] md:text-[20px] font-medium tracking-wider text-gray-800 mb-12">
              <p>お問合せを承りました。</p>
              <p>後日担当者から返信いたします。</p>
              <p>引き続きよろしくお願いいたします。</p>
            </div>

            <div className="flex justify-center">
              {/* 読み込んだロゴ画像を適用 */}
              <img 
                src={logo} 
                alt="MY BRANDISH with YOKOYAMA" 
                className="h-24 md:h-32 object-contain"
              />
            </div>

            <button 
              onClick={() => setShowModal(false)}
              className="mt-10 px-8 py-2 border-2 border-gray-200 text-gray-500 rounded-full hover:bg-gray-50 transition-colors text-sm"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;