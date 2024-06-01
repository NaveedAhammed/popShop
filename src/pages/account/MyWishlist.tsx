import styles from "./account.module.css";

import { useEffect, useState } from "react";
import { ProductType } from "../../types";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { errorHandler } from "../../utils/errorHandler";
import WishlistItem from "./WishlistItem";

const MyWishlist = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [wishlistProducts, setWishlistProducts] = useState<ProductType[]>([]);

	const axiosPrivate = useAxiosPrivate();

	useEffect(() => {
		const getWishlistProducts = () => {
			setIsLoading(true);
			axiosPrivate
				.get("/products/wishlist")
				.then((res) => {
					setWishlistProducts(res.data.data.wishlistProducts);
				})
				.catch(errorHandler)
				.finally(() => {
					setIsLoading(false);
				});
		};

		getWishlistProducts();
	}, [axiosPrivate]);

	const shimmerElements = Array.from({ length: 10 }).map((_, i) => (
		<div className={styles.shimmerProductItem} key={i}>
			<div className={styles.shimmerItemWrapper}>
				<div
					className={`${styles.shimmerProductImg} shimmer-animation`}
				></div>
				<div
					className={`${styles.shimmerTextSmall} shimmer-animation`}
				></div>
				<div
					className={`${styles.shimmerTextMedium} shimmer-animation`}
				></div>
				<div
					className={`${styles.shimmerTextLarge} shimmer-animation`}
				></div>
			</div>
		</div>
	));

	if (isLoading) {
		return (
			<div className={styles.myWishlist}>
				<div className={styles.wishlistWrapper}>
					<div
						className={`${styles.shimmerH1} shimmer-animation`}
					></div>
					<div className={styles.wishlistItems}>
						{shimmerElements}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.myWishlist}>
			<div className={styles.wishlistWrapper}>
				<h1>
					My Wishlist <span>({wishlistProducts.length})</span>
				</h1>
				<div className={styles.wishlistItems}>
					{wishlistProducts.map((product) => (
						<WishlistItem
							key={product._id}
							product={product}
							setWishlistProducts={setWishlistProducts}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default MyWishlist;
