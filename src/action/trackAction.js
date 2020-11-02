import TrackPlayer from "react-native-track-player";
import {apiHandler, routeNames} from "../server/apiHandler";

const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE,
            TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
            TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
            TrackPlayer.CAPABILITY_STOP,
        ],
        compactCapabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE,
        ],
        notificationCapabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE,
            TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
            TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
            TrackPlayer.CAPABILITY_STOP,
        ],
    });
};

const setTracks = async (audioData) => {
    //const newsByIds = getState().news.byIds;
    await TrackPlayer.reset();
    // const tracks = trackList.map((track) => {
    //     const newsItem = newsByIds[track];
    //     return {
    //         id: track,
    //         url: newsItem.audioUrl,
    //         title: newsItem.headline,
    //         artist: newsItem.categories[0],
    //         artwork: newsItem.images[0],
    //     };
    // });
    const tracks = [
        {
            id: audioData.createdAt,
            url: audioData.audioURL,
            title: audioData.title,
            // artist: track.categories[0],
            // artwork: track.images[0],
        },
    ];
    console.log(tracks);
    await TrackPlayer.add(tracks);
    //await TrackPlayer.skip(trackList[startIndex]);
    await TrackPlayer.play();
};

const appendTracks = async (audioData) => {
    const tracks = [
        {
            id: audioData.createdAt,
            url: audioData.audioURL,
            title: audioData.title,
            // artist: track.categories[0],
            // artwork: track.images[0],
        },
    ];

    await TrackPlayer.add(tracks);
};

export const generatePlaylist = async (audioUID) => {
    console.log(audioUID);
    try {
        const response = await apiHandler(routeNames.FetchAudio, audioUID);
        console.log(response);
        if (response.success) {
            await setupPlayer();
            await setTracks(response.data.audioData);
        } else {
            throw new Error("Error in Setting up Track Player");
            //   setLoader(false);
            //   setError({fetchError: response.message});
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
    // const newsState = getState().news.news;
    // const newsList = [...newsState.news];
    // const payload = {
    //     tracks: newsList,
    //     currentTrack: newsList[startIndex],
    //     identifier: newsState.identifier,
    //     lastTime: newsState.lastTime,
    //     paging: newsState.paging,
    // };
    // dispatch(savePlaylist(payload));
};

export const generatePlaylistFromTimeline = (startIndex) => {
    return async (dispatch, getState) => {
        await setupPlayer();
        const timelineState = getState().timeline.timeline;
        let newsList = [...timelineState.feed];
        const startIndexId = newsList[startIndex].id;
        console.log(startIndexId);
        newsList = newsList.filter((item) => item.type === "news");
        newsList = newsList.map((item) => item.id);

        const userState = getState().user;
        const newsInterests = userState.newsInterests || [];
        const identifier = newsInterests.join(",");

        let lastId = newsList[newsList.length - 1];
        let lastTime = getState().news.byIds[lastId].createdAt;
        console.log("Generating LastTime: ", lastTime);
        lastTime = new Date(lastTime).getTime();
        console.log("Generating LastTime: ", lastTime);
        console.log(newsList);
        const newStartIndex = newsList.indexOf(startIndexId);
        console.log(newStartIndex);
        const payload = {
            tracks: newsList,
            currentTrack: newsList[newStartIndex],
            identifier: identifier,
            lastTime: lastTime,
            paging: timelineState.paging,
        };
        dispatch(savePlaylist(payload));
        await setTracks(newsList, newStartIndex, getState);
    };
};

export const getMoreTracksFromIdentifier = async (dispatch, getState) => {
    const currentPlaylist = getState().playlist;
    const selectedLanguage = getState().language;
    const lastTime = currentPlaylist.lastTime;
    const hindi = selectedLanguage === languages.hindi;
    const categories = currentPlaylist.identifier;
    dispatch(trackFetchStart());
    try {
        const response = await axios.get(`${server.url}/news`, {
            params: {lastTime, categories, hindi},
        });
        const responseJson = response.data;
        // console.log(responseJson);
        if (responseJson.status === 1) {
            dispatch(trackFetchSuccess(responseJson.payload));
            appendTracks(responseJson.payload.payload);
        } else {
            console.log(responseJson.message);
            dispatch(trackFetchError());
        }
    } catch (e) {
        console.log(e);
        dispatch(trackFetchError());
    }
};

export const destroyPlaylist = () => {
    return async (dispatch) => {
        dispatch(destroyPlaylistEvent());
    };
};

const destroyPlaylistEvent = () => {
    return {
        type: DESTROY_PLAYLIST,
    };
};

const savePlaylist = (payload) => {
    return {
        type: SAVE_PLAYLIST,
        payload,
    };
};

export const setTrack = (payload) => {
    return {
        type: SET_TRACK,
        payload,
    };
};
export const setPlayerState = (payload) => {
    return {
        type: SET_PLAYER_STATE,
        payload,
    };
};

const trackFetchStart = () => {
    return {
        type: TRACK_FETCH_START,
    };
};

const trackFetchSuccess = (data) => {
    return {
        type: TRACK_FETCH_SUCCESS,
        payload: data,
    };
};

const trackFetchError = () => {
    return {
        type: TRACK_FETCH_FAILURE,
    };
};
