import React from 'react';
import MainSlider from '../MainSlider/MainSlider';
import { Helmet } from 'react-helmet';
import ProductSale from '../ProductSale/PorductSale';
import TrandingProducts from '../trandingProducts/trandingProducts';
import BastSales from '../bastSales/bastSales';
import Subscribe from '../Subscribe/Subscribe';
import BtnScroll from '../BtnScroll/BtnScroll';

export default function Home() {

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Online Shop</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>


      <BtnScroll />
      <MainSlider />
      <TrandingProducts />
      <ProductSale />
      <BastSales />
      <Subscribe />

    </>
  );
}