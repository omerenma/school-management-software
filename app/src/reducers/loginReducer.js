import {
  LOGING_LOADING,
  LOGING_SUCCESS,
  LOGING_ERROR,
  LOGING_REFRESH,
} from "../action/type";
const initialState = {
  loading: false,
  success: false,
  data: {},
  tokenDecode: {},
  error: false,
  errorData: {},
};
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGING_LOADING:
      return {
        loading: true,
      };
    case LOGING_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
        //tokenDecode: action.tokenDecoded,
        error: false,
        errorData: "",
      };
    case LOGING_ERROR:
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
export default loginReducer;
