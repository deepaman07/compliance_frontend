import React from "react";
const FinancialServicesNavbar = (props) => {
  function handleClick(e) {
    // Changing toggle menu state
    props.setToggleSubForm(e.target.id);
  }

  return (
    <>
      <ul className="nav nav-pills innerTab" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${
              props.ToggleSubForm === "1" ? "active" : ""
            }`}
            id="1"
            type="button"
            onClick={handleClick}
          >
            <i className="fa fa-money" aria-hidden="true"></i>
            Personal Loan
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${
              props.ToggleSubForm === "2" ? "active" : ""
            }`}
            id="2"
            type="button"
            onClick={handleClick}
          >
            <i className="fa fa-home" aria-hidden="true"></i> Home Loan
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${
              props.ToggleSubForm === "3" ? "active" : ""
            }`}
            id="3"
            type="button"
            onClick={handleClick}
          >
            <i className="fa fa-briefcase" aria-hidden="true"></i> Business Loan
          </button>
        </li>
      </ul>
    </>
  );
};
export default FinancialServicesNavbar;
