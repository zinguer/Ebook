import axios from "axios";

import {
	GET_COMMENT_LOAD,
	GET_COMMENT_FAIL,
	GET_COMMENT,
	ADD_COMMENT,
} from "./commentActions";

export const getComments = (id) => async (dispatch) => {
	const config = {
		headers: {
			authorization: localStorage.getItem("token"),
		},
	};
	dispatch({ type: GET_COMMENT_LOAD });
	try {
		let result = await axios.get(`/api/comment/getcomment/${id}`, config);

		dispatch({ type: GET_COMMENT, payload: result.data });
	} catch (error) {
		dispatch({ type: GET_COMMENT_FAIL });
	}
};

export const addComment = (description, id) => async (dispatch) => {
	const config = {
		headers: {
			authorization: localStorage.getItem("token"),
		},
	};
	try {
		let result = await axios.post(
			`/api/comment/addcomment/${id}`,
			{ description },
			config,
		);

		dispatch({ type: ADD_COMMENT, payload: result.data });
		dispatch(getComments(id));
	} catch (error) {
		dispatch({ type: GET_COMMENT_FAIL });
	}
};
