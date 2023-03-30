import React, { useState, useEffect, useContext } from "react";
import userContext from "../../../Context/userContext";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import Cookies from "js-cookie";

const PersonalLoanLeadDetails = () => {
  const [loanLeadDetails, setLoanLeadDetails] = useState([]);
  const context = useContext(userContext);
  const { user, city } = context;
  const [rows, setRows] = useState([]);
  const [searchFinCode, setSearchFinCode] = useState("");
  const subproduct = [
    {
      SubProductId: 1,
      docId: "1p",
      SubProductName: "PersonalLoan",
      ListName: "Personal Loan",
    },
    {
      SubProductId: 2,
      docId: "2h",
      SubProductName: "HomeLoan",
      ListName: "Home Loan",
    },
    {
      SubProductId: 3,
      docId: "3b",
      SubProductName: "BusinessLoan",
      ListName: "Business Loan",
    },
  ];
  const [filterValue, setFilterValue] = useState([]);

  const dateConversion = (date) => {
    const [yy, mm] = date.split(/-/g);
    const month = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Aug",
      "09": "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec",
    };
    const newDate = `${month[mm]} ${yy}`;
    return newDate;
  };

  useEffect(() => {
    if (loanLeadDetails.length === 0) fetchLeads();
    setRows(
      loanLeadDetails.map(function (detail) {
        return {
          Id: detail.Id,
          FINCode: detail.FINCode,
          Name: detail.Name,
          CustomerMobile: detail.CustomerMobile,
          CityId: city[detail.CityId - 1].City,
          LoanAmount: detail.LoanAmount,
          NetMonthlyIncome: detail.NetMonthlyIncome,
          status: detail.IsPresent === 1 ? "Rejected" : "-",
          sub_product_id: subproduct[detail.SubProductId - 1].ListName,
          Date: dateConversion(detail.CreatedAt.slice(0, 10)),
        };
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loanLeadDetails.length]);
  const Token = JSON.parse(user).token.Token;
  const fetchLeads = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json",
      },
    };
    var response;
    if (
      JSON.parse(localStorage.getItem("UserDetails")).FINCode !==
      process.env.REACT_APP_ADMIN_USERNAME
    ) {
      response = await fetch(
        `${
          process.env.REACT_APP_LOCALHOST_SERVER
        }/product/readallfinancialservices/${
          JSON.parse(Cookies.get("userCookie")).token.FINCode
        }`,
        requestOptions
      );
    } else {
      response = await fetch(
        `${process.env.REACT_APP_LOCALHOST_SERVER}/product/readfinancialservices`,
        requestOptions
      );
    }
    const result = await response.json();
    console.log(result);
    setLoanLeadDetails(result);
    return result;
  };
  useEffect(() => {
    if (searchFinCode.length === 12) {
      setRows(
        loanLeadDetails
          .filter(
            (row) =>
              filterValue.includes(row.SubProductId) &&
              row.FINCode.includes(searchFinCode)
          )
          .map(function (detail) {
            return {
              Id: detail.Id,
              FINCode: detail.FINCode,
              Name: detail.Name,
              CustomerMobile: detail.CustomerMobile,
              CityId: city[detail.CityId - 1].City,
              LoanAmount: detail.LoanAmount,
              NetMonthlyIncome: detail.NetMonthlyIncome,
              status: detail.IsPresent === 1 ? "Rejected" : "-",
              sub_product_id: subproduct[detail.SubProductId - 1].ListName,
              Date: dateConversion(detail.CreatedAt.slice(0, 10)),
            };
          })
      );
      if (filterValue.length === 0) {
        setRows(
          loanLeadDetails
            .filter((row) => row.FINCode.includes(searchFinCode))
            .map(function (detail) {
              return {
                Id: detail.Id,
                FINCode: detail.FINCode,
                Name: detail.Name,
                CustomerMobile: detail.CustomerMobile,
                CityId: city[detail.CityId - 1].City,
                LoanAmount: detail.LoanAmount,
                NetMonthlyIncome: detail.NetMonthlyIncome,
                status: detail.IsPresent === 1 ? "Rejected" : "-",
                sub_product_id: subproduct[detail.SubProductId - 1].ListName,
                Date: dateConversion(detail.CreatedAt.slice(0, 10)),
              };
            })
        );
      }
    } else {
      setRows(
        loanLeadDetails
          .filter((row) => filterValue.includes(row.SubProductId))
          .map(function (detail) {
            return {
              Id: detail.Id,
              FINCode: detail.FINCode,
              Name: detail.Name,
              CustomerMobile: detail.CustomerMobile,
              CityId: city[detail.CityId - 1].City,
              LoanAmount: detail.LoanAmount,
              NetMonthlyIncome: detail.NetMonthlyIncome,
              status: detail.IsPresent === 1 ? "Rejected" : "-",
              sub_product_id: subproduct[detail.SubProductId - 1].ListName,
              Date: dateConversion(detail.CreatedAt.slice(0, 10)),
            };
          })
      );
      if (filterValue.length === 0) {
        setRows(
          loanLeadDetails.map(function (detail) {
            return {
              Id: detail.Id,
              FINCode: detail.FINCode,
              Name: detail.Name,
              CustomerMobile: detail.CustomerMobile,
              CityId: city[detail.CityId - 1].City,
              LoanAmount: detail.LoanAmount,
              NetMonthlyIncome: detail.NetMonthlyIncome,
              status: detail.IsPresent === 1 ? "Rejected" : "-",
              sub_product_id: subproduct[detail.SubProductId - 1].ListName,
              Date: dateConversion(detail.CreatedAt.slice(0, 10)),
            };
          })
        );
      }
    }
  }, [filterValue, searchFinCode]);
  var col = [];
  const priorityFormater = (value) => {
    if (value === "Rejected")
      return <span className="rejectedlead">Rejected</span>;
    else return "-";
  };
  if (
    JSON.parse(localStorage.getItem("UserDetails")).FINCode !==
    process.env.REACT_APP_ADMIN_USERNAME
  ) {
    col = [
      { field: "Id", headerName: "Id", width: 90, hide: true },
      {
        field: "Name",
        headerName: "Name",
        headerAlign: "left",
        align: "left",
        sortable: false,
        width: 210,
      },
      {
        field: "CustomerMobile",
        headerName: "Mobile Number",
        valueGetter: NumberFormat,
        headerAlign: "center",
        align: "center",
        sortable: false,
        width: 140,
      },
      {
        field: "CityId",
        headerName: "City",
        headerAlign: "center",
        align: "center",
        sortable: false,
        width: 140,
      },
      {
        field: "LoanAmount",
        headerName: "Loan Amount",
        headerAlign: "center",
        align: "center",
        sortable: false,
        width: 180,
      },
      {
        field: "sub_product_id",
        headerName: "Product",
        headerAlign: "center",
        align: "center",
        sortable: false,
        width: 180,
      },
      {
        field: "Date",
        headerName: "Date",
        headerAlign: "center",
        align: "center",
        sortable: false,
        width: 100,
      },
      {
        field: "status",
        headerName: "Status",
        headerAlign: "center",
        align: "center",
        sortable: false,
        width: 140,
        renderCell: (params) => {
          return priorityFormater(params.value);
        },
      },
    ];
  } else {
    col = [
      { field: "Id", headerName: "Id", width: 90, hide: true },
      {
        field: "Name",
        headerName: "Name",
        headerAlign: "left",
        align: "left",
        sortable: false,
        width: 210,
      },
      {
        field: "CustomerMobile",
        headerName: "Mobile Number",
        valueGetter: NumberFormat,
        headerAlign: "center",
        align: "center",
        sortable: false,
        width: 140,
      },
      {
        field: "CityId",
        headerName: "City",
        headerAlign: "center",
        align: "center",
        sortable: false,
        width: 140,
      },
      {
        field: "FINCode",
        headerName: "FINCode",
        headerAlign: "center",
        align: "center",
        sortable: false,
        width: 180,
      },
      {
        field: "sub_product_id",
        headerName: "Product",
        headerAlign: "center",
        align: "center",
        sortable: false,
        width: 180,
      },
      {
        field: "Date",
        headerName: "Date",
        headerAlign: "center",
        align: "center",
        sortable: false,
        width: 100,
      },
      {
        field: "status",
        headerName: "Status",
        headerAlign: "center",
        align: "center",
        sortable: false,
        width: 140,
        renderCell: (params) => {
          return priorityFormater(params.value);
        },
      },
    ];
  }
  function NumberFormat(props) {
    const MobileNumber = props.value;
    return MobileNumber.toString().replace(/(\d{6})$/, "XXXXXX");
  }

  const handleFilterChange = (event) => {
    let checkbox = document.getElementById(event.target.id);
    if (checkbox.checked) {
      if (!filterValue.includes(parseInt(event.target.value)))
        setFilterValue([...filterValue, parseInt(event.target.value)]);
    } else {
      if (filterValue.includes(parseInt(event.target.value)))
        setFilterValue(
          filterValue.filter((value) => value !== parseInt(event.target.value))
        );
    }
    console.log(filterValue);
  };
  const handleSearchChange = (event) => {
    setSearchFinCode(event.target.value);
  };
  return (
    <>
      <div className="container">
        <div className="tab-content" id="pills-tabContent">
          {/* <h1 className="main-heading">
            <span>Lead Details</span>
          </h1> */}

          <div className="filterdiv">
            <div className="left">
              {subproduct.map((obj) => (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={obj.docId}
                    value={obj.SubProductId}
                    onChange={handleFilterChange}
                  />
                  <label
                    className="form-check-label"
                    id={obj.docId}
                    key={obj.SubProductId}
                  >
                    {obj.SubProductName}
                  </label>
                </div>
              ))}
            </div>
            {JSON.parse(localStorage.getItem("UserDetails")).FINCode ===
            process.env.REACT_APP_ADMIN_USERNAME ? (
              <div className="right">
                <div className="search">
                  <input
                    className="form-control"
                    placeholder="Search by FINCode..."
                    onChange={handleSearchChange}
                  />
                  <i className="fa fa-search" aria-hidden="true"></i>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>

          <Box
            style={{ height: 490, width: "100%", margin: "0 0 1ch 0" }}
            sx={{
              "& .super-app.positive": {
                minWidth: "auto !important",
                maxWidth: "none !important",
                minHeight: "auto !important",
                maxHeight: "none !important",
                backgroundColor: "#fef6f6",
                color: "red",
                fontSize: "11px",
                borderRadius: "10px",
                // border: "none",
                fontWeight: "normal",
                padding: "3px 10px",
                position: "absolute",
                right: "-120px",
                top: "9px",
              },
            }}
          >
            <DataGrid
              rows={rows}
              disableColumnMenu
              disableColumnFilter
              disableColumnSelector
              rowHeight={38}
              columns={col}
              pageSize={10}
              rowsPerPageOptions={[10]}
              getRowId={(row) => row.Id + row.FINCode}
            />
          </Box>
        </div>
      </div>
    </>
  );
};
export default PersonalLoanLeadDetails;
