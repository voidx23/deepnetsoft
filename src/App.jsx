// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes'; // Import your user routes

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserRoutes />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
