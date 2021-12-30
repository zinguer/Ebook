import {
	ADD_COMMENT,
	GET_COMMENT,
	GET_COMMENT_FAIL,
	GET_COMMENT_LOAD,
} from "../actions/commentActions";

const initialState = {
	comments: [],
	isLoad: true,
	isError: false,
	comment: {},
};

const commentReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_COMMENT_LOAD:
			return { ...state, isLoad: true, isError: false };
		case GET_COMMENT:
			return {
				...state,
				comments: payload.ebookComment,
				isLoad: false,
				isError: false,
			};
		case GET_COMMENT_FAIL:
			return { ...state, isLoad: false, isError: true };
		case ADD_COMMENT:
			return {
				...state,
				comment: payload.comment,
				isError: false,
				isLoad: false,
			};
		default:
			return state;
	}
};

export default commentReducer;
