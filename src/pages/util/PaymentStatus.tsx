import Button from "../../components/button/Button";
import "./paymentStatus.css";

import paymentSuccess from "../../assets/payment-success.gif";
import paymentFailed from "../../assets/payment-failed.png";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentStatus = () => {
	const navigate = useNavigate();

	const [searchParams] = useSearchParams();

	const statusParam = searchParams.get("status");

	const success = (
		<div className="status">
			<img
				src={paymentSuccess}
				alt="Payment Success"
				className="success-img"
			/>
			<h1>Payment Successfull</h1>
			<p>Thank you for shopping!</p>
			<Button
				color="white"
				colorCode="0"
				backgroundColor="primary"
				backgroundColorCode="500"
				rounded="md"
				size="md"
				style={{ marginTop: "2rem" }}
				onClick={() => navigate("/account/myOrders")}
			>
				Go to Orders
			</Button>
		</div>
	);

	const failed = (
		<div className="status">
			<img
				src={paymentFailed}
				alt="Payment Failed"
				className="failed-img"
			/>
			<h1>Payment Failed</h1>
			<p>Something went wrong, please try again.</p>
			<Button
				color="red"
				colorCode="500"
				backgroundColor="white"
				backgroundColorCode="0"
				rounded="md"
				size="md"
				borderColor="red"
				borderWidth="100"
				style={{ marginTop: "2rem" }}
				onClick={() => navigate("/checkout")}
			>
				Try again
			</Button>
		</div>
	);

	return (
		<div className="paymentStatus">
			{statusParam === "success" ? success : failed}
		</div>
	);
};

export default PaymentStatus;
