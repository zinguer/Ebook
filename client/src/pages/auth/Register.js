import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/Notification";
import { register } from "../../redux/actions/actionTypes";

import "./Register.css";

const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const errors = useSelector((state) => state.userReducer.errors);

	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
	});

	const handleUser = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleRegister = (e) => {
		e.preventDefault();
		dispatch(register(user, navigate, setUser));
	};

	return (
		<div>
			{errors &&
				errors.map((el) => (
					<div>
						<Notification error={el} />
					</div>
				))}

			<div className="RegisterWrapper">
				<div id="main-wrapper" className="container">
					<div className="row justify-content-center">
						<div className="col-xl-10">
							<div className="cardcardRegister border-0">
								<div className="cardbody p-0">
									<div className="row no-gutters">
										<div className="col-lg-6">
											<div className="p-5">
												<div className="mb-5">
													<h3 className="h4 font-weight-bold text-theme">
														Register
													</h3>
												</div>

												<h6 className="h5 mb-0">Welcome to Ebook</h6>
												<p className="text-muted mt-2 mb-5">
													{/* Enter your email address and a user name and password */}
												</p>
												<form className="form-group">
													<div className="form-group">
														<label>User Name</label>
														<input
															type="text"
															className="form-control"
															required
															placeholder="Enter Your Name"
															name="username"
															onInput={handleUser}
															value={user.name}
														/>
													</div>
													<div className="form-group">
														<label>Email</label>
														<input
															type="email"
															required
															className="form-control"
															placeholder="Enter Your Email"
															name="email"
															onInput={handleUser}
															value={user.email}
														/>
													</div>

													<div className="form-group">
														<label>Password</label>
														<input
															type="password"
															required
															placeholder="Enter Your Password"
															minLength="6"
															name="password"
															className="form-control"
															id="exampleInputPassword1"
															onInput={handleUser}
															value={user.password}
														/>
													</div>
													<button
														className="btn btn-theme"
														onClick={handleRegister}
													>
														Register
													</button>
												</form>
											</div>
										</div>

										<div className="col-lg-6 d-none d-lg-inline-block">
											<div className="account-block rounded-right">
												<div className="overlay rounded-right"></div>
												<div className="account-testimonial">
													<h4 className="text-white mb-4">
														Those beautiful Ebooks are waiting!
													</h4>
													<p className="lead text-white">
														Enter your email address and a user name and
														password so you can join our community
													</p>
													<p>- Admin</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								{/* <!-- end card-body --> */}
							</div>
							<p className="textRegiter text-center mt-3 mb-0">
								you have an account?{" "}
								<a href="/login" className="text-primary ml-1">
									login
								</a>
							</p>
						</div>
						{/* <!-- end col --> */}
					</div>
					{/* <!-- Row --> */}
				</div>
			</div>
		</div>
	);
};

export default Register;
