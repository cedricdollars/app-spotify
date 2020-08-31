import React from "react";
import "./player.css";

const Player = (props) => {
  console.log(props);
  const backgroundStyles = {
    backgroundImage: `url(${props.item.album_types.images[0].url})`,
  };
  const progressBarStyles = {
    width: (props.progress_ms * 100) / props.item.duration_ms + "%",
  };
  return (
    <div className="container">
      <div className="main__wrapper">
        <div className="playing__img">{/* image of album */}</div>
        <div className="playing__side">
          <div className="playing__name">{props.item.name}</div>
          <div className="playing__artitst">{props.item.artists[0].name}</div>
          <div className="playing__status">
            {props.is_playing ? "Playing" : "Paused"}{" "}
          </div>
          <div className="progress">
            <div className="progress__bar" style={progressBarStyles} />
          </div>
        </div>
        <div className="background" style={backgroundStyles} />
      </div>
    </div>
  );
};
export default Player;
