import React from "react";
import "./Home.css";
import { Card } from "react-bootstrap";
import Carossel from "./Carossel";

import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const Home = () => {
	const ebooks = useSelector((state) => state.ebookReducer.ebooks);
	const isLoad = useSelector((state) => state.ebookReducer.isLoad);
	if (isLoad) {
		return <Loading />;
	}
	return (
		<div>
			<section className="sectionOne">
				<header>
					<h2>hello Listener</h2>
				</header>
				<div className="sectionOneBody">
					<h3>
						we created an app <br />
						where you can listen to <br />
						books
					</h3>
				</div>
			</section>
			<section className="sectionTwo">
				<header>
					<h2> how does it work ?</h2>
				</header>
				<div className="sectionTwoBody">
					<ul>
						<li>search a book</li>
						<li>listen</li>
						<li>login </li>
						<li>downlad and comment !</li>
					</ul>
				</div>
			</section>
			<section className="sectionThree">
				{ebooks.slice(2, 5).map((el) => (
					<Card className="BookCardHome">
						<h2>{el.name}</h2>
						<img
							src={`/ebookImages/${el.image}`}
							alt="Card image"
							variant="top"
						/>
						<div className="bookHomeDesx">
							<h4>{el.description}</h4>
							<audio controls controlsList="nodownload">
								<source src={`/ebookAudio/${el.audio}`} type="audio/mpeg" />
							</audio>
						</div>
					</Card>
				))}
			</section>
			<section>
				<Carossel />
			</section>
		</div>
	);
};

export default Home;
