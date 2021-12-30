import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useDispatch, useSelector } from "react-redux";
import { current } from "./redux/actions/actionTypes";
import PrivateRoute from "./router/PrivateRoute";
import EbookList from "./pages/Ebook/EbookList";
import Navbar from "./components/Navbar";
import EbookDetails from "./pages/Ebook/EbookDetails";
import { getAllEbooks } from "./redux/actions/ebookActionTypes";
import Loading from "./pages/Loading";
const App = () => {
	const isLoad = useSelector((state) => state.ebookReducer.isLoadoad);
	const user = useSelector((state) => state.userReducer.user);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(current());

		dispatch(getAllEbooks());
	}, [dispatch]);

	if (isLoad) {
		<Loading />;
	}

	return (
		<div>
			<Navbar user={user} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				<Route path="/profile/*" element={<PrivateRoute user={user} />} />
				<Route path="/ebooks" element={<EbookList />} />
				<Route path="/admin" element={<PrivateRoute user={user} />} />
				<Route path="/ebook/:id" element={<EbookDetails />} />
				{/* <Route path="/*" element={<Error />} /> */}
			</Routes>
		</div>
	);
};

export default App;
