import React, {Component} from "react";
import {Text, StyleSheet, Pressable, View} from "react-native";

class WrappedButton extends Component {
    render() {
        const {
            backgroundColor,
            buttonText,
            onPress,
            opacity,
            textColor,
            containerStyle,
            textStyle,
            elevation,
        } = this.props;
        return (
            <View
                style={[
                    styles.container,
                    {backgroundColor: backgroundColor, opacity: opacity || 1},
                    containerStyle,
                    //{elevation: elevation === 0 ? 0 : 2},
                ]}
            >
                <Pressable
                    style={styles.Pressable}
                    android_ripple={{color: "#00000033", radius: 200}}
                    onPress={() => {
                        onPress();
                    }}
                >
                    <Text
                        style={[
                            {color: textColor, opacity: 1, fontSize: 19},
                            textStyle,
                        ]}
                    >
                        {buttonText}
                    </Text>
                </Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        borderRadius: 6,
        marginTop: 16,
        overflow: "hidden",
    },
    Pressable: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
    },
});
export default WrappedButton;
