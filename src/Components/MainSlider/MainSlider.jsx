import Aos from 'aos';
import React, { useEffect } from 'react';
import Slider from "react-slick";

export default function MainSlider() {



  /* Slider */
  var settings = {
    fade: true,
    speed: 700,
    dots: false,
    arrows: false,
    autoplay: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };



  useEffect(() => {

    Aos.init({
      offset: 100,
      easing: 'ease-in-sine',
      delay: 0,
    });
  }, [])


  return <>

    <section className='main-slider'>
      {/* Slider */}
      <div className='container'>

        <div className='row'>
          <Slider {...settings}>
            <div className='main-1'>
              <img src={require('../../Assets/images/main-slider/main1.jpeg')} className='w-100 rounded-3' alt="online shop" />
            </div>

            <div className='main-3'>
              <img src={require('../../Assets/images/main-slider/main3.jpeg')} className='w-100 rounded-3' alt="online shop" />
            </div>
          </Slider>
        </div>
      </div>


      <section className="main-info  ">
        <div className='container '>
          <div className='row gy-3 '>

            <div className='col-md-6 col-lg-3 ' data-aos="fade-right" data-aos-duration="1000">
              <div className="text-main ">
                <i className="fa-solid fa-truck"></i>
                <div className="main-text">
                  <h3>FREE DELIVERY</h3>
                  <span>Consectetur adipi elit lorem ipsum dolor sit amet.</span>
                </div>
              </div>
            </div>



            <div className='col-md-6 col-lg-3' data-aos="fade-down" data-aos-duration="1000">
              <div className="text-main">
                <i className="fa-solid fa-award"></i>
                <div className="main-text">
                  <h3>QUALITY GUARANTEE</h3>
                  <span>Dolor sit amet orem ipsu mcons ectetur adipi elit.</span>
                </div>
              </div>
            </div>


            <div className='col-md-6 col-lg-3' data-aos="fade-up" data-aos-duration="1000">
              <div className="text-main">
                <i className="fa-solid fa-shield-halved"></i>
                <div className="main-text">
                  <h3>100% SECURE PAYMENT</h3>
                  <span>Rem Lopsum dolor sit amet, consectetur adipi elit.</span>
                </div>
              </div>
            </div>



            <div className=' col-md-6 col-lg-3' data-aos="fade-left" data-aos-duration="1000">
              <div className="text-main">
                <i className="fa-solid fa-coins"></i>
                <div className="main-text">
                  <h3>DAILY OFFERS</h3>
                  <span>Amet consectetur adipi elit loreme ipsum dolor sit.</span>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>
    </section>






  </>

}


