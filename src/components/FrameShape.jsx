import React from 'react';
import { Link } from 'react-router-dom';

import frames1 from "../assets/Frames_Pic/cateye.png";
import frames2 from "../assets/Frames_Pic/Clubmaster.png";
import frames3 from "../assets/Frames_Pic/Round.png";
import frames4 from "../assets/Frames_Pic/Squares.png";
import frames5 from "../assets/Frames_Pic/Squares.png";

// `filter` is what the search page filters by:
//   shape    -> one of: Round, Square, Aviator, Cat-Eye, Oval, Wayfarer
//   category -> one of: Eyeglasses, Sunglasses, Screen Glasses, Reading
const frames = [
  { image: frames1, name: "Cat Eye", filter: { shape: "Cat-Eye" } },
  { image: frames2, name: "Clubmaster", filter: { shape: "Wayfarer" } }, // closest shape in the catalog
  { image: frames3, name: "Round", filter: { shape: "Round" } },
  { image: frames4, name: "Square", filter: { shape: "Square" } },
  { image: frames5, name: "EyeGlasses", filter: { category: "Eyeglasses" } },
];

const searchUrl = (filter) => `/search?${new URLSearchParams(filter).toString()}`;

const cardFocus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#187A6B]";

function FrameShape() {
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
          {frames.slice(0, 2).map((frame) => (
            <Link
              key={frame.name}
              to={searchUrl(frame.filter)}
              aria-label={`Shop ${frame.name} frames`}
              className={`flex flex-col items-center group cursor-pointer p-3 xs:p-5 rounded-2xl transition-all duration-300 w-full max-w-[220px] ${cardFocus}`}
            >
              <div className="w-[110px] h-[110px] xs:w-[140px] xs:h-[140px] sm:w-[170px] sm:h-[170px] flex items-center justify-center overflow-hidden">
                <img
                  src={frame.image}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <p className="mt-[-15px] xs:mt-[-25px] text-center text-sm xs:text-base sm:text-lg group-hover:text-[#187A6B] transition-colors">
                {frame.name}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 mb-16 flex justify-center">
        <div className="grid grid-cols-3 gap-2 xs:gap-4 sm:gap-8 md:gap-16 lg:gap-24 justify-items-center w-full max-w-[600px]">
          {frames.slice(2, 5).map((frame) => (
            <Link
              key={frame.name}
              to={searchUrl(frame.filter)}
              aria-label={`Shop ${frame.name} frames`}
              className={`flex flex-col items-center group cursor-pointer p-2 xs:p-3 sm:p-5 rounded-2xl transition-all duration-300 w-full max-w-[220px] ${cardFocus}`}
            >
              <div className="w-[90px] h-[90px] xs:w-[110px] xs:h-[110px] sm:w-[140px] sm:h-[140px] lg:w-[170px] lg:h-[170px] flex items-center justify-center overflow-hidden">
                <img
                  src={frame.image}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <p className="mt-[-10px] xs:mt-[-15px] sm:mt-[-25px] text-center text-xs xs:text-sm sm:text-base lg:text-lg group-hover:text-[#187A6B] transition-colors">
                {frame.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default FrameShape;