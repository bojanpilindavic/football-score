import axios from "axios";

import * as actionTypes from "./actionTypes";

export const setTeams = teams => {
  return {
    type: actionTypes.SET_TEAMS,
    teams: teams
  };
};

export const setSelectedTeams = selectedTeams => {
  return {
    type: actionTypes.SET_SELECTED_TEAM,
    selectedTeams: selectedTeams
  };
};

export const setFixtures = fixtures => {
  return {
    type: actionTypes.SET_FIXTURES,
    fixtures: fixtures
  };
};


export const fetchTeamsSuccess = teams => {
  return {
    type: actionTypes.FETCH_TEAMS_SUCCESS,
    teams: teams
  };
};

export const fetchTeamsFail = error => {
  return {
    type: actionTypes.FETCH_TEAMS_FAIL,
    error: error
  };
};

export const fetchTeamsStart = () => {
  return {
    type: actionTypes.FETCH_TEAMS_START
  };
};

export const fetchTeams = () => {
  return dispatch => {
    dispatch(fetchTeamsStart());
    axios
      .get("https://api.myjson.com/bins/1dvuky")
      .then(res => {
        dispatch(fetchTeamsSuccess(res.data.teams));
      })
      .catch(err => {
        dispatch(fetchTeamsFail(err));
      });
  };
};
