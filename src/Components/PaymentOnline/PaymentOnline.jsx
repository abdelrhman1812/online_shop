import Aos from 'aos';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { CartContext } from '../../CartContext';
import LodingBtn from '../LodingBtn/LodingBtn';

export default function PaymentOnline() {
  const [error, seterror] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  let url = window.location.port

  // console.log(url)


  /* from Cart Context  */
  const
    { cartId,
      setNumOfCartItems,
      setTotalCartPrice,
      setCartProducts
    }
      = useContext(CartContext);


  /* online Payment*/

  async function confirmOnlinePayment(values) {
    try {
      setisLoading(true)

      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        { shippingAddress: values },
        {
          headers: { token: localStorage.getItem('userToken') },
          params: { url: 'https://abdelrhman1812.github.io/online_shop/#' }

        },

      );

      if (data.status === "success") {
        setisLoading(false)
        setCartProducts([])
        setNumOfCartItems(0)
        setTotalCartPrice(0)
        setSuccess("Success")
        // console.log(data.session.url)
        setTimeout(() => {

          window.location.href = data?.session.url
        }, 1000)

      }

      return data;
    } catch (error) {
      setisLoading(false)
      seterror(error.response.data.message)

    }
  }







  /* formik and Validition of it */

  let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const formik = useFormik({
    initialValues: {
      "details": '',
      "phone": '',
      "city": '',
    },
    validationSchema: Yup.object({
      details: Yup.string().required('Details are required'),
      phone: Yup.string().matches(phoneRegExp, "phon is invalid").required("phone is required"),
      city: Yup.string().required('City is required'),
    }), validate: function () {
      seterror(null)
    },
    onSubmit: confirmOnlinePayment
  });



  function displayIcons(e) {
    // console.log(e.target);

    if (e.target.value.trim() !== "") {
      e.target.nextElementSibling.classList.add('d-none');
      e.target.nextElementSibling.classList.remove('d-block');
    } else {
      e.target.nextElementSibling.classList.remove('d-none');
      e.target.nextElementSibling.classList.add('d-block');
    }
  }


  useEffect(() => {
    window.scrollTo(0, 0);

    Aos.init({
      offset: 100,
      easing: 'ease-in-sine',
      delay: 0,
    });
  }, []);

  return (
    <>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Payment Online</title>
      </Helmet>

      <div className="register login">

        <div className='container '>
          <div className='row g-0'>


            <div className='form-container m-0'>
              {error ? <div className='alert alert-danger'>
                <i className='fa-solid fa-triangle-exclamation'></i>
                <div className="text">
                  <p>{error}</p>
                  <span>Please choose a different email address.</span>
                </div>

              </div>
                : ""}
              {success ? <div className='alert alert-success'>
                <i className="fa-solid fa-circle-check"></i>
                <div className="text">
                  <p>{success}</p>
                  <span>You can now visit the store</span>
                </div>

              </div>
                : ""}


              <h2 className='fw-bold pt-5' data-aos="fade-right" data-aos-duration="1000">Cheak Out  </h2>
              {/* onSubmit this form the method onsubmit call the function from formik */}
              <form onSubmit={formik.handleSubmit} data-aos="fade-left" data-aos-duration="1000" >
                <div className='item'>
                  {/* {formik.values.name ? <label htmlFor="name" >Full Name : </label> : ""} */}
                  <input type="text" className='form-control   ' name='details' id='details' value={formik.values.details} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Details' onKeyUp={displayIcons} />
                  <i className="fa-regular fa-comment icon-input"></i>
                  {formik.errors.details && formik.touched.details ? <span className='error'> <i className="fa-solid fa-circle-xmark"></i> {formik.errors.details}</span> : ''}
                  {!formik.errors.details && formik.touched.details ? <span className='is-valid text-success fw-bold'><i className="fa-solid fa-circle-check"></i> Your name has been approved </span> : ""}

                </div>




                <div className="item">
                  {/* {formik.values.phone ? <label htmlFor="phone" >Phone : </label> : " "} */}
                  <input type="tel" className='form-control ' name='phone' id='phone' value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Phone' onKeyUp={displayIcons} />
                  <i className="fa-solid fa-phone icon-input"></i>
                  {formik.errors.phone && formik.touched.phone ? <span className='error'><i className="fa-solid fa-circle-xmark"></i> {formik.errors.phone}</span> : ''}
                  {!formik.errors.phone && formik.touched.phone ? <span className='is-valid text-success fw-bold'><i className="fa-solid fa-circle-check"></i> Your phone number is Valid</span> : ""}


                </div>

                <div className='item'>
                  {/* {formik.values.name ? <label htmlFor="name" >Full Name : </label> : ""} */}
                  <input type="text" className='form-control   ' name='city' id='city' value={formik.values.city} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='City' onKeyUp={displayIcons} />
                  <i className="fa-solid fa-city icon-input"></i>
                  {formik.errors.city && formik.touched.city ? <span className='error'> <i className="fa-solid fa-circle-xmark"></i> {formik.errors.city}</span> : ''}
                  {!formik.errors.city && formik.touched.city ? <span className='is-valid text-success fw-bold'><i className="fa-solid fa-circle-check"></i> Your name has been approved </span> : ""}

                </div>



                <div className='btns'>
                  <button disabled={!(formik.isValid && formik.dirty)} type='submit' >{isLoading ? <LodingBtn /> : "Cheack Out"}</button>
                </div>


                <p className='member'> <Link to={'/'}> Return To Sgopping ? </Link></p>



              </form>
            </div>
          </div>













        </div>
      </div >

    </>
  );
}