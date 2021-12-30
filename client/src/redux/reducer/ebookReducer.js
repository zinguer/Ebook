import {
	GET_ALL_BOOKS,
	GET_BOOK,
	GET_BOOK_FAIL,
	GET_BOOK_LOAD,
} from "../actions/ebookActions";

const initialState = {
	ebooks: [{}],
	isLoad: true,
	isError: false,
	ebook: {},
};

const ebookReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_BOOK_LOAD:
			return { ...state, isLoad: true, isError: false };
		case GET_ALL_BOOKS:
			return {
				...state,
				ebooks: payload.ebooks,
				isLoad: false,
				isError: false,
			};
		case GET_BOOK:
			return {
				...state,
				ebook: payload.ebook,
				isLoad: false,
				isError: false,
			};
		case GET_BOOK_FAIL:
			return { ...state, isError: true, isLoad: false };
		default:
			return state;
	}
};

export default ebookReducer;
