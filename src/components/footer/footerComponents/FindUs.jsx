import { FaMap, FaMapMarkerAlt } from 'react-icons/fa';
import { BiMap } from 'react-icons/bi';

function FindUs() {
    return (
        <div className=' border rounded-xl border-white md:px-28 flex flex-col text-center justify-center h-56 '>
            <h1 className='text-[#0796EF] font-oswald text-2xl mb-4'>FIND US</h1>

            <div className='flex items-center justify-center text-white mb-2'>
                <BiMap className='mr-2 text-5xl text-yellow-600' /> {/* Phone icon */}
                <span>First floor, Geo infopark, Infopark EXPY, Kakkanad</span>
            </div>


        </div>
    );
}

export default FindUs;
