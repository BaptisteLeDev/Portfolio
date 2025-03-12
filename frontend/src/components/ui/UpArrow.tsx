import React from 'react';

const UpArrow: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-[50px] right-[50px] hover:outline-none hover:ring-3 hover:ring-amber-50 rounded-full w-[50px] h-[50px] flex items-center justify-center"
      aria-label="Scroll to top"
    >
      <div
        dangerouslySetInnerHTML={{
          __html: `<svg id="73:79" layer-name="arrow-up" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" class="up-arrow"> <circle cx="25" cy="25" r="23" fill="#1E1F1D" stroke="#8B72BE" stroke-width="4"></circle> <path d="M25 49L25 14" stroke="#8B72BE" stroke-width="4" stroke-linecap="square" stroke-linejoin="round"></path> <path d="M18 24.3015L25 12.5739L32 24.3015" stroke="#8B72BE" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> </svg>`,
        }}
      />
    </button>
  );
};

export default UpArrow;