import React from "react";
import DropDown from "react-native-dropdown-picker";
import {StyleProp, ViewStyle} from "react-native";

const WrappedDropDown = (props) => {
    const {
        items,
        onChangeItem,
        itemStyle,
        labelStyle,
        placeholder,
        containerStyle,
        defaultValue,
    } = props;
    return (
        <DropDown
            items={items}
            defaultValue={defaultValue}
            style={{backgroundColor: "#ffffff", paddingVertical: 10}}
            placeholder={placeholder}
            containerStyle={containerStyle}
            itemStyle={itemStyle}
            labelStyle={labelStyle}
            dropDownStyle={{backgroundColor: "#ffffff"}}
            onChangeItem={(item: any) => onChangeItem(item)}
        />
    );
};

export default WrappedDropDown;
