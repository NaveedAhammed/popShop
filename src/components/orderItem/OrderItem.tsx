import "./orderItem.css";

import dayjs from "dayjs";
import { OrderItemType } from "../../types";
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
		<div className="orderItem">
			<div className="header">
				<div className="orderInfo">
					<div className="orderId">
						<span className="orderIdHeading">Order ID:</span>
						<span>{orderId}</span>
					</div>
					<div className="orderDetails">
						<div className="item">
							<span className="key">Order Date:</span>
							<span className="value">
								{dayjs(orderedDate.split("T")[0]).format(
									"MMM D, YYYY"
								)}
							</span>
						</div>
						<div className="item">
							<span className="key">Order Status:</span>
							<span className="value">{orderStatus}</span>
						</div>
					</div>
				</div>
				<div className="orderAmount">
					<span className="key">Amount Paid:</span>
					<span className="value">
						{currencyFormatter.format(amountPaid).split(".")[0]}
					</span>
				</div>
			</div>
			<hr className="seperator" />
			<div className="items">
				{orderItems.map((item) => (
					<div className="item" key={item._id}>
						<div className="productImg">
							<img
								src={item.productId.images[0].url}
								alt={item.productId.title}
							/>
						</div>
						<div className="productInfo">
							<span className="productBrand">
								{item.productId.brand}
							</span>
							<div className="productTitle">
								{item.productId.title}
							</div>
							<div className="minDiscount">
								{item.productId.discount && (
									<span className="numDiscount">
										{item.discount}% Off on
									</span>
								)}
								<span className="numOgPrice">
									{
										currencyFormatter
											.format(item.price)
											.split(".")[0]
									}
								</span>
							</div>
							<div className="subInfo">
								{item.productId.color && (
									<div className="item">
										<span className="key">Color:</span>
										<div
											className="color"
											style={{
												backgroundColor: `${item.productId.color.value}`,
											}}
										></div>
									</div>
								)}
								{item.productId.unit && (
									<div className="item">
										<span className="key">
											{item.productId.unit.name}:
										</span>
										<span className="value">
											{item.productId.unit.value}
										</span>
									</div>
								)}
								<div className="item">
									<span className="key">Category:</span>
									<span className="value">
										{item.productId.category.name}
									</span>
								</div>
								{orderStatus === "delivered" && (
									<div
										className="rateProduct"
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
						<div className="discount">
							{item.productId.discount && (
								<span className="numDiscount">
									{item.discount}% Off on
								</span>
							)}
							<span className="numOgPrice">
								{
									currencyFormatter
										.format(item.price)
										.split(".")[0]
								}
							</span>
						</div>
						<div className="price">
							<span className="numPrice">
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
							<span className="numQuantity">
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
