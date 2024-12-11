import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const ContactUs = () => {
    return (
        <div className=' border rounded-xl border-white md:px-20 flex flex-col text-center justify-center h-56 my-10'>
            <h1 className='text-[#0796EF] font-oswald text-2xl mb-4'>CONTACT WITH US</h1>

            <div className='flex items-center justify-center  text-white mb-2'>
                <FaPhoneAlt className='mr-2' /> 
                <span>+1 234 567 890</span>
            </div>

            <div className='flex items-center justify-center text-white'>
                <FaEnvelope className='mr-2' /> 
                <span>contact@company.com</span> 
            </div>
        </div>
    );
};

export default ContactUs;
