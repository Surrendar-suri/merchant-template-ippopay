import cookie from "react-cookies";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const isLoggedIn = () => {
  var token = cookie.load("agent_auth");
  return token ? true : false;
};

export const showToast = (type, msg) => {
  return toast[type](msg);
};
export function returnFirstDegreeObjValue(obj, key) {
  return obj && (obj[key] || obj[key] === 0) ? obj[key] : "N/A";
}

export function returnThirdDegreeObjValue(masterobj, obj, key, postion) {
  if (
    masterobj &&
    masterobj[obj] &&
    masterobj[obj][key] &&
    (masterobj[obj][key][postion] || masterobj[obj][key][postion] === 0)
  )
    return masterobj[obj][key][postion];
  else return "N/A";
}
export function returnSecondDegreeObjValue(obj, key, postion) {
  if (obj && obj[key] && (obj[key][postion] || obj[key][postion] === 0))
    return obj[key][postion];
  else return "N/A";
}
export function returnSimpleFormatedDateTime(dateString) {
  return dateString === ""
    ? ""
    : moment(dateString).format("DD MMM YYYY h:mm a");
}
// export const isInvalidName = (value) => {
//   let nameRegex = /^[a-zA-Z ]+$/;
//   if (!nameRegex.test(value)) {
//     return true;
//   } else {
//     return false;
//   }
// };
export const isInvalidName = (value) => {
  let nameRegex = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
  return (!nameRegex.test(value));
};
export const isInvalidEmail = (email) => {
  let eRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!eRegex.test(email)) return true;
  else return false;
};

export function textCapitalize(data) {
  if (data !== undefined && data !== null && data !== "") {
    return data.charAt(0).toUpperCase() + data.slice(1);
  } else {
    return data;
  }
}
export function currencyFormatter(amount,code) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency:  code }).format(amount) ;
}
export function toFixed(value) {
  return Number(value).toFixed(2);
}
