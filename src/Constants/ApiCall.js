import axios from "axios";
import cookie from "react-cookies";
import{getCookie} from "gfdu";
class ApiCall {
  get(url, callback) {
    this.createInstance(url, null, 0)
      .then((result) => {
        callback(result.data);
      })
      .catch((error) => {callback(error)});
  }

  post(url, data, callback) {
    this.createInstance(url, data, 1)
      .then((result) => {
        callback(result.data);
      })
      .catch((error) => {callback(error)});
  }

  put(url, data, callback) {
    this.createInstance(url, data, 2)
      .then((result) => {
        callback(result.data);
      })
      .catch((error) => {callback(error)});
  }
  patch(url, data, callback) {
    this.createInstance(url, data, 3)
      .then((result) => {
        callback(result.data);
      })
      .catch((error) => {callback(error)});
  }
  delete(url, data, callback) {
    this.createInstance(url, data, 4)
      .then((result) => {
        callback(result.data);
      })
      .catch((error) => {callback(error)});
  }

  createInstance(append, data, type) {
    var instance = axios.create({
        withCredentials:true,
    });
    //instance.defaults.withCredentials = true;
    instance.defaults.headers.post["Content-Type"] = "application/json";
    instance.defaults.headers.common["Authorization"] =
      "Bearer " + cookie.load("merchant_token");
    instance.defaults.headers.common["xsrf-token"] = getCookie('CsrfToken');
    var url = "https://storeapi.ippopay.com/api/v1/merchant-panel/" + append;
    // var url = "https://ippouat.ippopay.com/api/v1/merchant-panel/" + append;
    switch (type) {
      case 0:
        return instance.get(url);
      case 1:
        return instance.post(url, data);
      case 2:
        return instance.put(url, data);
      case 3:
        return instance.patch(url, data);
      default:
        return instance.delete(url, data);
    }
  }
}

export default new ApiCall();
