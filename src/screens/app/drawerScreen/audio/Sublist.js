import React, {useEffect, useState} from "react";
import {View, FlatList} from "react-native";
import {apiHandler, routeNames} from "../../../../server/apiHandler";
import {Loader} from "../../../components";
import CategoryComponent from "./component/CategoryComponent";

const Audio = (props) => {
    const [loader, setLoader] = useState(false);
    const [category, setCategory] = useState([]);
    const [error, setError] = useState({});
    const [mainListId, setId] = useState(props.route.params["mainListUID"]);
    console.log(props.route.params);
    const onCategoryPress = (item) => {
        const {category} = item;
        if (category == "AUDIO") {
        } else {
        }
    };

    const fetchCategory = async () => {
        setLoader(true);
        const response = await apiHandler(
            routeNames.SubList,
            {},
            true,
            0,
            "mainListUID",
            mainListId,
        );
        console.log(response);
        if (response.success) {
            setLoader(false);

            setCategory(response.data[0].audioList);
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
