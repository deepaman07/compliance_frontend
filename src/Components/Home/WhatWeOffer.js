import React from "react";
import WhatWeOfferList from "../../Data/WhatWeOfferList";

const WhatWeOffer = () => {
  return (
    <>
      <div className="what-we-offer">
        <div className="container">
          <div className="row text-center">
            <h2 className="heading">What we offer</h2>
          </div>

          <div className="row offer-cards">
            {WhatWeOfferList.map((offer, key) => {
              return (
                <div className="col-lg-4 box" key={key}>
                  <div className="card card-shadow border-0 mb-4">
                    <div className="imagebox">
                      <img src={offer.imgSrc} alt="" className="img-fluid rounded" />
                    </div>
                    <div className="description">
                      <div className="ml-2">
                        <h6 className="font-weight-medium mt-2">{offer.title}</h6>
                        <p className="mt-1">{offer.description}</p>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatWeOffer;
