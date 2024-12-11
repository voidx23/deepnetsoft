import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navBar/NavBar';
import Footer from '../../components/footer/Footer';
import axios from 'axios';

function Menu() {
    const [menus, setMenus] = useState([]); // State to store menu categories
    const [menuItems, setMenuItems] = useState([]); // State to store menu items for a selected category
    const [selectedCategoryId, setSelectedCategoryId] = useState(''); // State to store selected category ID
    const [selectedCategoryName, setSelectedCategoryName] = useState('Select a Category');
    const [isLoading, setIsLoading] = useState(true);

    axios.defaults.baseURL = 'https://deppnetsoft-backend.onrender.com';

    console.log(selectedCategoryName)

    // Fetch menu categories from the backend
    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await axios.get('/menus/get-main'); // Adjust this URL to match your API endpoint
                setMenus(response.data); // Assuming the API response is an array of menu categories
            } catch (error) {
                console.error('Error fetching menus:', error);
            }
        };
        fetchMenus();
    }, []);
    useEffect(() => {
        // Simulate a delay to show the loader animation
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // Adjust the timeout as needed

        return () => clearTimeout(timer);
    }, []);

    // Fetch menu items based on the selected category ID
    useEffect(() => {

        if (selectedCategoryId) {
            const fetchMenuItems = async () => {
                try {
                    const response = await axios.get(`/menu-items/item/${selectedCategoryId}`); // Adjust this URL to match your API endpoint
                    setMenuItems(response.data); // Assuming the API response is an array of menu items
                } catch (error) {
                    console.error('Error fetching menu items:', error);
                }
            };
            fetchMenuItems();

        }
    }, [selectedCategoryId]); // Depend only on the ID, not the name

    return (
        <>
            <Navbar />
            <section>
                <div className="custom-bg-1 h-[411px] flex flex-col justify-center items-center">
                    <h1 className="text-white font-oswald text-shadow text-5xl md:text-6xl lg:text-8xl font-semibold my-6 sm:my-8 md:my-10">
                        MENU
                    </h1>
                    <p className="text-[#BBBBBB] font-kelly-slab text-center text-lg sm:text-lg md:text-xl lg:text-2xl px-16 sm:px-16  md:px-16 lg:px-40 xl:px-72">
                        Please take a look at our menu featuring food, drinks, and brunch. If you'd like to place an order, use the "Order Online" button located below the menu.
                    </p>
                </div>
            </section>

            <section>
                <div className="custom-bg-2 h-28 flex items-center justify-center space-x-4 font-oswald text-2xl font-medium">
                    {menus.length > 0 ? (
                        menus.map((menu) => (
                            <button
                                key={menu._id}
                                className="w-[150px] h-[70px] bg-black text-shadow-2 text-white border border-blue-500"
                                onClick={() => {
                                    setSelectedCategoryId(menu._id);
                                    setSelectedCategoryName(menu.name); // Update category name
                                }}
                            >
                                {menu.name}
                            </button>
                        ))
                    ) : (
                        <p>Loading menus...</p>
                    )}
                </div>
            </section>

            <section>
                {/* Display selected category's items */}
                <div className="custom-bg-3 min-h-[80vh] flex justify-center items-center">
                    <div className="border border-white w-[90%] py-10 max-w-[1350px] mt-10">
                        {/* Header with lines */}
                        <div className="flex items-center justify-center my-6">
                            {/* Left Line */}
                            <div className="w-16 sm:w-20 h-[3px] bg-slate-300"></div>
                            {/* Heading */}
                            <h1 className="font-oswald font-semibold text-shadow text-white text-2xl sm:text-4xl md:text-6xl text-center mx-4">
                                {selectedCategoryName}
                            </h1>
                            {/* Right Line */}
                            <div className="w-16 sm:w-20 h-[3px] bg-slate-300"></div>
                        </div>

                        {/* Display menu items */}
                        <div className="text-white px-6 sm:px-10 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                            {isLoading ? (
                                <div className="flex justify-center items-center col-span-2">
                                    <div className="loader"></div>
                                </div>
                            ) : menuItems.length > 0 ? (
                                menuItems.map((item) => (
                                    <div key={item._id}>
                                        <h1 className="font-oswald text-2xl sm:text-3xl flex justify-between items-baseline">
                                            {item.name}
                                            <span className="border-t-4 border-dotted border-white flex-1 mx-2"></span>
                                            <span>${item.price}</span>
                                        </h1>
                                        <p className="font-kelly-slab text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-center sm:text-left leading-normal sm:leading-relaxed text-slate-500">
                                            {item.description}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-slate-500 col-span-2">No menu items available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default Menu;
