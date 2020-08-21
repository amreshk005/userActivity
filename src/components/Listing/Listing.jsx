import React, { useEffect, useState } from "react";
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
              <li key={uuidv4()} className="list-group-item">
                {e.real_name}
              </li>
            ))
          )}
        </ul>
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
