import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import GeneratorPage from './pages/GeneratorPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import RootRoute from './components/RootRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Guest Routes (Redirect to /generator if logged in) */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/generator" element={<GeneratorPage />} />
        </Route>

        {/* Initial Redirect Logic */}
        <Route path="/" element={<RootRoute />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
