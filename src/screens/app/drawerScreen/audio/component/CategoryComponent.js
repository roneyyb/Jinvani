import React from "react";
import { View, Pressable } from "react-native";
import { WrappedText } from "../../../../components";
import {
  globalHeight,
  globalWidth,
  themeColor,
} from "../../../../../constants/Dimensions";

const CategoryComponent = ({ item, onPress }) => {
  const { title } = item;
  return (
    <Pressable
      onPress={() => {
        onPress();
      }}
      style={{
        height: globalHeight,
        backgroundColor: "#ffffff",
        marginTop: globalHeight * 0.1,
        paddingLeft: "5%",
        width: "100%",
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderBottomColor: "#00000033",
      }}
      android_ripple={{ color: "#00000033", radius: 200 }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            height: globalHeight * 0.6,
            width: globalHeight * 0.6,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: globalHeight,
            backgroundColor: themeColor,
          }}
        >
          <WrappedText
            text={title[0].toUpperCase()}
            textStyle={{ color: "#ffffff" }}
          />
        </View>
      </View>
      <View
        style={{
          flex: 8,
          marginLeft: globalWidth,
          flexDirection: "row",

          alignItems: "center",
        }}
      >
        <WrappedText text={title} />
      </View>
    </Pressable>
  );
};

export default CategoryComponent;
