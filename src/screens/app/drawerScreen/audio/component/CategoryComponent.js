import React from "react";
import {View, Pressable} from "react-native";
import {WrappedText} from "../../../../components";

const CategoryComponent = ({item}) => {
    console.log(item);
    const {title} = item;
    return (
        <Pressable onPress={() => {}}>
            <WrappedText text={title} />
        </Pressable>
    );
};

export default CategoryComponent;
