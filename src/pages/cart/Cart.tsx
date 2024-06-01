import { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import CartItem from "../../components/cartItem/CartItem";
import { errorHandler } from "../../utils/errorHandler";
import styles from "../cart.module.css";
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
		<div className={styles.shimmerCartItem} key={i}>
			<div
				className={`${styles.shimmerProductImg} shimmer-animation`}
			></div>
			<div className={styles.shimmerProductInfo}>
				<div
					className={`${styles.shimmerProductBrand} shimmer-animation`}
				></div>
				<div
					className={`${styles.shimmerProductTitle} shimmer-animation`}
				></div>
				<div className={styles.subInfo}>
					<div
						className={`${styles.infoItem} shimmer-animation`}
					></div>
					<div
						className={`${styles.infoItem} shimmer-animation`}
					></div>
				</div>
			</div>
			<div
				className={`${styles.shimmerQuantity} shimmer-animation`}
			></div>
			<div className={`${styles.shimmerTotal} shimmer-animation`}></div>
		</div>
	));

	const shimmerOrderSummary = (
		<div
			className={`${styles.shimmerOrderSummary} shimmer-animation`}
		></div>
	);

	return (
		<div className={`container ${styles.cart}`}>
			<h1>
				Shopping Bag <span>({cart.length})</span>
			</h1>
			<div className={styles.wrapper}>
				<div className={styles.left}>
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
				<div className={styles.right}>
					{isLoading ? (
						shimmerOrderSummary
					) : (
						<div className={styles.rightWrapper}>
							<span className={styles.heading}>
								Order Summary
							</span>
							<div className={styles.item}>
								<span>Sub Total</span>
								<span className={styles.value}>
									{
										currencyFormatter
											.format(subTotal)
											.split(".")[0]
									}
								</span>
							</div>
							<div className={styles.item}>
								<span>Discount</span>
								<span className={styles.value}>
									{
										currencyFormatter
											.format(discount)
											.split(".")[0]
									}
								</span>
							</div>
							<div className={styles.item}>
								<span>Tax</span>
								<span className={styles.value}>₹0</span>
							</div>
							<div className={styles.item}>
								<span>Shipping</span>
								<span
									className={`${styles.value} ${styles.free}`}
								>
									Free
								</span>
							</div>
							<div className={styles.item}>
								<span>Total</span>
								<span className={styles.value}>
									{
										currencyFormatter
											.format(total)
											.split(".")[0]
									}
								</span>
							</div>
							<div className={styles.btnCheckout}>
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
							<div className={styles.delivery}>
								<span>Estimated Delivery by</span>
								<span className={styles.date}>
									25 May, 2024
								</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Cart;
