import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setSelectedTeams,
  setFixtures,
  fetchTeams
} from "../store/actions/teamActions";
import { Form, ListGroup, Button, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Main extends Component {
  constructor() {
    super();
  }

  selectTeam = team => {
    const { selectedTeams, onSetSelectedTeams } = this.props;
    team.gg = 0;
    team.gw = 0;
    team.gl = 0;
    team.gd = 0;
    team.points = 0;
    selectedTeams.push(team);
    onSetSelectedTeams(selectedTeams);
    this.selectFixtures(selectedTeams);
  };

  selectFixtures = teams => {
    const { onSetFixtures } = this.props;
    const t = teams;
    const fixtures = [];

    for (let i = 0; i < t.length - 1; i++) {
      for (let j = i + 1; j < t.length; j++) {
        let firstMatch = {
          homeTeam: t[i],
          awayTeam: t[j]
        };
        fixtures.push(firstMatch);
      }
      for (let j = i + 1; j < t.length; j++) {
        let secondMatch = {
          homeTeam: t[j],
          awayTeam: t[i]
        };
        fixtures.push(secondMatch);
      }
    }
    onSetFixtures(fixtures);
  };
  disableButton = teamName => {
    const { selectedTeams } = this.props;
    const findTeam = selectedTeams.find(e => e.name === teamName);
    if (findTeam) {
      return true;
    }
  };

  componentDidMount() {
    const { onFetchTeams } = this.props;
    onFetchTeams();
  }

  render() {
    const { teams } = this.props;

    return (
      <div class="container">
        <ListGroup className="list-group list-group-horizontal">
          {teams.length > 0 &&
            teams.map((team, index) => (
              <Form className="mt-5 mb-5">
                <Button
                  size="lg"
                  type="button"
                  className="btn btn-dark"
                  disabled={this.disableButton(team.name)}
                  id={team.points}
                  name={team.name}
                  onClick={() => this.selectTeam(team)}
                >
                  <Image
                    className="img-thumbnail"
                    src={team.img}
                  />
                </Button>
              </Form>
            ))}
        </ListGroup>
      </div>
    );
  }
}

const mapStateToProps = store => {
  console.log("store", store);
  return {
    teams: store.teams,
    selectedTeams: store.selectedTeams,
    fixtures: store.fixtures
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchTeams: () => dispatch(fetchTeams()),
    onSetFixtures: payload => dispatch(setFixtures(payload)),
    onSetSelectedTeams: payload => dispatch(setSelectedTeams(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
