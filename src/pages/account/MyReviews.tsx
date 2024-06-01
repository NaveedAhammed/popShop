import { useEffect, useState } from "react";
import MyReviewItem from "../../components/myReviewItem/MyReviewItem";
import styles from "./account.module.css";
import { MyReviewType } from "../../types";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { errorHandler } from "../../utils/errorHandler";

const MyReviews = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [myReviews, setMyReviews] = useState<MyReviewType[]>([]);

	const axiosPrivate = useAxiosPrivate();

	const shimmerElements = Array.from({ length: 4 }).map((_, i) => (
		<div className={styles.shimmerReviewItem} key={i}>
			<div
				className={`${styles.shimmerProductImg} shimmer-animation`}
			></div>
			<div className={styles.info}>
				<div
					className={`${styles.shimmerBrand} shimmer-animation`}
				></div>
				<div
					className={`${styles.shimmerTitle} shimmer-animation`}
				></div>
				<div className={styles.shimmerUserInfo}>
					<div
						className={`${styles.shimmerUsername} shimmer-animation`}
					></div>
					<div
						className={`${styles.shimmerPostedAt} shimmer-animation`}
					></div>
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
		<div className={styles.myReviews}>
			<div className={styles.myReviewsWrapper}>
				{isLoading ? (
					<div
						className={`${styles.shimmerH1} shimmer-animation`}
					></div>
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
