import React, {Component} from "react";
import {View} from "react-native";
import {commonStyle} from "../../../constants/Dimensions";
import {Header} from "../../components";

class Faq extends Component {
    render() {
        return (
            <View style={commonStyle.containerStyle}>
                <Header
                    featherIcon={"arrow-left"}
                    headerText={"Faq"}
                    containerStyle={{
                        borderBottomWidth: 0.5,
                        borderColor: "#2222",
                    }}
                    onPress={() => {
                        this.props.navigation.goBack();
                    }}
                />
            </View>
        );
    }
}

export default Faq;
