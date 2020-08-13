import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/auth/Login";
import Otp from "../screens/auth/Otp";

export default class Navigator extends Component {
  render() {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator initialRouteName={"loginScreen"} headerMode="none">
        <Stack.Screen name="otpScreen" component={Otp} />
        <Stack.Screen name="loginScreen" component={Login} />
      </Stack.Navigator>
    );
  }
}
