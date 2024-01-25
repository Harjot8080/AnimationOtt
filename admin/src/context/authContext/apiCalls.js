import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    console.log("in try");
    const res = await axios.post("http://localhost:8800/api/auth/adminLogin", user);


    console.log(res.data,"Response");
    let data  = {
  
        ...res.data.info,
       'accessToken': res.data.accessToken

    
    }
    console.log(data,"User data");
   data.isAdmin && dispatch(loginSuccess(data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
