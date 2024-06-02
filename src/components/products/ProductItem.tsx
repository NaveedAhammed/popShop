import "./products.css";

import Button from "../button/Button";
import Rating from "../rating/Rating";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { PiHeartFill, PiHeartStraightDuotone } from "react-icons/pi";

import { useRef, useState } from "react";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { FaPercent } from "react-icons/fa";
import { ProductType, UserType } from "../../types";
import { currencyFormatter } from "../../utils/currencyFormat";
import { Link } from "react-router-dom";
import { useUserStore } from "../../hooks/useUserStore";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useAuthModal } from "../../hooks/useAuthModal";
import { errorHandler } from "../../utils/errorHandler";
import Loader from "../loader/Loader";

const ProductItem: React.FC<{ product: ProductType }> = ({ product }) => {
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

	return (
		<div className="productItem">
			<div className="itemWrapper">
				<div className="productImgs">
					{product.discount > 0 && (
						<div className="discountTag">
							<span>{product.discount}</span>
							<FaPercent className="percentIcon" />
						</div>
					)}
					<div
						className={`arrowIcon arrowIconLeft ${
							prevBtnVisible ? "active" : ""
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
						className={`arrowIcon arrowIconRight ${
							nextBtnVisible ? "active" : ""
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
						className="imgsSlider"
						ref={sliderRef}
						onScroll={handleOnScroll}
					>
						{product.images.map((img) => (
							<Link
								to={`/product/${product._id}`}
								className="img"
								key={img._id}
							>
								<img src={img.url} alt="" />
							</Link>
						))}
					</div>
					<div className="heartIcon">
						{wishlistLoading ? (
							<Loader
								color="black"
								height="1.6rem"
								width="1.6rem"
							/>
						) : isAddedtoWishlist ? (
							<PiHeartFill
								className="heartFill"
								onClick={handleAddOrRemoveWishlistId}
							/>
						) : (
							<PiHeartStraightDuotone
								onClick={handleAddOrRemoveWishlistId}
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
				<div className="productBrand">
					<span>{product.brand}</span>
					<TbRosetteDiscountCheckFilled className="icon" />
				</div>
				<Link to={`/product/${product._id}`} className="productTitle">
					{product.title}
				</Link>
				<div className="productPrice">
					<span className="originalPrice">
						{currencyFormatter.format(product.price).split(".")[0]}
					</span>
					<span className="discountPrice">
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

export default ProductItem;
