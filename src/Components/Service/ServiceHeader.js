import React, { useContext } from "react";
import logo from "../../images/logo.png";
import userContext from "../../Context/userContext";
import imguser from "../../../src/images/img-user.png";
import downarrow from "../../../src/images/icon-arrow.png";
import Cookies from "js-cookie";

function ServiceHeader(props) {
  const context = useContext(userContext);
  const { logoutUser } = context;

  const handleLogout = (e) => {
    logoutUser();
    
  };

  function handleClick(e) {
    props.setTogglePage(e.target.id);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top bg-white shadow">
        <div className="container">
          <div className="navbar-header">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <a className="navbar-brand">
              <img
                src="https://www.paisabazaar.com/PBHP/assets/images/paisabazaar-logo.svg"
                width="205"
                alt=""
              />
            </a>

            <div className="collapse navbar-collapse" id="navbarNav">
              {JSON.parse(localStorage.getItem("UserDetails")).FINCode !==
              process.env.REACT_APP_ADMIN_USERNAME ? (
                <ul className="navbar-nav topmenu">
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        props.togglePage === "dashboard" ? "active" : ""
                      }`}
                      id="dashboard"
                      onClick={handleClick}
                    >
                      Dashboard
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        props.togglePage === "leadrequest" ? "active" : ""
                      }`}
                      aria-current="page"
                      id="leadrequest"
                      onClick={handleClick}
                    >
                      Create Lead
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        props.togglePage === "leaddetails" ? "active" : ""
                      }`}
                      id="leaddetails"
                      onClick={handleClick}
                    >
                      Lead Details
                    </a>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav topmenu">
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        props.togglePage === "dashboard" ? "active" : ""
                      }`}
                      id="dashboard"
                      onClick={handleClick}
                    >
                      Dashboard
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${
                        props.togglePage === "leaddetails" ? "active" : ""
                      }`}
                      id="leaddetails"
                      onClick={handleClick}
                    >
                      Lead Details
                    </a>
                  </li>
                </ul>
              )}
            </div>
            <form className="d-flex">
              <ul className="navbar-nav nav-user">
                <li className="nav-item dropdown user">
                  <a
                    className="nav-link dropdown-toggle circle-icon"
                    href="/*"
                    id="dropdown10"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div className="userimg">
                      <img src={imguser} alt="" className="user-image" />
                    </div>
                    <span className="name">
                      {JSON.parse(localStorage.getItem("UserDetails")).Name}
                    </span>
                    <img src={downarrow} alt="" className="downarrow" />
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="dropdown10">
                    <li className="header">
                      <div className="user">
                        <img src={imguser} alt="" />
                        <h6>
                          {JSON.parse(localStorage.getItem("UserDetails")).Name}
                          <small className="lastlogin">
                            <strong>Last Login - </strong>
                            {JSON.parse(Cookies.get("userCookie")).lastLogin
                              ? JSON.parse(
                                  Cookies.get("userCookie")
                                ).lastLogin.slice(0, 10) +
                                " " +
                                JSON.parse(
                                  Cookies.get("userCookie")
                                ).lastLogin.slice(11, 19)
                              : "no previous login available"}
                          </small>
                        </h6>
                      </div>
                    </li>
                    <li>
                      <a
                        className="dropdown-item logout"
                        onClick={handleLogout}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
export default ServiceHeader;
