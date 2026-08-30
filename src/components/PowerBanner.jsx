import React from 'react'


function PowerBanner() {
  return (
         <div className="w-full flex justify-center px-4 mt-8 sm:mt-[50px] mb-10">
        <div
          className="w-full max-w-[1200px] bg-white rounded-3xl sm:rounded-full
                     flex flex-col sm:flex-row gap-4 sm:gap-10 items-center justify-between
                     border border-gray-200 px-4 sm:px-2 py-4 sm:py-0 sm:h-20
                     shadow-black/10 shadow-lg transition-shadow duration-300 hover:shadow-xl"
        >
          <div className="flex gap-4 sm:gap-6 p-2 sm:ml-4 items-center justify-center text-center sm:text-left">
            <span className="material-symbols-outlined shrink-0">
              eyeglasses_2
            </span>
            <span>
              <p className="text-[#187A6B] text-xs tracking-tight font-semibold">
                GIVE YOUR FRAMES A VISION UPGRADE
              </p>
              <p className="text-sm sm:text-base">
                Premium Power Lenses Designed for Every Frame
              </p>
            </span>
          </div>

          <div
            className="group h-[50px] sm:h-[55px] rounded-full border border-gray-400 bg-white
                       w-full sm:w-[250px] flex items-center justify-between pl-[20px] sm:pl-[25px] pr-[7px]
                       cursor-pointer transition-colors duration-300 hover:bg-[#187A6B] hover:text-white"
          >
            <div className="text-sm font-medium">Find Your Perfect Lenses</div>

            <div
              className="bg-[#187A6B] rounded-full h-[32px] w-[32px] sm:h-[35px] sm:w-[35px]
                         flex items-center justify-center text-white shrink-0
                         group-hover:bg-white group-hover:text-[#187A6B]
                         group-hover:h-[38px] group-hover:w-[38px] sm:group-hover:h-[40px] sm:group-hover:w-[40px]
                         transition-all duration-300 ease-in-out"
            >
              <span className="material-symbols-outlined">arrow_right_alt</span>
            </div>
          </div>
        </div>
      </div>
  )
}

export default PowerBanner
