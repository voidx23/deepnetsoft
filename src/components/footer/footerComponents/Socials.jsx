import React from 'react'

function Socials() {
    return (
        <div className='relative border rounded-xl border-white  px-20  flex flex-col justify-center h-56 '>
            {/* Logo positioned in the center of the top border */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img src="/logo2.png" alt="Logo" className="w-24 h-20 " />
            </div>

            <h1 className='font-oswald text-5xl  flex p-4 justify-center'>
                <span className='text-[#0796EF]'>DEEP</span> <span className='text-white'>NET</span> <span className='text-[#857878]'>SOFT</span>
            </h1>
        </div>
    );
}

export default Socials