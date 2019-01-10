import React, { Component } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

import { firebaseMatches } from "../../firebase";
import { firebaseLooper, reverseArray } from "../ui/misc";

import LeagueTable from "./Table";
import MatchesList from "./MatchesList";

class Matches extends Component {
  state = {
    isLoading: true,
    matches: [],
    filterMatches: [],
    playedFilter: "All",
    resultFilter: "All"
  };

  componentDidMount() {
    firebaseMatches.once("value").then(snapshot => {
      const matches = firebaseLooper(snapshot);

      this.setState({
        matches: reverseArray(matches),
        filterMatches: reverseArray(matches)
      });

      setTimeout(() => {
        this.setState({
          isLoading: false
        })
      }, 1000)
    });
  }

  showPlayed = played => {
    const list = this.state.matches.filter(match => {
      return match.final === played;
    });

    this.setState({
      filterMatches: played === "All" ? this.state.matches : list,
      playedFilter: played,
      resultFilter: "All"
    });
  };

  showResult = result => {
    const list = this.state.matches.filter(match => {
      return match.result === result;
    });

    this.setState({
      filterMatches: result === "All" ? this.state.matches : list,
      playedFilter: "All",
      resultFilter: result
    });
  };

  render() {
    const state = this.state;

    return (
      <div className="the_matches_container">
        {this.state.isLoading ? (
          <div className="admin_progress" style={{
            marginTop: '150px',
            marginBottom: '1000px'
          }}>
            <CircularProgress
              thickness={5}
              style={{
                color: "#98c5e9",
                margin: '0 auto'
              }}
            />
          </div>
        ) : (
          <div className="the_matches_wrapper">
            <div className="left">
              <div className="match_filters">
                <div className="match_filters_box">
                  <div className="tag">Show Match</div>
                  <div className="cont">
                    <div
                      className={`option ${
                        state.playedFilter === "All" ? "active" : ""
                      }`}
                      onClick={() => this.showPlayed("All")}
                    >
                      All
                    </div>
                    <div
                      className={`option ${
                        state.playedFilter === "Yes" ? "active" : ""
                      }`}
                      onClick={() => this.showPlayed("Yes")}
                    >
                      PLayed
                    </div>
                    <div
                      className={`option ${
                        state.playedFilter === "No" ? "active" : ""
                      }`}
                      onClick={() => this.showPlayed("No")}
                    >
                      Not Played
                    </div>
                  </div>
                </div>

                <div className="match_filters_box">
                  <div className="tag">Result</div>
                  <div className="cont">
                    <div
                      className={`option ${
                        state.resultFilter === "All" ? "active" : ""
                      }`}
                      onClick={() => this.showResult("All")}
                    >
                      All
                    </div>
                    <div
                      className={`option ${
                        state.resultFilter === "W" ? "active" : ""
                      }`}
                      onClick={() => this.showResult("W")}
                    >
                      W
                    </div>
                    <div
                      className={`option ${
                        state.resultFilter === "L" ? "active" : ""
                      }`}
                      onClick={() => this.showResult("L")}
                    >
                      L
                    </div>
                    <div
                      className={`option ${
                        state.resultFilter === "D" ? "active" : ""
                      }`}
                      onClick={() => this.showResult("D")}
                    >
                      D
                    </div>
                  </div>
                </div>
              </div>
              <MatchesList matches={state.filterMatches} />
            </div>

            <div className="right">
              <LeagueTable />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Matches;
