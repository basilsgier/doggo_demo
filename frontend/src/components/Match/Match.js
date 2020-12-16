import React from "react";

function Match(props) {

    console.log("MY STATE IS", props.state)
    
    let url = new URL("http://127.0.0.1:3001/");
    fetch(url, {
      method: "GET",
      headers: {'Content-Type':'application/json'},
    })
      .then((res) => {console.log("RES", res); return res.json();})
      .then((r) => {console.log("Received from the server", r)})
      .catch((error) => {console.log(error)});
    const [state, setState] = React.useState();
    
    return (
        <div>
          <h1>Match</h1>
        </div>
      );
};

export default Match;