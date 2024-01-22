import Aos from 'aos';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Loading from '../loading/loading';
export default function Categories() {




  /* get All Categories */

  async function getCategories() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      // console.log('Abdelrhman')
      return data.data

    } catch (error) {
      console.log(error.message)

    }

  }


  let { isLoading, data } = useQuery('category', getCategories)



  useEffect(() => {
    window.scrollTo(0, 0);

    Aos.init({
      offset: 100,
      easing: 'ease-in-sine',
      delay: 0,
    });


  }, [])

  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Category</title>
    </Helmet>



    <div className="categoreis">

      <div className='container'>



        <div className='links'>
          {data?.slice(7).map((category) => <Link data-aos="zoom-in" data-aos-duration="1000" key={category._id} to={``}>
            {category.name}</Link>)}
        </div>
        <div className='row gy-4 mt-2'>
          {data?.map((category, index) => <div key={category._id}
            data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
            data-aos-duration="1000"
            data-aos-delay={`${index * 100}`}
            className=' col-md-4 col-lg-3 '>
            {isLoading ? <Loading /> : " "}
            <div className='category-data'>
              <div className="image position-relative">
                <img src={category.image} className='w-100 ' alt={category.name} />
                <div className='position-absolute start-0 end-0 top-0 bottom-0 over-lay-category '>
                  <button>Details</button>

                </div>
              </div>
              <h6>{category.name} </h6>
            </div>



          </div>)}
        </div>
      </div>


    </div>






  </>

}
