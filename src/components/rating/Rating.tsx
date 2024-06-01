import "./rating.css";

import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Rating: React.FC<{
	numRate: number;
	iconSize: string;
	textSize: string;
	showNumRate?: boolean;
	reviewsCount?: number;
}> = ({ numRate, iconSize, textSize, showNumRate = true, reviewsCount }) => {
	return (
		<div className="rating" style={{ fontSize: `${iconSize}` }}>
			{numRate >= 1 ? (
				<Star type="full" />
			) : numRate > 0 && numRate < 1 ? (
				<Star type="half" />
			) : (
				<Star type="reg" />
			)}
			{numRate >= 2 ? (
				<Star type="full" />
			) : numRate > 1 && numRate < 2 ? (
				<Star type="half" />
			) : (
				<Star type="reg" />
			)}
			{numRate >= 3 ? (
				<Star type="full" />
			) : numRate > 2 && numRate < 3 ? (
				<Star type="half" />
			) : (
				<Star type="reg" />
			)}
			{numRate >= 4 ? (
				<Star type="full" />
			) : numRate > 3 && numRate < 4 ? (
				<Star type="half" />
			) : (
				<Star type="reg" />
			)}
			{numRate >= 5 ? (
				<Star type="full" />
			) : numRate > 4 && numRate < 5 ? (
				<Star type="half" />
			) : (
				<Star type="reg" />
			)}
			{showNumRate && (
				<span
					className="numReviews"
					style={{ fontSize: `${textSize}` }}
				>
					({numRate})
				</span>
			)}
			{reviewsCount && (
				<span
					className="reviewsCount"
					style={{ fontSize: `${textSize}` }}
				>
					{reviewsCount} reviews
				</span>
			)}
		</div>
	);
};

const Star: React.FC<{ type: "full" | "half" | "reg" }> = ({ type }) => {
	return (
		<>
			{type === "full" ? (
				<FaStar className="star" />
			) : type === "half" ? (
				<FaStarHalfAlt className="star" />
			) : (
				<FaRegStar className="star" />
			)}
		</>
	);
};

export default Rating;
