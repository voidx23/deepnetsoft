import ContactUs from './footerComponents/ContactUs'
import Socials from './footerComponents/Socials'
import FindUs from './footerComponents/FindUs'

function Footer() {
    return (
        <footer>
            <div className='bg-black flex flex-col lg:flex-row px-10 lg:px-40 py-20 md:gap-4 justify-center items-center'>
               
                <div className="w-full lg:w-1/3 flex flex-col  order-1 md:order-2">
                    <Socials />
                </div>
                <div className="w-full lg:w-1/3 flex flex-col  order-2 md:order-1">
                    <ContactUs />
                </div>
                <div className="w-full lg:w-1/3 flex flex-col order-3">
                    <FindUs />
                </div>
            </div>
            <div className='bg-[#292323] p-4 text-[#857878] text-center  md:flex  justify-between px-20'>
                <h1>© 2024 Deepnetsoft Solutions. All rights reserved.</h1>
                <div className="mt-2">
                    <a href="/terms-and-conditions" className=" hover:underline mx-2">
                        Terms and Conditions
                    </a>
                    |
                    <a href="/privacy-policy" className=" hover:underline mx-2">
                        Privacy Policy
                    </a>
                </div>
            </div>

        </footer>

    )
}

export default Footer