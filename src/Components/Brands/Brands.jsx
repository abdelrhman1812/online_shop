import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Vortex } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import logo from '../../Assets/images/logo-main.png'
import { Helmet } from 'react-helmet'
import PageSlider from '../pageSlider/pageSlider'
import Slider from "react-slick";

export default function Brands() {



  let [brandDetail, setBrandDetail] = useState(null)



  /* Slider */
  var settings = {
    autoplay: true,
    infinite: true,
    speed: 100,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };


  /* Get All Brands */

  function getBrands() {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }


  let { data, isLoading } = useQuery('brands', getBrands)
  console.log(data)


  async function getSubBrands(id) {

    try {
      let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);


      const brands = response.data.data;
      setBrandDetail(brands);
      // console.log(Abdelrhman)
      // brandDetail.push(brands)
    } catch (error) {
      console.error(error);
    }
  }


  function show(none, flex) {

    document.getElementById("img-brand").classList.replace(none, flex)
  }




  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Brands</title>
    </Helmet>







    {isLoading ? <>

      <div className='componentLoading d-flex justify-content-center align-items-center py-5 overflow-hidden'>
        <div className="spinner"></div>

      </div>

    </> : ""}


    <section className='brands position-relative'>
      <div className='container '>


        <div className='row'>
          <Slider {...settings}>

            {data?.data.data.map((product) => <div onClick={() => getSubBrands(product._id)} key={product._id} className='   overflow-hidden '>
              <div onClick={() => show("d-none", "d-flex")} className="brands-cart ">
                <div className="brands-cart-img-container">
                  <div className="brands-cart-img ">
                    <img src={product.image} className='w-100' alt="" />
                  </div>
                </div>
                <div className='w-75 mx-auto brand-img '>
                  <img src={product.image} className='w-100 transition-all' alt={product.name} />
                </div>

              </div>
            </div>)}

          </Slider>
        </div>

      </div>


      {/* show  brand by id */}

      <div id='img-brand' className='img-brand position-fixed vh-100  top-0 start-0 bottom-0 end-0 d-flex align-items-center justify-content-center d-none '>


        {brandDetail !== null ?
          <div className="brands-id   ">
            <div className="image overflow-hidden rounded-3 position-relative">
              <i onClick={() => show("d-flex", "d-none")} class="fa-regular  fa-2xl fa-rectangle-xmark position-absolute end-0 my-3 text-success"></i>
              <img src={brandDetail.image} className='w-100 transition-all' alt="" />

            </div>
            <div className="brands-id-info">
              <span>{brandDetail.name}</span>
            </div>

          </div>

          :


          ""
        }

      </div>

    </section>





  </>

}