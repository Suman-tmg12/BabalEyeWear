import React from 'react';

import frames1 from "../assets/Frames_Pic/cateye.png";
import frames2 from "../assets/Frames_Pic/Clubmaster.png";
import frames3 from "../assets/Frames_Pic/Round.png";
import frames4 from "../assets/Frames_Pic/Squares.png";
import frames5 from "../assets/Frames_Pic/Squares.png";

function FrameShape() {
  const frames = [
    { image: frames1, name: "Cat Eye" },
    { image: frames2, name: "Clubmaster" },
    { image: frames3, name: "Round" },
    { image: frames4, name: "Square" },
    { image: frames5, name: "EyeGlasses" },
  ];

  return (
    <>
         <div className="text-center text-[18px] sm:text-[22px] mt-10">
        FIND YOUR STYLE
      </div>
      <div className="text-center text-[28px] sm:text-[36px] font-bold mb-8">
        SHOP BY FRAME SHAPE
      </div>
      <div className="max-w-[1200px] mx-auto px-4 flex justify-center">
        <div className="grid grid-cols-2 gap-2 sm:gap-4 justify-items-center w-full max-w-[460px]">
          {frames.slice(0, 2).map((frame, index) => (
            <div
              key={index}
              className="flex flex-col items-center group cursor-pointer p-3 xs:p-5 rounded-2xl transition-all duration-300 w-full max-w-[220px]"
            >
              <div className="w-[110px] h-[110px] xs:w-[140px] xs:h-[140px] sm:w-[170px] sm:h-[170px] flex items-center justify-center overflow-hidden">
                <img
                  src={frame.image}
                  alt={frame.name}
                  loading="lazy"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <p className="mt-[-15px] xs:mt-[-25px] text-center text-sm xs:text-base sm:text-lg">
                {frame.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 mb-16 flex justify-center">
        <div className="grid grid-cols-3 gap-2 xs:gap-4 sm:gap-8 md:gap-16 lg:gap-24 justify-items-center w-full max-w-[600px]">
          {frames.slice(2, 5).map((frame, index) => (
            <div
              key={index}
              className="flex flex-col items-center group cursor-pointer p-2 xs:p-3 sm:p-5 rounded-2xl transition-all duration-300 w-full max-w-[220px]"
            >
              <div className="w-[90px] h-[90px] xs:w-[110px] xs:h-[110px] sm:w-[140px] sm:h-[140px] lg:w-[170px] lg:h-[170px] flex items-center justify-center overflow-hidden">
                <img
                  src={frame.image}
                  alt={frame.name}
                  loading="lazy"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <p className="mt-[-10px] xs:mt-[-15px] sm:mt-[-25px] text-center text-xs xs:text-sm sm:text-base lg:text-lg">
                {frame.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FrameShape;