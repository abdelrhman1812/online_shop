import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import { CartContext } from '../../CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import logo from '../../Assets/images/logo-main.png'

export default function Payment() {
  const [loading, setloading] = useState(false)


  let navigate = useNavigate()

  /* from Cart Context  */
  const
    { cartId,
      setNumOfCartItems,
      setTotalCartPrice,
      setCartProducts
    }
      = useContext(CartContext);

  /*confirmCashPayment  */

  async function confirmCashPayment(values) {
    setloading(true)
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress: values },
        { headers: { token: localStorage.getItem('userToken') } }
      );

      if (data.status === "success") {
        setloading(false)

        toast.success("success ");
        setCartProducts([])
        setNumOfCartItems(0)
        setTotalCartPrice(0)
        navigate('/allorders')



      }
      else {
        toast.error("error")
      }
      console.log(values);
      console.log(data)
      return data;
    } catch (error) {
      return error;
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
    }),
    onSubmit: confirmCashPayment
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Payment Cash</title>
      </Helmet>

      <div className='payment-online'>
        {loading ? <>
          <div className='position-fixed d-flex align-items-center justify-content-center end-0 start-0 top-0 bottom-0 over-lay'  >

            <img src={logo} alt="logo" className='w-50 ' />
          </div> </> : ""}
        <div className='container'>

          <div className='row shadow p-3 bg-white w-75 mx-auto rounded-3   '>



            <h1 className='text-center'>Shopping Address :</h1>
            <form onSubmit={formik.handleSubmit}>

              {/* Details */}

              <label htmlFor='details' className='fw-bold my-3'>Details:</label>
              <textarea
                type='text'
                className='form-control mb-2'
                name='details'
                id='details'
                value={formik.values.details}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.details && formik.errors.details && (
                <div className='text-danger text-center fw-bold my-2 '>{formik.errors.details}</div>
              )}
              {/* Phone */}
              <label htmlFor="phone" className='fw-bold my-3'>Phone : </label>
              <input
                type='text'
                className='form-control mb-2'
                name='phone'
                id='phone'
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className='text-danger text-center fw-bold my-2 '>{formik.errors.phone}</div>
              )}

              {/* city */}
              <label htmlFor='city' className='fw-bold my-3'>City:</label>
              <input
                type='text'
                className='form-control mb-2'
                name='city'
                id='city'
                value={formik.values.city}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.city && formik.errors.city && (
                <div className='text-danger text-center fw-bold my-2 '>{formik.errors.city}</div>
              )}

              {/* btn  */}
              <button disabled={!(formik.isValid && formik.dirty)} className='btn btn-outline-success w-100 mt-2' >
                Confirm Cash Payment
              </button>
            </form>
          </div>
        </div>
      </div>

    </>
  );
}