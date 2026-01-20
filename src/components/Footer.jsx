import React from 'react';

const Footer = () => {
  return (
    // ■ 修正点:
    // - 背景色削除 (bg-gray-900 削除)
    // - border-top 0.3px #D9D9D9 追加
    // - text-white 削除
    // - text-left (左寄せ)
    <footer className="border-t-[0.3px] border-[#D9D9D9] py-8 px-4 text-left">
      {/* ■ 修正点: 
          - text-[10px]
          - text-[#D9D9D9]
      */}
      <p className="text-[10px] text-[#D9D9D9]">© 2025 MY BRANDISH YOKOYAMA</p>
    </footer>
  );
};

export default Footer;