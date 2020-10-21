import React, {Component} from "react";
import {View} from "react-native";
//import DropDown from 'react-native-dropdown-picker'
//import {commonStyle, globalHeight, globalWidth} from '../../constants/style/common'

class WrappedDropDown extends Component {
    render() {
        const {
            items,
            itemValue,
            onChangeItem,
            containerStyle,
            itemStyle,
            labelStyle,
            placeholder,
            defaultValue,
        } = this.props;
        return (
            // <DropDown
            //     items={items}
            //     defaultValue={defaultValue}
            //     // containerStyle={{
            //     //     width: "100%",
            //     //     marginTop: 10,
            //     //     borderColor: "#EEEEEE",
            //     // }}
            //     style={{backgroundColor: '#ffffff', paddingVertical: 10}}
            //     placeholder={placeholder}
            //     itemStyle={itemStyle}
            //     labelStyle={labelStyle}
            //     dropDownStyle={{backgroundColor: '#ffffff'}}
            //     onChangeItem={(item) => onChangeItem(item)}
            // />
            <View />
        );
    }
}

export default WrappedDropDown;
