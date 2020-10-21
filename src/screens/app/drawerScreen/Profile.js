import React, {Component} from "react";
import {StyleSheet, View, Text} from "react-native";
import {Input} from "react-native-elements";
//import {Checkbox, Title, Caption} from "react-native-paper";
import Button from "../../../components/WrappedRectangleButton";
import Loader from "../../../components/Loader";

class Profile extends Component {
    state = {
        firstName: "",
        lastName: "",
        gender: "",
        firstNameError: "",
        lastNameError: "",
        genderError: "",
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
            isLoading,
        } = this.state;
        return (
            <View style={{flex: 1}}>
                <View style={styles.Container}>
                    {/* <Title style={styles.headingStyle}>{"Add Details"}</Title>
                    <Caption style={styles.subHeadingStyle}>
                        {"Please provide following details."}
                    </Caption> */}
                    <View style={{marginTop: 100}}>
                        <View style={styles.textFiledContainer}>
                            <Input
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                returnKeyType="next"
                                errorMessage={firstNameError}
                                keyboardType={"numeric"}
                                placeholder="FirstName"
                                value={firstName}
                                onChangeText={(firstName) => {
                                    this.setState({firstName});
                                }}
                            />
                            <Input
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                returnKeyType="next"
                                errorMessage={lastNameError}
                                keyboardType={"numeric"}
                                placeholder="LastName"
                                value={lastName}
                                onChangeText={(lastName) => {
                                    this.setState({lastName});
                                }}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <View style={{marginLeft: 10}}>
                                <Text style={styles.subHeadingStyle}>
                                    Gender{" "}
                                </Text>
                            </View>
                            <View style={{flexDirection: "row"}}>
                                {/* <Checkbox
                                    status={
                                        gender === "M" ? "checked" : "unchecked"
                                    }
                                    onPress={() => {
                                        this.setGender("M");
                                    }}
                                />
                                <Title>{"M"}</Title>
                                <Checkbox
                                    status={
                                        gender === "F" ? "checked" : "unchecked"
                                    }
                                    onPress={() => {
                                        this.setGender("F");
                                    }}
                                />
                                <Title>{"F"}</Title>
                                <Checkbox
                                    status={
                                        gender === "O" ? "checked" : "unchecked"
                                    }
                                    onPress={() => {
                                        this.setGender("O");
                                    }}
                                />
                                <Title>{"O"}</Title> */}
                            </View>
                        </View>
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
        fontWeight: "bold",
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
        fontSize: 20,
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
});

export default Profile;
