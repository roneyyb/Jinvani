import TrackPlayer from "react-native-track-player";

export default async function () {
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

    TrackPlayer.addEventListener("remote-next", () => {
        TrackPlayer.skipToNext();
    });

    TrackPlayer.addEventListener("remote-previous", () => {
        TrackPlayer.skipToPrevious();
    });

    TrackPlayer.addEventListener("remote-stop", () => {
        console.log("remoteStop");
        TrackPlayer.destroy();
        //destroyPlaylist()(store.dispatch);
    });

    TrackPlayer.addEventListener(
        "playback-track-changed",
        ({track, position, nextTrack}) => {
            console.log("playback-track-changes", track, position, nextTrack);
            // store.dispatch(setTrack({track: nextTrack}));
            // const playlistState = store.getState().playlist;
            // const tracks = playlistState.tracks;
            // // console.log(track, nextTrack);
            // if (nextTrack && track) {
            //     // console.log(playlistState);
            //     if (!playlistState.paging) {
            //         return;
            //     }
            //     const index = tracks.indexOf(nextTrack);
            //     // console.log('Distance to End', (tracks.length - index));
            //     if (index > -1 && tracks.length - index <= 5) {
            //         // console.log('Playlist End Coming Soon');
            //         if (playlistState.loading) {
            //             // console.log('Request Already Initiated');
            //         } else {
            //             // console.log('Sending New Request');
            //             getMoreTracksFromIdentifier(
            //                 store.dispatch,
            //                 store.getState,
            //             );
            //         }
            //     }
            // }
        },
    );

    TrackPlayer.addEventListener("playback-state", (state) => {
        console.log("PlayBackState =>", state);
        // store.dispatch(setPlayerState(state));
    });
}
