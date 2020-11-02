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

const vw = Dimensions.get("window").width / 100;
const vh = Dimensions.get("window").height / 100;

const SideMenu = (props) => {
    logOut = async () => {
        try {
            await AsyncStorage.removeItem("userdata");
            props.navigation.navigate("Auth");
        } catch (error) {
            console.log("Error while loggin out");
        }
    };

    return (
        <View style={{flex: 1}}>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection: "row", marginTop: 15}}>
                    {/* <Avatar.Image
                            source={require("../../assets/profile-pic.png")}
                            style={{
                                borderColor: "#5954C8",
                                borderWidth: 2,
                                borderRadius: 35,
                                height: 67,
                                width: 68,
                            }}
                        /> */}
                    <View style={{flexDirection: "column"}}>
                        {/* <Title style={styles.title}>First Name</Title>
                            <Caption style={styles.caption}>Last Name</Caption> */}
                    </View>
                </View>
                {/* <View style={styles.row}>
                        <View style={styles.section}>
                            <Paragraph
                                style={[styles.paragraph, styles.caption]}
                            >
                                200
                            </Paragraph>
                            <Caption style={styles.caption}>Friends</Caption>
                        </View>
                        <View style={styles.section}>
                            <Paragraph
                                style={[styles.paragraph, styles.caption]}
                            >
                                3
                            </Paragraph>
                            <Caption style={styles.caption}>Circles</Caption>
                        </View>
                    </View> */}
            </View>
            <DrawerContentScrollView {...props}>
                {/* Drawer Section */}
                {/* <Drawer.Section style={{marginTop: 19}}> */}
                {/* <DrawerItemList {...props} /> */}
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
                <DrawerItem
                    // icon={() => (
                    //     <Icon
                    //         name="settings-outline"
                    //         style={{fontSize: 2.8 * vh, color: "grey"}}
                    //     />
                    // )}
                    label="Contactus  "
                    onPress={() => {}}
                />
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

                {/* </Drawer.Section> */}
            </DrawerContentScrollView>
            {/* <Drawer.Section style={styles.bottomDrawerSection}> */}

            {/* </Drawer.Section> */}
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
