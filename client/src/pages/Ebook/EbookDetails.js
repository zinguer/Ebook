import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./EbookDetails.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { getEbook } from "../../redux/actions/ebookActionTypes";
import Loading from "../Loading";
import Comments from "./Comments";
import { Link } from "react-router-dom";

const EbookDetails = () => {
	const params = useParams();

	const dispatch = useDispatch();

	// books
	const ebook = useSelector((state) => state.ebookReducer.ebook);
	const isLoad = useSelector((state) => state.ebookReducer.isLoad);
	const isError = useSelector((state) => state.ebookReducer.isError);

	// user
	const isAuth = useSelector((state) => state.userReducer.isAuth);

	useEffect(() => {
		if (params.id) {
			dispatch(getEbook(params.id));
		}
	}, [dispatch, params]);
	//   $(".profile").addClass("pre-enter");
	// setTimeout(function () {
	// 	$(".profile").addClass("on-enter");
	// }, 500);
	// setTimeout(function () {
	// 	$(".profile").removeClass("pre-enter on-enter");
	// }, 3000);

	return (
		<div>
			{isLoad ? (
				<Loading />
			) : isError ? (
				<p>ERROR !</p>
			) : ebook ? (
				<div className="detailsContainer">
					<main className="profile" ontouchstart>
						<div className="background"></div>
						<div
							className="avatar"
							style={{
								background: `url(/ebookImages/${ebook.image}) no-repeat top center/cover`,
								opacity: "0.75",
							}}
						></div>
						<section className="info">
							<h1>{ebook.name}</h1>
							<h2>{ebook.genre}</h2>
							<a className="follow" href="/ebooks">
								+ Follow
							</a>
							<ul>
								<li>
									<h5 className="link portfolio">{ebook.language}</h5>
								</li>
								<li>
									<h5 className="link codepen">{ebook.release}</h5>
								</li>
								<li>
									<h5 className="link github">{ebook.duration}</h5>
								</li>
							</ul>
							<div>
								<p>{ebook.description}</p>
							</div>

							<AudioPlayer
								src={
									ebook.audio
										? `/ebookAudio/${ebook.audio}`
										: "ebookAudio/audio1.mp3"
								}
							/>
							{isAuth ? (
								<Comments id={params.id} />
							) : (
								<Link to="/login" style={{ marginTop: "10%" }}>
									<p>login to see comments</p>
								</Link>
							)}
						</section>
					</main>
				</div>
			) : null}
		</div>
	);
};

export default EbookDetails;
