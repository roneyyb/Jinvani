import {StyleSheet, Dimensions} from "react-native";
export const globalHeight = Dimensions.get("window").height * 0.1;
export const globalWidth = Dimensions.get("window").width * 0.1;
export const fs16 = globalHeight * 0.2;
export const fs44 = globalHeight * 0.5;
export const fs24 = globalHeight * 0.3;
export const fs15 = globalHeight * 0.18;
export const fs17 = globalHeight * 0.22;
export const fs20 = globalHeight * 0.25;
export const fs52 = 52;
export const fs14 = 14;
export const fs18 = 18;
export const fs19 = 19;
export const fs30 = 30;
export const fs51 = 51;
export const errorColor = "#F73D02CC";
export const FontFamily = {
    BaiR: "BaiJamjuree-Regular",
    BaiSB: "BaiJamjuree-SemiBold",
    IBMPM: "IBMPlexSans-Medium",
    IBMPR:
        // Platform.OS === PlatformType.Android
        //?
        "IBMPlexSans-Regular",
    // : "BaiJamjuree-Regular",
    IBMPSB: "IBMPlexSans-SemiBold",
};

export const genderFields = [
    {
        label: "Male",
        value: "Male",
    },
    {
        label: "Female",
        value: "Female",
    },
    {
        label: "Other",
        value: "Other",
    },
];

export const languageFields = [
    {
        label: "English",
        value: "En",
    },
    {
        label: "Hindi",
        value: "Hi",
    },
];
