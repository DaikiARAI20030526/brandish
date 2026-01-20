import React from 'react';

const Header = () => {
  return (
    // 背景色(bg-white/95, backdrop-blur-sm)と影(shadow-sm)を削除
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">Y</span>
          </div>
          <span className="ml-3 text-lg font-bold">MY BRANDISHとは？</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#service" className="text-sm hover:text-amber-600 transition">サービス内容について</a>
          <a href="#contact" className="text-sm hover:text-amber-600 transition">お問合せ</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;