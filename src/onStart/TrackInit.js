import TrackPlayer from "react-native-track-player";
import { setPlayerState } from "../action/trackAction";

module.exports = async function (store) {
  // try {
  //     const trackPlayer = await TrackPlayer.setupPlayer();
  //     console.log("Track Player Initialized",trackPlayer);
  // } catch (error) {
  //     console.log("Error while initializing track player",error);
  // }
  TrackPlayer.addEventListener("remote-play", () => {
    console.log("Play Event");
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener("remote-pause", () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener("remote-stop", () => {
    console.log("remoteStop");
    TrackPlayer.destroy();
    //destroyPlaylist()(store.dispatch);
  });

  TrackPlayer.addEventListener(
    "playback-track-changed",
    ({ track, position, nextTrack }) => {
      console.log("playback-track-changes", track, position, nextTrack);
    }
  );

  TrackPlayer.addEventListener("playback-state", (state) => {
    console.log("PlayBackState =>", state);
    store.dispatch(setPlayerState(state.state));
  });
};
