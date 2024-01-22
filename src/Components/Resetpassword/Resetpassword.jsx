import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'

import Aos from 'aos'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import LodingBtn from '../LodingBtn/LodingBtn'

export default function Resetpassword() {



  const [success, setSuccess] = useState(null)

  let navigate = useNavigate()
  const [error, seterror] = useState(null)
  const [isLoading, setisLoading] = useState(false)

  async function resetNewPassword(values) {
    setisLoading(true)

    try {

      let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)

      setisLoading(false)
      setSuccess("Success")
      setTimeout(() => {

        navigate('/login');
      }, 1000)
    } catch (error) {
      setisLoading(false)
      seterror(error.response.data.message + " Enter your email valid")
    }


  }


  let validationSchema = Yup.object({
    email: Yup.string().email("Enter Email vaild").required("Email Must be required"),
    newPassword: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, "Enter Your Password Start With uppercase letter and Must be More then 3 characters ").required("Password  must be required"),

  })
  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: ""
    }, validationSchema, validate: function () {
      seterror(null)
    },

    onSubmit: resetNewPassword

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
      <title>Reset Password</title>
    </Helmet>
    <div className="register login  padding">
      <div className='container '>
        <div className='row g-0'>


          <div className='form-container m-0'>

            {error ? <div className='alert alert-danger'>
              <i className='fa-solid fa-triangle-exclamation'></i>
              <div className="text">
                <p>{error}</p>
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

            <h2 className='fw-bold'>Reset Password </h2>
            <p>Let's get started for free</p>
            {/* onSubmit this form the method onsubmit call the function from formik */}
            <form onSubmit={formik.handleSubmit} data-aos="fade-left" data-aos-duration="1000" >



              <div className='item'>

                {/* {formik.values.email ? <label htmlFor="email" >Email : </label> : " "} */}
                <input type="email" className='form-control ' name='email' id='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Email' onKeyUp={displayIcons} />
                <i className="fa-solid fa-at icon-input"></i>
                {formik.errors.email && formik.touched.email ? <span className='error'><i className="fa-solid fa-circle-xmark"></i> {formik.errors.email}</span> : ''}
                {!formik.errors.email && formik.touched.email ? <span className='is-valid text-success fw-bold'><i className="fa-solid fa-circle-check"></i> Your email is Valid</span> : ""}


              </div>



              <div className="item">
                {/* {formik.values.password ? <label htmlFor="password" >Password : </label> : " "} */}
                <input type="password" className='form-control ' name='newPassword' id='newPassword' value={formik.values.newPassword} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='New Password' onKeyUp={displayIcons} />
                <i className="fa-solid fa-lock icon-input"></i>
                {formik.errors.newPassword && formik.touched.newPassword ? <span className='error'><i className="fa-solid fa-circle-xmark"></i> {formik.errors.newPassword}</span> : ''}
                {!formik.errors.newPassword && formik.touched.newPassword ? <span className='is-valid text-success fw-bold'><i className="fa-solid fa-circle-check"></i> Your newPassword is Valid </span> : ""}


              </div>



              <div className='btns ' >
                {/* <Link className='member' to={'/forgetPassword'}>Forget password ?</Link> */}
                <button disabled={!(formik.isValid && formik.dirty)} type='submit' >  {isLoading ? <LodingBtn /> : "Rest Password"}      </button>
              </div>

              {/* 
              <div className="icons">
                <p>or Login useing</p>
                <div className="icon">
                  <div>

                    <i className='fa-brands fa-facebook-f text-bg-primary'></i>
                  </div>
                  <div>

                    <i className='fa-brands fa-twitter text-bg-info text-light'></i>
                  </div>
                  <div>

                    <i className='fa-brands fa-google text-bg-danger'></i>
                  </div>
                </div>
                <h5>Create a new account ?   <Link to={'/register'}> Register </Link></h5>

              </div> */}



            </form>
          </div>
        </div>













      </div>
    </div>
  </>

}
