import React, {Component} from "react";
import {StyleSheet, View, Text} from "react-native";

import OTPTextInput from "react-native-otp-textinput";
import {Loader, WrappedRectangleButton, WrappedText} from "../components";
import {
    globalHeight,
    globalWidth,
    FontFamily,
    fs16,
    fs14,
    fs24,
    errorColor,
} from "../../constants/Dimensions";
import {apiHandler, routeNames} from "../../server/apiHandler";
import {Storage} from "../../utilities/Storage";

//import {apiEndPoint} from "../../constants/server";
const TIMER = 5;
class Otp extends Component {
    state = {
        otp: "",
        error: {},
        timer: TIMER,
        isLoading: false,
    };

    clearText = () => {
        this.otpInput.clear();
    };

    setText = () => {
        this.otpInput.setValue("1234");
    };

    setTimerForOTP = () => {
        this.timer = setInterval(() => {
            this.setState((prevState) => {
                return {
                    timer: prevState.timer - 1,
                };
            });
        }, 1000);
    };

    resendOtp = async () => {
        this.setState({isLoading: true, timer: TIMER});
        const response = await apiHandler(routeNames.ResendOtp, {});
        if (response.success) {
            this.setState({isLoading: false});
            this.setTimerForOTP();
        } else {
            this.setState({
                error: {otpError: response.message},
                isLoading: false,
            });
        }
    };

    verifyOtp = async (otp) => {
        this.setState({isLoading: true, error: {}});
        const response = await apiHandler(routeNames.ConfirmOtp, {
            otpNumber: otp.toString(),
        });

        console.log(response);

        if (response.success) {
            this.setState({isLoading: false});
            if (response.data.show == "WELCOME BACK") {
                await Storage.setItem("userDetail", response.data.profile);
                this.props.navigation.navigate("Drawer");
            } else {
                this.props.navigation.navigate("profileScreen");
            }
        } else {
            this.setState({
                error: {otpError: response.message},
                isLoading: false,
            });
        }
    };

    checkInput = () => {
        const {otp} = this.state;
        if (otp.length < 6) {
            this.setState({error: {otpError: "Please enter all fields."}});
        } else {
            this.verifyOtp(otp);
        }
    };

    componentDidMount() {
        this.setTimerForOTP();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.timer === 0) {
            clearInterval(this.timer);
        }
    }

    render() {
        const {isLoading, error, timer} = this.state;
        return (
            <View style={{flex: 1}}>
                <View style={styles.Container}>
                    <WrappedText
                        text={"Verify Your Account"}
                        textStyle={styles.headingStyle}
                        fontFamily={"IBMPlexSans-Medium"}
                    />
                    <WrappedText
                        text={
                            "An OTP has been sent to you phone number. Please enter that OTP to login."
                        }
                        textStyle={styles.subHeadingStyle}
                        fontFamily={FontFamily.IBMPR}
                    />

                    <View
                        style={{
                            paddingHorizontal: 30,
                            marginTop: globalHeight * 1.5,
                        }}
                    >
                        {error["otpError"] ? (
                            <WrappedText
                                text={error["otpError"]}
                                textStyle={styles.errorStyle}
                                containerStyle={{alignSelf: "center"}}
                            />
                        ) : (
                            <View />
                        )}
                        <OTPTextInput
                            ref={(e) => (this.otpInput = e)}
                            inputCount={6}
                            textInputStyle={{width: globalWidth}}
                            tintColor={"#EF8B31"}
                            handleTextChange={(otp) => {
                                this.setState({otp});
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 40,
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={[
                                styles.otpText,
                                {fontWeight: timer < 1 ? "bold" : "normal"},
                            ]}
                            onPress={() => {
                                if (timer < 1) {
                                    this.resendOtp();
                                }
                            }}
                        >
                            {`Resend OTP`}
                        </Text>
                        {timer !== 0 ? (
                            <Text
                                style={[styles.otpText, {fontWeight: "bold"}]}
                            >
                                {` in ${timer}s`}
                            </Text>
                        ) : (
                            <View>{}</View>
                        )}
                    </View>
                    <View style={styles.buttonContainer}>
                        <WrappedRectangleButton
                            containerStyle={styles.buttonStyle}
                            buttonText={"Submit"}
                            textStyle={styles.textStyle}
                            onPress={() => {
                                this.checkInput();
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
        paddingTop: 34,
        paddingHorizontal: "5%",
    },
    headingStyle: {
        color: "#EF8B31",
        fontSize: fs24,
        fontStyle: "normal",
    },
    otpText: {
        color: "#EF8B31",
        fontSize: 16,
        fontFamily: FontFamily.IBMPR,
        fontStyle: "normal",
    },
    errorStyle: {
        color: errorColor,
        fontSize: fs14,
    },
    subHeadingStyle: {
        color: "#D1D1D1",
        marginTop: 14,
        fontSize: fs16,
        fontStyle: "normal",
    },
    buttonStyle: {
        height: globalHeight * 0.5,
        width: globalWidth * 2,
        borderRadius: globalHeight * 0.1,
        backgroundColor: "#EF8B31",
    },
    buttonContainer: {
        position: "absolute",
        bottom: "5%",
        right: "5%",
    },
    textStyle: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Libre Franklin",
        fontStyle: "normal",
    },
});
export default Otp;
