import React, { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { clearErrors } from "../redux/actions/actionTypes";

const Notification = ({ error }) => {
	const dispatch = useDispatch();
	const [show, setShow] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setShow(false);
			dispatch(clearErrors());
		}, 3000);
	}, [dispatch]);

	return (
		<ToastContainer position="bottom-start">
			<Toast
				onClose={() => setShow(false)}
				show={show}
				delay={3000}
				autohide
				style={{
					backgroundColor:
						"linear-gradient(0deg, rgba(140, 48, 48, 1), rgba(0, 0, 0, 0) 70%) ,linear-gradient(90deg, rgba(56, 72, 100, 1), rgba(0, 255, 0, 0) 70%),linear-gradient(180deg, rgba(35, 51, 132, 1), rgba(0, 0, 255, 0) 70%) ",
				}}
			>
				<Toast.Header>
					<img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
					<strong className="me-auto">ERROR</strong>
					<small className="text-muted">just now</small>
				</Toast.Header>
				<Toast.Body>{error.msg}</Toast.Body>
			</Toast>
		</ToastContainer>
	);
};

export default Notification;
