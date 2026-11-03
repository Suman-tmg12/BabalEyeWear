import React from 'react';
import { useNavigate } from 'react-router-dom';

function PowerBanner() {
  const navigate = useNavigate();

  return (
    <div className="mb-10 mt-8 flex w-full justify-center px-4 sm:mt-[50px]">
      <div className="flex w-full max-w-[1200px] flex-col items-center justify-between gap-4 rounded-3xl border border-gray-200 bg-white px-4 py-4 shadow-lg shadow-black/10 transition-shadow duration-300 hover:shadow-xl sm:h-20 sm:flex-row sm:gap-10 sm:rounded-full sm:px-2 sm:py-0">
        <div className="flex items-center justify-center gap-4 p-2 text-center sm:ml-4 sm:gap-6 sm:text-left">
          <span className="material-symbols-outlined shrink-0" aria-hidden="true">
            eyeglasses_2
          </span>
          <span>
            <p className="text-xs font-semibold tracking-tight text-[#187A6B]">
              GIVE YOUR FRAMES A VISION UPGRADE
            </p>
            <p className="text-sm sm:text-base">Premium Power Lenses Designed for Every Frame</p>
          </span>
        </div>

        <button
          type="button"
          onClick={() => navigate('/search')}
          aria-label="Find your perfect lenses"
          className="group flex h-[50px] w-full cursor-pointer items-center justify-between rounded-full border border-gray-400 bg-white pl-[20px] pr-[7px] text-left transition-colors duration-300 hover:bg-[#187A6B] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#187A6B] focus-visible:ring-offset-2 sm:h-[55px] sm:w-[250px] sm:pl-[25px]"
        >
          <span className="text-sm font-medium">Find Your Perfect Lenses</span>

          <span
            aria-hidden="true"
            className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-[#187A6B] text-white transition-all duration-300 ease-in-out group-hover:h-[38px] group-hover:w-[38px] group-hover:bg-white group-hover:text-[#187A6B] sm:h-[35px] sm:w-[35px] sm:group-hover:h-[40px] sm:group-hover:w-[40px]"
          >
            <span className="material-symbols-outlined">arrow_right_alt</span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default PowerBanner;