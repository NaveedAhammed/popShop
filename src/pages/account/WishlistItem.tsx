import styles from "./account.module.css";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { PiHeartFill, PiHeartStraightDuotone } from "react-icons/pi";

import { useRef, useState } from "react";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { FaPercent } from "react-icons/fa";
import { ProductType, UserType } from "../../types";
import { currencyFormatter } from "../../utils/currencyFormat";
import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import Rating from "../../components/rating/Rating";
import { useUserStore } from "../../hooks/useUserStore";
import { useAuthModal } from "../../hooks/useAuthModal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { errorHandler } from "../../utils/errorHandler";
import Loader from "../../components/loader/Loader";

const WishlistItem: React.FC<{
	product: ProductType;
	setWishlistProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
}> = ({ product, setWishlistProducts }) => {
	const [prevBtnVisible, setPrevBtnVisible] = useState(false);
	const [nextBtnVisible, setNextBtnVisible] = useState(true);
	const [wishlistLoading, setWishlistLoading] = useState(false);

	const { user, setUser } = useUserStore();
	const { onOpen } = useAuthModal();

	const axiosPrivate = useAxiosPrivate();

	const isInWishlist = user?.wishlistIds?.includes(product._id);

	const [isAddedtoWishlist, setIsAddedtoWishlist] = useState(isInWishlist);

	const sliderRef = useRef<HTMLDivElement>(null);

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
			ele.currentTarget.scrollWidth - ele.currentTarget.scrollLeft - 5 <=
			ele.currentTarget.clientWidth
		) {
			setNextBtnVisible(false);
		} else {
			setNextBtnVisible(true);
		}
	};

	const removeWishlistId = () => {
		if (!user) {
			return onOpen();
		}
		setWishlistLoading(true);
		axiosPrivate
			.post(`/user/wishlist/${product?._id}`)
			.then((res) => {
				setIsAddedtoWishlist((prev) => !prev);
				setWishlistProducts((prev) =>
					prev.filter((it) => it._id !== product._id)
				);
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

	return (
		<div className={styles.productItem}>
			<div className={styles.itemWrapper}>
				<div className={styles.productImgs}>
					<div className={styles.discountTag}>
						<span>{product.discount}</span>
						<FaPercent className={styles.percentIcon} />
					</div>
					<div
						className={`${styles.arrowIcon} ${
							styles.arrowIconLeft
						} ${prevBtnVisible ? styles.active : ""}`}
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
								width: "3rem",
								height: "3rem",
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
						} ${nextBtnVisible ? styles.active : ""}`}
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
								width: "3rem",
								height: "3rem",
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
							<Link
								to={`/product/${product._id}`}
								className={styles.img}
								key={img._id}
							>
								<img src={img.url} alt="" />
							</Link>
						))}
					</div>
					<div className={styles.heartIcon}>
						{wishlistLoading ? (
							<Loader
								color="black"
								height="1.6rem"
								width="1.6rem"
							/>
						) : isAddedtoWishlist ? (
							<PiHeartFill
								className={styles.heartFill}
								onClick={removeWishlistId}
							/>
						) : (
							<PiHeartStraightDuotone
								onClick={removeWishlistId}
							/>
						)}
					</div>
				</div>
				{product.reviews.length > 0 && (
					<Rating
						numRate={product.numRating || 0}
						iconSize="1.4rem"
						textSize="1.1rem"
					/>
				)}
				<div className={styles.productBrand}>
					<span>{product.brand}</span>
					<TbRosetteDiscountCheckFilled className={styles.icon} />
				</div>
				<Link
					to={`/product/${product._id}`}
					className={styles.productTitle}
				>
					{product.title}
				</Link>
				<div className={styles.productPrice}>
					<span className={styles.originalPrice}>
						{currencyFormatter.format(product.price).split(".")[0]}
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
				</div>
			</div>
		</div>
	);
};

export default WishlistItem;
