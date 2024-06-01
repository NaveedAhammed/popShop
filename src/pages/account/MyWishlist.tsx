import "./account.css";

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
		<div className="shimmerProductItem" key={i}>
			<div className="shimmerItemWrapper">
				<div className="shimmerProductImg shimmer-animation"></div>
				<div className="shimmerTextSmall shimmer-animation"></div>
				<div className="shimmerTextMedium shimmer-animation"></div>
				<div className="shimmerTextLarge shimmer-animation"></div>
			</div>
		</div>
	));

	if (isLoading) {
		return (
			<div className="myWishlist">
				<div className="wishlistWrapper">
					<div className="shimmerH1 shimmer-animation"></div>
					<div className="wishlistItems">{shimmerElements}</div>
				</div>
			</div>
		);
	}

	return (
		<div className="myWishlist">
			<div className="wishlistWrapper">
				<h1>
					My Wishlist <span>({wishlistProducts.length})</span>
				</h1>
				<div className="wishlistItems">
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
