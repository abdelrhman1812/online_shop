import Aos from 'aos'
import React, { useContext, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CartContext } from '../../CartContext'
import { UserContxet } from '../../userContext'
export default function Navbar(props) {

  let { numOfCartItems } = useContext(CartContext)
  let { userToken } = useContext(UserContxet)




  /* ======== style Links ======== */
  const navLink = ({ isActive }) => {
    return {
      color: isActive ? "#3bb208 " : "",
      borderBottom: isActive ? " 3px solid #86E25D" : ""

    }

  }


  const dark = () => {
    document.querySelector('body').setAttribute('data-them', 'dark')
    localStorage.setItem('selectThem', 'dark')
    document.getElementById('dark').classList.add('d-none')
    document.getElementById('light').classList.remove('d-none')
    document.getElementById('dark-sm').classList.add('d-none')
    document.getElementById('light-sm').classList.remove('d-none')

  }
  const light = () => {
    document.querySelector('body').setAttribute('data-them', 'light')
    localStorage.setItem('selectThem', 'light')
    document.getElementById('light').classList.add('d-none')
    document.getElementById('dark').classList.remove('d-none')
    document.getElementById('light-sm').classList.add('d-none')
    document.getElementById('dark-sm').classList.remove('d-none')

  }



  useEffect(() => {


    if (localStorage.getItem('selectThem') === 'dark') {
      document.getElementById('dark').classList.add('d-none')
      document.getElementById('light').classList.remove('d-none')
      document.getElementById('dark-sm').classList.add('d-none')
      document.getElementById('light-sm').classList.remove('d-none')
      document.querySelector('body').setAttribute('data-them', 'dark')
    } else {
      localStorage.setItem('selectThem', 'light')
      document.getElementById('light').classList.add('d-none')
      document.getElementById('dark').classList.remove('d-none')
      document.getElementById('light-sm').classList.add('d-none')
      document.getElementById('dark-sm').classList.remove('d-none')
      document.querySelector('body').setAttribute('data-them', 'light')
    }



    Aos.init({
      offset: 100,
      easing: 'ease-in-sine',
      delay: 0,
    });

  }, [])
  return <>


    <nav className="navbar navbar-expand-lg ">
      <div className="container">
        {/* Logo */}
        <span className=' d-block d-lg-none m-0'>
          <i className="fa-regular fa-moon  mx-3 text-warning  " id='light-sm' onClick={light} ></i>
          <i className='fa-regular fa-sun mx-3 text-warning ' id='dark-sm' onClick={dark}></i>
        </span>

        <div className='logo'>
          <Link className="navbar-brand" to="/">
            <i className="fa-solid fa-store"></i>
            <span className='dark' data-aos="zoom-in" data-aos-duration="1000">Online Shop</span>
          </Link>
        </div>

        <i className=" navbar-toggler fa-solid fa-bars" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"></i>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          {/* Links */}
          <ul className="navbar-nav links d-flex justify-content-center align-items-center mx-auto " data-aos="zoom-in" data-aos-duration="1000">
            {userToken !== null ?
              <>
                <li className="nav-item">
                  <NavLink style={navLink} className="nav-link active p-1 " aria-current="page" to="/">Home </NavLink>
                </li>


                <li className="nav-item">
                  <NavLink style={navLink} className="nav-link active  p-1 " aria-current="page" to="/products">Products</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink style={navLink} className="nav-link active p-1  " aria-current="page" to="/categories">Categoreis</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink style={navLink} className="nav-link active  p-1 " aria-current="page" to="/profile">Profile</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink style={navLink} className="nav-link active  p-1 " aria-current="page" to="/contact">Contact Us</NavLink>
                </li>
                <li className="nav-item d-lg-none">

                  <Link className="nav-link active" aria-current="page" to="/wishlist">
                    <span >Wish List</span>
                  </Link>
                </li>
                <li className="nav-item d-lg-none">

                  <Link className="nav-link active " aria-current="page" to="/cart">
                    <span>Cart</span>
                    <span className="  badge  mx-2 bg-danger   ">
                      {numOfCartItems}
                    </span>
                  </Link>
                </li>
                <li className="nav-item d-lg-none">

                  <Link className="nav-link active" aria-current="page" to="/allOrders">
                    <span>Orders</span>
                  </Link>
                </li>





              </> : ""
            }

          </ul>
          <span className='  d-none d-lg-block m-0' data-aos="zoom-in" data-aos-duration="1000">


            <i className="fa-regular fa-moon  mx-3 text-warning  " id='light' onClick={light} ></i>
            <i className='fa-regular fa-sun mx-3 text-warning ' id='dark' onClick={dark}></i>

          </span>

          <ul className="navbar-nav icons ">

            {userToken !== null ?
              <>



                {/*  Icons*/}
                <div className="d-lg-flex align-items-center d-none " data-aos="zoom-in" data-aos-duration="1000">
                  <Link className="nav-link active" aria-current="page" to="/wishlist">
                    <i className="fa-solid wish fa-heart text-main" ></i>
                  </Link>

                  <Link className="nav-link active count" aria-current="page" to="/cart">
                    <i className="fa-solid shopping fa-cart-shopping  position-relative "> </i>
                    <span className="  badge rounded-pill  bg-danger   ">
                      {numOfCartItems}
                    </span>
                  </Link>

                  <Link className="nav-link active" aria-current="page" to="/allOrders">
                    <i className="fa-solid  shopping text-main fa-basket-shopping"></i>
                  </Link>
                </div>

              </>
              :
              /* Login-Register */
              <>
                <li className="nav-item notoken">
                  <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                </li>


                <li className="nav-item notoken">
                  <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
                </li>

              </>
            }

          </ul>
        </div>
      </div>
    </nav>




  </>

}
