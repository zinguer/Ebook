import axios from "axios";
import {
	GET_ALL_BOOKS,
	GET_BOOK,
	GET_BOOK_FAIL,
	GET_BOOK_LOAD,
} from "./ebookActions";

export const getAllEbooks = () => async (dispatch) => {
	dispatch({ type: GET_BOOK_LOAD });
	try {
		let result = await axios.get("/api/ebook/getall");
		dispatch({ type: GET_ALL_BOOKS, payload: result.data });
	} catch (error) {
		dispatch({ type: GET_BOOK_FAIL });
	}
};

export const addEbook = (ebook, setNewBook) => async (dispatch) => {
	try {
		await axios.post("/api/ebook/addebook", ebook);

		dispatch(getAllEbooks());
		setNewBook({
			name: "",
			genre: "",
			language: "",
			release: 0,
			duration: "",
			description: "",
		});
	} catch (error) {
		dispatch({ type: GET_BOOK_FAIL });
	}
};

export const getEbook = (id) => async (dispatch) => {
	dispatch({ type: GET_BOOK_LOAD });
	try {
		let result = await axios.get(`/api/ebook/getone/${id}`);
		dispatch({ type: GET_BOOK, payload: result.data }); //{msg,BOOK}
	} catch (error) {
		dispatch({ type: GET_BOOK_FAIL });
	}
};
export const edit_Ebook = (id, ebook) => async (dispatch) => {
	try {
		await axios.put(`/api/ebook/updatebook/${id}`, ebook);
		dispatch(getAllEbooks());
	} catch (error) {
		dispatch({ type: GET_BOOK_FAIL });
	}
};

export const deleteEbook = (id) => async (dispatch) => {
	try {
		await axios.delete(`/api/ebook/deletebook/${id}`);
		dispatch(getAllEbooks());
	} catch (error) {
		dispatch({ type: GET_BOOK_FAIL });
	}
};

export const addImageEbook = (image, id) => async (dispatch) => {
	try {
		await axios.put(`/api/ebook/updatebookimage/${id}`, image);
		dispatch(getAllEbooks());
	} catch (error) {
		dispatch({ type: GET_BOOK_FAIL });
	}
};

export const addAudioEbook = (audio, id) => async (dispatch) => {
	try {
		await axios.put(`/api/ebook/updatebookaudio/${id}`, audio);
		dispatch(getAllEbooks());
	} catch (error) {
		dispatch({ type: GET_BOOK_FAIL });
	}
};
