import axios from "axios";
import {apiEndPoint} from "./endPoint";
import {route} from "./route";

handleError = (error) => {
    function isNetworkError(err) {
        return err.isAxiosError && !err.response;
    }

    let message = "";
    if (isNetworkError(error)) {
        message = "Network Error";
        return {success: false, isNetworkError: true, message};
    } else {
        const data = error.response.data;
        console.log("error", data);
        message = data.message;
        return {success: false, isNetworkError: false, message};
    }
};

export const apiHandler = async (route, data) => {
    try {
        const {method, url} = route[route];

        const options = {
            method: method,
            url: apiEndPoint + url,
            data,
        };
        const response = await axios(options);
        const {data} = response;
        if (data.success) {
            return {success: true, data: data.data};
        }
    } catch (error) {
        return this.handleError(error);
    }
};
