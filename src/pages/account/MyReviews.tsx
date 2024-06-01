import "./account.css";

import { useEffect, useState } from "react";
import MyReviewItem from "../../components/myReviewItem/MyReviewItem";
import { MyReviewType } from "../../types";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { errorHandler } from "../../utils/errorHandler";

const MyReviews = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [myReviews, setMyReviews] = useState<MyReviewType[]>([]);

	const axiosPrivate = useAxiosPrivate();

	const shimmerElements = Array.from({ length: 4 }).map((_, i) => (
		<div className="shimmerReviewItem" key={i}>
			<div className="shimmerProductImg shimmer-animation"></div>
			<div className="info">
				<div className="shimmerBrand shimmer-animation"></div>
				<div className="shimmerTitle shimmer-animation"></div>
				<div className="shimmerUserInfo">
					<div className="shimmerUsername shimmer-animation"></div>
					<div className="shimmerPostedAt shimmer-animation"></div>
				</div>
			</div>
		</div>
	));

	useEffect(() => {
		const getMyReviews = () => {
			setIsLoading(true);
			axiosPrivate
				.get("/myReviews")
				.then((res) => {
					setMyReviews(res.data.data.myReviews);
				})
				.catch(errorHandler)
				.finally(() => {
					setIsLoading(false);
				});
		};

		getMyReviews();
	}, [axiosPrivate]);

	return (
		<div className="myReviews">
			<div className="myReviewsWrapper">
				{isLoading ? (
					<div className="shimmerH1 shimmer-animation"></div>
				) : (
					<h1>
						My Reviews <span>({myReviews.length})</span>
					</h1>
				)}
				{isLoading
					? shimmerElements
					: myReviews.map((review) => (
							<MyReviewItem
								review={review}
								key={review.comment}
							/>
					  ))}
			</div>
		</div>
	);
};

export default MyReviews;
