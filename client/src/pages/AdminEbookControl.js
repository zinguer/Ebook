import React from "react";

const AdminEbookControl = ({ book }) => {
	return (
		<div style={{ display: "flex", justifyContent: "space-around" }}>
			<p>{book.name}</p>
			<p>{book.genre}</p>
			<p>{book.language}</p>
			<p>{book.release}</p>
			<p>{book.audio}</p>
			<div style={{ display: "flex", flexDirection: "row" }}>
				<button>Edit book</button>
				<button>Delete book</button>
			</div>
		</div>
	);
};

export default AdminEbookControl;
