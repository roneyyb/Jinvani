import AsyncStorage from "@react-native-community/async-storage";
import React, {Component} from "react";
import {View} from "react-native";
import {Storage, StorageItemKeys} from "../utilities/Storage";
export default class Splash extends Component {
    async componentDidMount() {
        //await AsyncStorage.removeItem(StorageItemKeys.x_auth_token);
        //await AsyncStorage.removeItem("userDetail");
        const isLoggedIn = await Storage.getItem(StorageItemKeys.x_auth_token);
        if (isLoggedIn) {
            this.props.navigation.replace("Drawer");
        } else {
            this.props.navigation.replace("Auth");
        }
    }
    render() {
        return <View />;
    }
}
