import "./addressOptionItem.css";

import { useState } from "react";
import { IoMdMore } from "react-icons/io";
import Button from "../button/Button";
import { ShippingInfoType } from "../../types";
import { useFormContext } from "react-hook-form";

const AddressOptionItem: React.FC<{
	shippingInfo: ShippingInfoType;
	setData: (shippingInfo: ShippingInfoType) => void;
	id: string;
	value: string;
	name: string;
	onNext: () => void;
}> = ({ shippingInfo, setData, id, value, name, onNext }) => {
	const [isOpen, setIsOpen] = useState(false);
	const { register } = useFormContext();
	return (
		<div className="addressItem">
			<div className="address-option">
				<input type="radio" id={id} value={value} {...register(name)} />
			</div>
			<label htmlFor={id} className="address-details">
				<div className="heading">
					<span className="type">{shippingInfo.addressType}</span>
					<Button
						backgroundColor="white"
						backgroundColorCode="0"
						color="black"
						colorCode="0"
						borderWidth="100"
						borderColor="gray"
						borderColorCode="100"
						rounded="full"
						size="icon"
						onMouseEnter={() => setIsOpen(true)}
						onMouseLeave={() => setIsOpen(false)}
					>
						<IoMdMore />
						{isOpen && (
							<div className="options">
								<span
									className="option"
									onClick={() => setData(shippingInfo)}
								>
									Edit
								</span>
							</div>
						)}
					</Button>
				</div>
				<div className="personInfo">
					<span className="name">{shippingInfo.name}</span>
					<span className="phone">{shippingInfo.phone}</span>
				</div>
				<p className="addressInfo">
					{`${shippingInfo.address}, ${shippingInfo.locality}, ${shippingInfo.city}(City.), ${shippingInfo.state} - ${shippingInfo.pincode}`}

					<span className="deliver-btn">
						<Button
							size="default"
							rounded="sm"
							backgroundColor="black"
							backgroundColorCode="0"
							color="white"
							colorCode="0"
							style={{ fontSize: "1.2rem" }}
							onClick={onNext}
						>
							Deliver Here
						</Button>
					</span>
				</p>
			</label>
		</div>
	);
};

export default AddressOptionItem;
