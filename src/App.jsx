import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes'; // Import your user routes

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<UserRoutes />} /> {/* Fix applied here */}
      </Routes>
    </Router>
  );
}

export default App;
