import React, {Component} from "react";
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import {globalHeight, fs15} from "../constants/Dimensions";
import Icon from "react-native-vector-icons/Feather";

export default class WrappedTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secureTextEntry: false,
        };
    }

    componentDidMount() {
        const {secureTextEntry} = this.props;
        this.setState({secureTextEntry});
    }

    render() {
        const {
            errorText,
            value,
            onChangeText,
            placeholder,
            keyboardType,
            eyeButton,
            icon,
            style,
            textInputStyle,
            placeholderTextColor,
            errorContainer,
        } = this.props;
        const {secureTextEntry} = this.state;
        return (
            <View>
                <View style={[styles.mainContainer, style]}>
                    <View style={styles.textInputContainer}>
                        {icon ? (
                            <View style={styles.iconContainer}>
                                <Image
                                    source={icon}
                                    style={{
                                        height: 20,
                                        width: 20,
                                        resizeMode: "contain",
                                    }}
                                />
                            </View>
                        ) : (
                            <View />
                        )}
                        <TextInput
                            value={value}
                            onChangeText={onChangeText}
                            placeholder={placeholder}
                            placeholderTextColor={
                                placeholderTextColor || "#1A202C4D"
                            }
                            style={[styles.textInput, textInputStyle]}
                            keyboardType={keyboardType}
                            secureTextEntry={secureTextEntry || false}
                        />
                        {/* {eyeButton ? (
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignSelf: "center",
                                    justifyContent: "center",
                                }}
                                onPress={() => {
                                    this.setState((prevState) => ({
                                        secureTextEntry: !prevState.secureTextEntry,
                                    }));
                                }}
                            >
                                <Icon
                                    name={secureTextEntry ? "eye" : "eye-off"}
                                    style={styles.eye}
                                    size={20}
                                    color={"#1A202C4D"}
                                />
                            </TouchableOpacity>
                        ) : (
                            <View />
                        )} */}
                    </View>
                </View>
                {errorText ? (
                    <View style={[styles.errorContainer, {errorContainer}]}>
                        <Text style={styles.errorText}>{errorText}</Text>
                    </View>
                ) : (
                    <View />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 12,
    },
    textInputContainer: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
    },
    iconContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    textInput: {
        flex: 9,
        fontWeight: "normal",
        //height: 50,
        //color: "#1A202c",

        fontSize: fs15,
        fontFamily: "IBMPlexSans-Medium",
        paddingLeft: 20,
    },
    errorContainer: {
        //paddingLeft: 20,
    },
    errorText: {
        //marginLeft: 3,
        color: "#F73D02CC",
        fontSize: 12,
        fontFamily: "IBMPlexSans-SemiBold",
        fontStyle: "normal",
    },
    eye: {
        height: globalHeight * 0.35,
        width: globalHeight * 0.35,
        alignSelf: "center",
        resizeMode: "contain",
    },
});
