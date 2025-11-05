import React from 'react';

interface FooterProps {
  goBack: () => void;
}

const Footer: React.FC<FooterProps> = ({ goBack }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 w-full p-4 z-10 flex justify-center items-center pointer-events-none">
      <div className="bg-gray-200/20 dark:bg-black/30 backdrop-blur-xl rounded-full shadow-lg pointer-events-auto">
        <button
          onClick={goBack}
          className="p-4 text-gray-800 dark:text-white hover:bg-gray-500/20 dark:hover:bg-white/20 rounded-full transition-colors duration-200"
          aria-label="Quay lại"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
