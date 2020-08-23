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
  let [defaultDate, setDefaultDate] = useState("");
  let { data } = props;
  const dateFormat = "ll";

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
      // let endarr = end_time.split(" ").slice(0, -1).join(" ");
      if (startarr === dataString) {
        selectedArr[selectedArr.length] = e;
      }
    });

    setSelectedUsers({
      ...selectedUser,
      activity_periods: selectedArr,
    });
  }

  function flash(current) {
    let getSelectedUser = JSON.parse(localStorage.getItem("selectedUser"));
    const style = {};
    let currentMonth = moment().month(current.month()).format("MMM");
    getSelectedUser.activity_periods.forEach((e) => {
      let { start_time } = e;
      let startarr = start_time.split(" ").slice(0, -2);
      if (String(current.date()) === startarr[1] && currentMonth === startarr[0]) {
        style.border = "1px solid #1890ff";
        style.borderRadius = "50%";
      }
    });
    return (
      <div className="ant-picker-cell-inner" style={style}>
        {current.date()}
      </div>
    );
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
      <div className="modal fade bd-example-modal-lg" id="detailView" tabIndex="-1" role="dialog" aria-labelledby="detailViewLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="card m-2 card-header">
              <h6 className="card-body ">{selectedUser.real_name}</h6>
            </div>
            <div className="row m-0 mt-5">
              <div className="card col-8 p-0 ml-2 mb-4">
                <h6 className="pl-3 pt-3 pb-2 text-success">Activities</h6>
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
                {!defaultDate ? (
                  <div>Loading...</div>
                ) : (
                  <Space direction="vertical" size={12}>
                    <DatePicker dateRender={(current) => flash(current)} defaultValue={moment(new Date(defaultDate))} format={dateFormat} onChange={onChange} />
                  </Space>
                )}
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
