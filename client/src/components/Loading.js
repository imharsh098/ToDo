import React from "react";
import spinner from "./spinner.gif";
function Loading() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(1,1,1,0.3)",
        position: "fixed",
        top: "0",
        paddingTop: "25vh",
      }}
    >
      <img
        src={spinner}
        alt="Loading..."
        style={{ width: "200px", margin: "0 auto", display: "block" }}
      />
    </div>
  );
}

export default Loading;
