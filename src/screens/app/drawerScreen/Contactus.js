import React, {Component} from "react";
import {View, Linking, Text} from "react-native";
import {
    commonStyle,
    globalHeight,
    globalWidth,
} from "../../../constants/Dimensions";
import {Header, WrappedText} from "../../components";

class Contactus extends Component {
    render() {
        return (
            <View style={commonStyle.containerStyle}>
                <Header
                    featherIcon={"arrow-left"}
                    headerText={"Contact us"}
                    containerStyle={{
                        borderBottomWidth: 0.5,
                        borderColor: "#2222",
                    }}
                    onPress={() => {
                        this.props.navigation.goBack();
                    }}
                />
                <View
                    style={{
                        flexDirection: "row",
                        marginTop: globalHeight * 0.2,
                        marginLeft: globalWidth,
                    }}
                >
                    <WrappedText
                        text={"Contact us at :  "}
                        textStyle={{color: "#000000"}}
                    />

                    <Text
                        onPress={() => {
                            Linking.openURL("mailto:jinvani.mahavir@gmail.com");
                        }}
                        style={{color: "#0000EE", alignSelf: "center"}}
                    >
                        {"jinvani.mahavir@gmail.com"}
                    </Text>
                </View>
            </View>
        );
    }
}

export default Contactus;
