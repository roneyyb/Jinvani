import React from "react";
import {View, StyleSheet, Dimensions} from "react-native";
//import {Avatar, Title, Caption, Paragraph, Drawer} from "react-native-paper";
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {StorageItemKeys} from "../../../utilities/Storage";

const vw = Dimensions.get("window").width / 100;
const vh = Dimensions.get("window").height / 100;

const SideMenu = (props) => {
    logOut = async () => {
        try {
            await AsyncStorage.removeItem(StorageItemKeys.UserDetails);
            await AsyncStorage.removeItem(StorageItemKeys.x_auth_token);
            props.navigation.navigate("Auth");
        } catch (error) {
            console.log("Error while loggin out");
        }
    };

    return (
        <View style={{flex: 1}}>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection: "row", marginTop: 15}}>
                    <View style={{flexDirection: "column"}}></View>
                </View>
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItem
                    icon={() => (
                        <Icon
                            name="account-outline"
                            style={{fontSize: 2.8 * vh, color: "grey"}}
                        />
                    )}
                    label="Audio  "
                    onPress={() => {
                        props.navigation.navigate("Profile");
                    }}
                />
                <DrawerItem
                    icon={() => (
                        <Icon
                            name="wallet-outline"
                            style={{fontSize: 2.8 * vh, color: "grey"}}
                        />
                    )}
                    label="Faq  "
                    onPress={() => {
                        props.navigation.navigate("HomeScreen");
                    }}
                />
                <DrawerItem label="Contact us  " onPress={() => {}} />
                <DrawerItem
                    icon={() => (
                        <Icon
                            name="account-check-outline"
                            style={{fontSize: 2.8 * vh, color: "grey"}}
                        />
                    )}
                    label="Feedback   "
                    onPress={() => {}}
                />
                <DrawerItem
                    icon={() => (
                        <Icon
                            name="exit-to-app"
                            style={{fontSize: 2.8 * vh, color: "grey"}}
                        />
                    )}
                    label="Sign Out    "
                    onPress={() => {
                        logOut();
                    }}
                />
            </DrawerContentScrollView>
        </View>
    );
};

export default SideMenu;

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 3 * vh,
    },
    title: {
        fontSize: 2 * vh,
        marginTop: 3,
        fontWeight: "bold",
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 2 * vh,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 1 * vh,
    },
    section: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 1.5 * vh,
        marginTop: 15,
    },
    paragraph: {
        fontWeight: "bold",
        marginRight: 1 * vw,
    },
    drawerSection: {
        marginTop: 1.5 * vh,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: "#f4f4f4",
        borderTopWidth: 1,
    },
    preference: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
