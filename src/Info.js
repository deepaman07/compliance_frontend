import React from "react";
import Header from "./Components/Home/FormHeader";
import Footer from "./Components/Home/Footer";
// import BasicInfo from "./Components/Home/BasicInfo";
// import BasicInfo2 from "./Components/Home/BasicInfo2";
import BasicInfo3 from "./Components/Home/BasicInfo3";
// import BankInfo from "./Components/Home/BankInfo";
// import BankInfo2 from "./Components/Home/BankInfo2";
import BankInfo3 from "./Components/Home/BankInfo3";
import KycInfo from "./Components/Home/KycInfo";
import SideMenu from "./Components/Home/SideMenu";
import { useState } from "react";

const Info = () => {
  const [toggleMenu, setToggleMenu] = useState("basic-info");

  function renderElement(toggleMenu) {
    if (toggleMenu === "basic-info")
      return <BasicInfo3 setToggleMenu={setToggleMenu} />;
    else if (toggleMenu === "bank-info")
      return <BankInfo3 setToggleMenu={setToggleMenu} />;
    else if (toggleMenu === "kyc-doc") return <KycInfo />;
  }
  return (
    <>
      <div className="wrapper">
        <div className="product-with-bg">
          <Header />
          <div id="kycForm">
            <div className="d-flex align-items-start">
              <SideMenu setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} />
              <div className="tab-content" id="v-pills-tabContent">
                <div className="row">
                  <div className="col-md-12 text-center">
                    <h2 className="heading pt-4 pb-2">Complete your KYC</h2>
                  </div>
                </div>
                {renderElement(toggleMenu)}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Info;
