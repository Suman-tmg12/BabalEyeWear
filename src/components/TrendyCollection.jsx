import React from 'react';
import { Link } from 'react-router-dom';

import trendy1 from "../assets/Trendy_Pic/trendy1.jpg";
import trendy2 from "../assets/Trendy_Pic/trendy2.jpg";
import trendy3 from "../assets/Trendy_Pic/trendy3.jpg";
import trendy4 from "../assets/Trendy_Pic/trendy4.jpg";

// `category` must match a category id on the Collection page: women, men, athlete or kids
const collections = [
  { img: trendy1, title: "Women Collection", subtitle: "20+ Frames", category: "women" },
  { img: trendy2, title: "Men Collection", subtitle: "15+ Frames", category: "men" },
  { img: trendy3, title: "Athlete Collection", subtitle: "Performance", category: "athlete" },
  { img: trendy4, title: "Kids Collection", subtitle: "Durable & Fun", category: "kids" },
];

const collectionUrl = (category) =>
  `/collection?${new URLSearchParams({ category }).toString()}`;

function TrendyCollection() {
  return (
    <>
      <div className="text-center text-[18px] sm:text-[22px] mt-10">
        TRENDY COLLECTIONS ON
      </div>
      <div className="text-center text-[28px] sm:text-[46px] font-bold mb-8">
        OUR CATEGORIES
      </div>

      <div className="max-w-[1200px] mx-auto px-4 my-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {collections.map((item) => (
            <Link
              key={item.category}
              to={collectionUrl(item.category)}
              aria-label={`Shop ${item.title}`}
              className="group relative block h-[360px] w-full overflow-hidden rounded-br-[60px] bg-gray-100 shadow-md transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#187A6B]"
            >
              {/* Background Image with Zoom */}
              <img
                src={item.img}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-80" />

              {/* Content Container */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end text-white">
                <span className="text-xs font-semibold tracking-wider text-[#187A6B] uppercase transform translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                  {item.subtitle}
                </span>
                <h3 className="text-xl font-bold mt-1 transform translate-y-1 transition-transform duration-300 group-hover:translate-y-0">
                  {item.title}
                </h3>

                {/* Action Link / Arrow */}
                <div className="flex items-center gap-2 mt-3 text-sm font-medium text-gray-300 opacity-0 transform translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0">
                  <span>Explore Now</span>
                  <span className="material-symbols-outlined text-sm transition-transform duration-300 group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default TrendyCollection;