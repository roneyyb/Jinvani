import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  WrappedDropDown,
  WrappedRectangleButton,
  WrappedText,
  WrappedTextInput,
  Loader,
  WrappedRoundButton,
} from "../../components";
import {
  FontFamily,
  globalHeight,
  genderFields,
  languageFields,
  salutationFields,
  fs16,
  errorColor,
  fs14,
  globalWidth,
  themeColor,
} from "../../../constants/Dimensions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { apiHandler, routeNames } from "../../../server/apiHandler";
import { Storage } from "../../../utilities/Storage";
import Feather from "react-native-vector-icons/Feather";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";

class Profile extends Component {
  state = {
    firstName: "",
    lastName: "",
    gender: genderFields[0].value,
    language: languageFields[0].value,
    salutaion: salutationFields[0].value,
    error: {},
    isLoading: false,
    update:
      (this.props.route.params && this.props.route.params.update) || false,
  };

  setGender = (gender) => {
    this.setState({ gender });
  };

  sendDetailsToServer = async () => {
    this.setState({ isLoading: true });
    const { firstName, lastName, language, salutaion, gender } = this.state;
    const data = {
      firstName,
      lastName,
      gender,
      lang: language,
      saluation: salutaion,
    };
    const response = await apiHandler(routeNames.UpdateProfile, data);

    if (response.success) {
      await Storage.setItem("userDetail", { ...data });
      this.setState({ isLoading: false });
      this.props.navigation.replace("Drawer");
    } else {
      this.setState({
        error: { fetchError: response.message },
        isLoading: false,
      });
    }
  };

  submitDetails = () => {
    const { firstName, lastName } = this.state;
    let error = {},
      flag = 0;
    if (firstName.length < 3) {
      flag = 1;
      error["firstName"] = "First Name length should be greater than 2.";
    }
    if (lastName.length < 3) {
      flag = 1;
      error["lastName"] = "Last Name length should be greater than 2.";
    }
    this.setState({ error });

    if (flag == 0) {
      this.sendDetailsToServer();
    }
  };

  async componentDidMount() {
    try {
      const userDetail = await Storage.getItem("userDetail");
      this.setState({ ...userDetail, language: userDetail.lang });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      firstName,
      lastName,
      error,
      isLoading,
      update,
      language,
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.Container}>
          <KeyboardAwareScrollView
            contentContainerStyle={{
              flex: 1,
              backgroundColor: "#ffffff",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.replace("Drawer");
                }}
              >
                <Feather name={"arrow-left"} color={themeColor} size={25} />
              </TouchableOpacity>

              <WrappedText
                text={update ? "Update Details" : "Add Details"}
                textStyle={[
                  styles.headingStyle,
                  { marginLeft: globalWidth * 0.3 },
                ]}
                fontFamily={"IBMPlexSans-Medium"}
              />
            </View>
            <WrappedText
              text={
                "Please provide following details for better user experience."
              }
              textStyle={styles.subHeadingStyle}
              fontFamily={FontFamily.IBMPR}
            />
            <View style={{ marginTop: globalHeight * 0.5 }} />
            {error["fetchError"] ? (
              <WrappedText
                text={error["fetchError"]}
                textStyle={styles.errorStyle}
                containerStyle={{ alignSelf: "center" }}
              />
            ) : (
              <View />
            )}
            <WrappedDropDown
              items={salutationFields}
              defaultValue={salutationFields[0].value}
              containerStyle={styles.dropDownContainer}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              labelStyle={styles.dropDownText}
              onChangeItem={(salutaion) => {
                this.setState({
                  salutaion: salutaion.value,
                });
              }}
            />
            {error["salutation"] ? (
              <Text style={styles.error}>{error["salutation"]}</Text>
            ) : (
              <View />
            )}
            <WrappedTextInput
              value={firstName}
              onChangeText={(firstName) => {
                this.setState({ firstName });
              }}
              textInputStyle={{ paddingLeft: 10 }}
              placeholder={"First name"}
              style={styles.textContainer}
              errorText={error["firstName"]}
            />
            <WrappedTextInput
              value={lastName}
              onChangeText={(lastName) => {
                this.setState({ lastName });
              }}
              textInputStyle={{ paddingLeft: 10 }}
              placeholder={"Last name"}
              style={styles.textContainer}
              errorText={error["lastName"]}
            />
            <View>
              <WrappedDropDown
                items={genderFields}
                placeholder={"Gender"}
                defaultValue={genderFields[0].value}
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

              <WrappedDropDown
                items={languageFields}
                placeholder={"Select Language"}
                defaultValue={language}
                containerStyle={styles.dropDownContainer}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                labelStyle={styles.dropDownText}
                onChangeItem={(lang) => {
                  console.log(lang);
                  this.setState({
                    language: lang.value,
                  });
                }}
              />
              {error["gender"] ? (
                <Text style={styles.error}>{error["gender"]}</Text>
              ) : (
                <View />
              )}
            </View>
          </KeyboardAwareScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <WrappedRectangleButton
            containerStyle={styles.buttonStyle}
            buttonText={update ? "Update  " : "Submit "}
            textStyle={styles.textStyle}
            onPress={() => {
              this.submitDetails();
            }}
          />
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
    paddingTop: "5%",
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
  errorStyle: {
    color: errorColor,
    fontSize: fs14,
  },
  buttonStyle: {
    height: globalHeight * 0.5,
    marginHorizontal: "5%",
    //width: globalWidth * 2,
    borderRadius: globalHeight * 0.1,
    backgroundColor: "#EF8B31",
  },
  buttonContainer: {
    backgroundColor: "#ffffff",
    bottom: "5%",
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
