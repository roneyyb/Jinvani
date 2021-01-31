import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
//import {Avatar, Title, Caption, Paragraph, Drawer} from "react-native-paper";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Storage, StorageItemKeys } from "../../../utilities/Storage";
import { fs14, globalHeight, globalWidth } from "../../../constants/Dimensions";
import { WrappedText } from "../../components";
import { Pressable } from "react-native";

const vw = Dimensions.get("window").width / 100;
const vh = Dimensions.get("window").height / 100;

const SideMenu = (props) => {
  const [userDetail, setDetail] = useState(undefined);
  //const userDetail = await Storage.getItem("userDetail");
  //console.log("userDetail =>", userDetail);
  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("userDetail");
      await AsyncStorage.removeItem(StorageItemKeys.x_auth_token);
      await AsyncStorage.removeItem("motiCount");
      props.navigation.replace("Auth");
    } catch (error) {
      console.log("Error while loggin out");
    }
  };

  const loadUserData = async () => {
    try {
      let userDetail = await AsyncStorage.getItem("userDetail");
      userDetail = JSON.parse(userDetail);
      console.log(userDetail);
      setDetail(userDetail);
    } catch (error) {
      console.log("error =>", error);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.userInfoSection}>
        <Pressable
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: "row",
            alignItems: "center",
            //justifyContent: "center",
          }}
          android_ripple={{ color: "#0000001A", radius: 200 }}
          onPress={() => {
            props.navigation.navigate("Profile", { update: true });
          }}
        >
          <View
            style={{
              flexDirection: "row",
              height: globalHeight,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                backgroundColor: "#EF8B31",
                height: globalHeight * 0.5,
                width: globalHeight * 0.5,
                borderRadius: globalHeight * 0.35,
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                marginLeft: vh * 1.8,
              }}
            >
              {userDetail && userDetail["firstName"] && (
                <WrappedText
                  text={
                    (userDetail &&
                      userDetail["firstName"][0] + userDetail["lastName"][0]) ||
                    ""
                  }
                  textStyle={{
                    color: "#ffffff",
                    fontSize: 2 * vh,
                  }}
                />
              )}
            </View>
            <View
              style={{
                justifyContent: "center",
                marginLeft: globalWidth * 0.5,
              }}
            >
              <WrappedText
                text={
                  (userDetail &&
                    userDetail["saluation"] +
                      ". " +
                      userDetail["firstName"] +
                      " " +
                      userDetail["lastName"]) ||
                  ""
                }
                textStyle={{ color: "#000000", fontSize: 2 * vh }}
              />
              <WrappedText
                text={
                  (userDetail &&
                    (userDetail["lang"][0] == "H" ? "Hindi" : "English")) ||
                  ""
                }
                textStyle={{ color: "#000000", fontSize: 2 * vh }}
              />
            </View>
          </View>
        </Pressable>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItem
          icon={() => (
            <Icon
              name="account-outline"
              style={{ fontSize: 2.8 * vh, color: "#000000" }}
            />
          )}
          labelStyle={{ color: "#000000" }}
          label="Audio  "
          onPress={() => {
            props.navigation.navigate("Audio");
          }}
        />
        {/* <DrawerItem
                    icon={() => (
                        <Icon
                            name="wallet-outline"
                            style={{fontSize: 2.8 * vh, color: "#000000"}}
                        />
                    )}
                    labelStyle={{color: "#000000"}}
                    label="Faq  "
                    onPress={() => {
                        props.navigation.navigate("Faq");
                    }}
                /> */}
        <DrawerItem
          icon={() => (
            <Icon
              name="account-box-outline"
              style={{ fontSize: 2.8 * vh, color: "#000000" }}
            />
          )}
          labelStyle={{ color: "#000000" }}
          label="Contact us  "
          onPress={() => {
            props.navigation.navigate("Contactus");
          }}
        />
        <DrawerItem
          icon={() => (
            <Icon
              name="account-check-outline"
              style={{ fontSize: 2.8 * vh, color: "#000000" }}
            />
          )}
          label="Feedback   "
          labelStyle={{ color: "#000000" }}
          onPress={() => {
            props.navigation.navigate("Feedback");
          }}
        />
        <DrawerItem
          icon={() => (
            <Icon
              name="exit-to-app"
              style={{ fontSize: 2.8 * vh, color: "#000000" }}
            />
          )}
          labelStyle={{ color: "#000000" }}
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
    height: globalHeight,
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
