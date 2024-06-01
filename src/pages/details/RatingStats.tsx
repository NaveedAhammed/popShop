import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Rating from "../../components/rating/Rating";
import { useAuthModal } from "../../hooks/useAuthModal";
import { useUserStore } from "../../hooks/useUserStore";
import { ReviewType } from "../../types";
import styles from "../details.module.css";

const RatingStats: React.FC<{
	numRating: number;
	reviews: ReviewType[];
	id: string;
}> = ({ numRating, reviews, id }) => {
	const totalRatings = reviews.length;
	const ratings = [0, 0, 0, 0, 0];

	const { user } = useUserStore();

	const { onOpen } = useAuthModal();

	const navigate = useNavigate();

	reviews.forEach((review) => {
		if (review.numRating <= 1) ratings[0]++;
		if (review.numRating > 1 && review.numRating <= 2) ratings[1]++;
		if (review.numRating > 2 && review.numRating <= 3) ratings[2]++;
		if (review.numRating > 3 && review.numRating <= 4) ratings[3]++;
		if (review.numRating > 4 && review.numRating <= 5) ratings[4]++;
	});

	const handleRateProduct = () => {
		if (!user) return onOpen();
		navigate(`/rate-review/product/${id}`);
	};

	return (
		<div className={styles.ratingAndReview}>
			<div className={styles.header}>
				<h2>Rating & Review</h2>
				<Button
					backgroundColor="gray"
					backgroundColorCode="100"
					color="black"
					colorCode="0"
					rounded="full"
					size="md"
					onClick={handleRateProduct}
				>
					Rate Product
				</Button>
			</div>
			<div className={styles.ratingStats}>
				<div className={styles.ratingInfo}>
					<div className={styles.numRateAndType}>
						<span className={styles.numRate}>{numRating}</span>
						<span className={styles.type}>Very Good</span>
					</div>
					<Rating
						iconSize="2rem"
						numRate={numRating}
						textSize="1.6rem"
						showNumRate={false}
					/>
					<span className={styles.numRatings}>
						{reviews.length} ratings
					</span>
				</div>
				<div className={styles.ratingBars}>
					<div className={styles.barItem}>
						<Rating
							iconSize="1.4rem"
							textSize="1.2rem"
							numRate={5}
							showNumRate={false}
						/>
						<div className={styles.bars}>
							<div className={styles.barNormal}>
								<div
									className={styles.barFill}
									style={{
										width: `${
											(ratings[4] / totalRatings) * 100
										}%`,
									}}
								></div>
							</div>
						</div>
						<div className={styles.numCount}>{ratings[4]}</div>
					</div>
					<div className={styles.barItem}>
						<Rating
							iconSize="1.4rem"
							textSize="1.2rem"
							numRate={4}
							showNumRate={false}
						/>
						<div className={styles.bars}>
							<div className={styles.barNormal}>
								<div
									className={styles.barFill}
									style={{
										width: `${
											(ratings[3] / totalRatings) * 100
										}%`,
									}}
								></div>
							</div>
						</div>
						<div className={styles.numCount}>{ratings[3]}</div>
					</div>
					<div className={styles.barItem}>
						<Rating
							iconSize="1.4rem"
							textSize="1.2rem"
							numRate={3}
							showNumRate={false}
						/>
						<div className={styles.bars}>
							<div className={styles.barNormal}>
								<div
									className={styles.barFill}
									style={{
										width: `${
											(ratings[2] / totalRatings) * 100
										}%`,
									}}
								></div>
							</div>
						</div>
						<div className={styles.numCount}>{ratings[2]}</div>
					</div>
					<div className={styles.barItem}>
						<Rating
							iconSize="1.4rem"
							textSize="1.2rem"
							numRate={2}
							showNumRate={false}
						/>
						<div className={styles.bars}>
							<div className={styles.barNormal}>
								<div
									className={styles.barFill}
									style={{
										width: `${
											(ratings[1] / totalRatings) * 100
										}%`,
									}}
								></div>
							</div>
						</div>
						<div className={styles.numCount}>{ratings[1]}</div>
					</div>
					<div className={styles.barItem}>
						<Rating
							iconSize="1.4rem"
							textSize="1.2rem"
							numRate={1}
							showNumRate={false}
						/>
						<div className={styles.bars}>
							<div className={styles.barNormal}>
								<div
									className={styles.barFill}
									style={{
										width: `${
											(ratings[0] / totalRatings) * 100
										}%`,
									}}
								></div>
							</div>
						</div>
						<div className={styles.numCount}>{ratings[0]}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RatingStats;
