import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from 'react-slick';
import Loading from '../loading/loading';
import { Link } from 'react-router-dom';

export default function CategorySlider() {


  /* Slider */

  var settings = {
    autoplay: true,
    infinite: true,
    speed: 100,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,

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

  /* Get Category */

  async function getCategory() {
    try {

      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  let { isLoading, data } = useQuery('category', getCategory);


  /* Display Data */
  return (

    <>
      <div className='category-sliders '>
        <div className='container'>
          <div className='row '>
            {/* <h2>Our Category</h2> */}
            <div className='container-category'>
              {isLoading ? <Loading /> : null}
              <Slider {...settings}>
                {data?.map((category) => <div key={category._id} className="category-slider ">
                  <div className="image ">
                    <Link to={`/subcategoris/${category._id}`}>
                      <img src={category.image} alt={category.name} />

                    </Link>
                  </div>
                </div>

                )}
              </Slider>

            </div>


          </div>
        </div>

      </div>
    </>
  );
}