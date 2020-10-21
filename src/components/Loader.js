import React from "react";
import {
    Title,
    View,
    TouchableOpacity,
    ActivityIndicator,
    StatusBar,
    Platform,
} from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
//import {PlatformType} from '@app/constants'
//import {Bars} from "react-native-loader";

export default class Loader extends React.Component {
    componentDidMount() {
        StatusBar.setBarStyle("light-content");
        StatusBar.setBackgroundColor("#000000");
    }

    componentWillUnmount() {
        StatusBar.setBarStyle("dark-content");
        StatusBar.setBackgroundColor("#ffffff");
    }

    render() {
        return (
            <View
                style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "black",
                    opacity: 0.5,
                }}
            >
                {this.props.showCancelButton ? (
                    <View style={{position: "absolute", right: 10, top: 10}}>
                        <TouchableOpacity
                            style={{
                                height: 30,
                                width: 30,
                                borderRadius: 15,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={() => {
                                this.props.onPress();
                            }}
                        >
                            <EvilIcons
                                name="close"
                                size={30}
                                style={{
                                    //textAlign: "right",
                                    color: "darkgray",
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View />
                )}
                <View
                    style={{
                        height: 50,
                        width: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 50,
                        backgroundColor: "black",
                        overflow: "hidden",
                    }}
                >
                    <ActivityIndicator size={20} color="white" />
                </View>
                {/* <Title>{"Loading Conversation"}</Title> */}
            </View>
        );
    }
}
