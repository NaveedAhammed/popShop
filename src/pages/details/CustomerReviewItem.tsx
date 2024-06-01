import { GoPerson } from "react-icons/go";
import Rating from "../../components/rating/Rating";
import { ReviewType } from "../../types";
import styles from "./details.module.css";
import { formatDistance } from "date-fns";

const CustomerReviewItem: React.FC<{ review: ReviewType }> = ({ review }) => {
	return (
		<div className={styles.customerReviewItem}>
			<div className={styles.customerDetails}>
				<div className={styles.profilePic}>
					{review.userId.avatar ? (
						<img
							src={review.userId.avatar}
							alt={review.userId.username}
						/>
					) : (
						<GoPerson className={styles.userIcon} />
					)}
				</div>
				<span className={styles.username}>
					{review.userId.username}
				</span>
				<span className={styles.postedAt}>
					{formatDistance(
						new Date(Date.now()),
						new Date(review.postedAt)
					)}{" "}
					ago
				</span>
			</div>
			<div className={styles.review}>
				<Rating
					iconSize="1.6rem"
					numRate={review.numRating}
					textSize="1.3rem"
				/>
				<p>{review.comment}</p>
			</div>
		</div>
	);
};

export default CustomerReviewItem;
