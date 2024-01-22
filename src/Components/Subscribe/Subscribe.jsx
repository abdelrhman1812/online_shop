

import Aos from 'aos';
import React, { useEffect } from 'react';
export default function Subscribe() {

  useEffect(() => {
    Aos.init({
      offset: 100,
      easing: 'ease-in-sine',
      delay: 0,
    });
  }, []);

  return <>

    <div className='subscribe-section'>
      <div className='container'>
        <div className='row' data-aos="zoom-out" data-aos-duration="1000">

          <div className='col-lg-6 text-center'>
            <div className='text'>
              <h6>SUBSCRIBE US NOW </h6>
              <p>Get latest news, updates and deals directly mailed to your inbox.</p>
              <div className="social">
                <h5 className='d-inline '>Follow us:</h5>
                <i className="fa-brands fa-facebook-f"></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-instagram"></i>
              </div>

            </div>
          </div>


          <div className='col-lg-6 text-center'>
            <div className='input'>
              <input type="email" placeholder='Your Email Address Hear' />
              <button> Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </>

}