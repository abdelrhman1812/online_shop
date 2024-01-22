import Aos from 'aos';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { CartContext } from '../../CartContext';
import { WishListContext } from '../../WishContext';
import Loading from '../loading/loading';

export default function WishList() {

  const { getLoggedUserWislist, removeProduct } = useContext(WishListContext)
  const { addProductToCart } = useContext(CartContext);
  const [allProducts, setAllProducts] = useState([])


  const [isLoading, setIsLoading] = useState(false)





  /* ========== Get Products In My Wish List ========== */
  async function getProductWishlist() {
    setIsLoading(true)

    try {
      let { data } = await getLoggedUserWislist()
      setIsLoading(false)
      setAllProducts(data.data)

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {

    getProductWishlist()
    window.scrollTo(0, 0);

    Aos.init({
      offset: 100,
      easing: 'ease-in-sine',
      delay: 0,
    });
  }, [])



  /* ========== Opraition ========== */

  /* remove */

  async function removeItem(id) {

    await removeProduct(id)

    console.log('====================================');
    getProductWishlist()

    toast.success(
      <div className="text-center">
        Your product has been successfully remove
      </div>,
      {
        duration: 5000,
        icon: (
          <div className="fa-2x text-danger">
            <i className="fa-solid fa-trash"></i>
          </div>
        ),
        position: "top-center",
      }
    );

  }

  /* add to cart */
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


  return <>

    <Helmet>
      <meta charSet="utf-8" />
      <title>Wish List</title>
    </Helmet>


    <div className='wishlist'>
      <div className='Ttanding-products'>
        <div className='container'>
          <h4>  <i className='fa fa-heart'></i>  Your Wishlist items : </h4>

          <div className='row gy-3'>


            {isLoading ? < Loading /> : ""}
            {allProducts.length === 0 ? <>
              <div className='empty-cart '>
                <i className='fa fa-shopping-cart'></i>
                <p>wishlist Is Empty &#128578; !</p>
                <button> Shop now </button>
              </div>

            </>
              : ""
            }
            {allProducts?.map((product, index) => <div key={product.id}
              data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
              data-aos-duration="1000"
              data-aos-delay={`${index * 100}`}

              className='col-6 col-md-4'>
              <div className='trand-item'>

                <div className='trand-img text-center overflow-hidden'>
                  <Link to={`/productdetails/${product.id}`}>

                    <img src={product.imageCover} alt={product.title} />
                  </Link>
                </div>

                <div className='trand-product-info'>

                  <div className='d-flex justify-content-between align-items-center'>
                    <h3 className='h6 d-inline-block'>{product.title.split(" ").slice(0, 2)}</h3>
                    <i onClick={() => removeItem(product.id)} className="fa-solid fa-trash fa-sm fav py-3 text-end  text-danger"  ></i>
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


  </>

}
