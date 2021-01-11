import React, {useEffect, useState} from "react";
import {View, FlatList} from "react-native";
import {apiHandler, routeNames} from "../../../../server/apiHandler";
import {Loader, Header} from "../../../components";
import CategoryComponent from "./component/CategoryComponent";

const Audio = (props) => {
    const [loader, setLoader] = useState(false);
    const [category, setCategory] = useState([]);
    const [error, setError] = useState({});
    const [mainListId, setId] = useState(props.route.params["mainListUID"]);

    const fetchCategory = async () => {
        try {
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
        } catch (error) {}
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    return (
        <View style={{flex: 1, backgroundColor: "#ffffff"}}>
            <View>
                <Header
                    featherIcon={"arrow-left"}
                    headerText={"Sublist"}
                    containerStyle={{
                        borderBottomWidth: 0.5,
                        borderColor: "#2222",
                    }}
                    onPress={() => {
                        props.navigation.goBack();
                    }}
                />
                <FlatList
                    data={category}
                    renderItem={({item, index}) => {
                        return (
                            <CategoryComponent
                                key={index}
                                item={item}
                                onPress={() => {
                                    // onCategoryPress(item);
                                    props.navigation.navigate("audioPlayer");
                                }}
                            />
                        );
                    }}
                    keyExtractor={(index) => {
                        console.log(index);
                        return index.audioUID;
                    }}
                />
            </View>
            {loader ? <Loader /> : <View />}
        </View>
    );
};

export default Audio;
