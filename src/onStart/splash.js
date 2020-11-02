import React, {Component} from "react";
import {View} from "react-native";
import {Storage, StorageItemKeys} from "../utilities/Storage";
export default class Splash extends Component {
    async componentDidMount() {
        const isLoggedIn = await Storage.getItem(StorageItemKeys.x_auth_token);
        if (isLoggedIn) {
            this.props.navigation.navigate("audioScreen");
        } else {
            this.props.navigation.navigate("loginScreen");
        }
    }
    render() {
        return <View />;
    }
}
