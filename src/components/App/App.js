import React, { Component } from "react";
import { authEndpoint, scopes, clientId, redirectUri } from "../Config/config";
import Player from "../Player/player";
import hash from "../hash";
import Header from "../Header/header";
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

    this.tick();
  }
  tick() {
    if (this.state.token) {
      this.getCurrentlyPlaying(this.state.token);
    }
  }

  getCurrentPlaying(token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    fetch("https://api.spotify.com/v1/me", {
      headers,
    })
      .then((data) => data.json())
      .then(
        (response) => console.log(response)
        // this.setState({
        //   item: response.item,
        //   is_playing: response.is_playing,
        //   progress_ms: response.progress_ms,
        //   no_data: response.no_data,
        // })
      )
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="app__container">
          {!this.state.token && (
            <a
              className="btn btn-login"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to spotify
            </a>
          )}
          {this.state.token && !this.state.no_data && (
            <Player
              item={this.state.item}
              is_playing={this.state.is_playing}
              progress_ms={this.state.progress_ms}
            />
          )}
          {this.state.no_data && <p>Just play your song in spotify</p>}
        </div>
      </div>
    );
  }
}

export default App;
