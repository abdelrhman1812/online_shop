import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContxet } from '../../userContext'
import { Helmet } from 'react-helmet'
import LodingBtn from '../LodingBtn/LodingBtn'

export default function Login() {

  let { userToken, setUserToken } = useContext(UserContxet)
  const [success, setSuccess] = useState(null)

  let navigate = useNavigate()
  const [error, seterror] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  async function loginSubmit(values) {
    setisLoading(true)

    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setisLoading(false)

        // console.log(err.response.data.message)
        seterror(err.response.data.message + " try agin enter valid email and password")
      })
    if (data.message === "success") {
      // console.log(data.token)
      setisLoading(false)
      setSuccess("Success")
      setTimeout(() => {
        navigate('/')

      }, 1000)

      localStorage.setItem("userToken", data.token)
      setUserToken(data.token)
      console.log(userToken)


    }
  }






  let validationSchema = Yup.object({

    email: Yup.string().email("Enter Email vaild").required("Email must be required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, "Enter Your Password Start With uppercase letter and Must be More then 3 characters ").required("Password  must be required"),




  })
  let formik = useFormik({

    //take for me inputs that i neede it
    initialValues: {
      email: "",
      password: "",

    }, validationSchema, validate: function () {
      seterror(null)

    },
    onSubmit: loginSubmit




  })


  function displayIcons(e) {
    console.log(e.target);

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
      <title>Login</title>
    </Helmet>

    <div className="register login ">
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

            <h2 className='fw-bold'>Log in </h2>
            <p>Let's get started for free</p>
            {/* onSubmit this form the method onsubmit call the function from formik */}
            <form onSubmit={formik.handleSubmit} >



              <div className='item'>

                {/* {formik.values.email ? <label htmlFor="email" >Email : </label> : " "} */}
                <input type="email" className='form-control ' name='email' id='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Email' onKeyUp={displayIcons} />
                <i className="fa-solid fa-at icon-input"></i>
                {formik.errors.email && formik.touched.email ? <span className='error'><i className="fa-solid fa-circle-xmark"></i> {formik.errors.email}</span> : ''}
                {!formik.errors.email && formik.touched.email ? <span className='is-valid text-success fw-bold'><i className="fa-solid fa-circle-check"></i> Your email is Valid</span> : ""}


              </div>



              <div className="item">
                {/* {formik.values.password ? <label htmlFor="password" >Password : </label> : " "} */}
                <input type="password" className='form-control ' name='password' id='password' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Password' onKeyUp={displayIcons} />
                <i className="fa-solid fa-lock icon-input"></i>
                {formik.errors.password && formik.touched.password ? <span className='error'><i className="fa-solid fa-circle-xmark"></i> {formik.errors.password}</span> : ''}
                {!formik.errors.password && formik.touched.password ? <span className='is-valid text-success fw-bold'><i className="fa-solid fa-circle-check"></i> Your password is Valid </span> : ""}


              </div>



              <div className='btns ' >
                <Link className='member' to={'/forgetPassword'}>Forget password ?</Link>
                <button disabled={!(formik.isValid && formik.dirty)} type='submit' >  {isLoading ? <LodingBtn /> : "Login"}      </button>
              </div>


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

              </div>



            </form>
          </div>
        </div>













      </div>
    </div>

  </>

}
