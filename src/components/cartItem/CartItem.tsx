import "./cartItem.css";

import { FaMinus, FaPlus } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { PiHeartStraightBold } from "react-icons/pi";
import { CartItemType, UserType } from "../../types";
import { currencyFormatter } from "../../utils/currencyFormat";
import Button from "../button/Button";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import toast from "react-hot-toast";
import { useUserStore } from "../../hooks/useUserStore";
import axios from "axios";
import { Link } from "react-router-dom";

const CartItem: React.FC<{
	cartItem: CartItemType;
	setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>;
}> = ({ cartItem, setCart }) => {
	const { setUser, user } = useUserStore();

	const axiosPrivate = useAxiosPrivate();

	const handleCartItemQuantity = (type: "inc" | "dec") => {
		const formData = new FormData();
		const quantitytemp = type === "inc" ? 1 : -1;
		formData.append("quantity", `${cartItem.quantity + quantitytemp}`);
		const res = axiosPrivate.post(
			`/user/cart/${cartItem.productId._id}`,
			formData
		);
		toast.promise(res, {
			loading: "Please wait...",
			success: (res) => {
				if (user) {
					const newUser: UserType = {
						...user,
						cart: res.data.data.user?.cart,
					};
					setUser(newUser);
					setCart((prev) => {
						const updatedCart = prev.map((item) => {
							if (item._id === cartItem._id) {
								return {
									...item,
									quantity: cartItem.quantity + quantitytemp,
								};
							}
							return item;
						});
						return updatedCart;
					});
				}
				return res.data.message;
			},
			error: (err) => {
				if (axios.isAxiosError<{ message: string }>(err)) {
					if (!err?.response) {
						return "Something went wrong";
					} else {
						return `${err.response?.data?.message}`;
					}
				}
				return "Unexpected error!";
			},
		});
	};

	const handleSaveForLater = () => {
		const res = axiosPrivate.post(
			`/user/wishlist/${cartItem.productId._id}`
		);
		toast.promise(res, {
			loading: "Removing cart item...",
			success: (res) => {
				if (user) {
					const newUser: UserType = {
						...user,
						wishlistIds: res.data.data.user.wishlistIds,
					};
					setUser(newUser);
				}
				setCart((prev) => prev.filter((it) => it._id !== cartItem._id));
				return res.data.message;
			},
			error: (err) => {
				if (axios.isAxiosError<{ message: string }>(err)) {
					if (!err?.response) {
						return "Something went wrong";
					} else {
						return `${err.response?.data?.message}`;
					}
				}
				return "Unexpected error!";
			},
		});
	};

	const handleDeleteCartItem = () => {
		const res = axiosPrivate.delete(`/user/cart/${cartItem.productId._id}`);
		toast.promise(res, {
			loading: "Adding item to wishlist...",
			success: (res) => {
				if (user) {
					const newUser: UserType = {
						...user,
						cart: res.data.data.user.cart,
					};
					setUser(newUser);
				}
				setCart((prev) => prev.filter((it) => it._id !== cartItem._id));
				return res.data.message;
			},
			error: (err) => {
				if (axios.isAxiosError<{ message: string }>(err)) {
					if (!err?.response) {
						return "Something went wrong";
					} else {
						return `${err.response?.data?.message}`;
					}
				}
				return "Unexpected error!";
			},
		});
	};

	return (
		<div className="cartItem">
			<Link
				to={`/product/${cartItem.productId._id}`}
				className="productImg"
			>
				<img
					src={cartItem.productId.images[0].url}
					alt={cartItem.productId.title}
				/>
			</Link>
			<div className="productInfo">
				<span className="productBrand">{cartItem.productId.brand}</span>
				<Link
					to={`/product/${cartItem.productId._id}`}
					className="productTitle"
				>
					{cartItem.productId.title}
				</Link>
				<div className="productDetails">
					{cartItem.productId.unit && (
						<div className="item">
							<span className="key">
								{cartItem.productId.unit.name}:
							</span>
							<span className="value">
								{cartItem.productId.unit.value}
							</span>
						</div>
					)}
					<div className="item">
						<span className="key">Category:</span>
						<span className="value">
							{cartItem.productId.category.name}
						</span>
					</div>
					{cartItem.productId.color && (
						<div className="item">
							<span className="key">Color:</span>
							<div
								className="color"
								style={{
									backgroundColor: `${cartItem.productId.color.value}`,
								}}
							></div>
						</div>
					)}
				</div>
				<div className="productPrice">
					{cartItem.productId.discount > 0 && (
						<span className="originalPrice">
							{
								currencyFormatter
									.format(cartItem.productId.price)
									.split(".")[0]
							}
						</span>
					)}
					<span className="discountPrice">
						{
							currencyFormatter
								.format(
									(cartItem.productId.price *
										(100 - cartItem.productId.discount)) /
										100
								)
								.split(".")[0]
						}
					</span>
					{cartItem.productId.discount > 0 && (
						<span className="discount">
							{cartItem.productId.discount}% Off
						</span>
					)}
					<div className="miniTotal">
						<span>Total:</span>
						<span style={{ fontWeight: "500" }}>
							{
								currencyFormatter
									.format(
										((cartItem.productId.price *
											(100 -
												cartItem.productId.discount)) /
											100) *
											cartItem.quantity
									)
									.split(".")[0]
							}
						</span>
					</div>
				</div>
				<div className="actions">
					<div className="miniQuantity">
						<FaMinus
							className="icon"
							onClick={() => handleCartItemQuantity("dec")}
						/>
						<span>{cartItem.quantity}</span>
						<FaPlus
							className="icon"
							onClick={() => handleCartItemQuantity("inc")}
						/>
					</div>
					<div
						className="actionDelete"
						onClick={handleDeleteCartItem}
					>
						<IoTrashOutline />
						<span>Delete</span>
					</div>
					<div
						className="actionWishlist"
						onClick={handleSaveForLater}
					>
						<PiHeartStraightBold />
						<span>Save for Later</span>
					</div>
				</div>
			</div>
			<div className="quantity">
				<Button
					backgroundColor="white"
					backgroundColorCode="0"
					color="black"
					colorCode="0"
					borderColor="gray"
					borderColorCode="100"
					borderWidth="100"
					size="md"
					rounded="full"
					style={{ padding: "0.8rem" }}
					disabled={cartItem.quantity <= 1}
					onClick={() => handleCartItemQuantity("dec")}
				>
					<FaMinus />
				</Button>
				<span>{cartItem.quantity}</span>
				<Button
					backgroundColor="white"
					backgroundColorCode="0"
					color="black"
					colorCode="0"
					borderColor="gray"
					borderColorCode="100"
					borderWidth="100"
					size="md"
					rounded="full"
					style={{ padding: "0.8rem" }}
					onClick={() => handleCartItemQuantity("inc")}
				>
					<FaPlus />
				</Button>
			</div>
			<div className="totalAmount">
				<span>Total:</span>
				<span className="amount">
					{
						currencyFormatter
							.format(
								((cartItem.productId.price *
									(100 - cartItem.productId.discount)) /
									100) *
									cartItem.quantity
							)
							.split(".")[0]
					}
				</span>
			</div>
		</div>
	);
};

export default CartItem;
