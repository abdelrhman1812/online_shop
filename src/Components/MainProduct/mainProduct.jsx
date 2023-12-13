import React, { useState } from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
export default function MainProduct() {
  const [loading, setLoading] = useState(true)

  /* Get products  */
  async function getFeaturedProducts() {
    setLoading(true)
    try {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      return response.data.data;

    } catch (error) {
      setLoading(false)
    }
  }

  const { isLoading, data } = useQuery('featuredProducts', getFeaturedProducts);


  if (isLoading) {

    return <>

      <div className='componentLoading d-flex justify-content-center align-items-center py-5 overflow-hidden'>
        <div className="spinner"></div>

      </div>



    </>
  }


  /* display data */
  return <>
    <div className='main-products overflow-hidden'>
      {loading ? <>
        <div className='container'>

          <div className='row my-5  py-3  gy-3 overflow-hidden'>
            {data?.slice(27, 30).map((product) => <div key={product.id} className='col-sm-6  col-lg-4 mx-auto text-center'>

              <div className="main-product  rounded-2  mx-auto overflow-hidden ">
                <div className=" image  position-relative overflow-hidden ">
                  <div className='layout position-absolute start-0 end-0 top-0 bottom-0 '>

                  </div>


                  <img src={product.imageCover} className=' w-50' alt={product.title} />

                </div>
                <div className="title">
                  <span className="">{product.title.split(' ').splice(0, 2).join(' ')}</span>
                </div>

              </div>



            </div>
            )}



          </div>
        </div>
      </> : " "}

    </div>
  </>

}
