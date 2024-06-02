import "./customRating.css";

import { FaStar, FaRegStar } from "react-icons/fa";

const CustomRating: React.FC<{
	rating: number | undefined;
	tempRating: number;
	setRating: React.Dispatch<React.SetStateAction<number>>;
	setTempRating: React.Dispatch<React.SetStateAction<number>>;
	setIsValidRate: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ rating, tempRating, setRating, setTempRating, setIsValidRate }) => {
	const ratingMeanings = ["Awful", "Poor", "Average", "Good", "Amazing"];

	return (
		<div className="customRating">
			<span>Rate this product</span>
			<div className="stars">
				{Array.from({ length: 5 }, (_, i) => (
					<Star
						onRate={() => {
							setRating(i + 1);
							setIsValidRate(true);
						}}
						full={
							tempRating
								? tempRating >= i + 1
								: rating
								? rating >= i + 1
								: false
						}
						onHoverIn={() => {
							setTempRating(i + 1);
							setIsValidRate(true);
						}}
						onHoverOut={() => setTempRating(0)}
						key={i}
					/>
				))}
				<span className="numRating">{tempRating || rating || ""}</span>
				{tempRating || rating ? (
					<span className="ratingMeaning">
						{tempRating
							? ratingMeanings[tempRating - 1]
							: rating
							? ratingMeanings[rating - 1]
							: ""}
					</span>
				) : null}
			</div>
		</div>
	);
};

const Star: React.FC<{
	onRate: () => void;
	full: boolean;
	onHoverIn: () => void;
	onHoverOut: () => void;
}> = ({ onRate, full, onHoverIn, onHoverOut }) => {
	return full ? (
		<FaStar
			onMouseEnter={onHoverIn}
			onMouseLeave={onHoverOut}
			size={45}
			className="star starFill"
			onClick={onRate}
		/>
	) : (
		<FaRegStar
			size={45}
			onClick={onRate}
			onMouseEnter={onHoverIn}
			onMouseLeave={onHoverOut}
			className="star starNormal"
		/>
	);
};

export default CustomRating;
