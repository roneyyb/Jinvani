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
        alignItems: "center",
        flex: 1,
        borderBottomWidth: 0.5,
        borderBottomColor: "#00000033",
        flexDirection: "row",
      }}
      android_ripple={{ color: "#00000033", radius: 200 }}
    >
      <View
        style={{
          height: globalHeight * 0.6,
          width: globalHeight * 0.6,
          borderRadius: globalHeight,
          backgroundColor: themeColor,
        }}
      >
        <WrappedText text={title[0]} textStyle={{ color: "#ffffff" }} />
      </View>
      <View style={{ flex: 8, marginLeft: globalWidth }}>
        <WrappedText text={title} />
      </View>
    </Pressable>
  );
};

export default CategoryComponent;
