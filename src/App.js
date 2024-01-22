import React, { useContext, useEffect } from 'react';
import { Offline } from 'react-detect-offline';
import { Toaster } from 'react-hot-toast';
import { RouterProvider, createHashRouter, redirect } from 'react-router-dom';
import CartContextProvider from './CartContext';
import AllOrders from './Components/AllOrders/AllOrders';
import Cart from './Components/Cart/Cart';
import Categories from './Components/Categories/Categories';
import Contact from './Components/Contact/Contact';
import ForgitPassword from './Components/ForgitPassword/ForgitPassword';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Notfound from './Components/Notfound/Notfound';
import PaymentOnline from './Components/PaymentOnline/PaymentOnline';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Products from './Components/Products/Products';
import Profile from './Components/Profile/Profile';
import ProtectedAuthentication from './Components/ProtectectedAuthentication/ProtectectedAuthentication';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Register from './Components/Register/Register';
import Resetpassword from './Components/Resetpassword/Resetpassword';
import Verify from './Components/Verify/Verify';
import WishList from './Components/WishList/WishList';
import Fake from './Components/fake/fake';
import CounterContextProvider from './CounterContext';
import WishListContextProvider from './WishContext';
import { UserContxet } from './userContext';

const routers = createHashRouter([
  { path: "on", element: <Fake /> },
  {
    path: "", element: <Layout />,
    children: [
      { index: true, loader: () => redirect("home") },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: '*', element: <ProtectedRoute><Notfound /></ProtectedRoute> },
      { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },

      { path: 'contact', element: <ProtectedRoute><Contact /></ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
      { path: 'paymentonline', element: <ProtectedRoute><PaymentOnline /></ProtectedRoute> },

      { path: 'login', element: <ProtectedAuthentication> <Login /> </ProtectedAuthentication> },
      { path: 'register', element: <ProtectedAuthentication>  <Register /> </ProtectedAuthentication> },

      { path: 'verify', element: <Verify /> },
      { path: 'rePassword', element: <Resetpassword /> },
      { path: 'forgetPassword', element: <ForgitPassword /> },
    ]
  }
]);

function App() {
  const { setUserToken } = useContext(UserContxet);

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");

    if (storedToken) {
      setUserToken(storedToken);
    }
  }, [setUserToken]);

  return (
    <>
      <WishListContextProvider>
        <CartContextProvider>
          <CounterContextProvider>
            <Offline>
              <div className='network'>
                <i className="fa-solid fa-wifi"></i>
                <p>You are currently offline. Please check your internet connection.</p>
              </div>
            </Offline>
            <RouterProvider router={routers} />
          </CounterContextProvider>
          <Toaster />
        </CartContextProvider>
      </WishListContextProvider>
    </>
  );
}

export default App;
