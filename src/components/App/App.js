import React, { Component } from "react";
import { authEndpoint, scopes, clientId, redirectUri } from "../Config/config";
import ReactHowler from "react-howler";
import hash from "../hash";
import Header from "../Header/header";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
      deviceId: "",
      loggedIn: false,
      error: "",
      trackName: "Track Name",
      artistName: "Artist Name",
      albumName: "Album Name",
      playing: false,
      position: 0,
      duration: 1,
    };
    this.playerCheckInterval = null;
  }
  //Vérification du loggeIn via spotify
  handleLogin() {
    if (this.state.token !== "") {
      // change the loggedIn variable, then start checking for the window.Spotify variable
      this.setState({ loggedIn: true });
      this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
    }
  }

  async componentDidMount() {
    let $token = hash.access_token;
    if ($token) {
      this.setState({
        token: $token,
      });
    }
    const results = await fetch("https://api.spotify.com/v1/me/player", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${$token}`,
        "Content-Type": "application/json",
      },
    });
    const data = results.json();
    console.log(data);
  }

  render() {
    const {
      loggedIn,
      trackName,
      artistName,
      albumName,
      error,
      playing,
    } = this.state;
    return (
      <div className="app">
        <Header />
        {error && <p>Error: {error}</p>}
        <div className="app__container">
          {this.state.token ? (
            <div>
              <p>Artist :{artistName} </p>
              <p>Track: {trackName} </p>
              <p>Album: {albumName}</p>
              <ReactHowler
                src="http://goldfirestudios.com/proj/howlerjs/sound.ogg"
                playing={true}
              />
            </div>
          ) : (
            <a
              className="btn btn-login"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to spotify
            </a>
          )}
        </div>
      </div>
    );
  }
}

export default App;
