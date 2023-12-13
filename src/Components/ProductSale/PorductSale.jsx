import axios from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export default function ProductSale() {
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  const countDown = () => {
    const selectedTime = new Date("Dec 30, 2023");

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = selectedTime - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      if (difference < 0) {
        clearInterval(interval);
      } else {
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    countDown()

  }, []);


  /* ================== Get Products ======================= */

  async function getTrandingProducts() {
    try {
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
      return data.data
    }
    catch (error) { console.log(error) }

  }
  let { data } = useQuery("trandingProducts", getTrandingProducts)


  return <>
    <section className='product-sale'>
      <div className='container'>
        <div className='row shadow'>

          {/* Img */}
          <div className='col-md-6'>
            <div className='image  py-5'>
              <img src={require('../../Assets/images/top_img.png')} alt="dell" />
            </div>
          </div>


          <div className='col-md-6 shadow '>
            <div className='info py-5'>
              {/* Sale */}
              <div className="sale">
                <p className=''>Up to 50% Off</p>
              </div>

              {/* Title */}
              <div className='product-data'>
                {data?.slice(39, 40).map((product) => <div key={product.id}>
                  <h2>{product.title.split(' ').splice(0, 2).join(' ')}</h2>
                  <div className='price'>

                    <p className='old-price'>   EGY   {product.price * 2}  </p>
                    <p className='new-price'> EGY  {product.price}</p>
                  </div>
                </div>)}
                <h4>Limited Time Offer</h4>
              </div>

              {/* Date */}
              <div className='date shadow'>
                <div>
                  <span>{days} </span>
                  <span>Days</span>
                </div>
                <span className='dot'>:</span>
                <div>
                  <span>{hours}</span>
                  <span>Hours</span>
                </div>
                <span className='dot'>:</span>

                <div>
                  <span>{minutes}</span>
                  <span>Minutes</span>
                </div>
                <span className='dot'>:</span>

                <div>
                  <span>{seconds}</span>
                  <span>Seconds</span>
                </div>

              </div>
              {/* Btn */}
              <div className='btns'>
                <Link to={`/productdetails/6408da1c6406cd15828e8f0a`}>
                  <button>
                    Show Now
                  </button>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section >
  </>

}
