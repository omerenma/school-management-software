import { LOADING, SUCCESS, ERROR, REFRESH } from "../action/type";
const initialState = {
  loading: false,
  success: false,
  data: {},
  error: false,
  errorData: "",
};
const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        loading: true,
      };
    case SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
        error: false,
        errorData: "",
      };
    case ERROR:
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
export default registerReducer;
