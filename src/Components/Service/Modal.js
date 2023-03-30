import React, { useState, useEffect } from "react";
import check from "../Home/checkUtility";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";

const OtpModal = (props) => {
  const [otp, setOtp] = useState("");
  const [show, setShow] = useState(true);
  const modalClose = () => {
    setShow(false);
    props.setToggleModal(false);
  };
  const [disableOn, setDisableOn] = useState(true);
  const [Alert, setAlert] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (show === true) {
      setInputField(otp);
    }
  }, [otp.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const setTimeOutFalse = () => {
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  };

  const otpField = {
    1: ["field-1"],
    2: ["field-2"],
    3: ["field-3"],
    4: ["field-4"],
    5: ["field-5"],
    6: ["field-6"],
  };

  const setInputField = (otp) => {
    for (let i = 0; i < 6; i++) {
      if (i < otp.length)
        document.getElementById(`field-${i + 1}`).value = otp[i];
      else document.getElementById(`field-${i + 1}`).value = "";
    }
    let nextfield = "";
    if (otp.length <= 6) {
      if (otp.length !== 6)
        nextfield = document.querySelector(`input[id=field-${otp.length + 1}]`);
      else nextfield = document.querySelector(`input[id=field-${otp.length}]`);
    }
    if (nextfield === "null") return;
    nextfield.focus();
  };

  const handleOtp = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    if (e.key === "Backspace") {
      setOtp(otp.substring(0, otp.length - 1));
    }
    if (
      otp.length <= 5 &&
      (e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "0")
    ) {
      let str = otp + e.key;
      setOtp(str);
      if (otp.length === 5) setDisableOn(false);
    }
  };
  const handleVerifyOtp = () => {
    if (otp === "101010") {
      props.setVerified(true);
      props.setToggleModal(false);
    } else {
      setAlert(true);
      setTimeOutFalse();
      props.setVerified(false);
    }
  };
  return (
    <>
      <Modal id="otpModal" className="fade" show={show} onHide={modalClose}>
        <div className="modal-header">
          <h6 className="modal-title">Enter OTP</h6>
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              props.setToggleModal(false);
            }}
          ></button>
        </div>

        <div className="modal-body">
          {Alert === true ? (
            <div className="alert alert-danger" role="alert">
              Invalid OTP, Please enter a correct OTP!
            </div>
          ) : (
            <></>
          )}

          <div className="imgbox">
            <img src="../../../../images/otp-img.svg" alt="" />
          </div>
          <div className="otp-number">
            <ul>
              {Object.entries(otpField).map(([key, value]) => (
                <li key={key}>
                  <input
                    id={value[0]}
                    type="number"
                    className="form-control"
                    maxLength={1}
                    onInput={(e) => {
                      check.maxLengthCheck({ e });
                    }}
                    onKeyUp={handleOtp}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="timecount">
            <span className="otp-will-expire">
              Your OTP will expire in : {minutes < 10 ? `0${minutes}` : minutes}
              :{seconds < 10 ? `0${seconds}` : seconds}
              <a
                className={`resend-otp text-decoration-none d-${
                  seconds > 0 || minutes > 0 ? "none" : "inline"
                } `}
                onClick={() => {
                  setMinutes(0);
                  setSeconds(30);
                }}
              >
                Resend OTP
              </a>
            </span>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleVerifyOtp}
            disabled={disableOn}
          >
            Verify
          </button>
        </div>
      </Modal>
      {/* <div className="modal" tabindex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title">Enter OTP</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="alert alert-danger" role="alert">
                A simple danger alert—check it out!
              </div>

              <div className="imgbox">
                <img src="../../../../images/otp-img.svg" alt="" />
              </div>
              <div className="otp-number">
                <ul>
                  {Object.entries(otpField).map(([key, value]) => (
                    <li key={key}>
                      <input
                        id={value[0]}
                        type="number"
                        className="form-control"
                        maxLength={1}
                        onInput={(e) => {
                          check.maxLengthCheck({ e });
                        }}
                        onKeyUp={(e) => {
                          check.handleChange({
                            e,
                            otp,
                            setOtp,
                            setDisableOn,
                          });
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="timecount">00.30 sec left to respond OTP</div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleOtp}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default OtpModal;
