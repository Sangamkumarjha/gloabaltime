import React from 'react';

const LinkCard = ({ title, link, onCopy }) => {
  return (
    <div className="bg-[#146c7b] rounded-lg p-4 sm:p-10 md:p-4 px-24 md:px-24 text-white w-full max-w-md mx-auto">
      <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-2">{title}</h3>
      <p className="text-white text-xs sm:text-sm md:text-base mb-3 break-all">{link}</p>
      <button
        onClick={() => onCopy(link)}
        className="bg-white text-[#146c7b] py-1 px-4 sm:px-6 rounded-md hover:bg-gray-200 transition-colors w-full sm:w-auto"
      >
        Copy Link
      </button>
    </div>
  );
};

export default LinkCard;