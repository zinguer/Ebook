import React, { useState } from "react";

import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { edit_Ebook } from "../redux/actions/ebookActionTypes";

const EditEbook = ({ ebook }) => {
	const dispatch = useDispatch();

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [editEbook, setEditEbook] = useState(ebook);

	const handleEbook = (e) => {
		setEditEbook({ ...editEbook, [e.target.name]: e.target.value });
	};

	const handleEdit = () => {
		let result = window.confirm("are you sure ?");
		if (result) {
			dispatch(edit_Ebook(editEbook._id, editEbook));
			handleClose();
		}
	};

	return (
		<div>
			<>
				<button onClick={handleShow}>edit</button>

				<Modal
					show={show}
					onHide={handleClose}
					backdrop="static"
					keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>Edit {editEbook.name}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div style={{ display: "flex", flexDirection: "column" }}>
							<label>name</label>
							<input
								name="name"
								type="string"
								onInput={handleEbook}
								value={editEbook.name}
							/>
							<label>genre</label>
							<input
								name="genre"
								type="string"
								onInput={handleEbook}
								value={editEbook.genre}
							/>
							<label>language</label>
							<input
								name="language"
								type="string"
								onInput={handleEbook}
								value={editEbook.language}
							/>
							<label>duration</label>
							<input
								name="duration"
								type="string"
								onInput={handleEbook}
								value={editEbook.duration}
							/>
							<label>release</label>
							<input
								name="release"
								type="string"
								onInput={handleEbook}
								value={editEbook.release}
							/>
							<label>description</label>
							<input
								name="description"
								type="string"
								onInput={handleEbook}
								value={editEbook.description}
							/>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="danger" onClick={handleClose}>
							Close
						</Button>
						<Button variant="success" onClick={handleEdit}>
							edit
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		</div>
	);
};

export default EditEbook;
