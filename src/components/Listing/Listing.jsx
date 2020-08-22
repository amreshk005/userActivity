import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd/es";
import { fetchUser } from "../../redux/action";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

function Listing(props) {
  let [users, setUsers] = useState([]);
  let { data, isLoading } = props;
  useEffect(() => {
    data && setUsers(data);
  }, [data]);
  console.log(users);

  return (
    <div className="col-12 d-flex justify-content-center">
      <div className="card col-8 p-0 mt-5">
        <div className="card-header">Users</div>
        <ul className="list-group list-group-flush">
          {!data ? (
            <div>Loading...</div>
          ) : (
            data.map((e) => (
              <li key={uuidv4()} className="list-group-item" data-toggle="modal" data-target="#detailView" style={{ maxWidth: "100%" }}>
                {e.real_name}
              </li>
            ))
          )}
        </ul>
      </div>
      <div class="modal fade bd-example-modal-lg" id="detailView" tabindex="-1" role="dialog" aria-labelledby="detailViewLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="card">
              <div class="card-body">This is some text within a card body.</div>
            </div>
            <div className="row m-0 mt-5">
              <div class="card col-8 p-0 ml-2 mb-4">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Cras justo odio</li>
                  <li class="list-group-item">Dapibus ac facilisis in</li>
                  <li class="list-group-item">Vestibulum at eros</li>
                </ul>
              </div>
              <div className="col-3">
                <Space direction="vertical" size={12}>
                  <DatePicker
                    dateRender={(current) => {
                      const style = {};
                      if (current.date() === 1) {
                        style.border = "1px solid #1890ff";
                        style.borderRadius = "50%";
                      }
                      return (
                        <div className="ant-picker-cell-innerHeight" style={style}>
                          {current.date()}
                        </div>
                      );
                    }}
                  />
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
