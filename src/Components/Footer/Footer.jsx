import Aos from 'aos';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import appstore from '../../Assets/images/Footer/appstore-btn.svg';
import googleplay from '../../Assets/images/Footer/googleplay-btn.svg';

export default function Footer() {

  useEffect(() => {
    Aos.init({
      offset: 100,
      easing: 'ease-in-sine',
      delay: 0,
    });
  }, []);

  return <>
    {/* {

      localStorage.getItem("userToken") !== null ? */}

    <footer>

      <div className='container'>
        <div className='row g-4 ' data-aos="fade-up" data-aos-duration="1000">
          <div className=' col-md-6 col-lg-3 '>

            <div className='footer-logo '>
              <i className="fa-solid fa-store"></i>
              <span data-aos="fade-right" data-aos-duration="1000">Online Shop</span>
              <div className="subscribe p-0">
                <p>Got any Questions? Call us Today!</p>
                <button className='btn'> Get In Touch </button>
              </div>
            </div>
          </div>



          <div className=' col-6 col-lg-3 '>
            <div className='footer-contact'>
              <h3>Contact</h3>
              <p><i className="fa-solid fa-phone"></i> : <span>01008034761</span> </p>
              <p><i className="fa-regular fa-envelope"></i> : <span>abdelrhman@gmail.com</span></p>
              <p><i className="fa-solid fa-location-dot"></i> : <span>Mansoura city</span></p>

              <div className='footer-icons my-3 '>
                <i className="fa-brands fa-facebook "></i>
                <i className="fa-brands fa-linkedin  "></i>
                <i className="fa-brands fa-instagram  " ></i>
                <i className="fa-brands fa-twitter  "></i>
              </div>

            </div>
          </div>


          <div className=' col-6 col-lg-2'>
            <div className='footer-news'>
              <h3> Links</h3>
              <Link to="/"> - All Prodcts</Link>
              <Link to="/"> - About</Link>
              <Link to="/"> - Contact</Link>
            </div>
          </div>


          <div className=' col-md-6 col-lg-4'>
            <div className='footer-app'>
              <h3>Download Our App Now!</h3>
              <div className='footer-img'>
                <img src={googleplay} className='w-50  my-2' alt="google play" />
                <img src={appstore} className='w-50  my-2' alt="app store" />
              </div>
            </div>
          </div>


        </div>
      </div>
      <div className='copy-right pt-5'>
        <p>Copyright 2023 developed by <span>Abdelrhman Ali</span>. All rights reserved</p>
      </div>
    </footer>



  </>

}
