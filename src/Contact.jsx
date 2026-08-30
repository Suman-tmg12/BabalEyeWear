import React from 'react';

function Contact() {
  return (
    <section className="py-16 px-6 md:px-16 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
          
          {/* Left Contact Info Area */}
          <div className="space-y-6">
            <div>
              <span className="text-blue-900 font-bold uppercase tracking-wider text-4xl">
                Contact Us
              </span>
              <h2 className="text-3xl md:text-xl font-extrabold text-gray-900 mt-2">
                We'd Love to <br /> Hear From You
              </h2>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              Have a question suggestion, or need assistance? <br />
              Our team is here to help you.
            </p>

            {/* Contact Details List */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-700 text-lg">
                  📞
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone</h4>
                  <p className="text-gray-800 font-medium text-sm">+977 9800000000</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-700 text-lg">
                  ✉️
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</h4>
                  <p className="text-gray-800 font-medium text-sm">info@babaleyewear.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-700 text-lg">
                  📍
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Address</h4>
                  <p className="text-gray-800 font-medium text-sm">Boudha, Kathmandu, Nepal</p>
                </div>
              </div>
            </div>

            {/* Social Icons Placeholder */}
            <div className="flex space-x-3 pt-4">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm">
                  🔗
                </div>
              ))}
            </div>
          </div>

          {/* Right Form Card Area */}
          <div className="border border-gray-200 rounded-3xl p-8 shadow-sm bg-white">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
            
            <form className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-900 text-sm text-gray-800"
                />
              </div>

              <div>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-900 text-sm text-gray-800"
                />
              </div>

              <div>
                <input 
                  type="text" 
                  placeholder="Subject" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-900 text-sm text-gray-800"
                />
              </div>

              <div>
                <textarea 
                  rows="4" 
                  placeholder="Your Message" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-900 text-sm text-gray-800 resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="bg-[#0b2b6c] hover:bg-blue-950 text-white font-medium px-8 py-3 rounded-lg transition duration-300 shadow-md text-sm"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Hours & Store Bar */}
        <div className="border border-gray-200 rounded-2xl py-6 px-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-white shadow-sm">
          
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 text-lg">
              🕒
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Opening Hours</h4>
              <p className="text-gray-800 font-medium text-xs sm:text-sm">Sunday-Saturday: 9:00 AM - 7:00 PM</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 text-lg">
              🏬
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Visit Our Store</h4>
              <p className="text-gray-800 font-medium text-xs sm:text-sm">Come visit us for the best in-person eyewear experience.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;