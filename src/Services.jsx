import React from 'react';

function Services() {
  return (
    <section className="py-16 px-6 md:px-16 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Header Area */}
        <div className="max-w-2xl mx-auto mb-12">
          <span className="text-blue-900 font-bold uppercase tracking-wider text-4xl">
            Our Services
          </span>
          <h2 className="text-3xl md:text-xl font-extrabold text-gray-900 mt-2 mb-4">
            What We Offer
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            We provide a complete Eyewear services to take care of your vision and style needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 text-left">
          {[
            { title: "Premium Eyewear", icon: "🕶️", desc: "We provide a complete Eyewear services to take care of your vision and style needs." },
            { title: "Prescription Lenses", icon: "👓", desc: "We provide a complete Eyewear services to take care of your vision and style needs." },
            { title: "UV Protection", icon: "🛡️", desc: "We provide a complete Eyewear services to take care of your vision and style needs." },
            { title: "Vision Testing", icon: "👁️", desc: "We provide a complete Eyewear services to take care of your vision and style needs." },
            { title: "Repair & Maintenance", icon: "🔧", desc: "We provide a complete Eyewear services to take care of your vision and style needs." },
            { title: "Customer Support", icon: "🎧", desc: "We provide a complete Eyewear services to take care of your vision and style needs." },
          ].map((service, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-start space-x-4 bg-white"
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-700 text-lg">
                {service.icon}
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-gray-900 text-base">{service.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Explore Button */}
        <div>
          <button className="bg-[#0b2b6c] cursor-pointer hover:bg-blue-950 text-white font-medium px-8 py-3 rounded-full transition duration-300 shadow-md">
            Explore Our Collection
          </button>
        </div>

      </div>
    </section>
  );
}

export default Services;