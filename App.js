import "react-native-gesture-handler";
import * as React from "react";
import {StatusBar, AppRegistry} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import Navigator from "./src/navigation/stack";
import {SafeAreaProvider} from "react-native-safe-area-context";
import TrackPlayer from "react-native-track-player";
//import {Provider} from "react-redux";
//import configureStore from "./src/store";

//const store = configureStore();

export default function App() {
    return (
        <SafeAreaProvider>
            <StatusBar backgroundColor={"#ffffff"} barStyle={"dark-content"} />
            {/* <Provider store={store}> */}
            <NavigationContainer>
                <Navigator />
            </NavigationContainer>
            {/* </Provider> */}
        </SafeAreaProvider>
    );
}

TrackPlayer.registerPlaybackService(() => require("./src/onStart/TrackInit"));
