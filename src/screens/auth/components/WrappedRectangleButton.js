import React, {Component} from "react";
import {TouchableOpacity, View, Text, StyleSheet, Image} from "react-native";

export default class WrappedTouchableOpacity extends Component {
    render() {
        const {
            textStyle,
            buttonText,
            buttonStyle,
            source,
            onPress,
            imageStyle,
        } = this.props;
        
        return (
            <TouchableOpacity
                onPress={() => {
                    onPress();
                }}
            >
                <View style={[styles.container, buttonStyle]}>
                    {source ? (
                        <Image
                            source={source}
                            style={[
                                {height: 20, width: 20, marginLeft: 10},
                                imageStyle,
                            ]}
                        />
                    ) : (
                        <View />
                    )}
                    {buttonText ? (
                        <Text style={[styles.buttonTextSyle, textStyle]}>
                            {buttonText}
                        </Text>
                    ) : (
                        <View />
                    )}
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1D1D1D",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    buttonTextSyle: {
        flex: 1,
        fontWeight: "bold",
        color: "#ffffff",
        opacity: 0.9,
        textAlign: "center",
        fontFamily: "san-serif",
        fontStyle: "normal",
        fontSize: 20,

    },
});
