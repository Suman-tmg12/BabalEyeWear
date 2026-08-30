import React from 'react';

function Company() {
  return (
    <section className="py-16 px-6 md:px-16 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
          
          {/* Left Text & Features Area */}
          <div className="flex-1 space-y-6">
            <div>
              <span className="text-blue-900 font-bold uppercase tracking-wider text-4xl">
                Our Company
              </span>
              <h2 className="text-3xl md:text-xl font-extrabold text-gray-900 mt-2">
                Driven by Purpose <br /> Focused on You
              </h2>
            </div>

            <p className="text-gray-600 text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <p className="text-gray-600 text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            </p>

            {/* Mission, Vision, Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              
              {/* Mission */}
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full border border-blue-900 flex items-center justify-center text-blue-900 bg-blue-50">
                  🎯
                </div>
                <h3 className="font-bold text-gray-900 text-base">Our Mission</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                </p>
              </div>

              {/* Vision */}
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full border border-blue-900 flex items-center justify-center text-blue-900 bg-blue-50">
                  👁️
                </div>
                <h3 className="font-bold text-gray-900 text-base">Our Vision</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                </p>
              </div>

              {/* Values */}
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full border border-blue-900 flex items-center justify-center text-blue-900 bg-blue-50">
                  ⭐
                </div>
                <h3 className="font-bold text-gray-900 text-base">Our Values</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                </p>
              </div>

            </div>
          </div>

          {/* Right Image Placeholder Area */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <div className="w-full h-[400px] md:h-[450px] bg-gray-300 rounded-3xl shadow-inner"></div>
          </div>

        </div>

        {/* Statistics Bar */}
        <div className="border border-blue-900 rounded-2xl py-8 px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
          
          <div className="pt-4 md:pt-0">
            <h4 className="text-3xl font-extrabold text-gray-900">10+</h4>
            <p className="text-gray-600 text-sm mt-1">Years of Experiences</p>
          </div>

          <div className="pt-4 md:pt-0">
            <h4 className="text-3xl font-extrabold text-gray-900">25K+</h4>
            <p className="text-gray-600 text-sm mt-1">Happy Customers</p>
          </div>

          <div className="pt-4 md:pt-0">
            <h4 className="text-3xl font-extrabold text-gray-900">500+</h4>
            <p className="text-gray-600 text-sm mt-1">Products</p>
          </div>

          <div className="pt-4 md:pt-0">
            <h4 className="text-3xl font-extrabold text-gray-900">50+</h4>
            <p className="text-gray-600 text-sm mt-1">Brands</p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Company;