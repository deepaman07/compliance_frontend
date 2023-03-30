import React, { useState } from "react";
import "./../../styles/servicestyle.css";
import ServiceHeader from "./ServiceHeader";
import Footer from "./Footer";
import FinancialServices from "./FinancialServices";

function ServiceIndex() {
  const [togglePage, setTogglePage] = useState("dashboard");
  return (
    <>
      <div className="wrapper">
        <ServiceHeader setTogglePage={setTogglePage} togglePage={togglePage} />
        <div className="services-with-bg innerContent">
          <div className="container">
            <div className="services">
              <div className="tab-content" id="pills-tabContent">
                <FinancialServices togglePage={togglePage} />
              </div>
            </div>
          </div>
        </div>
        {<Footer />}
      </div>
    </>
  );
}
export default ServiceIndex;
