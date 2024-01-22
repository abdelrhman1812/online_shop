import Aos from 'aos'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../../CartContext'
import { WishListContext } from '../../WishContext'
import Footer from '../Footer/Footer'
import MainSlider from '../MainSlider/MainSlider'
import Navbar from '../Navbar/Navbar'
import ProductSale from '../ProductSale/PorductSale'
import Subscribe from '../Subscribe/Subscribe'
import Testimonial from '../Testimonial/Testimonial'
import Loading from '../loading/loading'

export default function Fake() {



  let navigate = useNavigate()



  /* ========= Context ========= */
  let { addProductToCart } = useContext(CartContext)
  let { wishlist } = useContext(WishListContext)



  /* ================== Get Products ======================= */

  async function getTrandingProducts() {
    try {
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
      // console.log("Abdelrhman")
      return data.data
    }
    catch (error) { console.log(error) }

  }
  let { data, isLoading } = useQuery("trandingProducts", getTrandingProducts)



  /* ================== Add To Cart ======================= */

  async function addToCart(id) {

    await addProductToCart(id)
    toast.success(
      <div className="text-center">
        Please login first to add the product to wishlist
      </div>,
      {
        duration: 2000,
        icon: (
          <div className="fa-2x text-danger">
            <i class="fa-solid fa-right-from-bracket"></i>
          </div>
        ),
        position: "top-center",
      }
    );
    setTimeout(() => {

      navigate('/login')
    }, 2000)
  }


  /* ================== Add To WishList ======================= */

  async function addProductToWishList(id) {


    toast.success(
      <div className="text-center">
        Please login first to add the product to wishlist
      </div>,
      {
        duration: 2000,
        icon: (
          <div className="fa-2x text-danger">
            <i class="fa-solid fa-right-from-bracket"></i>
          </div>

        ),
        position: "top-center",
      }
    );
    setTimeout(() => {

      navigate('/login')
    }, 2000)
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
    <Navbar />
    <MainSlider />

    <div className='Ttanding-products'>
      <div className='container'>

        <div className='row gy-3 '>

          <h2>Trending Products</h2>
          {isLoading ? <Loading /> : ""}


          {data?.slice(35, 39).map((product, index) => <div key={product.id}

            data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
            data-aos-duration="1000"
            data-aos-delay={`${index * 100}`}
            className='col-md-6 col-lg-3'>
            <div className='trand-item '>

              <div className='trand-img  overflow-hidden  text-center  '>
                <Link to={`/productdetails/${product.id}`}>

                  <img src={product.imageCover} alt={product.title} loading={product.title} />
                </Link>
              </div>

              <div className='trand-product-info'>
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



    <ProductSale />

    <div className='Ttanding-products py-5'>
      <div className='container'>
        <div className='row gy-3'>
          <h2>Best Sales</h2>
          {isLoading ? <Loading /> : ""}

          {data?.slice(2, 8).map((product, index) => <div key={product.id}
            data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
            data-aos-duration="1000"
            data-aos-delay={`${index * 100}`}
            className=' col-md-4'>
            <div className='trand-item'>
              {/* Img */}
              <div className='trand-img text-center overflow-hidden'>
                <Link to={`/productdetails/${product.id}`}>
                  <img src={product.imageCover} className="" alt={product.title} />
                </Link>
              </div>

              {/* product-data */}
              <div className='trand-product-info'>
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

    <Testimonial />
    <Subscribe />
    <Footer />

  </>

}