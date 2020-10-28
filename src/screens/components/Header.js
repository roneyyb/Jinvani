import React, {Component} from "react";
import {
    View,
    Image,
    TouchableOpaciy,
    StyleSheet,
    Pressable,
} from "react-native";
//import LinearGradient from "react-native-linear-gradient";
import WrappedText from "./WrappedText";
import WrappedRoundButton from "./WrappedRoundButton";
import {
    commonStyle,
    FontFamily,
    fs17,
    globalHeight,
} from "../../constants/Dimensions";

class Header extends Component {
    state = {};
    render() {
        const {
            leftIcon,
            headerText,
            headerTextStyle,
            containerStyle,
            onPress,
            featherIcon,
        } = this.props;
        console.log(featherIcon, leftIcon);
        return (
            <View style={[styles.container, containerStyle]}>
                {(leftIcon || featherIcon) && (
                    <WrappedRoundButton
                        featherIcon={featherIcon}
                        leftIcon={leftIcon}
                        onPress={onPress}
                    />
                )}
                <WrappedText
                    containerStyle={{alignSelf: "center"}}
                    text={headerText}
                    textStyle={headerTextStyle}
                    fontFamily={FontFamily.IBMPSB}
                />
            </View>
        );
    }
}

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    textStyle: {},
    Image: {
        position: "absolute",
        alignSelf: "center",
        left: "1%",
        height: globalHeight * 0.35,
        width: globalHeight * 0.35,
    },
});
