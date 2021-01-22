import React, { Component } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Slider from "@react-native-community/slider";
import TrackPlayer, { ProgressComponent } from "react-native-track-player";
import FastImage from "react-native-fast-image";
import Feather1s from "react-native-vector-icons/Feather";
import { globalWidth, themeColor } from "../../../../constants/Dimensions";
import { WrappedText, Header } from "../../../components";
import * as RNProgress from "react-native-progress";
import Axios from "axios";
import parser from "subtitles-parser";
let deviceWidth = Dimensions.get("window").width;

class Progress extends ProgressComponent {
  constructor(props) {
    super(props);
    this.fetchSrt();
    this.index = 0;
  }
  getFormattedString(position) {
    // const date = new Date(0);
    // date.setSeconds(position);
    // const timeString = date.toISOString().substr(14, 5);
    // return timeString;

    return new Date(position * 1000).toISOString().substr(11, 8);
  }
  matchSubtitleFile(time) {
    const { currentSubTitle } = this.state;

    if (!currentSubTitle || Object.keys(currentSubTitle).length == 0) {
      const nextSubtitle = this.subtitleFile.find(({ startTime, endTime }) => {
        return time >= startTime && time <= endTime;
      });

      if (nextSubtitle) {
        this.setState({ currentSubTitle: nextSubtitle });
      }
    } else if (currentSubTitle) {
      const { startTime, endTime } = currentSubTitle;

      if (time >= startTime && time <= endTime) {
      } else {
        const nextSubtitle = this.subtitleFile.find(
          ({ startTime, endTime }) => {
            return time >= startTime && time <= endTime;
          }
        );
        if (nextSubtitle) {
          this.setState({ currentSubTitle: nextSubtitle });
        }
      }
    }
  }
  fetchSrt = async () => {
    const srt = await Axios.get(
      "https://jinvani.s3.ap-south-1.amazonaws.com/Kesari-2019-Hindi-Proper-720p-HDRip-x264.srt"
    );
    //console.log(typeof srt.data, srt.data.length);
    const data = parser.fromSrt(srt.data, true);
    this.subtitleFile = data;
    this.index = 0;
    this.setState({
      currentSubTitle: {},
      subTitleLoaded: true,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.subTitleLoaded &&
      prevState.position != this.state.position
    ) {
      this.matchSubtitleFile(this.state.position * 1000);
    }
  }

  render() {
    const progress =
      this.state.duration !== 0 && this.state.position / this.state.duration;
    const positionString = this.getFormattedString(this.state.position);
    const durationString = this.getFormattedString(this.state.duration);
    console.log(this.state.duration, this.state.position);

    return (
      <View style={{ marginTop: 10 }}>
        <View>
          <WrappedText
            text={
              (this.state.currentSubTitle &&
                this.state.currentSubTitle["text"]) ||
              ""
            }
            textStyle={{ color: "#000000", alignSelf: "center" }}
          />
        </View>
        {/* <RNProgress.Bar
          height={2}
          color={themeColor}
          borderColor={themeColor}
          progress={progress}
          width={globalWidth * 9}
          useNativeDriver={true}
          animationType={"timing"}
        /> */}
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={0}
          value={progress || 0}
          onSlidingComplete={(value) => {
            console.log(this.state.duration * value, value);
            TrackPlayer.seekTo(this.state.duration * value);
          }}
          maximumValue={1}
          minimumTrackTintColor={themeColor}
          maximumTrackTintColor="#000000"
          thumbTintColor={themeColor}
        />
        <View style={{ marginTop: 4, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <WrappedText style={{ color: themeColor }} text={positionString} />
          </View>
          <View>
            <WrappedText style={{ color: themeColor }} text={durationString} />
          </View>
        </View>
      </View>
    );
  }
}
class AudioPlayer extends Component {
  state = {
    track: {},
    play: true,
  };

  constructor(props) {
    super(props);
    this.toggleMainButton = this.toggleMainButton.bind(this);
  }

  toggleMainButton() {
    const { play } = this.state;
    if (!play) {
      TrackPlayer.play();
    } else {
      TrackPlayer.pause();
    }

    this.setState({ play: !play });
  }

  getMainButtonIcon() {
    //const playerState = this.props.playlistState.playerState;
    if (!this.state.play) {
      return (
        <Feather1s
          style={{ marginLeft: 4, color: "white" }}
          size={30}
          name={"play"}
        />
      );
    } else {
      return <Feather1s style={{ color: "white" }} size={30} name={"pause"} />;
    }
  }

  fetchSrt = async () => {
    const srt = await Axios.get(
      "https://jinvani.s3.ap-south-1.amazonaws.com/Kesari-2019-Hindi-Proper-720p-HDRip-x264.srt"
    );
    console.log(typeof srt.data, srt.data.length);
    const data = parser.fromSrt(srt.data, true);
    console.log(data.length, data[0]);
  };

  componentDidMount() {
    this.fetchSrt();
  }

  render() {
    // const {selectedLanguage, playlistState, theme} = this.props;
    // const currentTrack = playlistState.currentTrack;
    // console.log(currentTrack);
    // const loading =
    //     playlistState.tracks.length === 0 || currentTrack === null;
    const loading = false;
    // let trackInfo = this.props.newsById[currentTrack] || {
    //     images: [],
    //     categories: [],
    // };

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: "#ffffffff",
          },
        ]}
      >
        <Header
          featherIcon={"arrow-left"}
          headerText={"Audio"}
          containerStyle={{
            borderBottomWidth: 0.5,
            borderColor: "#2222",
          }}
          onPress={() => {
            this.props.navigation.goBack();
            TrackPlayer.destroy();
          }}
        />

        {loading && <Loader />}
        {!loading && (
          <View style={{ flex: 1, flexDirection: "column" }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                // backgroundColor: themeColor,
              }}
            >
              <View
                style={{
                  marginVertical: 20,
                  width: deviceWidth - 40,
                  alignItems: "center",
                  borderRadius: 20,
                  overflow: "hidden",
                  alignSelf: "center",
                }}
              >
                <FastImage
                  style={{
                    width: deviceWidth - 40,
                    aspectRatio: 3 / 2,
                    resizeMode: "contain",
                  }}
                  source={{
                    uri:
                      "https://lh3.googleusercontent.com/proxy/zjKxhm2ElKvbaR-2aTWEuWdpDp4GRnEZTX2s-sFY1DFC2GYSeGabtZ8OwSiAf_QTL7oTqZFBBl77vv6UlqsD",
                  }}
                />
              </View>
            </View>
          </View>
        )}
        <View style={{ margin: 20, flexDirection: "column" }}>
          {/* <View style={{marginBottom: 10}}>
                                <CustomText
                                    style={{
                                        color: theme.styles.global.fontColor,
                                        fontSize: 18,
                                        textAlign: "center",
                                    }}
                                >
                                    {trackInfo.headline}
                                </CustomText>
                                <CustomText
                                    style={{
                                        textAlign: "center",
                                        color: theme.styles.global.fontColor,
                                        marginTop: 2,
                                    }}
                                >
                                    {getNameFromNewsCategories(
                                        trackInfo.categories,
                                        selectedLanguage,
                                    )}
                                </CustomText>
                            </View> */}
          {/* <Progress /> */}
          <Progress />
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <TouchableOpacity
                onPress={async () => {
                  const position = await TrackPlayer.getPosition();
                  TrackPlayer.seekTo(position - 5);
                }}
                activeOpacity={1}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 20,
                }}
              >
                <Feather1s color={themeColor} size={25} name={"rotate-ccw"} />
              </TouchableOpacity>
              {/* <TouchableOpacity
                                onPress={() => {
                                    TrackPlayer.skipToPrevious();
                                }}
                                activeOpacity={1}
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight: 20,
                                }}
                            >
                                <Feather1s
                                    color={themeColor}
                                    size={25}
                                    name={"skip-back"}
                                />
                            </TouchableOpacity> */}
              <TouchableOpacity
                onPress={this.toggleMainButton}
                activeOpacity={1}
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  backgroundColor: themeColor,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {this.getMainButtonIcon()}
              </TouchableOpacity>
              {/* <TouchableOpacity
                                onPress={() => {
                                    TrackPlayer.skipToNext();
                                }}
                                activeOpacity={1}
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginLeft: 20,
                                }}
                            >
                                <Feather1s
                                    color={themeColor}
                                    size={25}
                                    name={"skip-forward"}
                                />
                            </TouchableOpacity> */}
              <TouchableOpacity
                onPress={async () => {
                  const position = await TrackPlayer.getPosition();
                  TrackPlayer.seekTo(position + 5);
                }}
                activeOpacity={1}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 20,
                }}
              >
                <Feather1s color={themeColor} size={25} name={"rotate-cw"} />
                {/*<Image*/}
                {/*    source={require('../../image/icons/video-icons/rotate-cw.png')}*/}
                {/*    resizeMode={'contain'}*/}
                {/*    style={{*/}
                {/*        tintColor: theme.styles.global.fontColor,*/}
                {/*        width: 25,*/}
                {/*        height: 25,*/}
                {/*    }}*/}
                {/*/>*/}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// const mapStateToProps = (state) => {
//     return {
//         selectedLanguage: state.language,
//         playlistState: state.playlist,
//         newsById: state.news.byIds,
//         theme: state.theme,
//     };
// };

// export default connect(mapStateToProps, {
//     destroyPlaylist,
// })(NewsPlayer);

export default AudioPlayer;
