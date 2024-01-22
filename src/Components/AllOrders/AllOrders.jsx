import Aos from 'aos';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';


export default function AllOrders() {
  const [userOrder, setUserOrder] = useState([]);

  /* get user Id from localStorage */
  useEffect(() => {
    const token = jwtDecode(localStorage.getItem('userToken'));
    // console.log(token)
    getOrders(token.id);

    window.scrollTo(0, 0);

    Aos.init({
      offset: 100,
      easing: 'ease-in-sine',
      delay: 0,
    });
  }, []);

  /* get orders */
  async function getOrders(id) {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
      setUserOrder(data);
      // console.log(data)
      // console.log(data.map((pro) => console.log(pro.cartItems)))
    } catch (error) {
      console.error(error);
    }
  }


  // data.user.name
  // data.user.email
  const formatTime = (dateTimeString) => {
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formattedTime = new Date(dateTimeString).toLocaleTimeString('en-US', options);
    return formattedTime;
  };


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  };





  return (

    <>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Orders</title>
      </Helmet>

      <div className='allOrder'>
        <div className='container'>
          <h4 data-aos="zoom-in" data-aos-duration="1000">   <i className='fa fa-shopping-cart'></i>  Your Orders  : </h4>

          {userOrder.length === 0 ? <>
            <div className='empty-cart '>
              <i className='fa fa-shopping-cart'></i>
              <p>Your Order Is Empty &#128578; !</p>
              <button> Shop now </button>
            </div>

          </>
            : ""
          }

          {userOrder?.map((order, index) => <div key={index}
            data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
            data-aos-duration="1000"
            data-aos-delay={`${index * 100}`}

            className='row my-3 g-3 shadow p-2 rounded-5 '>




            {order.cartItems.map((product, num) => <div key={num}

              className='col-md-4   my-2'>
              <div className='order  '>
                <p className='num'>  {num + 1}</p>

                <div className='image text-center'>
                  <img src={product.product.imageCover} className='' alt="" />
                </div>
                <div className='order-text d-flex justify-content-between align-items-center flex-column'>

                  <h6>{product.product.title.split(" ").slice(0, 2).join(" ")}</h6>
                  <h6>EGY {product.price}</h6>
                </div>
              </div>
            </div>)}




            <div className='details  d-flex justify-content-between align-items-center flex-wrap  '>

              <p> <span> Date:</span> <time dateTime={order.updatedAt}>{formatDate(order.updatedAt)}</time></p>
              <p><span> Time: </span>  <time dateTime={order.updatedAt}>{formatTime(order.updatedAt)}</time></p>
              <p> <span>Total  Price: </span>  {order.totalOrderPrice} EGY</p>
              <p><span> City: </span>  {order.shippingAddress.city}</p>
            </div>


          </div>
          )}


        </div>
      </div>
    </>
  );
}