import "./details.css";

import { GoPerson } from "react-icons/go";
import Rating from "../../components/rating/Rating";
import { ReviewType } from "../../types";
import { formatDistance } from "date-fns";

const CustomerReviewItem: React.FC<{ review: ReviewType }> = ({ review }) => {
	return (
		<div className="customerReviewItem">
			<div className="customerDetails">
				<div className="profilePic">
					{review.userId.avatar ? (
						<img
							src={review.userId.avatar}
							alt={review.userId.username}
						/>
					) : (
						<GoPerson className="userIcon" />
					)}
				</div>
				<span className="username">{review.userId.username}</span>
				<span className="postedAt">
					{formatDistance(
						new Date(Date.now()),
						new Date(review.postedAt)
					)}{" "}
					ago
				</span>
			</div>
			<div className="review">
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
