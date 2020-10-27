import React, {Component} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
// Auth Screens
import Login from "../screens/auth/Login";
import Otp from "../screens/auth/Otp";
//import Profile from "../screens/auth/Profile";

import SideMenu from "../screens/app/drawer/SideMenu";

//App Screens
import Audio from "../screens/app/drawerScreen/Audio";
import Faq from "../screens/app/drawerScreen/Faq";
import Contactus from "../screens/app/drawerScreen/Contactus";
import Feedback from "../screens/app/drawerScreen/Feedback";
import Profile from "../screens/app/drawerScreen/Profile";

const Stack = createStackNavigator();

const Auth = () => {
    return (
        <Stack.Navigator initialRouteName={"loginScreen"} headerMode="none">
            <Stack.Screen name="otpScreen" component={Otp} />
            <Stack.Screen name="loginScreen" component={Login} />
            <Stack.Screen name="profileScreen" component={Profile} />
        </Stack.Navigator>
    );
};

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContent={(props) => <SideMenu {...props} />}>
            <Drawer.Screen name="Audio" component={Audio} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Feedback" component={Feedback} />
            <Drawer.Screen name="Faq" component={Faq} />
            <Drawer.Screen name="Contactus" component={Contactus} />
        </Drawer.Navigator>
    );
};

export default function App() {
    return (
        <Stack.Navigator initialRouteName={"Auth"} headerMode={"none"}>
            <Stack.Screen name="Auth" component={Auth} />
            <Stack.Screen name="Drawer" component={DrawerNavigator} />
        </Stack.Navigator>
    );
}
