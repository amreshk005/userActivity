import { USER_REQUEST, USER_SUCCESS, USER_FAILURE } from "./actionTypes";
import axios from "axios";

const userRequest = () => ({
  type: USER_REQUEST,
});

const userSuccess = (userData) => ({
  type: USER_SUCCESS,
  data: userData,
});

const userFailure = (error) => ({
  type: USER_FAILURE,
  errro: error,
});

const fetchUser = () => {
  return async (dispatch) => {
    dispatch(userRequest());
    return await axios
      .get("/data/data.json")
      .then((res) => {
        let { members } = res.data;
        // console.log(members);
        return dispatch(userSuccess(members));
      })
      .catch((err) => dispatch(userFailure(err)));
  };
};

export { fetchUser, userRequest, userSuccess, userFailure };
