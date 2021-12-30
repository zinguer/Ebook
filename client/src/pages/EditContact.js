import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
import { delete_user, edit_user } from "../redux/actions/actionTypes";
import "./EditContact.css";

const EditContact = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const user = useSelector((state) => state.userReducer.user);
	const errors = useSelector((state) => state.userReducer.errors);

	const [editUser, setEditUser] = useState(user);
	const [file, setFile] = useState(null);

	console.log(editUser);
	const handleUser = (e) => {
		setEditUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleEdit = (e) => {
		e.preventDefault();
		let data = new FormData();
		// data.append("name", editUser.name);
		data.append("username", editUser.username);
		data.append("email", editUser.email);
		data.append("birthday", editUser.birthday);
		data.append("phone", editUser.phone);
		data.append("profilePicture", file);
		dispatch(edit_user(data, user._id, navigate));
	};

	const handleDelete = (e) => {
		let result = window.confirm("are sure ?");
		e.preventDefault();
		if (result) {
			dispatch(delete_user(user._id));
			localStorage.removeItem("token");
			navigate("/register");
		}
	};
	return (
		<div>
			{errors &&
				errors.map((el) => (
					<div>
						<Notification error={el} />
					</div>
				))}
			<form className="editForm">
				<div className="editUserNameForm">
					<label> user name</label>
					<input
						name="username"
						type="string"
						onInput={handleUser}
						value={editUser.username}
					/>
				</div>

				<div className="editUserNameForm">
					{/* <label> name</label>
					<input
						name="name"
						type="string"
						onChange={handleUser}
						value={editUser.name}
					/> */}
				</div>

				<div className="editUserNameForm">
					<label> email</label>
					<input
						name="email"
						type="email"
						onInput={handleUser}
						value={editUser.email}
					/>
				</div>

				<div className="editUserNameForm">
					<label> phone</label>
					<input
						name="phone"
						type="number"
						onInput={handleUser}
						value={editUser.phone}
					/>
				</div>

				<div className="editUserNameForm">
					<label> birthday</label>
					<input
						name="birthday"
						type="date"
						onInput={handleUser}
						value={editUser.birthday}
					/>
				</div>

				<div className="editUserNameForm">
					<label> image</label>
					<input
						type="file"
						onChange={(e) => setFile(e.target.files[0])}
						value={user.profileImage}
					/>
				</div>

				<div className="editUserNameForm">
					<button onClick={handleEdit}>Edit</button>
					<button onClick={handleDelete}>Delete</button>
				</div>
			</form>
		</div>
	);
};

export default EditContact;
