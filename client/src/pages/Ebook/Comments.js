import React, { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	getComments,
	addComment,
} from "../../redux/actions/commentActionTypes";
import "./Comments.css";

const Comments = ({ id }) => {
	const params = useParams;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getComments(id));
	}, [dispatch, params, id]);

	// comment section
	const comments = useSelector((state) => state.commentReducer.comments);

	// ading comment

	const [comment, setComment] = useState("");

	const addTheComment = () => {
		dispatch(addComment(comment, id));
		setComment("");
	};

	// off canvas

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// if (isLoad) {
	// 	return <Loading />;
	// }
	return (
		<div>
			<>
				<button className="lunchButton" onClick={handleShow}>
					Show comments
				</button>

				<Offcanvas show={show} onHide={handleClose}>
					<Offcanvas.Header
						closeButton
						closeVariant="white"
						className="canvasHeader"
					>
						<Offcanvas.Title>Comments</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body className="canvasBody">
						<div className="addComment">
							<input
								className="commentInput"
								type="text"
								placeholder="add your comment"
								onChange={(e) => setComment(e.target.value)}
								value={comment}
							/>
							<button onClick={addTheComment}>+</button>
						</div>
						<div className="allComments">
							<h3 className="allCOmmentsHeader"> The Comments</h3>
							{comments.map((el) => (
								<div className="commentSection">
									<h5>{el.description}</h5>
									<p>{el.date ? el.date.slice(0, 10) : null}</p>
								</div>
							))}
						</div>
					</Offcanvas.Body>
				</Offcanvas>
			</>
		</div>
	);
};

export default Comments;
