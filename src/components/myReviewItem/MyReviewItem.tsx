import styles from "./myReviewItem.module.css";

import Button from "../button/Button";
import { TbEdit } from "react-icons/tb";
import { IoTrashOutline } from "react-icons/io5";
import Rating from "../rating/Rating";
import { MyReviewType } from "../../types";
import { useUserStore } from "../../hooks/useUserStore";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const MyReviewItem: React.FC<{ review: MyReviewType }> = ({ review }) => {
	const { user } = useUserStore();
	const navigate = useNavigate();

	return (
		<div className={styles.myReviewItem}>
			<div className={styles.productImg}>
				<img
					src={review.productId.images[0].url}
					alt={review.productId.title}
				/>
			</div>
			<div className={styles.info}>
				<span className={styles.productBrand}>
					{review.productId.brand}
				</span>
				<div className={styles.productTitle}>
					{review.productId.title}
				</div>
				<div className={styles.rating}>
					<Rating
						numRate={review.numRating}
						iconSize="1.3rem"
						textSize="1.1rem"
					/>
					<p>{review.comment}</p>
				</div>
				<div className={styles.userInfo}>
					<span className={styles.username}>{user?.username}</span>
					<span className={styles.postedDate}>
						{dayjs(review.postedAt?.split("T")[0]).format(
							"MMM D, YYYY"
						)}
					</span>
					<div className={styles.minActions}>
						<Button
							backgroundColor="gray"
							backgroundColorCode="100"
							color="black"
							colorCode="0"
							rounded="md"
							size="icon"
							onClick={() =>
								navigate(
									`/rate-review/product/${review.productId._id}`
								)
							}
						>
							<TbEdit />
						</Button>
						<Button
							backgroundColor="red"
							backgroundColorCode="500"
							color="white"
							colorCode="0"
							rounded="md"
							size="icon"
						>
							<IoTrashOutline />
						</Button>
					</div>
				</div>
			</div>
			<div className={styles.actions}>
				<Button
					backgroundColor="gray"
					backgroundColorCode="100"
					color="black"
					colorCode="0"
					rounded="md"
					size="sm"
					onClick={() =>
						navigate(`/rate-review/product/${review.productId._id}`)
					}
				>
					<span>Edit</span>
				</Button>
				<Button
					backgroundColor="red"
					backgroundColorCode="500"
					color="white"
					colorCode="0"
					rounded="md"
					size="sm"
				>
					Delete
				</Button>
			</div>
		</div>
	);
};

export default MyReviewItem;
