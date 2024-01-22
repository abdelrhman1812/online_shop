import React, { useEffect, useState } from 'react'

import Aos from 'aos'
import axios from 'axios'
import { useFormik } from 'formik'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import LodingBtn from '../LodingBtn/LodingBtn'

export default function Verify() {
  const [isLoading, setisLoading] = useState(false)
  const [error, seterror] = useState(null)
  const [success, setSuccess] = useState(null)

  let navigate = useNavigate()
  async function resetPassword(values) {
    try {
      setisLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      );

      console.log(data);

      if (data.status === 'Success') {
        setisLoading(false)
        setSuccess("Success")
        setTimeout(() => {

          navigate('/rePassword');
        }, 1000)
      }
    } catch (error) {
      setisLoading(false)

      console.error('An error occurred during the password reset:', error);
      console.log(error.response.data.message);
      seterror(error.response.data.message + " cheak your email")

    }
  }



  let verfiyFormik = useFormik({


    initialValues: {
      resetCode: ""
    }, validate: function () {
      seterror(null)
    },

    onSubmit: resetPassword

  })



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

  return <>

    <Helmet>
      <meta charSet="utf-8" />
      <title>Verifiy</title>
    </Helmet>
    <div className="register padding ">
      <div className='container '>
        <div className='row g-0'>
          <div className='form-container m-0'>
            {error ? <div className='alert alert-danger'>
              <i className='fa-solid fa-triangle-exclamation'></i>
              <div className="text">
                <p>{error}</p>
                {/* <span>Please Cheack Your Email</span> */}
              </div>

            </div>
              : ""}
            {success ? <div className='alert alert-success'>
              <i className="fa-solid fa-circle-check"></i>
              <div className="text">
                <p>{success}</p>
                <span>You Can Now Rest Password</span>
              </div>

            </div>
              : ""}


            <h2 className='fw-bold'> Send Code  </h2>
            <form onSubmit={verfiyFormik.handleSubmit} data-aos="fade-right" data-aos-duration="1000" >

              <div className='item'>
                <input type="text" className='form-control ' name='resetCode' id='resetCode' value={verfiyFormik.values.email} onBlur={verfiyFormik.handleBlur} onChange={verfiyFormik.handleChange} placeholder='Code' onKeyUp={displayIcons} />
                <i className="fa-solid fa-user-nurse icon-input"></i>
                {verfiyFormik.errors.resetCode && verfiyFormik.touched.resetCode ? <span className='error'><i className="fa-solid fa-circle-xmark"></i> {verfiyFormik.errors.resetCode}</span> : ''}
              </div>




              <div className='btns'>
                <button disabled={!(verfiyFormik.isValid && verfiyFormik.dirty)} type='submit'>
                  {isLoading ? <LodingBtn /> : "Send Code"}
                </button>
              </div>
              <p className='member'> Return To  ? <Link to={'/login'}> Login </Link></p>



            </form>
          </div>
        </div>













      </div>
    </div>

  </>

}
