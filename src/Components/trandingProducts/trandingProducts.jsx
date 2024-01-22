import Aos from 'aos'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { CartContext } from '../../CartContext'
import { WishListContext } from '../../WishContext'
import Loading from '../loading/loading'
export default function TrandingProducts() {


  /* ========= Context ========= */
  let { addProductToCart } = useContext(CartContext)
  let { addTowishList, wishlist, removeProduct, getLoggedUserWislist } = useContext(WishListContext)



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


  /* ================== Add To WishList ======================= */

  async function addProductToWishList(id) {

    await addTowishList(id)

    if (wishlist.includes(id)) {
      removeProduct(id);
      toast.success(
        <div className="text-center">
          Your product has been successfully remove from WishList &#129300;
        </div>,
        {
          duration: 1000,
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
          duration: 1000,
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
  useEffect(() => {
    getLoggedUserWislist();
    Aos.init({
      offset: 100,
      easing: 'ease-in-sine',
      delay: 0,
    });
  }, []);





  return <>

    <div className='Ttanding-products'>
      <div className='container'>

        <div className='row gy-3 '>

          <h2>Trending <span>Products</span></h2>
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

  </>

}
