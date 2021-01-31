import produce from "immer";
import { combineReducers } from "redux";
import { SET_PLAYER_STATE, SET_TRACK, SET_LOADER } from "../action/constants";

const INITIAL_STATE = {
  playerState: undefined,
  subTitleUrl: "",
  loading: false,
};

const track = produce((draft, action) => {
  switch (action.type) {
    case SET_PLAYER_STATE:
      draft.playerState = action.payload;
      break;
    case SET_TRACK:
      draft.subTitleUrl = action.payload;
      break;
    case SET_LOADER:
      draft.loading = action.payload;
      break;
  }
}, INITIAL_STATE);

export default track;
