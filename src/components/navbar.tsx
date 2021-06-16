import React, { useState } from 'react';

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav style={{ backgroundColor: '#201F20' }}>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            <svg
                                className="hidden h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <img
                                className="block lg:hidden h-8 w-auto"
                                src="https://scontent-dfw5-2.xx.fbcdn.net/v/t1.6435-9/66358848_895362034161324_1474746350443692032_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=973b4a&_nc_ohc=J4CCneXtG2oAX_TYy2K&_nc_ht=scontent-dfw5-2.xx&oh=535638f3e33f66a5c16bf59cd9dab38f&oe=60CFE9EE"
                                alt="Workflow"
                            />
                            <img
                                className="hidden lg:block h-8 w-auto"
                                src="https://scontent-dfw5-2.xx.fbcdn.net/v/t1.6435-9/66358848_895362034161324_1474746350443692032_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=973b4a&_nc_ohc=J4CCneXtG2oAX_TYy2K&_nc_ht=scontent-dfw5-2.xx&oh=535638f3e33f66a5c16bf59cd9dab38f&oe=60CFE9EE"
                                alt="Workflow"
                            />
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-600"
                                    aria-current="page"
                                >
                                    LaunchPad
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="ml-3 relative">
                            <div>
                                <button
                                    type="button"
                                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                    id="user-menu-button"
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                </button>
                            </div>

                            {open && (
                                <div
                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu-button"
                                    tabIndex={-1}
                                >
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700"
                                        role="menuitem"
                                        tabIndex={-1}
                                        id="user-menu-item-0"
                                    >
                                        Your Profile
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700"
                                        role="menuitem"
                                        tabIndex={-1}
                                        id="user-menu-item-1"
                                    >
                                        Settings
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700"
                                        role="menuitem"
                                        tabIndex={-1}
                                        id="user-menu-item-2"
                                    >
                                        Sign out
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {open &&

                <div className="sm:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <a
                            href="#"
                            className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                            aria-current="page"
                        >
                            Dashboard
                        </a>

                        <a
                            href="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Team
                        </a>

                        <a
                            href="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Projects
                        </a>

                        <a
                            href="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Calendar
                        </a>
                    </div>
                </div>
            }
        </nav>
    );
}
