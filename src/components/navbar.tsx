import React, { ReactElement } from 'react';
import CharachorderLogoImage from '../assets/cc_logo_transparent.png';

const Navbar = (): ReactElement => {
  return (
    <nav style={{ backgroundColor: '#201F20' }}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center" />
            <div className="sm:block sm:ml-6">
              <div className="flex space-x-4">
                <a
                  href="#/"
                  className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-[#333]"
                  aria-current="page"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src={CharachorderLogoImage}
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
