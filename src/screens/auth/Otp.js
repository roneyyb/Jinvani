import React, {Component} from "react";
import {StyleSheet, View, Text} from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import Button from "../components/WrappedRectangleButton";
import Loader from "../components/Loader";

//import axios from "axios";
//import {apiEndPoint} from "../../constants/server";

class Otp extends Component {
    state = {
        otp: "",
        otpError: "",
        timer: 5,
        isLoading: false,
        fetchError: "",
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

    // sendMail() {
    //     const token = this.props.route.params.token;
    //     console.log(token);
    //     axios
    //         .get(apiEndPoint + "/otp/sendOtp", {
    //             headers: {
    //                 "x-auth-token": token,
    //             },
    //         })
    //         .then((response) => {
    //             console.log(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }

    // checkOtp = (otp) => {
    //     const token = this.props.route.params.token;
    //     this.setState({isLoading: true});
    //     axios
    //         .post(
    //             apiEndPoint + "/otp/verifyOtp",
    //             {
    //                 otp: otp,
    //             },
    //             {
    //                 headers: {
    //                     "x-auth-token": token,
    //                 },
    //             },
    //         )
    //         .then((response) => {
    //             console.log(response.data);
    //             if (response.data.success) {
    //                 this.setState({isLoading: false});
    //                 this.props.navigation.navigate("resetScreen", {token});
    //             } else {
    //                 this.setState({
    //                     isLoading: false,
    //                     otpError: response.data.error,
    //                 });
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

    resendOtp = () => {
        this.setState({timer: 5});
        this.setTimerForOTP();
    };

    checkInput = () => {
        const {otp} = this.state;
        if (otp.length < 6) {
            this.setState({otpError: "Please enter all fields."});
        } else {
            this.checkOtp(otp);
        }
    };
    componentDidMount() {
        this.setTimerForOTP();
        //this.sendMail();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.timer === 0) {
            clearInterval(this.timer);
        }
    }

    render() {
        const {isLoading, otpError} = this.state;
        return (
            <View style={{flex: 1}}>
                <View style={styles.Container}>
                    <Text style={styles.headingStyle}>
                        {"Verify Your Account"}
                    </Text>
                    <Text style={styles.subHeadingStyle}>
                        {
                            "An OTP has been sent to you phone number. Please enter that OTP to login."
                        }
                    </Text>
                    <View style={{paddingHorizontal: 30, marginTop: 100}}>
                        <OTPTextInput
                            ref={(e) => (this.otpInput = e)}
                            inputCount={6}
                            textInputStyle={{width: 40}}
                            tintColor={"#EF8B31"}
                            handleTextChange={(otp) => {
                                this.setState({otp});
                            }}
                        />
                        <View style={{alignSelf: "center"}}>
                            <Text style={{color: "red"}}>{otpError}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 40,
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={styles.otpText}
                            onPress={() => {
                                if (this.state.timer == 0) {
                                    this.resendOtp();
                                }
                            }}
                        >
                            {`Resend OTP`}
                        </Text>
                        {this.state.timer !== 0 ? (
                            <Text
                                style={[styles.otpText, {fontWeight: "bold"}]}
                            >
                                {` in ${this.state.timer}s`}
                            </Text>
                        ) : (
                            <View>{}</View>
                        )}
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={() => {
                                this.props.navigation.navigate("login");
                            }}
                            backgroundColor={"#5000611A"}
                            textColor={"#500061"}
                            opacity={1}
                            elevation={0}
                            buttonText={"Sign In"}
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
        fontSize: 24,
        fontWeight: "bold",
        fontFamily: "Libre Franklin",
        fontStyle: "normal",
    },
    otpText: {
        color: "#EF8B31",
        fontSize: 16,
        fontFamily: "Libre Franklin",
        fontStyle: "normal",
    },
    subHeadingStyle: {
        color: "#D1D1D1",
        marginTop: 14,
        fontSize: 20,
        fontFamily: "Libre Franklin",
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
        fontFamily: "Libre Franklin",
        fontStyle: "normal",
    },
});
export default Otp;
