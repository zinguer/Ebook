import {
	CLEAR_ERRORS,
	CURRENT_USER,
	DELETE_USER,
	EDIT_USER,
	FAIL_USER,
	GET_ALL_USERS,
	LOAD_USER,
	LOGIN_USER,
	LOGOUT_USER,
	REGISTER_USER,
} from "./actions";
import axios from "axios";

// get all users

export const getAllUsers = () => async (dispatch) => {
	dispatch({ type: LOAD_USER });
	try {
		let result = await axios.get("/api/user/getallusers");
		dispatch({ type: GET_ALL_USERS, payload: result.data });
	} catch (error) {
		dispatch({ type: FAIL_USER });
	}
};

// register
export const register = (newUser, navigate, setUser) => async (dispatch) => {
	dispatch({ type: LOAD_USER });

	try {
		let result = await axios.post("/api/user/register", newUser);
		dispatch({
			type: REGISTER_USER,
			payload: result.data,
		});
		setUser({
			username: "",
			email: "",
			password: "",
		});
		navigate("/profile");
	} catch (error) {
		dispatch({ type: FAIL_USER, payload: error.response.data });
	}
};

// login

export const login = (user, navigate) => async (dispatch) => {
	dispatch({ type: LOAD_USER });

	try {
		let result = await axios.post("/api/user/login", user);
		dispatch({
			type: LOGIN_USER,
			payload: result.data,
		});

		navigate("/profile");
	} catch (error) {
		dispatch({ type: FAIL_USER, payload: error.response.data });
	}
};

// edit user
export const edit_user = (editUser, id, navigate) => async (dispatch) => {
	try {
		let result = await axios.put(`/api/user/edituser/${id}`, editUser);
		dispatch({ type: EDIT_USER, payload: result.data });
		navigate("/profile");
	} catch (error) {
		dispatch({ type: FAIL_USER, payload: error.response.data });
	}
};

// delete user
export const delete_user = (id) => async (dispatch) => {
	try {
		let result = await axios.delete(`/api/user/deleteuser/${id}`, id);
		dispatch({ type: DELETE_USER, payload: result.data });
	} catch (error) {
		dispatch({ type: FAIL_USER, payload: error.response.data });
	}
};

// current
export const current = () => async (dispatch) => {
	const config = {
		headers: {
			authorization: localStorage.getItem("token"),
		},
	};
	dispatch({ type: LOAD_USER });
	try {
		let result = await axios.get("/api/user/current", config);
		dispatch({ type: CURRENT_USER, payload: result.data });
	} catch (error) {
		// dispatch({ type: FAIL_USER, payload: error.response.data });

		console.log(error);
	}
};

// logout
export const logout = () => {
	return {
		type: LOGOUT_USER,
	};
};

// Clear notification errors
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS,
	};
};
