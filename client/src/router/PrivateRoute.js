import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AdminProfile from "../pages/AdminProfile";
import Profile from "../pages/Profile";

const PrivateRoute = ({ user }) => {
	const token = localStorage.getItem("token");
	const isAuth = useSelector((state) => state.userReducer.isAuth);

	// const person = useSelector((state) => state.userReducer.user);
	// let isAdmin = false;
	// if (person.role === "admin") {
	//   isAdmin = true;
	// }

	let role = false;
	if (user && user.admin) {
		role = true;
	}

	if (!token && !isAuth) {
		return <Navigate to="/login" />;
	} else if (!role) {
		return <Profile user={user} />;
	} else {
		return <AdminProfile />;
	}
};

export default PrivateRoute;
