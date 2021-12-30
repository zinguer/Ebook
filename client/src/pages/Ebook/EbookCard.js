import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import "./EbookCard.css";

const EbookCard = ({ ebook }) => {
	const thebook = useSelector((state) => state.ebookReducer.ebook);
	const isLoad = useSelector((state) => state.ebookReducer.isLoad);
	const isError = useSelector((state) => state.ebookReducer.isError);

	const isAuth = useSelector((state) => state.userReducer.isAuth);

	return (
		<div>
			{isLoad ? (
				<Loading />
			) : isError ? (
				<p>ERROR !</p>
			) : thebook ? (
				<div className="mainCardDiv">
					<div className="cards_item">
						<div className="bookCard">
							<div className="card_image">
								<img
									className="EbookCardImage"
									src={ebook.image ? `/ebookImages/${ebook.image}` : null}
									alt=""
								/>
								{ebook.audio ? (
									<audio controls controlsList={!isAuth ? "nodownload" : ""}>
										<source
											src={`/ebookAudio/${ebook.audio}`}
											type="audio/mpeg"
										/>
									</audio>
								) : (
									<p>no audio</p>
								)}
							</div>
							<div class="card_content">
								<h2 class="card_title">{ebook.name}</h2>
								<p class="card_text">{ebook.description}</p>
								<div>
									<Link to={`/ebook/${ebook._id}`}>
										<button class="btnCard card_btn">Read More</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default EbookCard;
