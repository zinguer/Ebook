import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import EbookList from "./Ebook/EbookList";
import EditContact from "./EditContact";
import Loading from "./Loading";
import "./Profile.css";

const Profile = () => {
	const loadUser = useSelector((state) => state.userReducer.isLoad);
	const errors = useSelector((state) => state.userReducer.errors);
	const ebooks = useSelector((state) => state.ebookReducer.ebooks);

	const user = useSelector((state) => state.userReducer.user);
	console.log("ebook", ebooks);

	if (loadUser) {
		return <Loading />;
	}

	return (
		<div>
			{errors ? errors.map((error) => <p>{error}</p>) : <></>}
			{
				<div>
					{loadUser ? (
						<Loading />
					) : user ? (
						<div className="container-profile">
							<main>
								<div className="row">
									<div className="left col-lg-4">
										<div className="photo-left">
											<img
												className="photo"
												src={
													user.profilePicture
														? `imageupload/${user.profilePicture}`
														: "https://eshendetesia.com/images/user-profile.png"
												}
												alt="profile"
											/>
										</div>
										<h4 className="name">{user.username}</h4>
										<p className="userInfo">{user.name}</p>
										<p className="userInfo">{user.email}</p>
										<p className="userInfo">
											{user.birthday ? (
												user.birthday.split("T00:00:00.000Z")
											) : (
												<></>
											)}
										</p>
										<p className="userInfo">
											{user.phone ? user.phone : "phone number :"}
										</p>

										<div className="stats row">
											<div
												className="stat col-xs-4"
												style={{ paddingRight: "50px" }}
											>
												<p className="number-stat">3,619</p>
												<p className="desc-stat">liked books</p>
											</div>
											<div className="stat col-xs-4">
												<p className="number-stat">42</p>
												<p className="desc-stat">Following</p>
											</div>
											<div
												className="stat col-xs-4"
												style={{ paddingLeft: "50px" }}
											>
												<p className="number-stat">38</p>
												<p className="desc-stat">downloads</p>
											</div>
										</div>
										{/* <p className="desc">
											Hi ! My name is Jane Doe. I'm a UI/UX Designer from Paris,
											in France. I really enjoy photography and mountains.
										</p> */}
									</div>
									<div className="right col-lg-8">
										<ul className="nav">
											<Link to="ebooks" style={{ textDecoration: "none" }}>
												<li>Gallery</li>
											</Link>
											<li>Collections</li>
											<li>Groups</li>

											<li>
												<Link
													style={{ textDecoration: "none" }}
													to={`edituser/${user._id}`}
												>
													Edit
												</Link>
											</li>
										</ul>

										<div className="row gallery">
											<Routes>
												<Route path="edituser/:is" element={<EditContact />} />

												<Route path="/ebooks" element={<EbookList />} />
											</Routes>
										</div>
									</div>
								</div>
							</main>
						</div>
					) : null}
				</div>
			}
		</div>
	);
};

export default Profile;
