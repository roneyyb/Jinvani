import axios from "axios";
import { apiEndPoint } from "./endPoint";
import { RouteList } from "./Route/route";

import { Storage, StorageItemKeys } from "../utilities/Storage";

const handleError = (error) => {
  function isNetworkError(err) {
    return err.isAxiosError && !err.response;
  }

  let message = "";
  if (isNetworkError(error)) {
    message = "Please Check Your Internet Conneciton.";
    return { success: false, isNetworkError: true, message };
  } else {
    const data = error.response.data;
    message = data.data;
    if (message) {
      return { success: false, isNetworkError: false, message };
    } else {
      return {
        success: false,
        isNetworkError: false,
        message: "Internal Error",
      };
    }
  }
};

export const apiHandler = async (
  route,
  Data,
  lazyLoading,
  skip,
  query,
  queryValue
) => {
  try {
    const { method, url } = RouteList[route];

    const options = {
      method: method,
      url: apiEndPoint + url,
      data: Data,
    };
    if (lazyLoading) {
      options.url =
        options.url + "skip=" + skip + "&" + query + "=" + queryValue;
    }

    if (route == routeNames.FetchAudio) {
      options.url = options.url + Data;
      options.data = {};
    }

    const response = await axios(options);
    const x_auth_token = response.headers["x-auth-token"];
    if (x_auth_token) {
      axios.defaults.headers.common = {
        "x-auth-token": x_auth_token,
      };
      await Storage.setItem(StorageItemKeys.x_auth_token, x_auth_token);
    }
    const { data } = response;

    if (data.msg == "OK") {
      return { success: true, data: data.data };
    }
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};

export const routeNames = {
  Otp: "Otp",
  ConfirmOtp: "ConfirmOtp",
  ResendOtp: "ResendOtp",
  UpdateProfile: "UpdateProfile",
  MainList: "MainList",
  SubList: "SubList",
  FetchAudio: "FetchAudio",
};
