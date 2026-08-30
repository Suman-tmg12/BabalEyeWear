import React from 'react'
import explore from "../assets/Explore.png";

function Explore() {
  return (
    <>
      <div className="text-center text-[18px] sm:text-[22px] mt-10 px-4">
            YOUR ONLINE EYEWEAR DESTINATION
          </div>
    
          <div className="text-center text-[28px] sm:text-[36px] md:text-[46px] font-bold mb-8 px-4">
            EXPLORE WIDE RANGE OF STYLES
          </div>
           <div className="w-full max-w-[1000px] mx-auto overflow-hidden rounded-br-[40px] sm:rounded-br-[60px] lg:rounded-br-[90px]">
        <img
          src={explore}
          alt="Explore IMAGE"
          className="
      w-full
      h-auto
      aspect-[16/9]
      object-cover
      transition-transform
      duration-300
      hover:scale-110
    "
        />
      </div>
    </>
  )
}

export default Explore
