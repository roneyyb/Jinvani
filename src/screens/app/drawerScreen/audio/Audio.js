import React, {useEffect, useState} from "react";
import {View, FlatList} from "react-native";
import {apiHandler, routeNames} from "../../../../server/apiHandler";
import {Loader} from "../../../components";
import CategoryComponent from "./component/CategoryComponent";

const Audio = (props) => {
    const [loader, setLoader] = useState(false);
    const [category, setCategory] = useState([]);
    const [error, setError] = useState({});

    const onCategoryPress = (item) => {
        const {category} = item;
        if (category == "AUDIO") {
        } else {
        }
    };

    const fetchCategory = async () => {
        setLoader(true);
        const response = await apiHandler(routeNames.MainList);
        if (response.success) {
            setLoader(false);
            setCategory(response.data);
        } else {
            setLoader(false);
            setError({fetchError: response.message});
        }
    };

    useEffect(fetchCategory, []);

    return (
        <View style={{flex: 1, backgroundColor: "#ffffff"}}>
            <FlatList
                data={category}
                renderItem={({item, index}) => {
                    return (
                        <CategoryComponent
                            key={index}
                            item={item}
                            onCategoryPress={(item) => {
                                onCategoryPress(item);
                            }}
                        />
                    );
                }}
            />
            {loader ? <Loader /> : <View />}
        </View>
    );
};

export default Audio;
