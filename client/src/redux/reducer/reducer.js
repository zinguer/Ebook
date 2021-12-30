import {
	CLEAR_ERRORS,
	CURRENT_USER,
	FAIL_USER,
	LOAD_USER,
	LOGIN_USER,
	LOGOUT_USER,
	REGISTER_USER,
	EDIT_USER,
	DELETE_USER,
	GET_ALL_USERS,
} from "../actions/actions";

const initialState = {
	users: [],
	user: null,
	errors: null,
	isLoad: true,
	isAuth: false,
	isAdmin: false,
};

const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case LOAD_USER:
			return { ...state, isLoad: true };
		case GET_ALL_USERS:
			return {
				...state,
				users: payload.users,
				isLoad: false,
				isError: false,
			};
		case REGISTER_USER:
			localStorage.setItem("token", payload.token);

			return { ...state, user: payload.user, isAuth: true, isLoad: false };

		case LOGIN_USER:
			localStorage.setItem("token", payload.token);

			return { ...state, user: payload.user, isAuth: true, isLoad: false };

		case CURRENT_USER:
			return { ...state, user: payload.user, isLoad: false, isAuth: true };

		case EDIT_USER:
			return { ...state, user: payload.user, isLoad: false, isAuth: true };

		case FAIL_USER:
			return { ...state, errors: payload.errors, isLoad: false };

		case LOGOUT_USER:
			localStorage.removeItem("token");
			return {
				user: null,
				errors: null,
				isLoad: false,
				isAuth: false,
			};

		case DELETE_USER:
			return { user: null, errors: null, isLoad: false, isAuth: false };

		case CLEAR_ERRORS:
			return { ...state, errors: null };
		default:
			return state;
	}
};

export default userReducer;
