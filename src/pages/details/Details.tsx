import styles from "../details.module.css";

import { useEffect, useRef, useState } from "react";
import Button from "../../components/button/Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { PiHeartFill, PiHeartStraightDuotone } from "react-icons/pi";
import Rating from "../../components/rating/Rating";

import bag from "../../assets/bag-white.svg";
import { useNavigate, useParams } from "react-router-dom";
import publicAxios from "../../utils/axios";
import { ProductType, UserType } from "../../types";
import { errorHandler } from "../../utils/errorHandler";
import { currencyFormatter } from "../../utils/currencyFormat";
import Products from "../../components/products/Products";
import RatingStats from "./RatingStats";
import CustomerReviewItem from "./CustomerReviewItem";
import { useUserStore } from "../../hooks/useUserStore";
import { useAuthModal } from "../../hooks/useAuthModal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loader from "../../components/loader/Loader";
import toast from "react-hot-toast";

const Details = () => {
	const [prevBtnVisible, setPrevBtnVisible] = useState(false);
	const [nextBtnVisible, setNextBtnVisible] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [isSimilarLoading, setIsSimilarLoading] = useState(true);
	const [isLoadingCart, setIsLoadingCart] = useState(false);
	const [product, setProduct] = useState<ProductType | null>(null);
	const [similarProducts, setSimilarProducts] = useState<ProductType[]>([]);
	const [wishlistLoading, setWishlistLoading] = useState(false);

	const { id } = useParams();

	const { user, setUser } = useUserStore();
	const { onOpen } = useAuthModal();

	const axiosPrivate = useAxiosPrivate();

	const isInWishlist = user?.wishlistIds?.includes(id as string);
	const isInCart = user?.cart
		?.map((it) => it.productId)
		.includes(id as string);

	const [isAddedtoWishlist, setIsAddedtoWishlist] = useState(isInWishlist);

	const sliderRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();

	const scroll = (dir: string) => {
		if (sliderRef.current) {
			const firstElementChildWidth = sliderRef.current.firstElementChild
				? sliderRef.current.firstElementChild?.clientWidth
				: 0;
			console.log(
				sliderRef.current.offsetWidth,
				sliderRef.current.scrollLeft
			);
			if (dir === "next") {
				sliderRef.current.scrollTo({
					left: sliderRef.current.scrollLeft + firstElementChildWidth,
				});
			}
			if (dir === "prev") {
				sliderRef.current.scrollTo({
					left: sliderRef.current.scrollLeft - firstElementChildWidth,
				});
			}
		}
	};

	const handleOnScroll = (ele: React.UIEvent<HTMLDivElement, UIEvent>) => {
		if (ele.currentTarget.scrollLeft <= 0) {
			setPrevBtnVisible(false);
		} else {
			setPrevBtnVisible(true);
		}
		if (
			ele.currentTarget.scrollWidth - ele.currentTarget.scrollLeft - 20 <=
			ele.currentTarget.clientWidth
		) {
			setNextBtnVisible(false);
		} else {
			setNextBtnVisible(true);
		}
	};

	const handleAddOrRemoveWishlistId = () => {
		if (!user) {
			return onOpen();
		}
		setWishlistLoading(true);
		axiosPrivate
			.post(`/user/wishlist/${product?._id}`)
			.then((res) => {
				setIsAddedtoWishlist((prev) => !prev);
				const newUser: UserType = {
					...user,
					wishlistIds: res.data.data.user.wishlistIds,
				};
				setUser(newUser);
			})
			.catch(errorHandler)
			.finally(() => {
				setWishlistLoading(false);
			});
	};

	const handleAddToCart = () => {
		if (!user) {
			return onOpen();
		}
		const formData = new FormData();
		formData.append("quantity", "1");
		setIsLoadingCart(true);
		axiosPrivate
			.post(`/user/cart/add/${product?._id}`, formData)
			.then((res) => {
				if (!res.data.success) {
					return toast.error(
						"Adding to cart failed, Please try again"
					);
				}
				const newUser: UserType = {
					...user,
					cart: res.data.data.user.cart,
				};
				setUser(newUser);
				return navigate("/shopping-bag");
			})
			.catch(errorHandler)
			.finally(() => {
				setIsLoadingCart(false);
			});
	};

	useEffect(() => {
		const getProductDetails = () => {
			setIsLoading(true);
			publicAxios
				.get(`/products/${id}`)
				.then((res) => {
					setProduct(res.data.data.product);
				})
				.catch(errorHandler)
				.finally(() => {
					setIsLoading(false);
				});
		};

		getProductDetails();
	}, [id]);

	useEffect(() => {
		const getSimilarProduct = () => {
			setIsSimilarLoading(true);
			publicAxios
				.get(
					`/products/similar/${product?.category._id}?productId=${product?._id}`
				)
				.then((res) => {
					setSimilarProducts(res.data.data.similarProducts);
				})
				.catch(errorHandler)
				.finally(() => {
					setIsSimilarLoading(false);
				});
		};

		product?.category._id && getSimilarProduct();
	}, [product?.category._id, product?._id]);

	if (isLoading || isSimilarLoading) {
		return (
			<div className={styles.details}>
				<div className="container">
					<div className={styles.wrapper}>
						<div className={styles.left}>
							<div
								className={`${styles.shimmerProductImg} shimmer-animation`}
							></div>
						</div>
						<div className={styles.right}>
							<div
								className={`${styles.shimmerTextVerySmall} shimmer-animation`}
								style={{ marginBottom: "2rem" }}
							></div>
							<div
								className={`${styles.shimmerTextLarge} shimmer-animation`}
							></div>
							<div
								className={`${styles.shimmerTextLarge} shimmer-animation`}
								style={{ marginBottom: "3rem" }}
							></div>
							<div
								className={`${styles.shimmerTextVerySmall} shimmer-animation`}
							></div>
							<div
								className={`${styles.shimmerTextMedium} shimmer-animation`}
								style={{ marginBottom: "3rem" }}
							></div>
							<div
								className={`${styles.shimmerTextVerySmall} shimmer-animation`}
							></div>
							<div
								className={`${styles.shimmerTextLarge} shimmer-animation`}
							></div>
							<div
								className={`${styles.shimmerTextLarge} shimmer-animation`}
							></div>
							<div
								className={`${styles.shimmerTextLarge} shimmer-animation`}
							></div>
						</div>
					</div>
					<Products
						products={similarProducts}
						isLoading={isSimilarLoading}
						heading="Similar Products"
					/>
				</div>
			</div>
		);
	}

	return (
		<div className={`container ${styles.details}`}>
			{product && (
				<div className={styles.wrapper}>
					<div className={styles.left}>
						<div className={styles.productImgs}>
							<div
								className={`${styles.arrowIcon} ${
									styles.arrowIconLeft
								} ${
									prevBtnVisible
										? styles.active
										: styles.inactive
								}`}
							>
								<Button
									backgroundColor="white"
									backgroundColorCode="0"
									color="black"
									colorCode="0"
									rounded="full"
									size="icon"
									borderWidth="100"
									borderColor="gray"
									borderColorCode="100"
									shadow="normal"
									style={{
										width: "3.6rem",
										height: "3.6rem",
										padding: "0.4rem",
									}}
									onClick={() => scroll("prev")}
								>
									<IoIosArrowBack />
								</Button>
							</div>
							<div
								className={`${styles.arrowIcon} ${
									styles.arrowIconRight
								} ${
									nextBtnVisible
										? styles.active
										: styles.inactive
								}`}
							>
								<Button
									backgroundColor="white"
									backgroundColorCode="0"
									color="black"
									colorCode="0"
									rounded="full"
									size="icon"
									borderWidth="100"
									borderColor="gray"
									borderColorCode="100"
									shadow="normal"
									style={{
										width: "3.6rem",
										height: "3.6rem",
										padding: "0.4rem",
									}}
									onClick={() => scroll("next")}
								>
									<IoIosArrowForward />
								</Button>
							</div>
							<div
								className={styles.imgsSlider}
								ref={sliderRef}
								onScroll={handleOnScroll}
							>
								{product.images.map((img) => (
									<div className={styles.img} key={img._id}>
										<img src={img.url} alt="" />
									</div>
								))}
							</div>
							<div className={styles.heartIcon}>
								{wishlistLoading ? (
									<Loader
										color="black"
										height="2rem"
										width="2rem"
									/>
								) : isAddedtoWishlist ? (
									<PiHeartFill
										className={styles.heartFill}
										onClick={handleAddOrRemoveWishlistId}
									/>
								) : (
									<PiHeartStraightDuotone
										onClick={handleAddOrRemoveWishlistId}
									/>
								)}
							</div>
						</div>
					</div>
					<div className={styles.right}>
						<span className={styles.productBrand}>
							{product.brand}
						</span>
						<div className={styles.productTitle}>
							{product.title}
						</div>
						{product.numRating ? (
							<Rating
								iconSize="1.6rem"
								numRate={product.numRating}
								textSize="1.3rem"
								reviewsCount={product.reviews.length}
							/>
						) : null}
						<div className={styles.productPrice}>
							<span className={styles.originalPrice}>
								{
									currencyFormatter
										.format(product.price)
										.split(".")[0]
								}
							</span>
							<span className={styles.discountPrice}>
								{
									currencyFormatter
										.format(
											(product?.price *
												(100 - product.discount)) /
												100
										)
										.split(".")[0]
								}
							</span>
							<span className={styles.discount}>
								{product.discount}% Off
							</span>
						</div>
						<div className={styles.productInfo}>
							{product.unit && (
								<div className={styles.item}>
									<span className={styles.key}>
										{product.unit.name}:
									</span>
									<span className={styles.value}>
										{product.unit.value}
									</span>
								</div>
							)}
							<div className={styles.item}>
								<span className={styles.key}>Category:</span>
								<span className={styles.value}>
									{product.category.name}
								</span>
							</div>
							{product.color && (
								<div className={styles.item}>
									<span className={styles.key}>Color:</span>
									<div
										className={styles.color}
										style={{
											backgroundColor: `${product.color.value}`,
										}}
									></div>
								</div>
							)}
						</div>
						<div className={styles.productDesc}>
							<span>Decription</span>
							<p>{product.description}</p>
						</div>
						<div className={styles.stockStatus}>In stock</div>
						<div className={styles.addToBag}>
							{!isInCart && (
								<Button
									backgroundColor="primary"
									backgroundColorCode="600"
									color="white"
									colorCode="0"
									size="lg"
									rounded="full"
									onClick={handleAddToCart}
								>
									{isLoadingCart && (
										<Loader
											width="1rem"
											height="1rem"
											color="white"
										/>
									)}
									{isLoadingCart
										? "Going to Bag..."
										: "Add to Bag"}
									<img
										src={bag}
										alt=""
										style={{
											width: "2rem",
											height: "2rem",
										}}
									/>
								</Button>
							)}
							{isInCart && (
								<Button
									backgroundColor="primary"
									backgroundColorCode="600"
									color="white"
									colorCode="0"
									size="lg"
									rounded="full"
									onClick={() => navigate("/shopping-bag")}
								>
									<span>Go to Bag</span>
									<img
										src={bag}
										alt=""
										style={{
											width: "2rem",
											height: "2rem",
										}}
									/>
								</Button>
							)}
						</div>
						{product && product.reviews.length > 0 && (
							<RatingStats
								numRating={product.numRating || 0}
								reviews={product.reviews}
								id={id as string}
							/>
						)}
					</div>
				</div>
			)}
			{similarProducts.length > 0 && (
				<Products
					products={similarProducts}
					isLoading={isLoading || isSimilarLoading}
					heading="Similar Products"
				/>
			)}
			{product?.reviews && (
				<div className={styles.customerReviews}>
					<h2 className={styles.heading}>Customer Reviews</h2>
					{product.reviews.map((review) => (
						<CustomerReviewItem key={review._id} review={review} />
					))}
				</div>
			)}
		</div>
	);
};

export default Details;
