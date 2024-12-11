import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-[#121618] text-white p-4 md:h-[100px] relative">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
               
                <div className="text-2xl font-bold">
                    <Link to="/"><img src="../../../public/logo3.png" alt="" className="md:w-16 w-10" /></Link>
                </div>
              
                <div className="hidden lg:flex space-x-6 font-oswald font-extralight absolute text-2xl bottom-0 right-36 mb-2 mr-4">
                    <Link to="/" className="hover:text-gray-300">Home</Link>
                    <Link to="/" className="block text-white  hover:text-gray-300">Menu</Link>
                    <Link to="/menu-manage" className="block text-white  hover:text-gray-300">Menu Management</Link>
                    <Link to="/" className="hover:text-gray-300">Make Reservation</Link>
                    <Link to="/" className="hover:text-gray-300">Contact Us</Link>
                </div>
                
                <div className="lg:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        {isOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`lg:hidden fixed top-0 right-0 w-64 bg-[#121618] h-full transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex justify-end p-4">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className="space-y-6 p-4">
                    <Link to="/" className="block text-white text-lg hover:text-gray-300">Home</Link>
                    <Link to="/menu" className="block text-white text-lg hover:text-gray-300">Menu</Link>
                    <Link to="/menu-manage" className="block text-white  hover:text-gray-300">Menu Management</Link>
                    <Link to="/reservation" className="block text-white text-lg hover:text-gray-300">Make Reservation</Link>
                    <Link to="/contact" className="block text-white text-lg hover:text-gray-300">Contact Us</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
