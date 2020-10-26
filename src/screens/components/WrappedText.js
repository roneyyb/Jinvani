import React, {Component} from "react";
import {View, Text} from "react-native";
import {fs16, fs15, fs17, FontFamily} from "../../constants/Dimensions";

class WrappedText extends Component {
    render() {
        const {
            text,
            textStyle,
            containerStyle,
            fontFamily,
            fontWeight,
        } = this.props;

        return (
            <View style={containerStyle}>
                <Text
                    style={[
                        {
                            fontFamily: fontFamily || FontFamily.IBMPR,
                            //fontFamily: "sans-serif-thin",
                        },
                        {
                            fontSize: fs17,
                            fontWeight: fontWeight || "normal",
                            color: "#000000",
                        },
                        textStyle,
                    ]}
                >
                    {text}
                </Text>
            </View>
        );
    }
}

export default WrappedText;
