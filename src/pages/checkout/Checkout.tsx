import { useEffect, useState } from "react";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import ProgressBar from "./ProgressBar";
import "./checkout.css";
import Addresses from "./Addresses";
import { CartItemType, ShippingInfoType } from "../../types";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { errorHandler } from "../../utils/errorHandler";
import OrderSummary from "./OrderSummary";
import Payment from "./Payment";

const Checkout = () => {
	const [step, setStep] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [deliveryAddress, setDeliveryAddress] =
		useState<ShippingInfoType | null>(null);
	const [cart, setCart] = useState<CartItemType[]>([]);

	const axiosPrivate = useAxiosPrivate();

	console.log(isLoading, deliveryAddress);

	useEffect(() => {
		const getShoppingBagItems = () => {
			setIsLoading(true);
			axiosPrivate
				.get("/shopping-bag")
				.then((res) => {
					console.log(res.data);
					setCart(res.data.data.cart);
				})
				.catch(errorHandler)
				.finally(() => {
					setIsLoading(false);
				});
		};

		getShoppingBagItems();
	}, [axiosPrivate]);

	const handleMakePayment = async () => {
		const stripe: Stripe | null = await loadStripe(
			import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
		);
		const res = await axiosPrivate.post("/create-checkout-session", {
			deliveryAddress,
			cart,
		});
		await stripe?.redirectToCheckout({
			sessionId: res.data.data.sessionId,
		});
	};

	return (
		<div className="checkout">
			<div className="container">
				<ProgressBar step={step} />
				{step === 1 ? (
					<Addresses
						setDeliveryAddress={setDeliveryAddress}
						setStep={setStep}
					/>
				) : step === 2 ? (
					<OrderSummary items={cart} setStep={setStep} />
				) : (
					<Payment cart={cart} handlePayment={handleMakePayment} />
				)}
			</div>
		</div>
	);
};

export default Checkout;
