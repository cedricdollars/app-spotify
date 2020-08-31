import React, { Component } from "react";
import Player from "../Player/player";
import hash from "../hash";
import * as $ from "jquery";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [
            {
              url: "",
            },
          ],
        },
        name: "",
        artists: [
          {
            name: "",
          },
        ],
        duration_ms: 0,
      },
      is_playing: "Paused",
      progress_ms: 0,
      no_data: false,
    };

    this.getCurrentPlaying = this.getCurrentPlaying.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    let $token = hash.access_token;

    if ($token) {
      //Je rédéfini le token via la méthode setState
      this.setState({
        token: $token,
      });
      this.getCurrentPlaying($token);
    }

    this.interval = setInterval(() => {
      this.tick();
    }, 5000);
  }
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    clearInterval(this.interval);
  }
  tick() {
    if (this.state.token) {
      this.getCurrentlyPlaying(this.state.token);
    }
  }
  //J'utilise ajax pour effectuer les appels vers l'API
  getCurrentPlaying(token) {
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "bearer" + token);
      },
      success: (data) => {
        //Vérifier que data n'est pas vide
        if (!data) {
          this.setState({ no_data: true });
          return;
        }
        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms,
          no_data: false,
        });
      },
    });
  }
  render() {
    return <div classname="app"></div>;
  }
}

export default App;
