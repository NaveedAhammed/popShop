import styles from "./addressItem.module.css";

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
		<div className={styles.container}>
			<div className={styles.heading}>
				<span className={styles.type}>{shippingInfo.addressType}</span>
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
						<div className={styles.options}>
							<span
								className={styles.option}
								onClick={() => setData(shippingInfo)}
							>
								Edit
							</span>
							<span
								className={styles.option}
								onClick={() => deleteAddress(shippingInfo._id)}
							>
								Delete
							</span>
						</div>
					)}
				</Button>
			</div>
			<div className={styles.personInfo}>
				<span className={styles.name}>{shippingInfo.name}</span>
				<span className={styles.phone}>{shippingInfo.phone}</span>
			</div>
			<p className={styles.addressInfo}>
				{`${shippingInfo.address}, ${shippingInfo.locality}, ${shippingInfo.city}(City.), ${shippingInfo.state} - ${shippingInfo.pincode}`}
			</p>
		</div>
	);
};

export default AddressItem;
