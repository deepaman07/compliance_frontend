import React from "react";
import HeaderHome from "./Components/Home/HeaderHome";
import LoginSignUpForm from "./Components/Home/LoginSignUpForm";
import OurProducts from "./Components/Home/OurProducts";
import WhatWeOffer from "./Components/Home/WhatWeOffer";
import Footer from "./Components/Home/Footer";

const Home = () => {
  return (
    <>
      <div className="wrapper">
        <div className="product-with-bg">
          <HeaderHome />
          <div className="our-product banner-bg">
            <div className="container">
              <div className="row row-reverse">
                <OurProducts />
                <LoginSignUpForm />
              </div>
            </div>
          </div>
        </div>

        <WhatWeOffer />
        <Footer />
      </div>
    </>
  );
};

export default Home;
