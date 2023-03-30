function resendOtp(props) {
  props.setTimeOutShow("none");
  setTimeout(props.offDisable, 5000);
}
function handleClick(props) {
  if (props.toggleShow === "hide") props.setToggleShow("show");
  props.setDisableOn(true);
}
function handleChange(props) {
  props.e.target.value = props.e.target.value.replace(/[^0-9]/g, "");
  if (props.e.key === "Backspace") {
    props.setOtp(props.otp.substring(0, props.otp.length - 1));
  }
  if (
    props.otp.length <= 5 &&
    (props.e.key === "1" ||
      props.e.key === "2" ||
      props.e.key === "3" ||
      props.e.key === "4" ||
      props.e.key === "5" ||
      props.e.key === "6" ||
      props.e.key === "7" ||
      props.e.key === "8" ||
      props.e.key === "9" ||
      props.e.key === "0")
  ) {
    let str = props.otp + props.e.key;
    props.setOtp(str);
    if (props.otp.length === 5) props.setDisableOn(false);
  }
}
function maxLengthCheck(props) {
  if (props.e.target.value.length > props.e.target.maxLength) {
    props.e.target.value = props.e.target.value.slice(
      0,
      props.e.target.maxLength
    );
  }
}
function maxPhoneNumber(props) {
  props.e.target.value = props.e.target.value.replace(/[^0-9]/g, "");
  let firstNumber = props.e.target.value[0];
  if (firstNumber < 6) props.setfirstNo("first");
  else props.setfirstNo("");
  if (props.e.target.value.length > props.e.target.maxLength) {
    props.e.target.value = props.e.target.value.slice(
      0,
      props.e.target.maxLength
    );
  }
  if (props.e.target.value.length === 10 && props.firstNo === "")
    props.setDisableOn(false);
  else props.setDisableOn(true);
  props.setmobileNumber(props.e.target.value);
}

const ValidityFunction = {
  resendOtp,
  handleClick,
  // handleVerify,
  handleChange,
  maxPhoneNumber,
  maxLengthCheck,
};

export default ValidityFunction;
