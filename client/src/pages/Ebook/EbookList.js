import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEbooks } from "../../redux/actions/ebookActionTypes";
import Loading from "../Loading";

import EbookCard from "./EbookCard";

const EbookList = () => {
	const ebooks = useSelector((state) => state.ebookReducer.ebooks);
	const isLoad = useSelector((state) => state.ebookReducer.isLoad);
	// const isError = useSelector((state) => state.ebookReducer.isError);

	const [search, setSearch] = useState("");

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllEbooks());
	}, [dispatch]);
	if (isLoad) {
		return <Loading />;
	}

	// console.log("ebook 2", ebooks[0].name);

	// searching

	return (
		<div>
			{isLoad ? (
				<Loading />
			) : ebooks ? (
				<div
					style={{
						display: "flex",

						flexDirection: "column",
						justifyContent: "space-evenly",
						alignItems: "center",
						background:
							"linear-gradient(0deg, rgba(140, 48, 48, 1), rgba(0, 0, 0, 0) 70%) ,linear-gradient(90deg,#6b75b3 , rgba(0, 255, 0, 0) 100%),linear-gradient(180deg, rgba(35, 51, 132, 1), rgba(0, 0, 255, 0) 70%) ",
						minHeight: "585px",
						backgroundSize: "100%",
					}}
				>
					<input
						style={{
							width: "50%",
							textAlign: "center",
							borderRadius: "5px",
							margin: "2%",
							backgroundColor: "transparent",
							color: "white",
						}}
						placeholder="search e book "
						type="text"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							padding: "2% , 2% , 2% , 5%",
						}}
					>
						{ebooks
							.filter((el) =>
								el.name.toLowerCase().includes(search.toLowerCase().trim()),
							)
							.map((el) => (
								<EbookCard ebook={el} />
							))}
					</div>
				</div>
			) : ebooks.length ? (
				<h2>no books</h2>
			) : null}
		</div>
	);
};

export default EbookList;
