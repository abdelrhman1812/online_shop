import Aos from 'aos';
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../CartContext';
import { WishListContext } from '../../WishContext';
import Loading from '../loading/loading';

export default function AllProducts(props) {
  const { addProductToCart } = useContext(CartContext);
  const { addTowishList, wishlist, removeProduct, getLoggedUserWislist } = useContext(WishListContext);

  /* ================== Get All Products ==========================  */
  async function getFeaturedProducts() {
    const response = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    return response.data.data;
  }

  const { isLoading, data } = useQuery('featuredProducts', getFeaturedProducts);

  const filteredProducts = data?.filter((product) => product.category.name === props.type);

  useEffect(() => {
    getLoggedUserWislist();
    Aos.init({
      offset: 100,
      easing: 'ease-in-sine',
      delay: 0,
    });
  }, [getLoggedUserWislist]);

  /* ================== Add To Cart ======================= */
  const addToCart = async (id) => {
    await addProductToCart(id);
    toast.success(
      <div className="text-center">
        Your product has been successfully added to your cart &#129303;
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
  };

  /* ================== Add To WishList ======================= */
  const addProductToWishList = async (id) => {
    await addTowishList(id);

    if (wishlist.includes(id)) {
      removeProduct(id);
      toast.success(
        <div className="text-center">
          Your product has been successfully removed from the WishList &#129300;
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
    } else {
      toast.success(
        <div className="text-center">
          Your product has been successfully added to the WishList &#129303;
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
  };


  return (
    <>
      <div className='all-Products'>
        <div className='Ttanding-products'>
          <div className='container '>
            <div className='row gy-3'>
              <h2 className='my-4'> </h2>
              {isLoading ? <Loading /> : ""}
              {filteredProducts?.map((product, index) => (
                <div key={product.id}
                  data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
                  data-aos-duration="1000"
                  data-aos-delay={`${index * 100}`}
                  className=' col-md-4'>
                  <div className='trand-item'>
                    <div className='trand-img text-center overflow-hidden'>
                      <Link to={`/productdetails/${product.id}`}>
                        <img src={product.imageCover} className=" py-2 " alt={product.title} />
                      </Link>
                    </div>
                    <div className='trand-product-info'>
                      <div className='d-flex justify-content-between align-items-center'>
                        <h3 className='h6 d-inline-block'>{product.title.split(" ").slice(0, 2)}</h3>
                        <i className='fa fa-star text-warning'> <span > {product.ratingsAverage}</span></i>
                        <i
                          onClick={() => addProductToWishList(product.id)}
                          className={` fa-solid fa-heart fa-sm fav py-3 text-end  ${wishlist.includes(product.id) ? " text-danger" : "text-main"}  `}
                        ></i>
                      </div>
                      <span className='d-block'>{product.category.name}</span>
                      <div className='trand-product-price'>
                        <p>EGY {product.price}</p>
                        <i onClick={() => addToCart(product.id)} className="fa-solid fa-cart-arrow-down fa-flip-horizontal"></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
