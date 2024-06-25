import { FaArrowLeft } from "react-icons/fa6";
import Button from "../../components/button/Button";
import CartItem from "../../components/cartItem/CartItem";
import { CartItemType } from "../../types";
import "./checkout.css";

const OrderSummary: React.FC<{
	items: CartItemType[];
	setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ items, setStep }) => {
	return (
		<div className="order-summary">
			<div className="btnBack" onClick={() => setStep(1)}>
				<Button
					backgroundColor="white"
					backgroundColorCode="0"
					borderColor="gray"
					borderColorCode="100"
					borderWidth="100"
					color="black"
					colorCode="0"
					rounded="full"
					size="default"
					style={{ padding: "0.8rem" }}
				>
					<FaArrowLeft />
				</Button>
				<span>Back</span>
			</div>
			{items.map((item) => (
				<CartItem cartItem={item} setCart={() => {}} key={item._id} />
			))}
			<div className="btnContinue">
				<Button
					backgroundColor="black"
					backgroundColorCode="0"
					color="white"
					colorCode="0"
					rounded="lg"
					size="default"
					onClick={() => setStep(3)}
				>
					Continue
				</Button>
			</div>
		</div>
	);
};

export default OrderSummary;
