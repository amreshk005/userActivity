import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd/es";
import { fetchUser } from "../../redux/action";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

function Listing(props) {
  let [users, setUsers] = useState([]);
  let [selectedUser, setSelectedUsers] = useState({});
  let { data, isLoading } = props;
  const dateFormat = "ll";

  useEffect(() => {
    data && setUsers(data);
  }, [data]);
  console.log(users);

  function handleSelectedUser(e) {
    localStorage.removeItem("selectedUser");
    let selected = e.target.innerText;
    let [getSelected] = users.filter((i) => i.real_name === selected);
    localStorage.setItem("selectedUser", JSON.stringify(getSelected));
    setSelectedUsers(getSelected);
    console.log(getSelected);
  }

  function onChange(date, dateString) {
    let getsetSelectedUsers = JSON.parse(localStorage.getItem("selectedUser"));
    let dataString = dateString;
    let { activity_periods } = getsetSelectedUsers;
    dataString = dataString.split(",").join("");
    let selectedArr = [];
    activity_periods.forEach((e, index) => {
      let { start_time, end_time } = e;
      let startarr = start_time.split(" ").slice(0, -2).join(" ");
      let endarr = end_time.split(" ").slice(0, -1).join(" ");
      console.log(startarr, endarr);
      if (startarr === dataString) {
        console.log(startarr);
        selectedArr[selectedArr.length] = e;
      }
    });
    setSelectedUsers({
      ...selectedUser,
      activity_periods: selectedArr,
    });
    console.log(selectedArr, dataString);
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
              <li key={uuidv4()} className="list-group-item" data-toggle="modal" data-target="#detailView" style={{ maxWidth: "100%" }} onClick={handleSelectedUser}>
                {item.real_name}
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="modal fade bd-example-modal-lg" id="detailView" tabIndex="-1" role="dialog" aria-labelledby="detailViewLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="card">
              <div className="card-body">{selectedUser.real_name}</div>
            </div>
            <div className="row m-0 mt-5">
              <div className="card col-8 p-0 ml-2 mb-4">
                <ul className="list-group list-group-flush">
                  {!selectedUser.activity_periods ? (
                    <>
                      <div>Loading....</div>
                    </>
                  ) : selectedUser.activity_periods.length === 0 ? (
                    <li key={uuidv4()} className="list-group-item">
                      No Activity on this Day
                    </li>
                  ) : (
                    selectedUser.activity_periods.map((item) => (
                      <li key={uuidv4()} className="list-group-item">
                        {item.start_time} - {item.end_time}
                      </li>
                    ))
                  )}
                </ul>
              </div>
              <div className="col-3">
                <Space direction="vertical" size={12}>
                  <DatePicker defaultValue={moment("2020-05-01", dateFormat)} format={dateFormat} onChange={onChange} />
                </Space>
              </div>
            </div>
          </div>
        </div>
      </div>
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
