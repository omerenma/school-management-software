import {
  PROFILE_LOADING,
  PROFILE_SUCCESS,
  PROFILE_ERROR,
  PROFILE_REFRESH,
} from "../action/type";
const initialState = {
  loading: false,
  success: false,
  data: {},
  error: false,
  errorData: "",
};
const registerProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        loading: true,
      };
    case PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
        error: false,
        errorData: "",
      };
    case PROFILE_ERROR:
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
export default registerProfileReducer;
