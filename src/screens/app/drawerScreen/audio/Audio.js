import React, {useEffect, useState} from "react";
import {View, FlatList} from "react-native";
import {apiHandler, routeNames} from "../../../../server/apiHandler";
import {Loader, Header} from "../../../components";
import CategoryComponent from "./component/CategoryComponent";
import {generatePlaylist} from "../../../../action/trackAction";

const Audio = (props) => {
    const [loader, setLoader] = useState(false);
    const [category, setCategory] = useState([]);
    const [error, setError] = useState({});

    const onCategoryPress = async (item) => {
        try {
            const {category, mainListUID} = item;
            if (category != "AUDIO") {
                props.navigation.navigate("subListScreen", {
                    mainListUID: mainListUID,
                });
            } else {
                const {audioID} = item;
                console.log(audioID);
                //await generatePlaylist(audioID.audioUID);
                props.navigation.navigate("audioPlayer");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCategory = async () => {
        setLoader(true);
        const response = await apiHandler(routeNames.MainList);
        console.log("response from server =>", response);
        if (response.success) {
            setLoader(false);
            setCategory(response.data);
        } else {
            setLoader(false);
            setError({fetchError: response.message});
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    return (
        <View style={{flex: 1, backgroundColor: "#ffffff"}}>
            <Header
                featherIcon={"list"}
                headerText={"MainList"}
                containerStyle={{
                    borderBottomWidth: 0.5,
                    borderColor: "#2222",
                }}
                onPress={() => {
                    props.navigation.openDrawer();
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
                                onCategoryPress(item);
                            }}
                        />
                    );
                }}
                keyExtractor={(index) => index.mainListUID}
            />
            {loader ? <Loader /> : <View />}
        </View>
    );
};

export default Audio;
