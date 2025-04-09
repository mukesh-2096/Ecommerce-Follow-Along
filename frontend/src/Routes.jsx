import LoginPage from './Pages/Login';
import SignupPage from './Pages/Signup';
import Homepage from './Pages/Homepage';
import ProductForm from './components/ProductForm';
import EditProduct from './components/EditProduct';
import ProductDetails from './components/auth/ProductDetails';
import Cart from './Pages/Cart';
import Profile from './Pages/Profile';
import Order from './Pages/Order'; // ✅ Ensure Order.jsx exists in /Pages

export { 
    LoginPage, 
    SignupPage, 
    ProductDetails, 
    Cart, 
    Profile, 
    Homepage, 
    ProductForm, 
    EditProduct, 
    Order // ✅ Correct Export for Order Page
};
