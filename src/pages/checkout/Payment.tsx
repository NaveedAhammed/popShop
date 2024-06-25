import "./checkout.css";
import { currencyFormatter } from "../../utils/currencyFormat";
import { CartItemType } from "../../types";
import Button from "../../components/button/Button";
import dayjs from "dayjs";

const Payment: React.FC<{ cart: CartItemType[] }> = ({ cart }) => {
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

	return (
		<div className="payment">
			<span className="heading">Payment Info</span>
			<div className="item">
				<span>Sub Total</span>
				<span className="value">
					{currencyFormatter.format(subTotal).split(".")[0]}
				</span>
			</div>
			<div className="item">
				<span>Discount</span>
				<span className="value">
					{currencyFormatter.format(discount).split(".")[0]}
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
			<hr className="partition" />
			<div className="item total">
				<span>Total</span>
				<span className="value">
					{currencyFormatter.format(total).split(".")[0]}
				</span>
			</div>
			<hr className="partition" />
			<div className="btnPayment">
				<Button
					backgroundColor="primary"
					backgroundColorCode="600"
					color="white"
					colorCode="0"
					size="lg"
					rounded="full"
					style={{ width: "100%" }}
					type="submit"
				>
					Proceed to Pay
				</Button>
			</div>
			<div className="delivery">
				<span>Estimated Delivery by</span>
				<span className="date">
					{dayjs(Date.now() + 2 * 24 * 60 * 60 * 1000).format(
						"MMM D, YYYY"
					)}
				</span>
			</div>
		</div>
	);
};
export default Payment;
