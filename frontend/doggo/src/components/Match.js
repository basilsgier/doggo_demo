import React from "react";

function Match(props) {

    console.log("MY STAT IS", props.state)
    const [state, setState] = React.useState();
    return (
        <div>
          <h1>Match</h1>
        </div>
      );
};

export default Match;