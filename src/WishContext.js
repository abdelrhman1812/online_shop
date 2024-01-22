
import axios from "axios";
import React, { createContext, useState } from "react";

export const WishListContext = createContext();



let userToken = localStorage.getItem("userToken")

let headers = { token: userToken }






export default function WishListContextProvider(props) {

  const [wishlist, setWishlist] = useState([]);
  function addWishClick(id) {
    if (!wishlist.includes(id)) {
      setWishlist([...wishlist, id]);
    }
  }

  function removeWishClick(id) {
    setWishlist(wishlist.filter((wish) => wish !== id));
  }


  // function addTowishList(id) {


  //   return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,



  //     { productId: id },
  //     { headers: { token: localStorage.getItem("userToken") } }
  //   ).then((response) => {
  //     addWishClick(id)
  //     return response
  //   })
  //     .catch((error) => { return error })

  // }


  async function addTowishList(id) {

    try {
      let { data } = axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,

        { productId: id },
        { headers: { token: localStorage.getItem("userToken") } })
      addWishClick(id)
      return data

    }
    catch (error) {
      console.log(error)
    }

  }




  function getLoggedUserWislist() {


    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
      { headers: { token: localStorage.getItem("userToken") } }

    )
      .then((response) => {
        setWishlist(
          response.data.data.map((product) => {
            return product.id;
          })
        );
        return response;
      })
      .catch((error) => { return error })




  }





  /* remove */
  async function removeProduct(id) {


    try {
      let response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers: headers });
      removeWishClick(id)
      return response;
    } catch (error) { return error; }

  }




  return (
    <WishListContext.Provider value={{ wishlist, addTowishList, getLoggedUserWislist, removeProduct }}>
      {props.children}
    </WishListContext.Provider>
  );
}