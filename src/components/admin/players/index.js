import React, { Component } from "react";

import { Link } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

import AdminLayout from "../../../Hoc/AdminLayout";

import { firebasePlayers, firebase } from "../../../firebase";
import { firebaseLooper, reverseArray } from "../../ui/misc";

class AdminPlayers extends Component {
  state = {
    isLoading: true,
    players: []
  };

  componentDidMount() {
    firebasePlayers.once("value").then(snapshot => {
      const players = firebaseLooper(snapshot);
      let promises = [];

      for (let key in players) {
        promises.push(
          new Promise((resolve, reject) => {
            firebase
              .storage()
              .ref("players")
              .child(players[key].image)
              .getDownloadURL()
              .then(url => {
                players[key].url = url;
                resolve();
              });
          })
        );
      }

      Promise.all(promises).then(() => {
        this.setState({
          isLoading: false,
          players
        });
      });
    });
  }

  render() {
    return (
      <AdminLayout>
        <div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Player</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Position</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {this.state.players
                  ? this.state.players.map((player, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <Link to={`/admin/players/edit/${player.id}`}>
                            <div
                              style={{
                                background: `url(${
                                    player.url
                                })no-repeat center top`,
                                backgroundSize: "cover",
                                width: "125px",
                                height: "125px"
                              }}
                            />
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link to={`/admin/players/edit/${player.id}`}>
                            {player.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link to={`/admin/players/edit/${player.id}`}>
                            {player.lastname}
                          </Link>
                        </TableCell>
                        <TableCell>{player.number}</TableCell>
                        <TableCell>{player.position}</TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </Paper>

          <div className="admin_progress">
            {this.state.isLoading ? (
              <CircularProgress
                thickness={5}
                style={{
                  color: "#98c5e9"
                }}
              />
            ) : null}
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AdminPlayers;
