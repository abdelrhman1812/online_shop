import React from 'react'
export default function Subscribe() {
  return <>

    <div className='subscribe-section'>
      <div className='container'>
        <div className='row'>

          <div className='col-md-6'>
            <div className='text'>
              <h6>SUBSCRIBE US NOW </h6>
              <p>Get latest news, updates and deals directly mailed to your inbox.</p>

            </div>
          </div>


          <div className='col-md-6'>
            <div className='input'>
              <input type="email" className='form-control' placeholder='Your Email Address Hear' />
              <button> Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </>

}
