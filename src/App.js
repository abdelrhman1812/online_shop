import React, { useContext, useEffect } from 'react'
import { RouterProvider, createHashRouter, redirect } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Categories from './Components/Categories/Categories'
import Profile from './Components/Profile/Profile'
import Notfound from './Components/Notfound/Notfound'
import CounterContextProvider from './CounterContext'
import { UserContxet } from './userContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CartContextProvider from './CartContext'
import { Toaster } from 'react-hot-toast';
import ForgitPassword from './Components/ForgitPassword/ForgitPassword'
import WishList from './Components/WishList/WishList'
import WishListContextProvider from './WishContext'
import Payment from './Components/payment/payment'
import AllOrders from './Components/AllOrders/AllOrders'
import Verify from './Components/Verify/Verify'
import Resetpassword from './Components/Resetpassword/Resetpassword'
import SubBrands from './Components/SubBrands/SubBrands'
import PaymentOnline from './Components/PaymentOnline/PaymentOnline'
import Fake from './Components/fake/fake'
import Contact from './Components/Contact/Contact'
import { Offline, Online } from 'react-detect-offline'

let routers = createHashRouter(


  [

    { path: "fake", element: <Fake /> },
    {
      path: "", element: (<Layout />),


      children:

        [
          { index: true, loader: () => redirect("home") },
          { path: 'home', element: <ProtectedRoute><Home /> </ProtectedRoute> },


          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
          { path: 'products', element: <ProtectedRoute><Products /> </ProtectedRoute> },

          { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },


          { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
          { path: 'subbrands/:id', element: <ProtectedRoute><SubBrands /></ProtectedRoute> },
          { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
          { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
          { path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute> },
          { path: 'payment', element: <ProtectedRoute><Payment /></ProtectedRoute> },
          { path: 'paymentonline', element: <ProtectedRoute><PaymentOnline /></ProtectedRoute> },

          { path: 'allorders', element: <ProtectedRoute><    AllOrders /></ProtectedRoute> },
          { path: 'contact', element: <ProtectedRoute><    Contact /></ProtectedRoute> },

          { path: 'forgetPassword', element: <ForgitPassword /> },
          { path: 'verify', element: <Verify /> },
          { path: 'rePassword', element: <Resetpassword /> },


          { path: '*', element: <ProtectedRoute> <Notfound /></ProtectedRoute> }

        ]

    }

  ]

)






function App() {

  let { setUserToken } = useContext(UserContxet)

  useEffect(() => {

    if (localStorage.getItem("userToken") !== null) {
      setUserToken(localStorage.getItem("userToken"))
    }


  }, [])




  return <>
    <WishListContextProvider>
      <CartContextProvider>

        <CounterContextProvider>
          <Offline>
            <div className='network'>
              <i className="fa-solid fa-wifi " ></i>

              <p> You are currently offline
                Please check your internet connection.</p>
            </div>
          </Offline>

          <RouterProvider router={routers}>
          </RouterProvider>

        </CounterContextProvider>
        <Toaster />

      </CartContextProvider>
    </WishListContextProvider>


  </>

}


export default App;