import { USER_REQUEST, USER_SUCCESS, USER_FAILURE } from "./actionTypes";

const initStore = {
  isLoading: false,
  data: [],
  error: "",
};

const userReducer = (state = initStore, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_SUCCESS:
      return {
        isLoading: false,
        data: action.data,
        error: state.error,
      };
    case USER_FAILURE:
      return {
        isLoading: false,
        data: state.data,
        error: action.error,
      };

    default:
      return state;
  }
};

export default userReducer;
