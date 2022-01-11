import React from "react";
import { useState } from "react";
import "../styles/css/treasure.css";
import treasure from "../styles/images/Treasure.png";
import poster from "../styles/images/winner.png";

const Treasure = () => {
  const [list, setList] = useState([
    { No: 1, TeamName: "something", status: "submitted" },
    { No: 2, TeamName: "something2", status: "submitted2" },
    { No: 3, TeamName: "something3", status: "submitted3" },
    { No: 4, TeamName: "something4", status: "submitted4" },
  ]);

  return (
    <div className="treasure-section">
      <div className="banner">
        <div className="poster2">
          <img src={poster} alt="" />
          <h1>APP Dev Contest 2.0</h1>
        </div>
      </div>
      <div className="leaderboard">
        <h1>Leaderboard</h1>
        <h1>APP Dev Contest 2.0</h1>

        {list.map((e) => {
          return (
            <div className="listItem">
              <p>{e.No}</p>
              <p>{e.TeamName}</p>
              <p>{e.status}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Treasure;
