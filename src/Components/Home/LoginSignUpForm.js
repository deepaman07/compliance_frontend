import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import check from "./checkUtility";
import userContext from "../../Context/userContext";

const LoginSignUpForm = () => {
  const navigate = useNavigate();
  const context = useContext(userContext);
  const { loginUser, fetchUser } = context;
  const [toggleShow, setToggleShow] = useState("hide");
  const [FINCode, setFINCode] = useState("");
  const [disableOn, setDisableOn] = useState(true);
  const [otp, setOtp] = useState("");
  const [exist, setExist] = useState(false);
  const [Alert, setALert] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (FINCode.length === 12) setDisableOn(false);
    else {
      setExist(false);
      setDisableOn(true);
    }
    if (toggleShow === "show") {
      setInputField(otp);
    }
  }, [FINCode.length, otp.length]);

  const setTimeOutAlert = () => {
    setTimeout(() => {
      setALert(false);
    }, 5000);
  };

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

  const handleChangeFINCode = (e) => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    } else setFINCode(e.target.value);
  };
  const handleSendOtp = async () => {
    setMinutes(0);
    setSeconds(30);

    const response = await fetchUser(FINCode);
    if (response.length !== 0) {
      setToggleShow("show");
      setDisableOn(false);
    } else {
      setExist(true);
    }
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

  const handleVerify = (otp) => {
    if (
      JSON.parse(localStorage.getItem("UserDetails")).FINCode ===
      process.env.REACT_APP_ADMIN_USERNAME
    ) {
      if (otp === process.env.REACT_APP_ADMIN_PASSWORD) return true;
      else return false;
    } else {
      if (otp === "101010") return true;
      else return false;
    }
  };

  const handleVerifyOtp = async () => {
    try {
      if (handleVerify(otp)) {
        await loginUser();
        navigate("/");
      } else {
        setALert(true);
        setTimeOutAlert();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div className="col-md-5">
        <div className="auth-form">
          {Alert === true ? (
            <div class="alert alert-danger w-100" role="alert">
              Invalid OTP, Please enter valid OTP!
            </div>
          ) : (
            <></>
          )}
          <h1>
            Sign In
            <small>To your service provider account!</small>
          </h1>

          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="FINCode"
                placeholder="Fincode"
                value={FINCode}
                maxLength={12}
                onChange={handleChangeFINCode}
                onKeyUp={(e) => {
                  e.preventDefault();
                  if(e.code === "Enter") handleSendOtp(e);
                }}
              />
              <label htmlFor="floatingInput">Fincode</label>
              {exist ? (
                <small className="invalid error_messages">
                  Invalid FINCode
                </small>
              ) : (
                <></>
              )}
            </div>
            {toggleShow === "show" ? (
              <div>
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
                <div className="otp-expire-msg">
                  <span className="otp-will-expire">
                    Your OTP will expire in :{" "}
                    {minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
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
                  className="btn btn-primary btn-lg w-100 my-3 verify-otp"
                  data-bs-toggle="modal"
                  data-bs-target="#kycModal"
                  disabled={disableOn}
                  onClick={handleVerifyOtp}
                >
                  Verify OTP
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-primary btn-lg w-100 my-3 send-otp"
                disabled={disableOn}
                onClick={handleSendOtp}
              >
                Send OTP
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginSignUpForm;
