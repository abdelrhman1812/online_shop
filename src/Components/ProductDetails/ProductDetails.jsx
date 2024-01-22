import Aos from 'aos';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Slider from "react-slick";
import { CartContext } from '../../CartContext';
import { WishListContext } from '../../WishContext';
import Loading from '../loading/loading';

export default function ProductDetails() {


  /* ========== Context ========== */
  let { addProductToCart } = useContext(CartContext)
  let { addTowishList, wishlist, removeProduct, getLoggedUserWislist } = useContext(WishListContext)

  const [category, setCategory] = useState([])
  let navigate = useNavigate()
  /* params is use it to get id from path */
  let params = useParams()

  /* ===============  to use slider  ==================*/

  var settings = {
    fade: true,
    speed: 700,
    dots: true,
    arrows: false,
    autoplay: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  /* ===================  get product details ======================  */

  function getPrductDetails(id) {
    try {

      return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id} `)
    }
    catch (error) { console.log(error) }

  }

  let { isLoading, data } = useQuery('productDetails', () => getPrductDetails(params.id),

    {
      staleTime: 1000,
      refetchInterval: 200,
    }
  )






  /* ====================  Get Related Products ====================== */

  async function getRelated() {
    try {
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
      setCategory(data.data)

    } catch (error) { console.log(error) }
  }


  const filteredProducts = category?.filter((product) =>
    product.category["name"] === data?.data.data.category.name)


  /* ================== Opertion ================ */

  /* Add To Cart */

  async function addToCart(id) {

    await addProductToCart(id)
    toast.success(
      <div className="text-center">
        Your product has been successfully Added To Your Crat &#129303;
      </div>,
      {
        duration: 1000,
        icon: (
          <div className="fa-2x text-success">
            <i className="fa-solid fa-cart-arrow-down"></i>
          </div>
        ),
        position: "top-center",
      }
    );
  }


  /*  Add To WishList  */

  async function addProductToWishList(id) {

    await addTowishList(id)

    if (wishlist.includes(id)) {
      removeProduct(id);
      toast.success(
        <div className="text-center">
          Your product has been successfully remove from WishList &#129300;
        </div>,
        {
          duration: 2000,
          icon: (
            <div className="fa-2x text-danger">
              <i className="fa-solid fa-heart-crack"></i>
            </div>
          ),
          position: "top-center",
        }
      );
    }
    else {
      toast.success(
        <div className="text-center">
          Your product has been successfully Added To WishList &#129303;
        </div>,
        {
          duration: 2000,
          icon: (
            <div className="fa-2x text-danger">
              <i className="fa-solid fa-heart"></i>
            </div>
          ),
          position: "top-center",
        }
      );
    }
  }


  /* ==================== End Opertion =======================  */


  useEffect(() => {
    getRelated()
    getLoggedUserWislist();
    window.scrollTo(0, 0);

    Aos.init({
      offset: 100,
      easing: 'ease-in-sine',
      delay: 0,
    });

  }, [])


  const handelScroll = () => {

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }


  return <>



    <Helmet>
      <meta charSet="utf-8" />
      <title>{data?.data.data.category.name}</title>
    </Helmet>

    <div className='product-details  '>
      <div className='container '>

        {isLoading ? <Loading /> : ""}

        <div className='row '>

          <div className='col-12 col-md-6 my-5   '>
            <div className='images ' data-aos="fade-right" data-aos-duration="1000">

              <Slider {...settings}>
                {data?.data.data.images.map((img) => <img key={data.data.data.id} src={img} className='w-100 ' alt={data.data.data.title} />)}
              </Slider>
            </div>


          </div>


          <div className="col-12 col-md-6 d-flex  align-items-center " data-aos="fade-left" data-aos-duration="1000">
            <div className='product-data '>
              <h2>  {data?.data.data.title} </h2>

              <span className='star  d-block'> <i className='fa fa-star text-warning'></i> <i className='fa fa-star text-warning'></i> <i className='fa fa-star text-warning'></i> <i className='fa fa-star text-warning'></i> <i className="fa-solid fa-star-half-stroke text-warning"></i>  ( {data?.data.data.ratingsAverage} ratingsQuantity )</span>
              <p>{data?.data.data.description}</p>
              <span className='category'>{data?.data.data.category.name}</span>

              <div className='d-flex justify-content-between align-items-center w-100'>
                <span className='price'> <span className='price-text'>EGY</span>  {data?.data.data.price}</span>
                <button onClick={() => addToCart(data.data.data.id)} ><i className='fa fa-shopping-cart'></i> Add To cart</button>
              </div>

            </div>

          </div>

        </div>
      </div>
      <hr />

      {/* related */}
      <div className="related">

        <div className='Ttanding-products'>
          <div className='container'>

            <div className='row gy-3'>

              <h2 className='p-5' data-aos="zoom-in" data-aos-duration="1000">Similar Products </h2>
              {isLoading ? <Loading /> : ""}
              {filteredProducts.map((product, index) => <div key={product.id}
                data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
                data-aos-duration="1000"
                data-aos-delay={`${index * 100}`}
                className=' col-md-4'>
                <div className='trand-item'>

                  <div className='trand-img text-center overflow-hidden '>
                    <Link to={`/productdetails/${product.id}`} onClick={handelScroll}>

                      <img onClick={() => navigate(`/productdetails/${product.id}`)} src={product.imageCover} alt={product.title} />
                    </Link>
                  </div>

                  <div className='trand-product-info my-3'>

                    <div className='d-flex justify-content-between align-items-center'>
                      <h3 className='h6 d-inline-block'>{product.title.split(" ").slice(0, 2)}</h3>
                      <i className='fa fa-star text-warning'> <span > {product.ratingsAverage}</span></i>

                      <i onClick={() => addProductToWishList(product.id)} className={` fa-solid fa-heart fa-sm fav py-3 text-end  ${wishlist.includes(product.id) ? " text-danger" : "text-main"}  `}></i>
                    </div>

                    <span className='d-block'>{product.category.name}</span>

                    <div className='trand-product-price'>
                      <p>EGY {product.price}</p>
                      <i onClick={() => addToCart(product.id)} className="fa-solid fa-cart-arrow-down fa-flip-horizontal"></i>
                    </div>

                  </div>
                </div>
              </div>)}



            </div>
          </div>
        </div>


      </div>
    </div>


  </>

}
