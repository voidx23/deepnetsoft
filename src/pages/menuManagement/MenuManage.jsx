import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/navBar/NavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
                if(response){
                    toast('Item added succesfully....')
                }
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
<ToastContainer />

            <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b pb-4">Manage Menus</h2>

    {/* Section for Main Menus */}
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Add Main Menu</h3>
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={newMainMenu}
          onChange={(e) => setNewMainMenu(e.target.value)}
          placeholder="Enter main menu name"
          className="border border-gray-300 rounded-lg p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addMainMenu}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-300"
        >
          Add
        </button>
      </div>
    </div>

    {/* Section for Adding Menu Items */}
    <div>
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Add Menu Item</h3>
      <div className="mb-4">
        <select
          value={selectedMenu}
          onChange={(e) => setSelectedMenu(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Main Menu</option>
          {Array.isArray(mainMenus) &&
            mainMenus.map((menu) => (
              <option key={menu._id} value={menu.name}>
                {menu.name}
              </option>
            ))}
        </select>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={menuItemData.name}
          onChange={(e) => setMenuItemData({ ...menuItemData, name: e.target.value })}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          placeholder="Description"
          value={menuItemData.description}
          onChange={(e) => setMenuItemData({ ...menuItemData, description: e.target.value })}
          className="w-full border border-gray-300 rounded-lg p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Price"
          value={menuItemData.price}
          onChange={(e) => setMenuItemData({ ...menuItemData, price: e.target.value })}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mt-6">
        <button
          onClick={addMenuItem}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition duration-300"
        >
          Add Menu Item
        </button>
      </div>
    </div>
  </div>
</div>

        </>
    );
}

export default MenuManage;
