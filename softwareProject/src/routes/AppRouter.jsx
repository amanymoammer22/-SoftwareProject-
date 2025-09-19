import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout';
import ContactSection from '../pages/ContactSection';
import About from '../pages/about/About';
import Home from '../pages/home/Home';
import Cart from '../pages/Cart';
import Login from "../pages/loginPage/Login";
import Register from "../pages/loginPage/Register";
import NotFound from '../pages/NotFound';
import Forgotpass from "../pages/loginPage/Forgotpass";
import ResetPass from "../pages/loginPage/ResetPass";
import ProtectedRoutes from '../components/Auth/ProtectedRoutes';
import { authStore } from '../store/authStore';
import Article from '../pages/Article';
import Product from '../pages/products/Product';
import Wishlist from '../pages/Wishlist';
import ProductsByCategory from '../pages/products/ProductsByCategory';
import Dashboard from '../pages/admin/Dashboard';

export default function AppRouter() {

    const { isLoggedIn } = authStore();
    
  return (
      <>
          <Routes>
              <Route path="/" element={<MainLayout />}>
                  <Route index element={<Home />} />
                  <Route path="product" element={<Product />} />
                  <Route path="/products/category/:categoryId" element={<ProductsByCategory />} />
                  <Route path="about" element={<About />} />
                  <Route path="contact" element={<ContactSection />} />
                  <Route path="article" element={<Article />} />
                  <Route
                      path="cart"
                      element={
                          <ProtectedRoutes isLoggedIn={isLoggedIn} redirectTo={"/login"}>
                              <Cart />
                          </ProtectedRoutes>
                      }
                  />
                  <Route path="wishlist" element={<Wishlist />} />
                  <Route
                      path="login"
                      element={
                          <ProtectedRoutes isLoggedIn={!isLoggedIn} redirectTo={"/"}>
                              <Login />
                          </ProtectedRoutes>
                      }
                  />
                  <Route path="register" element={<Register />} />
                  <Route path="forgotpass" element={<Forgotpass />} />
                  <Route path="resetPass" element={<ResetPass />} />
              </Route>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
      </>
  );
}