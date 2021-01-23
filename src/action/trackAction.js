import TrackPlayer from "react-native-track-player";
import { apiHandler, routeNames } from "../server/apiHandler";
import { SET_TRACK, SET_PLAYER_STATE, SET_LOADER } from "./constants";
import { useDispatch } from "react-redux";

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      // TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      // TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      TrackPlayer.CAPABILITY_STOP,
    ],
    compactCapabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
    ],
    notificationCapabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      // TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      // TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      TrackPlayer.CAPABILITY_STOP,
    ],
  });
};

const setTracks = async (audioData) => {
  await TrackPlayer.reset();

  const tracks = [
    {
      id: audioData.createdAt,
      url: audioData.audioURL,
      title: audioData.title,
    },
  ];
  await TrackPlayer.add(tracks);

  await TrackPlayer.play();
};

export const generatePlaylist = (audioUID, callBack, dispatch) => {
  return async () => {
    try {
      dispatch({ type: SET_LOADER, payload: true });
      const response = await apiHandler(routeNames.FetchAudio, audioUID);

      if (response.success) {
        await setupPlayer();

        await setTracks(response.data.audioData);

        dispatch({
          type: SET_TRACK,
          payload: response.data.audioData.docsURL,
        });
        dispatch({
          type: SET_LOADER,
          payload: false,
        });
        // dispatch({
        //   type: SET_PLAYER_STATE,
        //   payload: TrackPlayer.STATE_PLAYING,
        // });
        callBack();
      } else {
        throw new Error("Error in Setting up Track Player");
        //   setLoader(false);
        //   setError({fetchError: response.message});
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
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
