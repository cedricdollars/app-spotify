import React, { Component } from "react";
import Player from "../Player/player";
import hash from "../hash";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: { images: [{ url: "" }] },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0,
      },
      is_playing: "Paused",
      progress_ms: 0,
      no_data: false,
    };
  }
}

export default App;
