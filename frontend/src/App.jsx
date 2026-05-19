import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

import Home from './pages/Home';
import Explore from './pages/Explore';
import DestinationDetails from './pages/DestinationDetails';
import Categories from './pages/Categories';
import CategoryDetails from './pages/CategoryDetails';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageDestinations from './pages/admin/ManageDestinations';
import ManageUsers from './pages/admin/ManageUsers';
import ManageBlogs from './pages/admin/ManageBlogs';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Toaster position="top-right" toastOptions={{
            duration: 3000,
            style: { borderRadius: '12px', fontFamily: 'Inter, sans-serif' },
          }} />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="explore" element={<Explore />} />
              <Route path="destinations/:id" element={<DestinationDetails />} />
              <Route path="categories" element={<Categories />} />
              <Route path="categories/:slug" element={<CategoryDetails />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogDetails />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
              <Route path="admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="admin/destinations" element={<AdminRoute><ManageDestinations /></AdminRoute>} />
              <Route path="admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
              <Route path="admin/blogs" element={<AdminRoute><ManageBlogs /></AdminRoute>} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
