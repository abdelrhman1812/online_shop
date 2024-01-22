import Aos from 'aos'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import LodingBtn from '../LodingBtn/LodingBtn'

export default function Register() {

  /* =========== Use State ========== */

  const [show, setShow] = useState(false)
  const [success, setSuccess] = useState(null)
  const [isLoading, setisLoading] = useState(false)


  let eye = useRef(null)
  let navigate = useNavigate()
  const [error, seterror] = useState(null)

  /* ========== Register Submit ========== */
  async function registerSubmit(values) {
    setisLoading(true)
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setisLoading(false)
        // console.log(err.response.data.message)
        seterror(err.response.data.message)
      })
    if (data.message === "success") {
      setisLoading(false)
      setSuccess("Success")
      setTimeout(() => {
        navigate('/login')
      }, 1000)

    }
  }


  /* ========== Validation ========== */
  let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  let validationSchema = Yup.object({

    name: Yup.string().min(3, "Your Name Must be More then 3 characters").max(10, "Your Name Must be less then 10 characters").required("Name must be requird"),
    email: Yup.string().email("Enter Email vaild").required("Email must be required"),
    phone: Yup.string().matches(phoneRegExp, " Enter Egyptian Number").required("phone is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, "Password Start With uppercase letter and Must be More then 3 characters").required("Enter Your Phone"),
    rePassword: Yup.string().oneOf([Yup.ref("password")], "repassword must be eqiul password").required("repassword must be required"),
  })
  let formik = useFormik({

    //take for me inputs that i neede it
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: ""

    }, validationSchema, validate: function () {
      seterror(null)
    },
    onSubmit: registerSubmit,

  })


  /* ========== Display Icons ========== */

  function displayIcons(e) {
    // console.log(e.target);
    let eYe = eye.current

    if (e.target.value.trim() !== "") {
      e.target.nextElementSibling.classList.add('d-none');
      e.target.nextElementSibling.classList.remove('d-block');
      eYe.classList.remove('d-none');


    } else {
      e.target.nextElementSibling.classList.remove('d-none');
      e.target.nextElementSibling.classList.add('d-block');
      eYe.classList.add('d-none');


    }
  }


  /* ========== Display Eye ========== */
  function displayEye() {
    setShow(!show)
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

      <title>Register</title>
    </Helmet>
    <div className="register ">

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


            <h2 data-aos="fade-left" data-aos-duration="1000" className='fw-bold'>Register  </h2>
            <p data-aos="fade-left" data-aos-duration="1000">To keep connected with us please register to our website    </p>
            {/* onSubmit this form the method onsubmit call the function from formik */}
            <form onSubmit={formik.handleSubmit} data-aos="fade-left" data-aos-duration="1000" >
              <div className='item'>
                {/* {formik.values.name ? <label htmlFor="name" >Full Name : </label> : ""} */}
                <input type="text" className='form-control   ' name='name' id='name' value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Name' onKeyUp={displayIcons} />
                <i className='fa fa-user icon-input '></i>
                {formik.errors.name && formik.touched.name ? <span className='error'> <i className="fa-solid fa-circle-xmark"></i> {formik.errors.name}</span> : ''}
                {!formik.errors.name && formik.touched.name ? <span className='is-valid text-success fw-bold'><i className="fa-solid fa-circle-check"></i> Your name has been approved </span> : ""}

              </div>


              <div className='item'>

                {/* {formik.values.email ? <label htmlFor="email" >Email : </label> : " "} */}
                <input type="email" className='form-control ' name='email' id='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Email' onKeyUp={displayIcons} />
                <i className="fa-solid fa-at icon-input"></i>
                {formik.errors.email && formik.touched.email ? <span className='error'><i className="fa-solid fa-circle-xmark"></i> {formik.errors.email}</span> : ''}
                {!formik.errors.email && formik.touched.email ? <span className='is-valid text-success fw-bold'><i className="fa-solid fa-circle-check"></i> Your email is Valid</span> : ""}


              </div>

              <div className="item">
                {/* {formik.values.phone ? <label htmlFor="phone" >Phone : </label> : " "} */}
                <input type="tel" className='form-control ' name='phone' id='phone' value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Phone' onKeyUp={displayIcons} />
                <i className="fa-solid fa-phone icon-input"></i>
                {formik.errors.phone && formik.touched.phone ? <span className='error'><i className="fa-solid fa-circle-xmark"></i> {formik.errors.phone}</span> : ''}
                {!formik.errors.phone && formik.touched.phone ? <span className='is-valid text-success fw-bold'><i className="fa-solid fa-circle-check"></i> Your phone number is Valid</span> : ""}


              </div>

              <div className="item">
                {/* {formik.values.password ? <label htmlFor="password" >Password : </label> : " "} */}
                <input type={show ? "text" : "password"} className='form-control ' name='password' id='password' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Password' onKeyUp={displayIcons} />
                <i className="fa-solid fa-lock icon-input"></i>
                <i ref={eye} onClick={displayEye} className="fa-solid fa-eye icon-input d-none"></i>
                {formik.errors.password && formik.touched.password ? <span className='error'><i className="fa-solid fa-circle-xmark"></i> {formik.errors.password}</span> : ''}
                {!formik.errors.password && formik.touched.password ? <span className='is-valid text-success fw-bold'><i className="fa-solid fa-circle-check"></i> Your password is Valid </span> : ""}


              </div>

              <div className="item">
                {/* {formik.values.rePassword ? <label htmlFor="rePassword" >rePassword : </label> : " "} */}
                <input type="password" className='form-control ' name='rePassword' id='rePassword' value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Repassword' onKeyUp={displayIcons} />
                <i className="fa-solid fa-rotate-left icon-input"></i>
                {formik.errors.rePassword && formik.touched.rePassword ? <spn className='error'><i className="fa-solid fa-circle-xmark"></i> {formik.errors.rePassword}</spn> : ''}
                {!formik.errors.rePassword && formik.touched.rePassword ? <span className='is-valid text-success fw-bold'><i className="fa-solid fa-circle-check"></i> Your Re-password is matched </span> : ""}



              </div>


              <div className='btns'>
                <button disabled={!(formik.isValid && formik.dirty)} type='submit' >{isLoading ? <LodingBtn /> : "Regsiter"}</button>
              </div>


              <p className='member'>Aleady a member ? <Link to={'/login'}> Login </Link></p>



            </form>
          </div>
        </div>













      </div>
    </div>




  </>

}
