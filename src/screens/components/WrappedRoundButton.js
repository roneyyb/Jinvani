import React, {Component} from "react";
import {StyleSheet, Image, ActivityIndicator} from "react-native";
import Ripple from "react-native-material-ripple";
import Feather from "react-native-vector-icons/Feather";
import {themeColor, globalHeight} from "../../constants/Dimensions";
class WrappedRoundButton extends Component {
    render() {
        const {
            buttonSource,
            onPress,
            height,
            style,
            isLoading,
            featherIcon,
            containerStyle,
        } = this.props;
        console.log(featherIcon);
        return (
            <Ripple
                style={[
                    styles.container,
                    {
                        height: height || globalHeight * 0.6,
                        width: height || globalHeight * 0.6,
                        borderRadius: height / 2 || globalHeight * 0.3,
                    },
                    containerStyle,
                ]}
                rippleCentered={true}
                onPress={() => {
                    if (!isLoading) {
                        onPress();
                    }
                }}
                rippleContainerBorderRadius={
                    height / 2 || globalHeight * globalHeight * 0.3
                }
            >
                {isLoading ? (
                    <ActivityIndicator
                        size={30}
                        color={themeColor}
                        style={{opacity: 0.5}}
                    />
                ) : featherIcon ? (
                    <Feather name={featherIcon} color={themeColor} size={25} />
                ) : (
                    <Image
                        source={buttonSource}
                        style={!style ? styles.buttonIcon : style}
                        resizeMode={style ? "contain" : null}
                    />
                )}
            </Ripple>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
        //elevation: 1,
    },
    buttonIcon: {
        height: 20,
        width: 20,
        borderRadius: 10,
        resizeMode: "contain",
    },
});
export default WrappedRoundButton;
