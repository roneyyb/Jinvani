import React, {Component} from "react";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import TrackPlayer, {ProgressComponent} from "react-native-track-player";
import FastImage from "react-native-fast-image";
import Feather1s from "react-native-vector-icons/Feather";
//import {connect} from "react-redux";
//import AppConstant from "../../constants/AppConstant";
import {globalWidth, themeColor} from "../../../../constants/Dimensions";
import {WrappedText} from "../../../components";
//import {getNameFromNewsCategories} from "../../utils";
import * as RNProgress from "react-native-progress";
//import {destroyPlaylist} from "../../actions/playlistActions";

let deviceWidth = Dimensions.get("window").width;

class Progress extends ProgressComponent {
    getFormattedString(position) {
        const date = new Date(0);
        date.setSeconds(position);
        const timeString = date.toISOString().substr(14, 5);
        return timeString;
    }

    render() {
        const progress =
            this.state.duration !== 0 &&
            this.state.position / this.state.duration;
        const positionString = this.getFormattedString(this.state.position);
        const durationString = this.getFormattedString(this.state.duration);

        return (
            <View style={{marginTop: 10}}>
                <RNProgress.Bar
                    height={2}
                    color={themeColor}
                    borderColor={themeColor}
                    progress={progress}
                    width={globalWidth * 9}
                    useNativeDriver={true}
                    animationType={"timing"}
                />
                <View style={{marginTop: 4, flexDirection: "row"}}>
                    <View style={{flex: 1}}>
                        <WrappedText
                            style={{color: themeColor}}
                            text={positionString}
                        />
                    </View>
                    <View>
                        <WrappedText
                            style={{color: themeColor}}
                            text={durationString}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

class AudioPlayer extends Component {
    state = {
        track: {},
    };

    constructor(props) {
        super(props);
        this.toggleMainButton = this.toggleMainButton.bind(this);
    }

    toggleMainButton() {
        // const playerState = this.props.playlistState.playerState;
        // console.log(playerState);
        // if (playerState === TrackPlayer.STATE_PAUSED) {
        //     TrackPlayer.play();
        // } else if (playerState === TrackPlayer.STATE_PLAYING) {
        //     TrackPlayer.pause();
        // } else {
        //     console.log("Nothing to Do.");
        // }
    }

    getMainButtonIcon() {
        // const playerState = this.props.playlistState.playerState;
        // if (playerState === TrackPlayer.STATE_PAUSED) {
        //     return (
        //         <Feather1s
        //             style={{marginLeft: 4, color: "white"}}
        //             size={30}
        //             name={"play"}
        //         />
        //     );
        // } else if (playerState === TrackPlayer.STATE_PLAYING) {
        //     return (
        //         <Feather1s style={{color: "white"}} size={30} name={"pause"} />
        //     );
        // } else {
        //     return <RNProgress.CircleSnail color={"white"} />;
        // }
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
                {/* <PolbolHeader
                    type={"back"}
                    headerText={selectedLanguage.audio}
                    navigation={this.props.navigation}
                    rightComponent={
                        <TouchableOpacity
                            onPress={async () => {
                                TrackPlayer.pause();
                                await TrackPlayer.destroy();
                                this.props.destroyPlaylist();
                                this.props.navigation.goBack();
                            }}
                            activeOpacity={1}
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                marginLeft: 20,
                            }}
                        >
                            <Feather1s
                                size={30}
                                color={theme.styles.global.fontColor}
                                name={"x"}
                            />
                        </TouchableOpacity>
                    }const loading =
        //     playlistState.tracks.length === 0 || currentTrack === null;
                /> */}
                {loading && <Loader />}
                {!loading && (
                    <View style={{flex: 1, flexDirection: "column"}}>
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
                <View style={{margin: 20, flexDirection: "column"}}>
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
                    <Progress />
                    <View style={{flexDirection: "row", marginTop: 20}}>
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
                                <Feather1s
                                    color={themeColor}
                                    size={25}
                                    name={"rotate-ccw"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
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
                            </TouchableOpacity>
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
                            <TouchableOpacity
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
                            </TouchableOpacity>
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
                                <Feather1s
                                    color={themeColor}
                                    size={25}
                                    name={"rotate-cw"}
                                />
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
