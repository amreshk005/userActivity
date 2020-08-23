import React, { useEffect, useState } from "react";

import { fetchUser } from "../../redux/action";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import Detail from "../Detail/Detail";

function Listing(props) {
  let [selectedUser, setSelectedUsers] = useState({});
  let [defaultDate, setDefaultDate] = useState("");
  let [users, setUsers] = useState([]);

  let { data } = props;

  useEffect(() => {
    data && setUsers(data);
  }, [data]);

  function handleSelectedUser(e) {
    localStorage.removeItem("selectedUser");
    let selected = e.target.innerText;
    let [getSelected] = users.filter((i) => i.real_name === selected);
    localStorage.setItem("selectedUser", JSON.stringify(getSelected));
    let { start_time } = getSelected.activity_periods[0];
    let newStartTime = start_time.split(" ").slice(0, -2).join(" ");
    console.log();
    setDefaultDate(moment(new Date(newStartTime)).format());
    setSelectedUsers(getSelected);
  }

  function onChange(date, dateString) {
    let getSelectedUser = JSON.parse(localStorage.getItem("selectedUser"));
    let dataString = dateString;
    dataString = dataString.split(",").join("");
    let selectedArr = [];
    getSelectedUser.activity_periods.forEach((e, index) => {
      let { start_time } = e;
      let startarr = start_time.split(" ").slice(0, -2).join(" ");
      if (startarr === dataString) {
        selectedArr[selectedArr.length] = e;
      }
    });

    setSelectedUsers({
      ...selectedUser,
      activity_periods: selectedArr,
    });
  }

  return (
    <div className="col-12 d-flex justify-content-center">
      <div className="card col-8 p-0 mt-5">
        <div className="card-header">Users</div>
        <ul className="list-group list-group-flush">
          {!data ? (
            <div>Loading...</div>
          ) : (
            data.map((item) => (
              <li key={uuidv4()} role="button" className="list-group-item" data-toggle="modal" data-target="#detailView" style={{ maxWidth: "100%" }} onClick={handleSelectedUser}>
                {item.real_name}
              </li>
            ))
          )}
        </ul>
      </div>
      <Detail selectedUser={selectedUser} defaultDate={defaultDate} onChange={onChange} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
