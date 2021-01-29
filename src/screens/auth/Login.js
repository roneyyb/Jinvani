import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import JainSymbol from "../../icons/jain_symbol.png";
import {
  WrappedTextInput,
  WrappedRectangleButton,
  Loader,
} from "../components";
import { globalHeight, globalWidth } from "../../constants/Dimensions";
import { apiHandler, routeNames } from "../../server/apiHandler";

class Login extends Component {
  state = {
    phoneNumber: "",
    phoneNumberError: "",
    isLoading: false,
    error: {},
  };

  sendDetailsToServer = async (phone) => {
    console.log(phone);
    try {
      this.setState({ isLoading: true });
      const response = await apiHandler(routeNames.Otp, {
        mobileNo: phone.toString(),
      });
      console.log("response from server", response);
      if (response.success) {
        this.setState({ isLoading: false });
        this.props.navigation.replace("otpScreen", {
          mobileNumber: phone,
        });
      } else {
        this.setState({
          error: { phoneNumber: response.message },
          isLoading: false,
        });
      }
    } catch (error) {
      this.setState({ isLoading: false });
      console.log(error);
    }
  };

  setLoader = () => {
    this.setState((prevState) => {
      return {
        isLoading: !prevState.isLoading,
      };
    });
  };

  onSubmit = () => {
    const { phoneNumber } = this.state;
    let error = {};
    const phoneValidation = /^[1-9]{1}[0-9]{9}$/;
    if (!phoneValidation.test(phoneNumber)) {
      error["phoneNumber"] = "Please enter valid phone number";
      this.setState({ error });
    } else {
      this.setState({ error: {} });
      this.sendDetailsToServer(phoneNumber);
    }
  };

  render() {
    const { isLoading, phoneNumber, error } = this.state;
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
            <WrappedTextInput
              value={phoneNumber}
              onChangeText={(phoneNumber) => {
                this.setState({ phoneNumber });
              }}
              keyboardType={"numeric"}
              placeholder={"Phone Number"}
              style={styles.textContainer}
              errorText={error["phoneNumber"]}
            />
            <View style={styles.buttonContainer}>
              <WrappedRectangleButton
                containerStyle={styles.buttonStyle}
                buttonText={"Submit"}
                textStyle={styles.textStyle}
                onPress={() => {
                  this.onSubmit();
                }}
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
  textContainer: {
    height: globalHeight * 0.6,
    //borderRadius: globalHeight * 0.05,
    borderBottomWidth: globalHeight * 0.02,
    borderColor: "#EEEEEE",
    color: "#1A202C4D",
    justifyContent: "center",
  },
});

export default Login;
