import React, { Component } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  BackHandler,
} from "react-native";
import Slider from "@react-native-community/slider";
import TrackPlayer, { ProgressComponent } from "react-native-track-player";
import FastImage from "react-native-fast-image";
import Feather1s from "react-native-vector-icons/Feather";
import { globalWidth, themeColor } from "../../../../constants/Dimensions";
import { WrappedText, Header, Loader } from "../../../components";
import * as RNProgress from "react-native-progress";
import Axios from "axios";
import parser from "subtitles-parser";
import { connect } from "react-redux";
let deviceWidth = Dimensions.get("window").width;

class Progress extends ProgressComponent {
  constructor(props) {
    super(props);
    this.fetchSrt();
    this.index = 0;
  }
  getFormattedString(position) {
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
    const srt = await Axios.get(this.props.docsUrl);
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
    loading: false,
  };

  constructor(props) {
    super(props);
    this.toggleMainButton = this.toggleMainButton.bind(this);
  }
  toggleMainButton() {
    const playerState = this.props.playerState;
    console.log(playerState);
    if (playerState === TrackPlayer.STATE_PAUSED) {
      this.setState({ play: true });
      TrackPlayer.play();
    } else if (playerState === TrackPlayer.STATE_PLAYING) {
      this.setState({ play: false });
      TrackPlayer.pause();
    } else {
      console.log("Nothing to Do.");
    }
  }

  getMainButtonIcon = () => {
    const playerState = this.props.playerState;
    if (playerState === TrackPlayer.STATE_PAUSED) {
      return (
        <Feather1s
          style={{ marginLeft: 4, color: "white" }}
          size={30}
          name={"play"}
        />
      );
    } else if (playerState === TrackPlayer.STATE_PLAYING) {
      return <Feather1s style={{ color: "white" }} size={30} name={"pause"} />;
    } else {
      return <ActivityIndicator color={"#ffffff"} />;
    }
  };

  componentDidUpdate() {}

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      async function () {
        await TrackPlayer.destroy();
      }
    );
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    // const {selectedLanguage, playlistState, theme} = this.props;
    // const currentTrack = playlistState.currentTrack;
    // console.log(currentTrack);
    // const loading =
    //     playlistState.tracks.length === 0 || currentTrack === null;

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
          onPress={async () => {
            this.props.navigation.goBack();
            this.setState({ loading: true });
            await TrackPlayer.destroy();
          }}
        />

        {!this.state.loading && (
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
                      "https://i1.wp.com/gajabkhabar.com/wp-content/uploads/2016/01/Lord-Mahavira.jpg?resize=640%2C409",
                  }}
                />
              </View>
            </View>
          </View>
        )}
        <View style={{ margin: 20, flexDirection: "column" }}>
          <Progress docsUrl={this.props.subTitleUrl} />
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
            </View>
          </View>
        </View>
        {this.state.loading && <Loader />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    subTitleUrl: state.track.subTitleUrl,
    playerState: state.track.playerState,
  };
};

// export default connect(mapStateToProps, {
//     destroyPlaylist,
// })(NewsPlayer);

export default connect(mapStateToProps, {})(AudioPlayer);
