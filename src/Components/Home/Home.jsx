import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import BtnScroll from '../BtnScroll/BtnScroll';
import MainSlider from '../MainSlider/MainSlider';
import Offerbanner from '../Offerbanner/Offerbanner';
import ProductSale from '../ProductSale/PorductSale';
import Subscribe from '../Subscribe/Subscribe';
import Testimonial from '../Testimonial/Testimonial';
import BastSales from '../bastSales/bastSales';
import TrandingProducts from '../trandingProducts/trandingProducts';
export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);

  }, [])



  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Online Shop</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>


      <BtnScroll />
      <MainSlider />
      <Offerbanner />
      <TrandingProducts />
      <ProductSale />
      <BastSales />

      <Testimonial />
      <Subscribe />

    </>
  );
}