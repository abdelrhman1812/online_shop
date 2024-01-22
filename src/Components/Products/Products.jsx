import React from 'react';
import { Helmet } from 'react-helmet';
import AllProducts from '../AllProducts/AllProducts';


export default function Products() {



  return (


    <>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
      </Helmet>

      <div className="products">
        <div className='container'>
          <div className='row'>

          </div>
        </div>

        {/* Tap */}
        <div className='tap-btn mt-2'>

          <ul className="nav nav-pills  d-flex justify-content-center align-items-center" id="pills-tab" role="tablist">

            <div className='  item '>
              <li className="nav-item ptr" role="presentation">
                <button className="nav-link navlink  active " id="pills-All-tab" data-bs-toggle="pill" data-bs-target="#pills-All"
                  type="button" role="tab" aria-controls="pills-All" aria-selected="true">Men's </button>
              </li>
            </div>



            <div className="  item ">
              <li className="nav-item ptr" role="presentation">
                <button className="nav-link navlink " id="pills-women-tab" data-bs-toggle="pill" data-bs-target="#pills-women"
                  type="button" role="tab" aria-controls="pills-women" aria-selected="false">Women's </button>
              </li>

            </div>


            <div className=" item ">
              <li className="nav-item ptr" role="presentation">
                <button className="nav-link  navlink " id="pills-electronics-tab" data-bs-toggle="pill"
                  data-bs-target="#pills-electronics" type="button" role="tab" aria-controls="pills-electronics"
                  aria-selected="false">Electronics</button>
              </li>

            </div>




          </ul>

        </div>


        <div className="tab-content  mb-5 d-flex justify-content-center " id="pills-tabContent">

          {/* Men */}
          <div className="tab-pane fade show active" id="pills-All" role="tabpanel" aria-labelledby="pills-All-tab"
            tabIndex="0">
            <div className="container">
              <div className="row g-3">




                <AllProducts type="Men's Fashion" />


              </div>
            </div>
          </div>








          {/* Women */}
          <div className="tab-pane fade" id="pills-women" role="tabpanel" aria-labelledby="pills-women-tab"
            tabIndex="0">
            <div className="container">
              <div className="row g-3">
                <AllProducts type="Women's Fashion" />




              </div>
            </div>
          </div>


          {/* Elec */}


          <div className="tab-pane fade" id="pills-electronics" role="tabpanel" aria-labelledby="pills-Graphic-tab"
            tabIndex="0">
            <div className="container">
              <div className="row g-3">
                <AllProducts type="Electronics" />



              </div>
            </div>
          </div>



        </div>

      </div>

    </>
  );

}
