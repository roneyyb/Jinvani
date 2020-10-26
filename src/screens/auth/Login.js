import React, {Component} from "react";
import {View, Image, StyleSheet} from "react-native";
import JainSymbol from "../../icons/jain_symbol.png";
import {WrappedRectangleButton, Loader} from "../components/index";
import {Input} from "react-native-elements";
//import WrappedTextInput from "./components/WrappedTextInput";ents";

class Login extends Component {
    state = {
        phoneNumber: "",
        phoneNumberError: "",
        fetchError: "",
        isLoading: false,
    };

    sendDetailsToServer = (phone) => {
        this.props.navigation.navigate("otpScreen");
    };

    setLoader = () => {
        this.setState((prevState) => {
            return {
                isLoading: !prevState.isLoading,
            };
        });
    };

    onSubmit = () => {
        const {phoneNumber} = this.state;
        let flag = 0;
        const phoneValidation = /^[1-9]{1}[0-9]{9}$/;
        if (!phoneValidation.test(phoneNumber)) {
            this.setState({
                phoneNumberError: "Please enter valid phone number.",
            });
        } else {
            this.setState({phoneNumberError: ""});
            this.sendDetailsToServer(phoneNumber);
        }
    };

    render() {
        const {isLoading, phoneNumber, phoneNumberError} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.containerI}>
                    <View style={styles.container1}>
                        <Image
                            source={JainSymbol}
                            //style={{height: 100, width: 100}}
                        />
                    </View>
                    <View style={styles.container2}>
                        <Input
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            returnKeyType="next"
                            errorMessage={phoneNumberError}
                            keyboardType={"numeric"}
                            placeholder="Phone number"
                            value={phoneNumber}
                            onChangeText={(phoneNumber) => {
                                this.setState({phoneNumber});
                            }}
                        />
                        <View style={styles.buttonContainer}>
                            <WrappedRectangleButton
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
                </View>
                {isLoading ? <Loader /> : <View />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    containerI: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: "10%",
    },
    container1: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    container2: {
        flex: 1,
        justifyContent: "center",
    },
    buttonStyle: {
        height: 40,
        width: 80,
        borderRadius: 12,
        backgroundColor: "#EF8B31",
    },
    buttonContainer: {
        position: "absolute",
        bottom: 0,
        right: 0,
    },
    textStyle: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Libre Franklin",
        fontStyle: "normal",
    },
});

export default Login;
