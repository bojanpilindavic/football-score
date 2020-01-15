import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setSelectedTeams
} from "../store/actions/teamActions";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";


class Table extends Component {
  constructor(props) {
    super(props);
  }
  updateTable = selectedTeams => {
    selectedTeams.sort((a, b) => (a.points > b.points ? -1 : 1));
  };
  render() {
    const { selectedTeams } = this.props;
    {
      this.updateTable(selectedTeams);
    }
    return (
      <div class="container">
        <Form className="mt-5 mb-5">
        <table className="table table-sm table-dark">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Team</th>
              <th scope="col">Games</th>
              <th scope="col">GW</th>
              <th scope="col">GD</th>
              <th scope="col">GL</th>
              <th scope="col">Pts</th>
            </tr>
          </thead>
          <tbody>
            {selectedTeams.length > 0 &&
              selectedTeams.map((rowData, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{rowData.name}</td>
                  <td>{rowData.gg}</td>
                  <td>{rowData.gw}</td>
                  <td>{rowData.gd}</td>
                  <td>{rowData.gl}</td>
                  <td>{rowData.points}</td>
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
    onSetSelectedTeams: payload => dispatch(setSelectedTeams(payload))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Table);
