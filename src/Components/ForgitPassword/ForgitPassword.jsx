import Aos from 'aos'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import LodingBtn from '../LodingBtn/LodingBtn'

export default function ForgitPassword() {


  let navigate = useNavigate()
  const [isLoading, setisLoading] = useState(false)
  const [error, seterror] = useState(null)
  const [success, setSuccess] = useState(null)


  /* ---------- send code -------- */
  async function sendCode(values) {

    setisLoading(true)
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
      if (data.statusMsg === 'success') {
        setisLoading(false)
        setSuccess("Success")
        console.log("abdelrhman")
        setTimeout(() => {
          navigate('/verify')
        }, 1000)

      }
      return data
    } catch (error) {
      console.error(error)
      setisLoading(false)
      seterror(error.response.data.message)
    }



  }


  let validationSchema = Yup.object({
    email: Yup.string().email("Enter Email vaild").required("Email Must be required"),

  })



  let formik = useFormik({
    initialValues: {
      email: ""
    }, validationSchema, validate: function () {
      seterror(null)
    },
    onSubmit: sendCode

  })




  useEffect(() => {
    window.scrollTo(0, 0);

    Aos.init({
      offset: 100,
      easing: 'ease-in-sine',
      delay: 0,
    });
  }, []);



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





  return <>

    <Helmet>
      <meta charSet="utf-8" />
      <title>Forgot Password</title>
    </Helmet>


    <div className="register padding">
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
                <span>Cheack You Gmail</span>
              </div>

            </div>
              : ""}


            <h2 className='fw-bold'>Forgot Password  </h2>
            <form onSubmit={formik.handleSubmit} data-aos="fade-right" data-aos-duration="1000" >



              <div className='item'>
                {/* {formik.values.email ? <label htmlFor="email" >Email : </label> : " "} */}
                <input type="email" className='form-control ' name='email' id='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Email' onKeyUp={displayIcons} />
                <i className="fa-solid fa-at icon-input"></i>
                {formik.errors.email && formik.touched.email ? <span className='error'><i className="fa-solid fa-circle-xmark"></i> {formik.errors.email}</span> : ''}
                {!formik.errors.email && formik.touched.email ? <span className='is-valid text-success fw-bold'><i className="fa-solid fa-circle-check"></i> Your email is Valid</span> : ""}
              </div>




              <div className='btns'>
                <button disabled={!(formik.isValid && formik.dirty)} type='submit'>
                  {isLoading ? <LodingBtn /> : "Send"}
                </button>              </div>
              <p className='member'> Return To  ? <Link to={'/login'}> Login </Link></p>



            </form>
          </div>
        </div>













      </div>
    </div>

  </>



}



