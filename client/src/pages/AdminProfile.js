import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delete_user, getAllUsers } from "../redux/actions/actionTypes";
import {
	addAudioEbook,
	addEbook,
	addImageEbook,
	deleteEbook,
	getAllEbooks,
} from "../redux/actions/ebookActionTypes";
import { Table } from "react-bootstrap";
import "./AdminProfile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import EditEbook from "./EditEbook";
import Loading from "./Loading";

const AdminProfile = () => {
	const dispatch = useDispatch();

	const ebooks = useSelector((state) => state.ebookReducer.ebooks);
	const isLoadBooks = useSelector((state) => state.ebookReducer.isLoad);
	const isErrorBooks = useSelector((state) => state.ebookReducer.isError);

	const users = useSelector((state) => state.userReducer.users);
	const isLoadUsers = useSelector((state) => state.userReducer.isLoad);
	const isErrorUsers = useSelector((state) => state.userReducer.isError);

	// view hooks and functions

	const [books, setBooks] = useState([]); // books button
	const [allUsers, setAllUsers] = useState([]); // user button

	const handleBooks = () => {
		dispatch(getAllEbooks());
		setBooks(ebooks);
		setAllUsers("");
	};

	const handleUsers = () => {
		dispatch(getAllUsers());
		setAllUsers(users);
		setBooks("");
	};

	useEffect(() => {
		dispatch(getAllEbooks());
		dispatch(getAllUsers());
	}, [dispatch]);

	// adding book hooks and functions

	const [newBook, setNewBook] = useState({});
	const handleNewBook = (e) => {
		setNewBook({ ...newBook, [e.target.name]: e.target.value });
	};
	console.log(newBook);
	const handleAddNewBook = () => {
		dispatch(addEbook(newBook, setNewBook));
	};

	// serching
	const [search, setSearch] = useState("");
	// adding image
	const [image, setImage] = useState(null);
	// addin audio
	const [audio, setAudio] = useState(null);

	// loading

	if (isLoadBooks) {
		return <Loading />;
	}
	return (
		<div className="AdminMain">
			<div className="AdminHeader">
				<p>header</p>
				<ul className="AdminHeaderList">
					<li>
						<button onClick={handleAddNewBook}>add book</button>
					</li>
					<input
						type="text"
						placeholder="Search book by name"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</ul>
			</div>
			<div className="AdminBody">
				<div className="AdminSide">
					side
					<button onClick={handleBooks}>books</button>
					<button onClick={handleUsers}>users</button>
				</div>
				<div className="AdminCenter">
					{isLoadBooks && isLoadUsers ? (
						<p>loading ...</p>
					) : isErrorBooks && isErrorUsers ? (
						<h2>can not ...</h2>
					) : books && books ? (
						<Table
							className="ebookTable"
							responsive="sm"
							striped
							bordered
							hover
						>
							<thead>
								<tr>
									<th>#</th>
									<th>name</th>
									<th>genre</th>
									<th>language</th>
									<th>release</th>
									<th>duration</th>
									<th>description</th>
									<th>audio</th>
									<th>image</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>add line</td>
									<td>
										<input
											name="name"
											value={newBook.name}
											type="text"
											placeholder="new book name"
											onInput={handleNewBook}
										/>
									</td>
									<td>
										<input
											name="genre"
											value={newBook.genre}
											type="text"
											placeholder="new book genre"
											onInput={handleNewBook}
										/>
									</td>
									<td>
										<input
											name="language"
											value={newBook.language}
											type="text"
											placeholder="new book language"
											onInput={handleNewBook}
										/>
									</td>
									<td>
										<input
											name="release"
											value={newBook.release}
											type="number"
											placeholder="book relase year"
											onInput={handleNewBook}
										/>
									</td>
									<td>
										<input
											name="duration"
											value={newBook.duration}
											type="text"
											placeholder="new book duration"
											onInput={handleNewBook}
										/>
									</td>
									<td>
										<textarea
											name="description"
											value={newBook.description}
											type="text"
											placeholder="new book description"
											onInput={handleNewBook}
										/>
									</td>
									<td></td>
									<td></td>

									<td>
										<button onClick={handleAddNewBook}>add</button>
									</td>
								</tr>
								{ebooks
									.filter((el) =>
										el.name.toUpperCase().includes(search.toUpperCase().trim()),
									)
									.map((eB) => (
										<tr>
											<td></td>
											<td>{eB.name}</td>
											<td>{eB.genre}</td>
											<td>{eB.language}</td>
											<td>{eB.release}</td>
											<td>{eB.duration}</td>
											<td>{eB.description}</td>
											<td>
												{eB.audio ? (
													eB.audio
												) : (
													<div>
														<input
															type="file"
															onChange={(e) => setAudio(e.target.files[0])}
														/>
														<button
															onClick={(e) => {
																e.preventDefault();
																let bookAudio = new FormData();
																bookAudio.append("audio", audio);
																dispatch(addAudioEbook(bookAudio, eB._id));
															}}
														>
															confirm audio
														</button>
													</div>
												)}
											</td>
											<td>
												{eB.image ? (
													eB.image
												) : (
													<div
														style={{ display: "flex", flexDirection: "row" }}
													>
														<input
															type="file"
															onChange={(e) => setImage(e.target.files[0])}
														/>
														<button
															onClick={(e) => {
																e.preventDefault();
																let bookImage = new FormData();
																bookImage.append("image", image);
																dispatch(addImageEbook(bookImage, eB._id));
															}}
														>
															confirm image
														</button>
													</div>
												)}
											</td>

											<td style={{ display: "flex", flexDirection: "row" }}>
												<EditEbook ebook={eB} />
												<button
													onClick={() => {
														let result = window.confirm(
															`are you sure  to delete  ${eB.name} ?`,
														);
														if (result) {
															dispatch(deleteEbook(eB._id));
														}
													}}
												>
													delete
												</button>
											</td>
										</tr>
									))}
							</tbody>
						</Table>
					) : books.length ? (
						<h2>no books</h2>
					) : allUsers ? (
						<Table responsive striped bordered hover>
							<thead>
								<tr>
									<th>#</th>
									<th>user name</th>
									<th>name</th>
									<th>email</th>
									<th>birthday</th>
									<th>phone</th>
									<th>profile picture</th>
									<th>admin ?</th>
								</tr>
							</thead>
							<tbody>
								{allUsers
									.filter((el) =>
										el.username
											.toUpperCase()
											.includes(search.toUpperCase().trim()),
									)
									.map((el) => (
										<tr>
											<td>#</td>
											<td>{el.username}</td>
											<td>{el.name}</td>
											<td>{el.email}</td>
											<td>{el.birthday}</td>
											<td>{el.phone}</td>
											<td>{el.profilePicture}</td>
											<td>{el.admin.toString()}</td>
											<td>
												<button
													onClick={() => {
														let result = window.confirm("sure ?");
														if (result) {
															dispatch(delete_user(el._id));
														}
													}}
												>
													delete
												</button>
											</td>
										</tr>
									))}
							</tbody>
						</Table>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default AdminProfile;
