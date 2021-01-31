import React, { useEffect, useState } from "react";
import { View, FlatList, Modal, StyleSheet } from "react-native";
import { apiHandler, routeNames } from "../../../../server/apiHandler";
import {
  Loader,
  Header,
  WrappedText,
  WrappedRoundButton,
  WrappedRectangleButton,
} from "../../../components";
import CategoryComponent from "./component/CategoryComponent";
import { generatePlaylist } from "../../../../action/trackAction";
import { useDispatch, connect, useSelector } from "react-redux";
import { WheelPicker as Picker } from "react-native-wheel-picker-android";
import { globalHeight, globalWidth } from "../../../../constants/Dimensions";
import AsyncStorage from "@react-native-community/async-storage";
import Cross2 from "../../../../icons/cross2.png";
import { Storage } from "../../../../utilities/Storage";

const Audio = (props) => {
  const Mala_Text_English = "Shanti mala";
  const Mala_Text_Hindi = "शांती माला";
  const motiCountText = ["मोती की गिनती", "Moti count"];
  const [isLoading, setLoader] = useState(false);
  const [category, setCategory] = useState([]);
  const [showModal, setModal] = useState(false);
  const [userDetail, setDetail] = useState(undefined);
  const [motiCount, setMotiCount] = useState(0);
  const [malaText, setMalaText] = useState([]);
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const [index, selectedIndex] = useState(0);
  const itemList = ["🟠", "🟠", "🟠", "🟠", "🟠", "🟠", "🟠", "🟠"];
  const loading = useSelector((state) => state.track.loading);
  const loadUserData = async () => {
    try {
      let userDetail = await AsyncStorage.getItem("userDetail");

      userDetail = JSON.parse(userDetail);
      setDetail(userDetail);
      if (userDetail["lang"][0] == "H") {
        setMalaText([Mala_Text_Hindi, motiCountText[0]]);
      } else {
        setMalaText([Mala_Text_English, motiCountText[1]]);
      }
      console.log("userDetail =>", userDetail);
      let motiCount = await AsyncStorage.getItem("motiCount");
      setMotiCount(+motiCount || 0);
    } catch (error) {
      console.log("error =>", error);
    }
  };

  useEffect(() => {
    setLoader(true);
    loadUserData();
    fetchCategory();
    return () => {
      Storage.setItem("motiCount", motiCount);
    };
  }, []);

  const onCategoryPress = async (item) => {
    if (item.title == Mala_Text_Hindi || item.title == Mala_Text_English) {
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

    if (response.success) {
      console.log("userDetail ====>", userDetail);
      setLoader(false);
      response.data.push({
        title:
          userDetail["lang"][0] == "H" ? Mala_Text_Hindi : Mala_Text_English,
      });
      setCategory(response.data);
    } else {
      setLoader(false);
      setError({ fetchError: response.message });
    }
  };

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

      <Modal
        visible={showModal}
        transparent={false}
        animationType={"slide"}
        style={{ backgroundColor: "#ffffff33" }}
      >
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
          <WrappedRoundButton
            buttonSource={Cross2}
            onPress={() => {
              setModal(false);
            }}
            containerStyle={{
              position: "absolute",
              top: "5%",
              right: "5%",
              height: globalHeight * 0.6,
              width: globalHeight * 0.6,
              borderRadius: globalHeight * 0.35,
              elevation: 2,
            }}
          />
          <WrappedText
            text={malaText[0]}
            textStyle={{ marginVertical: globalHeight * 0.2, fontSize: 24 }}
          />
          <WrappedText
            text={malaText[1] + ": " + motiCount}
            textStyle={{
              color: "#000000" + "66",
              marginBottom: globalHeight * 0.4,
            }}
          />
          <Picker
            selectedItem={index}
            data={itemList}
            onItemSelected={(index) => {
              //selectedIndex(index + 1);
              setMotiCount(motiCount + 1);
            }}
            isCyclic={true}
            selectedItemTextColor={"#000000"}
            indicatorColor={"#00000000"}
            indicatorWidth={0}
            itemTextSize={20}
            selectedItemTextSize={24}
          />
          <WrappedRectangleButton
            containerStyle={styles.buttonStyle}
            buttonText={"Reset"}
            textStyle={styles.textStyle}
            onPress={() => {
              setMotiCount(0);
              selectedIndex(0);
            }}
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

const styles = StyleSheet.create({
  buttonStyle: {
    height: globalHeight * 0.3,
    width: globalWidth * 1.5,
    borderRadius: globalHeight * 0.1,
    backgroundColor: "#EF8B31",
  },
  textStyle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Libre Franklin",
    fontStyle: "normal",
  },
});
