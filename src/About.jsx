import React from 'react';

function About() {
  return (
    <section className="py-16 px-6 md:px-16 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Content Area */}
        <div className="flex-1 space-y-6">
          <div>
            <span className="text-blue-900 font-bold uppercase tracking-wider text-4xl">
              About Us
            </span>
            <h2 className="text-3xl md:text-xl font-bold text-gray-900 mt-2">
              Clear Vision <br /> Better Life
            </h2>
          </div>

          <p className="text-gray-600 text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>

          <p className="text-gray-600 text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
          </p>

          {/* Feature Checkmarks List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {[
              "Premium Quality",
              "Stylish & Modern Design",
              "Customer Satisfaction",
              "Trusted & Reliable"
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full border border-green-600 flex items-center justify-center text-green-600">
                  ✓
                </div>
                <span className="text-gray-800 font-medium text-sm">{item}</span>
              </div>
            ))}
          </div>

          {/* Learn More Button */}
          <div className="pt-4">
            <button className="bg-[#0b2b6c] cursor-pointer hover:bg-blue-950 text-white font-medium px-8 py-3 rounded-full transition duration-300 shadow-md">
              LEARN MORE
            </button>
          </div>
        </div>

        {/* Right Image Placeholder Area */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none">
          <div className="w-full h-[400px] md:h-[450px] bg-gray-300 rounded-3xl shadow-inner"></div>
        </div>

      </div>
    </section>
  );
}

export default About;