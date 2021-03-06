const version1 = "/v1/";
export const RouteList = {
    Otp: {
        url: version1 + "otp/send",
        method: "POST",
    },
    ConfirmOtp: {
        url: version1 + "otp/confirm",
        method: "PATCH",
    },
    ResendOtp: {
        url: version1 + "otp/resend",
        method: "GET",
    },
    UpdateProfile: {
        url: version1 + "users/update",
        method: "PATCH",
    },
    MainList: {
        url: version1 + "list/main/all?skip=0",
        method: "GET",
    },
    SubList: {
        url: version1 + "list/sub/all?",
        method: "GET",
    },
    FetchAudio: {
        url: version1 + "listen/data/",
        method: "GET",
    },
};
