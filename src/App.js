import React, { Component } from "react";
import "./App.css";
import Listing from "./components/Listing/Listing";
import Navbar from "./components/Navbar/Navbar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Listing />
      </div>
    );
  }
}

export default App;
