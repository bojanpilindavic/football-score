import * as actionTypes from "../actions/actionTypes";

const initialState = {
  teams: [],
  selectedTeams: [],
  fixtures: [],
  loading: false
};

const setTeams = (state, action) => {
  return Object.assign({}, state, {
    teams: action.teams
  });
};

const fetchTeamsStart = (state, action) => {
  return Object.assign({}, state, {
    loading: true
  });
};

const fetchTeamsSuccess = (state, action) => {
  return Object.assign({}, state, {
    teams: action.teams,
    loading: false
  });
};

const fetchTeamsFail = (state, action) => {
  return Object.assign({}, state, {
    loading: false
  });
};

const setSelectedTeams = (state, action) => {
  return Object.assign({}, state, {
    selectedTeams: action.selectedTeams
  });
};

const setFixtures = (state, action) => {
  return Object.assign({}, state, {
    fixtures: action.fixtures
  });
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TEAMS:
      return setTeams(state, action);
    case actionTypes.SET_SELECTED_TEAM:
      return setSelectedTeams(state, action);
    case actionTypes.SET_FIXTURES:
      return setFixtures(state, action);
    case actionTypes.FETCH_TEAMS_START:
      return fetchTeamsStart(state, action);
    case actionTypes.FETCH_TEAMS_SUCCESS:
      return fetchTeamsSuccess(state, action);
    case actionTypes.FETCH_TEAMS_FAIL:
      return fetchTeamsFail(state, action);
    default:
      return state;
  }
};

export default teamReducer;
