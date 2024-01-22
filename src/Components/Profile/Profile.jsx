import Aos from 'aos';
import jwtDecode from 'jwt-decode';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContxet } from '../../userContext';

export default function Profile() {
  let { setUserToken } = useContext(UserContxet)
  const [userName, setUserName] = useState('')
  const [role, setRole] = useState('')


  useEffect(() => {
    const token = jwtDecode(localStorage.getItem('userToken'));
    setUserName(token.name)
    setRole(token.role)

    window.scrollTo(0, 0);

    Aos.init({
      offset: 100,
      easing: 'ease-in-sine',
      delay: 0,
    });
  }, []);

  let navOrder = useNavigate()
  let navForgit = useNavigate()
  let navLOgout = useNavigate()

  const handelOrder = () => {

    navOrder('/allorders')
  }

  const handerForgit = () => {
    navForgit('/forgetPassword')
  }


  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null)
    navLOgout("/login")

  }


  return <>

    <div className='profile'>

      <div className='container'>
        <h4 data-aos="fade-down" data-aos-duration="1000">  <i className="fa-solid fa-user"></i> Your Profile </h4>

        <div className='row gy-5 '>

          <div className='col-md-4 col-lg-3 col-9 mx-auto ' data-aos="fade-right" data-aos-duration="1000">
            <div className='profile-data'>
              <div className='image'>
                <img src={require('../../Assets/images/Profile/user.png')} className='' alt="" />
              </div>
              <div className='text-profile'>
                <h3>{userName}</h3>
                <p>{role}</p>
              </div>

              <div className="btns">
                <button onClick={() => handelOrder()}> <i className="fa-solid fa-cart-shopping"></i> Your Orders   </button>
                <button onClick={() => handerForgit()}> <i className="fa-solid fa-key"></i> Forget Password    </button>
                <button onClick={() => logOut()}> <i className="fa-solid fa-right-from-bracket"></i> Logout    </button>
              </div>

            </div>

          </div>


          <div className='col-md-8 col-lg-9 col-8 mx-auto' data-aos="fade-left" data-aos-duration="1000">
            <div className='profile-info'>


              <p>Hello, <span>{userName}</span> <br />
                From your account dashboard. you can easily check & view your recent orders, manage your shipping and billing addresses and edit your password and account details.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </>

}
