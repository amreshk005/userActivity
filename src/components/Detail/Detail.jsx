import React from "react";
import "antd/dist/antd.css";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { DatePicker, Space } from "antd/es";

function Detail(props) {
  let { selectedUser, defaultDate, onChange } = props;
  const dateFormat = "ll";

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
  );
}

export default Detail;
