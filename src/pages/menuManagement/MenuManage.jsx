import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/navBar/NavBar';

// Set the Axios base URL globally
axios.defaults.baseURL = 'https://deppnetsoft-backend.onrender.com';  //Your backend server URL

function MenuManage() {
    const [mainMenus, setMainMenus] = useState([]); // To store main menu list
    const [menuItems, setMenuItems] = useState([]); // To store menu items
    const [newMainMenu, setNewMainMenu] = useState(''); // For adding a new main menu
    const [selectedMenu, setSelectedMenu] = useState(''); // For dropdown selection
    const [menuItemData, setMenuItemData] = useState({
        name: '',
        description: '',
        price: '',
    });

    // Fetch existing data from backend
    useEffect(() => {
        async function fetchData() {
            try {
                const menuResponse = await axios.get('/menus/get-main'); // Relative path works with the base URL set
                setMainMenus(menuResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    // Add a new main menu
    const addMainMenu = async () => {
        if (newMainMenu.trim()) {
            try {
                const response = await axios.post('/menus/add-main', { name: newMainMenu });
                setMainMenus([...mainMenus, response.data]);
                setNewMainMenu('');
            } catch (error) {
                console.error('Error adding main menu:', error);
            }
        }
    };

    // Add a new menu item
    const addMenuItem = async () => {
        if (selectedMenu && menuItemData.name && menuItemData.description && menuItemData.price) {
            const formData = new FormData();
            formData.append('name', menuItemData.name);
            formData.append('description', menuItemData.description);
            formData.append('price', menuItemData.price);

            // Find the selected main menu's _id and send it
            const selectedMainMenu = mainMenus.find(menu => menu.name === selectedMenu);
            if (selectedMainMenu) {
                formData.append('menuId', selectedMainMenu._id); // Send only _id
            }

            try {
                const response = await axios.post('/menu-items/add-item', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                setMenuItems([...menuItems, response.data]); // Update menuItems list

                // Clear the form after successful submission
                setMenuItemData({ name: '', description: '', price: '' }); // Reset menuItemData
                setSelectedMenu(''); // Reset selectedMenu
            } catch (error) {
                console.error('Error adding menu item:', error);
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Manage Menus</h2>

                {/* Section for Main Menus */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold">Add Main Menu</h3>
                    <input
                        type="text"
                        value={newMainMenu}
                        onChange={(e) => setNewMainMenu(e.target.value)}
                        placeholder="Enter main menu name"
                        className="border p-2 mr-2"
                    />
                    <button onClick={addMainMenu} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Add Main Menu
                    </button>
                </div>

                {/* Section for Adding Menu Items */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold">Add Menu Item</h3>
                    <select
                        value={selectedMenu}
                        onChange={(e) => setSelectedMenu(e.target.value)}
                        className="border p-2 mb-2"
                    >
                        <option value="">Select Main Menu</option>
                        {Array.isArray(mainMenus) && mainMenus.map((menu) => (
                            <option key={menu._id} value={menu.name}>
                                {menu.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        placeholder="Name"
                        value={menuItemData.name}
                        onChange={(e) => setMenuItemData({ ...menuItemData, name: e.target.value })}
                        className="border p-2 mb-2 block"
                    />
                    <textarea
                        placeholder="Description"
                        value={menuItemData.description}
                        onChange={(e) => setMenuItemData({ ...menuItemData, description: e.target.value })}
                        className="border p-2 mb-2 block"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={menuItemData.price}
                        onChange={(e) => setMenuItemData({ ...menuItemData, price: e.target.value })}
                        className="border p-2 mb-2 block"
                    />
                    <button onClick={addMenuItem} className="bg-green-500 text-white px-4 py-2 rounded">
                        Add Menu Item
                    </button>
                </div>
            </div>
        </>
    );
}

export default MenuManage;
