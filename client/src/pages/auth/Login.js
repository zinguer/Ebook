import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/actions/actionTypes";

import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Notification from "../../components/Notification";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const errors = useSelector((state) => state.userReducer.errors);

	const [user, setUser] = useState({
		userInput: "",
		password: "",
	});

	const handleUser = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleLogin = (e) => {
		e.preventDefault();
		dispatch(login(user, navigate));
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
														Login
													</h3>
												</div>

												<h6 className="h5 mb-0">Welcome back!</h6>
												<p className="text-muted mt-2 mb-5"></p>

												<form>
													<div className="form-group">
														<label>Email address or User Name</label>
														<input
															name="userInput"
															type="string"
															className="form-control"
															id="exampleInputEmail1"
															onInput={handleUser}
															value={user.userInput}
														/>
													</div>
													<div className="form-group mb-5">
														<label>Password</label>
														<input
															name="password"
															type="password"
															className="form-control"
															id="exampleInputPassword1"
															onInput={handleUser}
															value={user.password}
														/>
													</div>
													<button
														onClick={handleLogin}
														className="btn btn-theme"
													>
														Login
													</button>
													{/* <a
                            href="#l"
                            className="forgot-link float-right text-primary"
                          >
                            Forgot password?
                          </a> */}
												</form>
											</div>
										</div>

										<div className="col-lg-6 d-none d-lg-inline-block">
											<div className="account-block rounded-right">
												<div className="overlay rounded-right"></div>
												<div className="account-testimonial">
													<h4 className="text-white mb-4">
														Thank you for comming back !
													</h4>
													<p className="lead text-white">
														"More an more audio books are waiting dor you to be
														heard."
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
								Don't have an account?{" "}
								<a href="/register" className="text-primary ml-1">
									register
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

export default Login;
