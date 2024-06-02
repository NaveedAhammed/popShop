import "./cart.css";

import { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import CartItem from "../../components/cartItem/CartItem";
import { errorHandler } from "../../utils/errorHandler";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { CartItemType } from "../../types";
import { currencyFormatter } from "../../utils/currencyFormat";

const Cart = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [cart, setCart] = useState<CartItemType[]>([]);

	const subTotal = cart
		.map((item) => item.productId.price * item.quantity)
		.reduce((acc, curr) => acc + curr, 0);

	const discount = cart
		.map(
			(item) =>
				((item.productId.price * item.productId.discount) / 100) *
				item.quantity
		)
		.reduce((acc, curr) => acc + curr, 0);

	const total = subTotal - discount;

	const axiosPrivate = useAxiosPrivate();

	useEffect(() => {
		const getProductDetails = () => {
			setIsLoading(true);
			axiosPrivate
				.get("/products/cart")
				.then((res) => {
					console.log(res.data);
					setCart(res.data.data.cart);
				})
				.catch(errorHandler)
				.finally(() => {
					setIsLoading(false);
				});
		};

		getProductDetails();
	}, [axiosPrivate]);

	const shimmerElements = Array.from({ length: 4 }).map((_, i) => (
		<div className="shimmerCartItem" key={i}>
			<div className="shimmerProductImg shimmer-animation"></div>
			<div className="shimmerProductInfo">
				<div className="shimmerProductBrand shimmer-animation"></div>
				<div className="shimmerProductTitle shimmer-animation"></div>
				<div className="subInfo">
					<div className="infoItem shimmer-animation"></div>
					<div className="infoItem shimmer-animation"></div>
				</div>
			</div>
			<div className="shimmerQuantity shimmer-animation"></div>
			<div className="shimmerTotal shimmer-animation"></div>
		</div>
	));

	const shimmerOrderSummary = (
		<div className="shimmerOrderSummary shimmer-animation"></div>
	);

	return (
		<div className="container cart">
			{isLoading ? (
				<div className="shimmerHeading shimmer-animation"></div>
			) : (
				<h1>
					Shopping Bag <span>({cart.length})</span>
				</h1>
			)}
			<div className="wrapper">
				<div className="left">
					{isLoading
						? shimmerElements
						: cart.map((cartItem) => (
								<CartItem
									key={cartItem._id}
									cartItem={cartItem}
									setCart={setCart}
								/>
						  ))}
				</div>
				<div className="right">
					{isLoading ? (
						shimmerOrderSummary
					) : (
						<div className="rightWrapper">
							<span className="heading">Order Summary</span>
							<div className="item">
								<span>Sub Total</span>
								<span className="value">
									{
										currencyFormatter
											.format(subTotal)
											.split(".")[0]
									}
								</span>
							</div>
							<div className="item">
								<span>Discount</span>
								<span className="value">
									{
										currencyFormatter
											.format(discount)
											.split(".")[0]
									}
								</span>
							</div>
							<div className="item">
								<span>Tax</span>
								<span className="value">₹0</span>
							</div>
							<div className="item">
								<span>Shipping</span>
								<span className="value free">Free</span>
							</div>
							<div className="item">
								<span>Total</span>
								<span className="value">
									{
										currencyFormatter
											.format(total)
											.split(".")[0]
									}
								</span>
							</div>
							<div className="btnCheckout">
								<Button
									backgroundColor="primary"
									backgroundColorCode="600"
									color="white"
									colorCode="0"
									size="lg"
									rounded="full"
									style={{ width: "100%" }}
								>
									Proceed to Checkout
								</Button>
							</div>
							<div className="delivery">
								<span>Estimated Delivery by</span>
								<span className="date">25 May, 2024</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Cart;
