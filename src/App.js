import React, { Component } from "react";
import "./App.css";
import Listing from "./components/Listing/Listing";
import Navbar from "./components/Navbar/Navbar";
import { fetchUser } from "./redux/action";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container-fluid p-0">
        <Navbar />
        <Listing />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
  };
};

export default connect(null, mapDispatchToProps)(App);
