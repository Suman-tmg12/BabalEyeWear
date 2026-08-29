import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full bg-[#54B8A9] rounded-tl-[50px] sm:rounded-tl-[70px] lg:rounded-tl-[100px] mt-10 px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20 pt-10 sm:pt-14 lg:pt-16 pb-6">
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-10">
        {/* Brand */}
        <div className="max-w-md">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black">
            BabalEyeWear
          </h2>

          <p className="mt-2 text-sm sm:text-base lg:text-lg text-black">
            Clear Vision. Better Style.
          </p>
        </div>

        {/* Contact */}
        <div className="text-left md:text-right">
          <p className="text-sm sm:text-base lg:text-lg text-black break-words">
            +1 234 567 89 90 00
          </p>

          <p className="mt-2 text-sm sm:text-base lg:text-lg text-black break-all">
            info@form.com
          </p>
        </div>
      </div>

      <div className="border-t-2 border-black/30 mt-10 sm:mt-12 lg:mt-14"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 sm:gap-y-12 lg:gap-12 xl:gap-16 py-10 sm:py-12 lg:py-14">
        <div>
          <h3 className="text-lg sm:text-xl font-medium text-black mb-4 sm:mb-5">
            About us
          </h3>

          <p className="text-sm sm:text-base leading-6 text-black max-w-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec.
          </p>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-medium text-black mb-4 sm:mb-5">
            Open hours
          </h3>

          <div className="text-sm sm:text-base leading-6 text-black">
            <p>Monday: 8am - 5pm</p>
            <p>Tuesday-Friday: 11am - 6pm</p>
            <p>Saturday: 8:00am - 12pm</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-medium text-black mb-4 sm:mb-5">
            Address
          </h3>

          <p className="text-sm sm:text-base leading-6 text-black">
            Yellow brick road 111
            <br />
            Fantasy Land
            <br />
            Somewhere
          </p>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-medium text-black mb-4 sm:mb-5">
            Follow us
          </h3>

          <div className="flex flex-col gap-2 text-sm sm:text-base text-black">
            <a
              href="#"
              className="w-fit hover:underline transition-all duration-200"
            >
              Facebook
            </a>

            <a
              href="#"
              className="w-fit hover:underline transition-all duration-200"
            >
              Instagram
            </a>

            <a
              href="#"
              className="w-fit hover:underline transition-all duration-200"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-black/30"></div>

      <div className="relative flex flex-col md:flex-row items-center justify-center md:min-h-[70px] pt-6 md:pt-0 gap-4">
        {/* Copyright */}
        <p className="text-center text-sm sm:text-base lg:text-lg text-black">
          © 2026 BabalEyeWear. All Rights Reserved.
        </p>

        {/* Privacy / Terms */}
        <div className="flex items-center justify-center gap-6 sm:gap-8 md:absolute md:right-0">
          <a
            href="#"
            className="text-sm sm:text-base text-black hover:underline transition-all duration-200"
          >
            Privacy
          </a>

          <a
            href="#"
            className="text-sm sm:text-base text-black hover:underline transition-all duration-200"
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
