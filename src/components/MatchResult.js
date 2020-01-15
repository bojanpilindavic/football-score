import React, { Component } from "react";
import { connect } from "react-redux";
import { setSelectedTeams, setFixtures } from "../store/actions/teamActions";
import { Form } from "react-bootstrap";

class MatchResults extends Component {
  constructor(props) {
    super(props);
  }
  updateTeam = (teamId, status) => {
    const { selectedTeams, onSetSelectedTeams } = this.props;
    selectedTeams.map(team => {
      if (team.id === teamId ) {
        if (status === 0) {
          team.gg += 1;
          team.gd += 1;
          team.points += 1;
        } else if (status === 1) {
          team.gg += 1;
          team.gw += 1;
          team.points += 3;
        } else if (status === 2) {
          team.gg += 1;
          team.gl += 1;
        }

        return team;
      }
    });
    onSetSelectedTeams(selectedTeams);
  };

  calculateTeamScore = team => {
    const { fixtures, onSetFixtures } = this.props;
    let fixture = fixtures[team.fixtureId];
    fixture[team.side].goals = team.goals;

    if (fixture.homeTeam.goals && fixture.awayTeam.goals) {
      if (fixture.homeTeam.goals === fixture.awayTeam.goals) {
        this.updateTeam(fixture.homeTeam.id, 0);
        this.updateTeam(fixture.awayTeam.id, 0);
      } else if (fixture.homeTeam.goals > fixture.awayTeam.goals) {
        this.updateTeam(fixture.homeTeam.id, 1);
        this.updateTeam(fixture.awayTeam.id, 2);
      }
      if (fixture.homeTeam.goals < fixture.awayTeam.goals) {
        this.updateTeam(fixture.homeTeam.id, 2);
        this.updateTeam(fixture.awayTeam.id, 1);
      }
    }
  };

  render() {
    const { fixtures } = this.props;

    return (
      <div class="container">
         <Form className="mt-5 mb-5">
         <table className="table table-dark" align="center">
          <thead>
            <tr>
              <th>No.</th>
              <th>Home Team</th>
              <th>Home Score</th>
              <th>vs</th>
              <th>Away Score</th>
              <th class="col-md-4">Away Team</th>
            </tr>
          </thead>
          <tbody>
            {fixtures.map((rowData, index) => (
              <tr>
                <td scope="row">{index + 1}</td>
                <td>{rowData.homeTeam.name}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    max="9"
                    size="4"
                    onChange={evt =>
                      this.calculateTeamScore({
                        fixtureId: index,
                        side: "homeTeam",
                        teamId: rowData.homeTeam.id,
                        goals: evt.target.value
                      })
                    }
                  ></input>
                </td>
                <td>:</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    max="9"
                    size="4"
                    onChange={evt =>
                      this.calculateTeamScore({
                        fixtureId: index,
                        side: "awayTeam",
                        teamId: rowData.awayTeam.id,
                        goals: evt.target.value
                      })
                    }
                  ></input>
                </td>
                <td>{rowData.awayTeam.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
         </Form>
        
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
    onSetSelectedTeams: payload => dispatch(setSelectedTeams(payload)),
    onSetFixtures: payload => dispatch(setFixtures(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchResults);
