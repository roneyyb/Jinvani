import React, {Component} from "react";
import {StyleSheet, View, Text} from "react-native";
import {Input} from "react-native-elements";
import Button from "../../components/WrappedRectangleButton";
import Loader from "../../components/Loader";
import WrappedText from "../../components/WrappedText";
import WrappedTextInput from "../../components/WrappedTextInput";
import WrappedDropDown from "../../components/WrappedDropDown";
import {
    FontFamily,
    globalHeight,
    genderFields,
    languageFields,
    fs16,
} from "../../../constants/Dimensions";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";

class Profile extends Component {
    state = {
        firstName: "",
        lastName: "",
        gender: genderFields[0].value,
        language: languageFields[0].value,
        firstNameError: "",
        lastNameError: "",
        genderError: "",
        error: {},
        language: "",
        isLoading: false,
    };

    setGender = (gender) => {
        this.setState({gender});
    };

    render() {
        const {
            firstName,
            lastName,
            gender,
            genderError,
            firstNameError,
            lastNameError,
            language,
            error,
            isLoading,
        } = this.state;
        return (
            <View style={{flex: 1}}>
                <View style={styles.Container}>
                    <WrappedText
                        text={"Add Details"}
                        textStyle={styles.headingStyle}
                        fontFamily={"IBMPlexSans-Medium"}
                    />
                    <WrappedText
                        text={
                            "Please provide following details for better user experience."
                        }
                        textStyle={styles.subHeadingStyle}
                        fontFamily={FontFamily.IBMPR}
                    />

                    <KeyboardAwareScrollView style={{}}>
                        <WrappedTextInput
                            value={firstName}
                            onChangeText={(firstName) => {
                                this.setState({firstName});
                            }}
                            placeholder={"First name"}
                            style={styles.textContainer}
                            errorText={error["firstName"]}
                        />
                        <WrappedTextInput
                            value={lastName}
                            onChangeText={(lastName) => {
                                this.setState({lastName});
                            }}
                            placeholder={"Last name"}
                            style={styles.textContainer}
                            errorText={error["lastName"]}
                        />
                    </KeyboardAwareScrollView>

                    <View>
                        <WrappedDropDown
                            items={genderFields}
                            placeholder={"Gender"}
                            //defaultValue={"Male"}
                            containerStyle={styles.dropDownContainer}
                            itemStyle={{
                                justifyContent: "flex-start",
                            }}
                            placeholder={"Select Gender"}
                            labelStyle={styles.dropDownText}
                            onChangeItem={(gender) => {
                                this.setState({
                                    gender: gender.value,
                                });
                            }}
                        />
                        {error["gender"] ? (
                            <Text style={styles.error}>{error["gender"]}</Text>
                        ) : (
                            <View />
                        )}

                        <WrappedDropDown
                            items={languageFields}
                            placeholder={"Select Language"}
                            defaultValue={languageFields[0].value}
                            containerStyle={styles.dropDownContainer}
                            itemStyle={{
                                justifyContent: "flex-start",
                            }}
                            labelStyle={styles.dropDownText}
                            onChangeItem={(gender) => {
                                this.setState({
                                    gender: gender.value,
                                });
                            }}
                        />
                        {error["gender"] ? (
                            <Text style={styles.error}>{error["gender"]}</Text>
                        ) : (
                            <View />
                        )}
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            containerStyle={styles.buttonStyle}
                            buttonText={"Submit"}
                            textStyle={styles.textStyle}
                            onPress={() => {
                                //this.checkInput();
                            }}
                        />
                    </View>
                </View>
                {isLoading ? <Loader /> : <View />}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingTop: 40,
        paddingHorizontal: "5%",
    },
    headingStyle: {
        color: "#EF8B31",
        fontSize: 24,
        fontFamily: FontFamily.BaiSB,
        //fontFamily: "Libre Franklin",
        fontStyle: "normal",
    },
    otpText: {
        color: "#EF8B31",
        fontSize: 16,
        //fontFamily: "Libre Franklin",
        fontStyle: "normal",
    },
    subHeadingStyle: {
        color: "#D1D1D1",
        //marginTop: 14,
        fontSize: fs16,
        fontFamily: FontFamily.IBMPM,
        //fontFamily: "Libre Franklin",
        fontStyle: "normal",
    },
    buttonStyle: {
        height: 40,
        width: 80,
        borderRadius: 12,
        backgroundColor: "#EF8B31",
    },
    buttonContainer: {
        position: "absolute",
        bottom: 40,
        right: 40,
    },
    textStyle: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
        //fontFamily: "Libre Franklin",
        fontStyle: "normal",
    },
    textContainer: {
        height: globalHeight * 0.6,
        borderRadius: globalHeight * 0.05,
        borderWidth: globalHeight * 0.02,
        borderColor: "#EEEEEE",
        color: "#1A202C4D",
        justifyContent: "center",
    },
    dropDownContainer: {
        width: "100%",
        height: globalHeight * 0.6,
        marginTop: 10,
    },
    dropDownText: {
        fontFamily: "IBMPlexSans-Medium",
        fontStyle: "normal",
        fontSize: fs16,
        //color: "#00000099",
        color: "#1A202C4D",
        fontWeight: "normal",
    },
    textInput: {
        color: "#1A202C4D",
    },
});

export default Profile;
