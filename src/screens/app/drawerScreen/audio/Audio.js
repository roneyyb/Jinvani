import React, { useEffect, useState } from "react";
import { View, FlatList, Modal } from "react-native";
import { apiHandler, routeNames } from "../../../../server/apiHandler";
import { Loader, Header, WrappedText } from "../../../components";
import CategoryComponent from "./component/CategoryComponent";
import { generatePlaylist } from "../../../../action/trackAction";
import { useDispatch, connect, useSelector } from "react-redux";
import { WheelPicker as Picker } from "react-native-wheel-picker-android";
import { globalHeight, globalWidth } from "../../../../constants/Dimensions";

const Audio = (props) => {
  const Mala_Text = "Shanti mala";
  const [isLoading, setLoader] = useState(false);
  const [category, setCategory] = useState([]);
  const [showModal, setModal] = useState(false);
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const [index, selectedIndex] = useState(0);
  const itemList = ["🟠", "🟠", "🟠", "🟠", "🟠", "🟠", "🟠", "🟠"];
  const loading = useSelector((state) => state.track.loading);
  const onCategoryPress = async (item) => {
    if (item.title.length == Mala_Text) {
      setModal(true);
    } else {
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
            generatePlaylist(
              audioID.audioUID,
              () => {
                props.navigation.navigate("audioPlayer");
              },
              dispatch
            )
          );
          setLoader(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchCategory = async () => {
    setLoader(true);
    const response = await apiHandler(routeNames.MainList);
    console.log("response from server =>", response);
    if (response.success) {
      setLoader(false);
      response.data.push({ title: Mala_Text });
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
    <View style={{ flex: 1 }}>
      <Header
        featherIcon={"list"}
        headerText={"MainList"}
        containerStyle={{
          borderBottomWidth: 0.5,
          borderColor: "#2222",
          backgroundColor: "#ffffff",
        }}
        onPress={() => {
          props.navigation.openDrawer();
        }}
      />
      <View style={{}}>
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
      </View>

      <Modal visible={showModal}>
        <View
          style={{
            flex: 1,
            margin: "5%",
            elevation: 2,
            backgroundColor: "#ffffff",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: globalWidth * 0.5,
          }}
        >
          <WrappedText
            text={"Samayak mala"}
            textStyle={{ marginVertical: globalHeight * 0.2 }}
          />
          <Picker
            selectedItem={index}
            data={itemList}
            onItemSelected={(index) => selectedIndex(index)}
            isCyclic={true}
            selectedItemTextColor={"#000000"}
            indicatorColor={"#00000000"}
            indicatorWidth={0}
            itemTextSize={20}
            selectedItemTextSize={20}
          />
        </View>
      </Modal>
      {loading || isLoading ? <Loader /> : <View />}
    </View>
  );
};

const mapStateToProps = (props) => {
  console.log(props);
  return {
    loading: props.loading,
  };
};

export default connect(mapStateToProps)(Audio);
