import React from 'react';

const Footer: React.FC = () => {
  return (
    <>
      {/* Footer section */}
      <footer className="bg-gray-50 w-full">
        <div className="p-10 max-w-screen-xl w-full lg:w-9/10 block md:grid-cols-2 md:justify-between lg:flex md:m-auto justify-center">
          <div className="block lg:items-start mb-12">
            {/* Logo */}
            <div className="md:w-80 w-50 text-center md:m-auto">
              <h2 className="uppercase text-[#4CBB17] text-base lg:text-xl font-bold">AFUOM</h2>
            </div>
            <div className="mt-4 text-center">
              <span>Get connected with us on social networks:</span>
            </div>
            {/* Social network icons */}
            <div className="flex items-center justify-center mt-4">
              <a href="#!" className="me-6 h-4 w-4 hover:text-[#4CBB17]">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#!" className="me-6 h-4 w-4 hover:text-[#4CBB17]">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#!" className="me-6 h-4 w-4 hover:text-[#4CBB17]">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#!" className="me-6 h-4 w-4 hover:text-[#4CBB17]">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className="block m-auto md:grid md:grid-cols-3 w-full">
            {/* Customer care */}
            <div className="md:m-auto mb-10">
              <h6 className="mb-4 flex justify-center font-bold md:justify-start">Customer care</h6>
              <p className="mb-4 text-center md:text-left"><a href="#!">Privacy policy</a></p>
              <p className="mb-4 text-center md:text-left"><a href="#!">Terms & Conditions</a></p>
              <p className="mb-4 text-center md:text-left"><a href="#!">Products Return</a></p>
              <p className="text-center md:text-left"><a href="#!">Wholesale Policy</a></p>
            </div>

            {/* Useful links */}
            <div className="md:m-auto mb-10">
              <h6 className="mb-4 flex justify-center font-bold md:justify-start">Useful links</h6>
              <p className="mb-4 text-center md:text-left"><a href="#!">Pricing</a></p>
              <p className="mb-4 text-center md:text-left"><a href="#!">Settings</a></p>
              <p className="mb-4 text-center md:text-left"><a href="#!">Orders</a></p>
              <p className="text-center md:text-left"><a href="#!">Help</a></p>
            </div>

            {/* Company */}
            <div className="md:m-auto">
              <h6 className="mb-4 flex justify-center font-bold md:justify-start">Company</h6>
              <p className="mb-4 text-center md:text-left"><a href="#!">Menu Items</a></p>
              <p className="mb-4 text-center md:text-left"><a href="#!">Help Center</a></p>
              <p className="mb-4 text-center md:text-left"><a href="#!">Address Store</a></p>
              <p className="text-center md:text-left"><a href="#!">Homepage</a></p>
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className="p-6 text-center">
          <p>
            <span className="font-bold">© 2024 Copyright:</span> By{' '}
            <span className="text-[#4CBB17]">AFUOM</span>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
