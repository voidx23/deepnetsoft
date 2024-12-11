// UserRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import Menu from '../pages/Menu/Menu';
import MenuManage from '../pages/menuManagement/MenuManage';

function UserRoutes() {
  return (
    <div>
      <Routes>
        <Route path="menu" element={<Menu />} />
        <Route path="menu-manage" element={<MenuManage />} />
      </Routes>
    </div>
  );
}

export default UserRoutes;
