import React, { useContext, useState } from 'react';
import Style from './FeaturedProducts.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Vortex } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { CartContext } from '../../CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../WishContext';
import logo from '../../Assets/images/freshcart-logo.svg';
import { Helmet } from 'react-helmet';


export default function FeaturedProducts() {
    const { addProductToCart } = useContext(CartContext);
    const { addTowishList } = useContext(WishListContext);

    const [searchTerm, setSearchTerm] = useState('');

    const [loadFav, setloadFav] = useState(false);


    /* Add To Wish List */
    async function addProductToWishList(id) {
        setloadFav(true);
        let { data } = await addTowishList(id);
        // console.log(data);
        if (data.status === 'success') {

            setloadFav(false);
            // console.log(id)
            toast.success('Products is successfully added to the wish list', {
                position: 'top-right'
            });
        } else {



            toast.error('Failed to add product to the wish list', {
                position: 'top-right'
            });
        }
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
        return (
            <div className='d-flex justify-content-center align-items-center w-100 vh-100'>
                <Vortex visible={true} height='100' width='100' ariaLabel='vortex-loading' wrapperStyle={{}} wrapperClass='vortex-wrapper' colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']} />
            </div>
        );
    }

    /* function use to search */
    const filteredProducts = data?.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()));


    const filteredProductsMen = data?.filter((product) => product.category["name"] === "Men's Fashion");



    const filteredProductsWomen = data?.filter((product) => product.category["name"] === "Women's Fashion");



    const filteredProductsElectronics = data?.filter((product) => product.category["name"] === "Electronics");




    return (


        <>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Products</title>
            </Helmet>

            <div className='home  '>
                {loadFav ? <>
                    <div className='position-fixed d-flex align-items-center justify-content-center end-0 start-0 top-0 bottom-0 over-lay'>

                        <img src={logo} alt="logo" className='w-50 ' />
                    </div>
                </> : ''}

                <div className='container py-2'>
                    <div className='row gy-4'>
                        <input type='text' placeholder='Search' className='form-control' onChange={(e) => setSearchTerm(e.target.value)} />


                        {/* Tap */}
                        <ul className="nav nav-pills mx-auto w-75 " id="pills-tab" role="tablist">
                            <div className='container'>
                                <div className='row  g-3 d '>
                                    <div className='col-12 col-md-6  d-flex justify-content-center align-items-center   col-lg-3'>
                                        <li className="nav-item ptr" role="presentation">
                                            <button className={`nav-link navlink ${Style.navlinkcategores} active  `} id="pills-All-tab" data-bs-toggle="pill" data-bs-target="#pills-All"
                                                type="button" role="tab" aria-controls="pills-All" aria-selected="true">All Products</button>
                                        </li>
                                    </div>




                                    <div className='col-12 col-md-6   d-flex justify-content-center align-items-center col-lg-3'>
                                        <li className="nav-item ptr" role="presentation">
                                            <button className={`nav-link navlink ${Style.navlinkcategores}`} id="pills-men-tab" data-bs-toggle="pill" data-bs-target="#pills-men"
                                                type="button" role="tab" aria-controls="pills-men" aria-selected="false">Men's Fashion</button>
                                        </li>

                                    </div>

                                    <div className="col-12 col-md-6    d-flex justify-content-center align-items-center col-lg-3">
                                        <li className="nav-item ptr" role="presentation">
                                            <button className={`nav-link navlink ${Style.navlinkcategores}`} id="pills-women-tab" data-bs-toggle="pill" data-bs-target="#pills-women"
                                                type="button" role="tab" aria-controls="pills-women" aria-selected="false">Women's Fashion</button>
                                        </li>

                                    </div>


                                    <div className="col-12 col-md-6  d-flex justify-content-center align-items-center  col-lg-3">
                                        <li className="nav-item ptr" role="presentation">
                                            <button className={`nav-link  navlink ${Style.navlinkcategores}`} id="pills-electronics-tab" data-bs-toggle="pill"
                                                data-bs-target="#pills-electronics" type="button" role="tab" aria-controls="pills-electronics"
                                                aria-selected="false">Electronics</button>
                                        </li>

                                    </div>
                                </div>

                            </div>




                        </ul>


                        <div className="tab-content  mb-5 d-flex justify-content-center " id="pills-tabContent">

                            {/* All Products */}
                            <div className="tab-pane fade show active" id="pills-All" role="tabpanel" aria-labelledby="pills-All-tab"
                                tabIndex="0">
                                <div className="container">
                                    <div className="row">







                                        {filteredProducts.map((product) => (
                                            <div key={product.id} className='col-md-4 col-lg-3 mt-3  '>



                                                <div class="product-cart">

                                                    <div class="product-cart-img">
                                                        <div class="product-cart-save ">

                                                            <i onClick={() => addProductToWishList(product.id)} className='fa-solid fa-heart fa-sm fav py-3 text-main text-end '></i>

                                                        </div>
                                                    </div>
                                                    <Link to={`/productdetails/${product.id}`}>
                                                        <div className='w-75 mx-auto'>

                                                            <img src={product.imageCover} className='w-100 p-2 rounded-5 img-fluid' alt={product.title} />
                                                        </div>
                                                    </Link>

                                                    <div class="product-cart-icon-box text-center">
                                                        <div class="product-cart-text">

                                                            <p class="product-cart-h3 p-0 m-0"> {product.category.name} </p>
                                                            <p class="product-cart-p p-0 m-0 "> {product.title.split(' ').splice(0, 2).join(' ')} </p>

                                                            <div className='d-flex justify-content-between'>

                                                                <p class="span p-0 m-0">{product.price} EGP
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
                                    <div className="row">


                                        {filteredProductsMen.map((product) => (
                                            <div key={product.id} className='col-md-4 col-lg-3'>
                                                <div class="product-cart">

                                                    <div class="product-cart-img">
                                                        <div class="product-cart-save ">

                                                            <i onClick={() => addProductToWishList(product.id)} className='fa-solid fa-heart fa-sm fav py-3 text-main text-end '></i>

                                                        </div>
                                                    </div>
                                                    <Link to={`/productdetails/${product.id}`}>
                                                        <div className='w-75 mx-auto'>

                                                            <img src={product.imageCover} className='w-100 p-2 rounded-5 img-fluid' alt={product.title} />
                                                        </div>
                                                    </Link>

                                                    <div class="product-cart-icon-box text-center">
                                                        <div class="product-cart-text">

                                                            <p class="product-cart-h3 p-0 m-0"> {product.category.name} </p>
                                                            <p class="product-cart-p p-0 m-0 "> {product.title.split(' ').splice(0, 2).join(' ')} </p>

                                                            <div className='d-flex justify-content-between'>

                                                                <p class="span p-0 m-0">{product.price} EGP
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
                                    <div className="row">


                                        {filteredProductsWomen.map((product) => (
                                            <div key={product.id} className='col-md-4 col-lg-3'>
                                                <div class="product-cart">

                                                    <div class="product-cart-img">
                                                        <div class="product-cart-save ">

                                                            <i onClick={() => addProductToWishList(product.id)} className='fa-solid fa-heart fa-sm fav py-3 text-main text-end '></i>

                                                        </div>
                                                    </div>
                                                    <Link to={`/productdetails/${product.id}`}>
                                                        <div className='w-75 mx-auto'>

                                                            <img src={product.imageCover} className='w-100 p-2 rounded-5 img-fluid' alt={product.title} />
                                                        </div>
                                                    </Link>

                                                    <div class="product-cart-icon-box text-center">
                                                        <div class="product-cart-text">

                                                            <p class="product-cart-h3 p-0 m-0"> {product.category.name} </p>
                                                            <p class="product-cart-p p-0 m-0 "> {product.title.split(' ').splice(0, 2).join(' ')} </p>

                                                            <div className='d-flex justify-content-between'>

                                                                <p class="span p-0 m-0">{product.price} EGP
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
                                    <div className="row">


                                        {filteredProductsElectronics.map((product) => (
                                            <div key={product.id} className='col-md-4 col-lg-3'>

                                                <div class="product-cart">


                                                    <div class="love">
                                                        <input id="switch" type="checkbox">
                                                            <label class="love-heart" for="switch">
                                                                <i class="left"></i>
                                                                <i class="right"></i>
                                                                <i class="bottom"></i>
                                                                <div class="round"></div>
                                                            </label>
                                                        </></div>

                                                    <div class="product-cart-img">
                                                        <div class="product-cart-save ">

                                                            <i onClick={() => addProductToWishList(product.id)} className='fa-solid fa-heart fa-sm fav py-3 text-main text-end '></i>

                                                        </div>
                                                    </div>
                                                    <Link to={`/productdetails/${product.id}`}>
                                                        <div className='w-75 mx-auto'>

                                                            <img src={product.imageCover} className='w-100 p-2 rounded-5 img-fluid' alt={product.title} />
                                                        </div>
                                                    </Link>

                                                    <div class="product-cart-icon-box text-center">
                                                        <div class="product-cart-text">

                                                            <p class="product-cart-h3 p-0 m-0"> {product.category.name} </p>
                                                            <p class="product-cart-p p-0 m-0 "> {product.title.split(' ').splice(0, 2).join(' ')} </p>

                                                            <div className='d-flex justify-content-between'>

                                                                <p class="span p-0 m-0">{product.price} EGP
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
            </div>
        </>
    );
}
