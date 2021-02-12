import {
  GET_PROFILE_LOADING,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  GET_PROFILE_REFRESH,
} from "../action/type";
const initialState = {
  loading: false,
  success: false,
  data: {},
  error: false,
  errorData: "",
};
const getProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_LOADING:
      return {
        loading: true,
      };
    case GET_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
        error: false,
        errorData: "",
      };
    case GET_PROFILE_ERROR:
      return {
        loading: false,
        success: false,
        data: {},
        error: true,
        errorData: action.payload,
      };
    default:
      return state;
  }
};
export default getProfileReducer;
