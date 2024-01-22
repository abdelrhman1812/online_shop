import Aos from 'aos';
import React, { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { CartContext } from '../../CartContext';



export default function Cart() {

  let { cartProducts, numOfCartItems, totalCartPrice, updateCount, removeProduct, clearCart } = useContext(CartContext)




  /* ======== Update Products Count ================ */
  async function updateNumItems(id, count) {
    await updateCount(id, count)
    toast.success(
      <div className="text-center">
        Your product has been successfully updated
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


  /* ======== Remove Product ================ */
  async function removeProducts(id) {
    await removeProduct(id)
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


  /* ======== Remove Product ================ */
  async function clearAllProducts() {
    await clearCart()
    toast.success(
      <div className="text-center">
        Your products has been successfully remove
      </div>,
      {
        duration: 5000,
        icon: (
          <div className="fa-2x text-danger">
            <h2> &#128549;  </h2>
          </div>
        ),
        position: "top-center",
      }
    );
  }


  useEffect(() => {
    window.scrollTo(0, 0);

    Aos.init({
      offset: 100,
      easing: 'ease-in-sine',
      delay: 0,
    });


  }, [])

  return <>
    <div className=' cart'>

      <div className='container py-5'>
        <h4 className='head' data-aos="zoom-in" data-aos-duration="1000">  <i className='fa fa-shopping-cart icon-head'></i>  Your cart items : </h4>
        <div className='row'>



          {/* Display Cart Products */}
          <div className='col-md-8 '>

            <div className="cart-details ">

              <div className='cart-head'>
                <h5>Product : <span>{numOfCartItems}</span> </h5>
                <h5>Total : <span> {totalCartPrice} EGY</span></h5>
              </div>



              {!cartProducts || numOfCartItems === 0 ? <>

                <div className='empty-cart '>
                  <i className='fa fa-shopping-cart'></i>
                  <p>Cart Is Empty &#128578; !</p>

                  <button>  Shop now </button>
                </div>

              </>
                : ""
              }

              {cartProducts?.map((product) => <div key={product._id}
                data-aos="zoom-in" data-aos-duration="1000"
                className='  cart-product '>
                <div className='img'>
                  <img src={product.product.imageCover} alt={product.product.title} />
                </div>

                {/* Title */}
                <div className='cart-product-title'>
                  <h6>{product.product.title.split(' ').splice(0, 2).join(' ')}</h6>
                </div>

                {/* Update */}
                <div className='operation  '>
                  <button onClick={() => updateNumItems(product.product.id, product.count + 1)}>+</button>
                  <span>{product.count}</span>
                  <button onClick={() => updateNumItems(product.product.id, product.count - 1)}>-</button>
                </div>
                {/* Price */}
                <div className='cart-product-price'>
                  {product.price} <span>EGY</span>
                </div>
                {/* Remove */}
                <div className='cart-product-remove'>
                  <i onClick={() => removeProducts(product.product.id)} className="fa-solid fa-trash-can"></i>
                </div>
              </div>)}
            </div>

            {numOfCartItems === 0 ? "" : <div className='clear-all text-end'>
              <button onClick={() => clearAllProducts()} className='btn btn-danger'> clear All</button>
            </div>
            }
          </div>




          {/* Info  */}
          <div className='col-md-4 my-3 m-md-0' data-aos="zoom-in" data-aos-duration="1000">
            <div className='cart-head'>

              <h5>Payment Details</h5>

            </div>

            <div className='cart-info'>
              <div className='total-product'>
                <h6>Total Products </h6>
                <span>{numOfCartItems}</span>
              </div>

              <div className='total-price'>
                <h6>Total Price </h6>
                <span>{totalCartPrice} EGY</span>
              </div>

              <button className='btn '><Link to={"/paymentonline"}> Checkout</Link> </button>

              <Link to={'/'}><i className="fa-solid fa-arrow-left fa-beat mx-2"></i>Return Toshopping</Link>

            </div>
          </div>


        </div>
      </div>
    </div>

  </>

}



