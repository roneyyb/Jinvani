import React from "react";
import {View, Pressable} from "react-native";
import {WrappedText} from "../../../../components";
import {globalHeight, globalWidth} from "../../../../../constants/Dimensions";

const CategoryComponent = ({item, onPress}) => {
    const {title} = item;
    return (
        <Pressable
            onPress={() => {
                onPress();
            }}
            style={{
                height: globalHeight,
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
            }}
            android_ripple={{color: "#00000033", radius: 200}}
        >
            <WrappedText text={title} />
        </Pressable>
    );
};

export default CategoryComponent;
