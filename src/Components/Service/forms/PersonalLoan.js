import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import userContext from "../../../Context/userContext";
import Modal from "../Modal";
const validationSchemaInput = Yup.object({
  Mobile_no: Yup.string()
    .matches(/^[789]\d{9}$/, "Phone number is not valid.")
    .required("Phone Number is required."),
  Name: Yup.string().required("Customer Name is required."),
  City: Yup.string().required("City is required."),
  Loan_amount_required: Yup.string()
    .test(
      "test-name",
      "Loan Amount must be ranged between 10000 to 25 Lacs",
      function(value) {
        const loan = parseInt(value);
        if (loan <= 2500000 && loan >= 10000) return true;
        else return false;
      }
    )
    .required("Loan amount is required."),
  Net_monthly_income: Yup.string().required("Monthly income is required."),
  Employment_type: Yup.string().required("Employment type is required."),
});

const PersonalLoan = (props) => {
  const context = useContext(userContext);
  const { user, city, empType } = context;
  const [toggleModal, setToggleModal] = useState(false);
  const [verified, setVerified] = useState(false);
  const [APIRequest, setAPIRequest] = useState();
  const [Alert, setAlert] = useState(false);
  const [loanLeadDetails, setLoanLeadDetails] = useState([]);

  useEffect(() => {
    if (loanLeadDetails.length === 0) fetchLeads();
    if (verified === true) insertLead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verified]);

  const setTimeOutFalse = () => {
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  };

  const insertLead = async () => {
    setVerified(false);
    await fetch(
      `${process.env.REACT_APP_LOCALHOST_SERVER}/product/insertfinancialservices`,
      APIRequest
    ).then(() => {
      setAlert(true);
      setTimeOutFalse();
    });
    formikInput.handleReset();
  };
  const Token = JSON.parse(user).token.Token;
  const fetchLeads = async () => {
    const SubProductId = 1;
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `${process.env.REACT_APP_LOCALHOST_SERVER}/product/readfinancialservices/${SubProductId}/${
        JSON.parse(Cookies.get("userCookie")).token.FINCode
      }`,
      requestOptions
    );
    const result = await response.json();
    setLoanLeadDetails(result);
    return result;
  };

  const cityList = [];
  Object.entries(city).map(([key, value]) => {
    return cityList.push([value.Id, value.City]);
  });
  const empTypeList = [];
  Object.entries(empType).map(([key, value]) => {
    return empTypeList.push([value.Id, value.EmploymentType]);
  });

  const formikInput = useFormik({
    initialValues: {
      Mobile_no: "",
      Name: "",
      City: "",
      Loan_amount_required: "",
      Net_monthly_income: "",
      Employment_type: "",
    },
    validationSchema: validationSchemaInput,
    onSubmit: async (values) => {
      setToggleModal(true);
      const isPresent = [];
      loanLeadDetails.filter((row) => {
        if (row.CustomerMobile === parseInt(values.Mobile_no))
          isPresent.push(row);
      });
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          SubProductId: parseInt(props.ToggleSubForm),
          Name: values.Name,
          CustomerMobile: parseInt(values.Mobile_no),
          CityId: values.City,
          LoanAmount: parseInt(values.Loan_amount_required),
          NetMonthlyIncome: parseInt(values.Net_monthly_income),
          EmploymentType: values.Employment_type,
          FINCode: JSON.parse(Cookies.get("userCookie")).token.FINCode,
          GrossSales: 0,
          IsPresent: isPresent.length === 0 ? 0 : 1,
        }),
      };
      setAPIRequest(requestOptions);
    },
  });

  ////////////////////////// Attribute dictionary //////////////////////////
  const inputField = {
    1: [
      "Mobile_no",
      "Mobile Number",
      "Enter Mobile Number",
      formikInput.values.Mobile_no,
      formikInput.touched.Mobile_no && Boolean(formikInput.errors.Mobile_no),
      formikInput.touched.Mobile_no && formikInput.errors.Mobile_no,
      false,
      [],
      10,
    ],
    2: [
      "Name",
      "Name",
      "Enter Customer Name",
      formikInput.values.Name,
      formikInput.touched.Name && Boolean(formikInput.errors.Name),
      formikInput.touched.Name && formikInput.errors.Name,
      false,
      [],
    ],
    3: [
      "City",
      "City",
      "Enter City",
      formikInput.values.City,
      formikInput.touched.City && Boolean(formikInput.errors.City),
      formikInput.touched.City && formikInput.errors.City,
      true,
      cityList,
    ],
    4: [
      "Loan_amount_required",
      "Loan Amount Required",
      "Enter Loan amount required",
      formikInput.values.Loan_amount_required,
      formikInput.touched.Loan_amount_required &&
        Boolean(formikInput.errors.Loan_amount_required),
      formikInput.touched.Loan_amount_required &&
        formikInput.errors.Loan_amount_required,
      false,
      [],
    ],
    5: [
      "Net_monthly_income",
      "Net Monthly Income",
      "Enter Net monthly income",
      formikInput.values.Net_monthly_income,
      formikInput.touched.Net_monthly_income &&
        Boolean(formikInput.errors.Net_monthly_income),
      formikInput.touched.Net_monthly_income &&
        formikInput.errors.Net_monthly_income,
      false,
      [],
    ],
    6: [
      "Employment_type",
      "Employment Type",
      "Enter Employment type",
      formikInput.values.Employment_type,
      formikInput.touched.Employment_type &&
        Boolean(formikInput.errors.Employment_type),
      formikInput.touched.Employment_type && formikInput.errors.Employment_type,
      true,
      empTypeList,
    ],
  };

  const checkNumber = (e) => {
    if (
      e.target.name === "Mobile_no" ||
      e.target.name === "Net_monthly_income" ||
      e.target.name === "Loan_amount_required"
    )
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    if (e.target.name === "Mobile_no") {
      if (e.target.value.length > e.target.maxLength) {
        e.target.value = e.target.value.slice(0, e.target.maxLength);
      }
    }
  };

  return (
    <>
      <div className="tab-content" id="pills-tabContent">
        <Box id="personal-info" role="tabpanel">
          <form
            id="my-form"
            onSubmit={formikInput.handleSubmit}
            autoComplete="off"
          >
            <div
              className="tab-pane fade show active"
              id="personal-loan"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <div className="card form">
                <div className="leftImg pl">
                  <h2>Personal Loan</h2>
                  <p>
                    Unlock Best Personal Loan Offers suitable for your needs
                    from 30+ Lenders
                  </p>
                  <div className="img"></div>
                </div>
                <div className="right">
                  {Alert === true ? (
                    <div className="alert alert-success" role="alert">
                      Lead is generated successfully!
                    </div>
                  ) : (
                    <></>
                  )}

                  <div className="row">
                    {Object.entries(inputField).map(([key, item]) => (
                      <>
                        <div className="form-group col-lg-6">
                          <TextField
                            key={key}
                            fullWidth
                            id={item[0]}
                            select={item[6]}
                            name={item[0]}
                            label={item[1]}
                            placeholder={item[2]}
                            value={item[3]}
                            InputProps={{
                              inputProps: {
                                maxLength: item[8],
                                style: {
                                  height: "15px",
                                },
                              },
                            }}
                            onChange={(e) => {
                              checkNumber(e);
                              formikInput.handleChange(e);
                            }}
                            error={item[4]}
                            helperText={item[5]}
                          >
                            <MenuItem value="">
                              <em>{item[1]}</em>
                            </MenuItem>
                            {item[7].map((value, key) => (
                              <MenuItem
                                name={item[1]}
                                key={key}
                                value={value[0]}
                              >
                                {value[1]}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>
                      </>
                    ))}
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="service-footer">
                        <div className="service-footer-btn">
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={formikInput.handleReset}
                            form="my-form"
                          >
                            Reset
                          </button>

                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={formikInput.handleSubmit}
                          >
                            Submit Request
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Box>
        {toggleModal === true ? (
          <Modal
            verified={verified}
            setToggleModal={setToggleModal}
            setVerified={setVerified}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default PersonalLoan;
