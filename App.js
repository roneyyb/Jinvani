import "react-native-gesture-handler";
import * as React from "react";
import {StatusBar} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import Navigator from "./src/navigation/stack";
import {SafeAreaProvider} from "react-native-safe-area-context";

export default function App() {
    return (
        <SafeAreaProvider>
            <StatusBar backgroundColor={"#ffffff"} barStyle={"dark-content"} />
            <NavigationContainer>
                <Navigator />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
