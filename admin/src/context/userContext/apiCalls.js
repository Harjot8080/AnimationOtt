import axios from "axios";
import {
    getUsersStart,
    getUsersSuccess,
    getUsersFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
} from "./UserActions";

//GET
export const getUsers = async (dispatch) => {
// console.log()
    dispatch(getUsersStart());
    try{
        const res = await axios.get("http://localhost:8800/api/users/", {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
              },
        });
        console.log(res.data);
        dispatch(getUsersSuccess(res.data));
    }catch(err) {
        dispatch(getUsersFailure());
    }
};

//DELETE
export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
      await axios.delete("http://localhost:8800/api/users/" + id, {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      dispatch(deleteUserSuccess(id));
    } catch (err) {
      dispatch(deleteUserFailure());
    }
  };
  