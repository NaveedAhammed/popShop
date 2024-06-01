import "./addressItem.css";

import { useState } from "react";
import { IoMdMore } from "react-icons/io";
import Button from "../button/Button";
import { ShippingInfoType } from "../../types";

const AddressItem: React.FC<{
	shippingInfo: ShippingInfoType;
	setData: (shippingInfo: ShippingInfoType) => void;
	deleteAddress: (shippingAddressId: string | undefined) => void;
}> = ({ shippingInfo, setData, deleteAddress }) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className="addressItem">
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
							<span
								className="option"
								onClick={() => deleteAddress(shippingInfo._id)}
							>
								Delete
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
			</p>
		</div>
	);
};

export default AddressItem;
