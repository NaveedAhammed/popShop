import dayjs from "dayjs";
import { OrderItemType } from "../../types";
import styles from "../orderItem.module.css";
import { currencyFormatter } from "../../utils/currencyFormat";
import { PiStarFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const OrderItem: React.FC<{
	orderItems: OrderItemType[];
	orderedDate: string;
	orderStatus: string;
	orderId: string;
}> = ({ orderItems, orderedDate, orderStatus, orderId }) => {
	const amountPaid = orderItems
		.map((item) => (item.price * (100 - item.discount)) / 100)
		.reduce((acc, curr) => acc + curr, 0);

	const navigate = useNavigate();

	return (
		<div className={styles.orderItem}>
			<div className={styles.header}>
				<div className={styles.orderInfo}>
					<div className={styles.orderId}>
						<span className={styles.orderIdHeading}>Order ID:</span>
						<span>{orderId}</span>
					</div>
					<div className={styles.orderDetails}>
						<div className={styles.item}>
							<span className={styles.key}>Order Date:</span>
							<span className={styles.value}>
								{dayjs(orderedDate.split("T")[0]).format(
									"MMM D, YYYY"
								)}
							</span>
						</div>
						<div className={styles.item}>
							<span className={styles.key}>Order Status:</span>
							<span className={styles.value}>{orderStatus}</span>
						</div>
					</div>
				</div>
				<div className={styles.orderAmount}>
					<span className={styles.key}>Amount Paid:</span>
					<span className={styles.value}>
						{currencyFormatter.format(amountPaid).split(".")[0]}
					</span>
				</div>
			</div>
			<hr className={styles.seperator} />
			<div className={styles.items}>
				{orderItems.map((item) => (
					<div className={styles.item} key={item._id}>
						<div className={styles.productImg}>
							<img
								src={item.productId.images[0].url}
								alt={item.productId.title}
							/>
						</div>
						<div className={styles.productInfo}>
							<span className={styles.productBrand}>
								{item.productId.brand}
							</span>
							<div className={styles.productTitle}>
								{item.productId.title}
							</div>
							<div className={styles.minDiscount}>
								{item.productId.discount && (
									<span className={styles.numDiscount}>
										{item.discount}% Off on
									</span>
								)}
								<span className={styles.numOgPrice}>
									{
										currencyFormatter
											.format(item.price)
											.split(".")[0]
									}
								</span>
							</div>
							<div className={styles.subInfo}>
								{item.productId.color && (
									<div className={styles.item}>
										<span className={styles.key}>
											Color:
										</span>
										<div
											className={styles.color}
											style={{
												backgroundColor: `${item.productId.color.value}`,
											}}
										></div>
									</div>
								)}
								{item.productId.unit && (
									<div className={styles.item}>
										<span className={styles.key}>
											{item.productId.unit.name}:
										</span>
										<span className={styles.value}>
											{item.productId.unit.value}
										</span>
									</div>
								)}
								<div className={styles.item}>
									<span className={styles.key}>
										Category:
									</span>
									<span className={styles.value}>
										{item.productId.category.name}
									</span>
								</div>
								{orderStatus === "delivered" && (
									<div
										className={styles.rateProduct}
										onClick={() =>
											navigate(
												`/rate-review/product/${item.productId._id}`
											)
										}
									>
										<PiStarFill />
										<span>Rate Product</span>
									</div>
								)}
							</div>
						</div>
						<div className={styles.discount}>
							{item.productId.discount && (
								<span className={styles.numDiscount}>
									{item.discount}% Off on
								</span>
							)}
							<span className={styles.numOgPrice}>
								{
									currencyFormatter
										.format(item.price)
										.split(".")[0]
								}
							</span>
						</div>
						<div className={styles.price}>
							<span className={styles.numPrice}>
								{
									currencyFormatter
										.format(
											(item.price *
												(100 - item.discount)) /
												100
										)
										.split(".")[0]
								}
							</span>
							<span className={styles.numQuantity}>
								Qty: {item.quantity}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default OrderItem;
