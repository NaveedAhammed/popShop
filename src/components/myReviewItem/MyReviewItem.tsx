import "./myReviewItem.css";

import Button from "../button/Button";
import { TbEdit } from "react-icons/tb";
import { IoTrashOutline } from "react-icons/io5";
import Rating from "../rating/Rating";
import { MyReviewType } from "../../types";
import { useUserStore } from "../../hooks/useUserStore";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const MyReviewItem: React.FC<{
	review: MyReviewType;
	handleDelete: (productId: string) => void;
}> = ({ review, handleDelete }) => {
	const { user } = useUserStore();
	const navigate = useNavigate();

	return (
		<div className="myReviewItem">
			<div className="productImg">
				<img
					src={review.productId.images[0].url}
					alt={review.productId.title}
				/>
			</div>
			<div className="info">
				<span className="productBrand">{review.productId.brand}</span>
				<div className="productTitle">{review.productId.title}</div>
				<div className="rating">
					<Rating
						numRate={review.numRating}
						iconSize="1.3rem"
						textSize="1.1rem"
					/>
					<p>{review.comment}</p>
				</div>
				<div className="userInfo">
					<span className="username">{user?.username}</span>
					<span className="postedDate">
						{dayjs(review.postedAt?.split("T")[0]).format(
							"MMM D, YYYY"
						)}
					</span>
					<div className="minActions">
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
							onClick={() => handleDelete(review.productId._id)}
						>
							<IoTrashOutline />
						</Button>
					</div>
				</div>
			</div>
			<div className="actions">
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
					onClick={() => handleDelete(review.productId._id)}
				>
					Delete
				</Button>
			</div>
		</div>
	);
};

export default MyReviewItem;
