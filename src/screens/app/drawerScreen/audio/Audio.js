import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { apiHandler, routeNames } from "../../../../server/apiHandler";
import { Loader, Header } from "../../../components";
import CategoryComponent from "./component/CategoryComponent";
import { generatePlaylist } from "../../../../action/trackAction";
import { useDispatch, connect } from "react-redux";

const Audio = (props) => {
  const [isLoading, setLoader] = useState(false);
  const [category, setCategory] = useState([]);
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  console.log(dispatch);
  const onCategoryPress = async (item) => {
    try {
      const { category, mainListUID } = item;
      if (category != "AUDIO") {
        props.navigation.navigate("subListScreen", {
          mainListUID: mainListUID,
        });
      } else {
        const { audioID } = item;
        console.log(audioID);
        setLoader(true);
        dispatch(
          generatePlaylist(audioID.audioUID, () => {
            props.navigation.navigate("audioPlayer");
          })
        );
        setLoader(false);
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
      setError({ fetchError: response.message });
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
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
        renderItem={({ item, index }) => {
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
      {props.loader || isLoading ? <Loader /> : <View />}
    </View>
  );
};

export default connect((state) => {
  return { loader: state.track.loader };
})(Audio);
