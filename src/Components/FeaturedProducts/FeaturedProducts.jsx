import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../WishContext';
import logo from '../../Assets/images/logo-main.png'
import { Helmet } from 'react-helmet';


export default function FeaturedProducts() {
  const { addProductToCart, getLoggedUserCart } = useContext(CartContext);
  const { addTowishList, getLoggedUserWislist, wishlist, removeProduct } = useContext(WishListContext);


  const [loadFav, setloadFav] = useState(false)

  useEffect(() => {
    getLoggedUserWislist();
    getLoggedUserCart();

  }, [])

  /* Add To Wish List */

  async function addProductToWishList(id) {
    setloadFav(true)
    let { data } = await addTowishList(id);
    // console.log(data);

    if (data.status === 'success') {

      setloadFav(false)

      if (wishlist.includes(id)) {
        removeProduct(id);
        toast.success('Products is successfully Remove From the wish list', {
          position: 'top-right'
        });
      } else {

        toast.success('Products is successfully added to the wish list', {
          position: 'top-right'
        });
      }


    } else {



      toast.error('Failed to add product to the wish list', {
        position: 'top-right'
      });
    }

    // if (wishlist.includes(id)) {
    //   removeProduct(id);
    //   toast.success('Products is successfully remove to the wish list', {
    //     position: 'top-right'
    //   });
    // }
  }


  /* Add To Cart  */

  async function addProduct(id) {
    setloadFav(true);

    let res = await addProductToCart(id);
    // console.log(res);
    setloadFav(false);

    if (res.status === 'success') {

      toast.success('Product is successfully added to the cart', {
        position: 'top-center'
      });
    } else {
      toast.error('Failed to add product to the cart', {
        position: 'top-center'
      });
    }
  }


  /* Get All Products */
  async function getFeaturedProducts() {
    const response = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    return response.data.data;
  }

  const { isLoading, data } = useQuery('featuredProducts', getFeaturedProducts);

  /* Loading */

  if (isLoading) {

    return <>

      <div className='componentLoading d-flex justify-content-center align-items-center py-5 overflow-hidden'>
        <div className="spinner"></div>

      </div>



    </>
  }




  /* function use to search */



  const filteredProductsMen = data?.filter((product) =>
    product.category["name"] === "Men's Fashion")



  const filteredProductsWomen = data?.filter((product) =>
    product.category["name"] === "Women's Fashion")



  const filteredProductsElectronics = data?.filter((product) =>
    product.category["name"] === "Electronics")





  return (


    <>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
      </Helmet>

      {loadFav ? <>
        <div className='position-fixed d-flex align-items-center justify-content-center end-0 start-0 top-0 bottom-0 over-lay'  >

          <img src={logo} alt="logo" className='w-50 ' />
        </div>
      </> : ''}

      <div className='featuredProducts  '>
        <div className='title'>
          <h2 className='heading'>Our Products</h2>
          <p>Lorem ipsum dolor sit amet consectetur.</p>

        </div>

        <div className='container '>
          <div className='row gy-4'>


            {/* Tap */}
            <div className='tap-btn'>

              <ul className="nav nav-pills  d-flex justify-content-center align-items-center" id="pills-tab" role="tablist">

                <div className='  item '>
                  <li className="nav-item ptr" role="presentation">
                    <button className="nav-link navlink  active " id="pills-All-tab" data-bs-toggle="pill" data-bs-target="#pills-All"
                      type="button" role="tab" aria-controls="pills-All" aria-selected="true">All </button>
                  </li>
                </div>




                <div className=' item '>
                  <li className="nav-item ptr" role="presentation">
                    <button className=" nav-link navlink  " id="pills-men-tab" data-bs-toggle="pill" data-bs-target="#pills-men"
                      type="button" role="tab" aria-controls="pills-men" aria-selected="false">Men's </button>
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

              {/* All Products */}
              <div className="tab-pane fade show active" id="pills-All" role="tabpanel" aria-labelledby="pills-All-tab"
                tabIndex="0">
                <div className="container">
                  <div className="row g-3">

                    {data?.slice(9, 15).map((product) => (
                      <div key={product.id} className='col-12 col-md-4 mt-3  '>



                        <div className="product-cart">


                          <div className="product-cart-img">
                            <div className="product-cart-save ">

                              <i onClick={() => addProductToWishList(product.id)} className={` fa-solid fa-heart fa-sm fav py-3 text-end  ${wishlist.includes(product.id) ? " text-danger" : "text-main"}  `}></i>

                            </div>
                          </div>
                          <Link to={`/productdetails/${product.id}`}>
                            <div className='w-75 mx-auto text-center'>

                              <img src={product.imageCover} className='w-50 p-2  img-fluid' alt={product.title} />
                            </div>
                          </Link>

                          <div className="product-cart-icon-box text-center">
                            <div className="product-cart-text">

                              <p className="product-cart-h3 p-0 m-0"> {product.category.name} </p>
                              <p className="product-cart-p p-0 m-0 "> {product.title.split(' ').splice(0, 2).join(' ')} </p>

                              <div className='d-flex justify-content-between'>

                                <p className="span p-0 m-0">{product.price} EGP
                                </p>
                                <p className='span p-0 m-0'> <i className='fas fa-star rating-color'></i>
                                  {product.ratingsAverage}</p>

                              </div>
                              <button onClick={() => addProduct(product.id)} className='btn  bg-main text-white w-100 btn-sm my-2'>
                                Add To Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}




                  </div>
                </div>
              </div>




              {/* Men */}

              <div className="tab-pane fade" id="pills-men" role="tabpanel" aria-labelledby="pills-men-tab"
                tabIndex="0">

                <div className="container">
                  <div className="row g-3" >


                    {filteredProductsMen?.map((product) => (
                      <div key={product.id} className='col-md-4 col-lg-3'>
                        <div className="product-cart">

                          <div className="product-cart-img">
                            <div className="product-cart-save ">

                              <i onClick={() => addProductToWishList(product.id)} className={` fa-solid fa-heart fa-sm fav py-3 text-end  ${wishlist.includes(product.id) ? " text-danger" : "text-main"}  `}></i>

                            </div>
                          </div>
                          <Link to={`/productdetails/${product.id}`}>
                            <div className='w-75 mx-auto text-center'>

                              <img src={product.imageCover} className='w-50 p-2 rounded-5 img-fluid' alt={product.title} />
                            </div>
                          </Link>

                          <div className="product-cart-icon-box text-center">
                            <div className="product-cart-text">

                              <p className="product-cart-h3 p-0 m-0"> {product.category.name} </p>
                              <p className="product-cart-p p-0 m-0 "> {product.title.split(' ').splice(0, 2).join(' ')} </p>

                              <div className='d-flex justify-content-between'>

                                <p className="span p-0 m-0">{product.price} EGP
                                </p>
                                <p className='span p-0 m-0'> <i className='fas fa-star rating-color'></i>
                                  {product.ratingsAverage}</p>

                              </div>
                              <button onClick={() => addProduct(product.id)} className='btn  bg-main text-white w-100 btn-sm my-2'>
                                Add To Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}


                  </div>
                </div>

              </div>



              {/* Women */}
              <div className="tab-pane fade" id="pills-women" role="tabpanel" aria-labelledby="pills-women-tab"
                tabIndex="0">
                <div className="container">
                  <div className="row g-3">


                    {filteredProductsWomen?.map((product) => (
                      <div key={product.id} className='col-md-4 col-lg-3'>
                        <div className="product-cart">

                          <div className="product-cart-img">
                            <div className="product-cart-save ">

                              <i onClick={() => addProductToWishList(product.id)} className={` fa-solid fa-heart fa-sm fav py-3 text-end  ${wishlist.includes(product.id) ? " text-danger" : "text-main"}  `}></i>

                            </div>
                          </div>
                          <Link to={`/productdetails/${product.id}`}>
                            <div className='w-75 mx-auto text-center'>

                              <img src={product.imageCover} className='w-50 p-2 rounded-5 img-fluid' alt={product.title} />
                            </div>
                          </Link>

                          <div className="product-cart-icon-box text-center">
                            <div className="product-cart-text">

                              <p className="product-cart-h3 p-0 m-0"> {product.category.name} </p>
                              <p className="product-cart-p p-0 m-0 "> {product.title.split(' ').splice(0, 2).join(' ')} </p>

                              <div className='d-flex justify-content-between'>

                                <p className="span p-0 m-0">{product.price} EGP
                                </p>
                                <p className='span p-0 m-0'> <i className='fas fa-star rating-color'></i>
                                  {product.ratingsAverage}</p>

                              </div>
                              <button onClick={() => addProduct(product.id)} className='btn  bg-main text-white w-100 btn-sm my-2'>
                                Add To Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}


                  </div>
                </div>
              </div>


              {/* Elec */}


              <div className="tab-pane fade" id="pills-electronics" role="tabpanel" aria-labelledby="pills-Graphic-tab"
                tabIndex="0">
                <div className="container">
                  <div className="row g-3">


                    {filteredProductsElectronics?.map((product) => (
                      <div key={product.id} className='col-md-4 col-lg-3'>

                        <div className="product-cart">




                          <div className="product-cart-img">
                            <div className="product-cart-save ">

                              <i onClick={() => addProductToWishList(product.id)} className={` fa-solid fa-heart fa-sm fav py-3 text-end  ${wishlist.includes(product.id) ? " text-danger" : "text-main"}  `}></i>

                            </div>
                          </div>
                          <Link to={`/productdetails/${product.id}`}>
                            <div className='w-75 mx-auto text-center'>

                              <img src={product.imageCover} className='w-50 p-2 rounded-5 img-fluid' alt={product.title} />
                            </div>
                          </Link>

                          <div className="product-cart-icon-box text-center">
                            <div className="product-cart-text">

                              <p className="product-cart-h3 p-0 m-0"> {product.category.name} </p>
                              <p className="product-cart-p p-0 m-0 "> {product.title.split(' ').splice(0, 2).join(' ')} </p>

                              <div className='d-flex justify-content-between'>

                                <p className="span p-0 m-0">{product.price} EGP
                                </p>
                                <p className='span p-0 m-0'> <i className='fas fa-star rating-color'></i>
                                  {product.ratingsAverage}</p>

                              </div>
                              <button onClick={() => addProduct(product.id)} className='btn  bg-main text-white w-100 btn-sm my-2'>
                                Add To Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}


                  </div>
                </div>
              </div>



            </div>

          </div>
        </div>


        {/* Latest */}
        <section className='latest py-5'>
          <div className='title'>
            <h2 className='heading'>Latest Products</h2>
            <p>Lorem ipsum dolor sit amet consectetur.</p>

          </div>
          <div className="container pb-5">
            <div className="row  g-3">

              {data?.slice(5, 9).map((product) => (
                <div key={product.id} className='col-12 col-md-3 mt-3  '>
                  <div className='latest-products  mx-auto text-center '>
                    <div className='image position-relative'>

                      <div className='layout-latest position-absolute start-0 end-0 top-0 bottom-0 '></div>
                      <img src={product.imageCover} className='w-100 img-fluid' alt={product.title} />

                    </div>
                    <div className='latest-title position-relative '>
                      <div className='title'>
                        <h3 className='fw-bold text-main'>{product.title.split(' ').splice(0, 2).join(' ')} </h3>
                        <p>{product.description}</p>
                      </div>
                      <div className='latest-layout position-absolute d-flex   '>
                        <div onClick={() => addProductToWishList(product.id)} className='latest-cart ms-1'><i className="fa-solid  shopping  fa-heart"></i></div>
                        <div onClick={() => addProduct(product.id)} className='latest-heart ms-1'><i className="fa-solid  shopping  fa-basket-shopping"></i></div>
                        <div className='latest-see ms-2'>
                          <Link to={`/productdetails/${product.id}`}>

                            <i className="fa-solid  shopping  fa-eye"></i>
                          </Link>

                        </div>
                      </div>
                    </div>
                  </div>



                </div>
              ))}





            </div>
          </div>
        </section>

      </div>
    </>
  );
}