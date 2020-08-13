import React, {Component} from "react";
import {Text, View, TextInput, StyleSheet, Image, TouchableOpacity} from "react-native";

export default class WrappedTextInput extends Component {
	constructor(props) {
        super(props);
        this.state = {
            secureTextEntry:false
        }
    }


    componentDidMount() {
        const { secureTextEntry } = this.props;
        this.setState({ secureTextEntry });
    }

    render() {
		const { errorText, value, onChangeText, placeholder, source, eyeButton, keyboardType } = this.props;
		const { secureTextEntry } = this.state;
		return (
			<View style={[styles.mainContainer,styles.textInput]}>
					<TextInput
						value={value}
						onChangeText={onChangeText}
						placeholder={placeholder}
						placeholderTextColor={"#d1d1d1"}
						style={styles.textInput}
                        keyboardType={keyboardType}
                        underlineColorAndroid={errorText?"#F12E2E":"#000000"}
						secureTextEntry={secureTextEntry || false}
					/>
				{errorText ?
					<View style={styles.errorContainer}>
						<Text style={styles.errorText}>{errorText}</Text>
					</View> :<View/>}
			</View>
		);
	}
}

const styles = StyleSheet.create({
    mainContainer: {marginTop: 10},
    textInput: {
        backgroundColor: "#ffffff",
        color: "#D1d1d1",
        borderRadius: 3,
        paddingLeft:5
    },
    errorContainer: {
        marginTop:4
    },
    errorText: {
        marginLeft: 3,
        color: "#F12E2E",
        fontSize: 12,
        fontFamily: "Libre Franklin",
        fontStyle: "normal",
    },
    eye: {
        height: 20,
		width: 20,
		alignSelf: "center",
		justifyContent:"center"
    },
});
