import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import "./checkout.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUserStore } from "../../hooks/useUserStore";
import AddressOptionItem from "../../components/addressOptionItem/AddressOptionItem";
import { IAddressFormInput } from "../account/ManageAddresses";
import toast from "react-hot-toast";
import { ShippingInfoType, UserType } from "../../types";
import { useEffect, useState } from "react";
import { OptionsType } from "../../components/select/Select";
import { errorHandler } from "../../utils/errorHandler";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AddAddressForm from "../../components/addAddressForm/AddAddressForm";
import { GoPlus } from "react-icons/go";
import { State } from "country-state-city";

// yup schema
const schema = yup.object().shape({
	name: yup.string().required("Name is a required field"),
	phone: yup
		.number()
		.required("Phone number is required")
		.typeError("Phone must be a number"),
	pincode: yup.number().required("Pincode is required"),
	locality: yup.string().required("Locality is required"),
	address: yup.string().required("Address is required"),
	city: yup.string().required("City is required"),
	state: yup.string().required("State is required"),
	addressType: yup.string().required("Address type is required"),
	alternatePhone: yup
		.number()
		.nullable()
		.notRequired()
		.typeError("Alternate phone must be a number"),
});

const Addresses: React.FC<{
	setDeliveryAddress: React.Dispatch<
		React.SetStateAction<ShippingInfoType | null>
	>;
	setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setDeliveryAddress, setStep }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [id, setId] = useState<string | undefined>("");
	const [states, setStates] = useState<OptionsType[]>([]);
	const { user, setUser } = useUserStore();
	const methods = useForm<IAddressFormInput>({
		resolver: yupResolver(schema),
		defaultValues: {
			alternatePhone: null,
		},
	});

	const axiosPrivate = useAxiosPrivate();

	const handlePopulateValues = (shippingInfo: ShippingInfoType) => {
		Object.entries(shippingInfo).forEach(([name, value]) => {
			if (
				name === "name" ||
				name === "phone" ||
				name === "pincode" ||
				name === "locality" ||
				name === "address" ||
				name === "city" ||
				name === "state" ||
				name === "addressType"
			) {
				methods.setValue(name, `${value}`);
			}
			if (name === "alternatePhone") {
				if (value) {
					methods.setValue(name, Number(value));
				}
			}
		});
		setIsEditing(true);
		setIsFormOpen(true);
		setId(shippingInfo._id);
	};

	const handleCancel = () => {
		setIsFormOpen(false);
		methods.reset();
		setIsEditing(false);
		setId("");
	};

	const handleUpdateAddress = (formData: IAddressFormInput) => {
		setIsLoading(true);
		axiosPrivate
			.put(`/user/shippingAddress/update/${id}`, formData)
			.then((res) => {
				if (!res.data.success) {
					return toast.error(
						"Updation of address failed, Please try again"
					);
				}
				if (user) {
					const newUser: UserType = {
						...user,
						shippingAddresses: res.data.data.user.shippingAddresses,
					};
					setUser(newUser);
				}
				methods.reset();
				setIsFormOpen(false);
				toast.success(res.data.message);
			})
			.catch(errorHandler)
			.finally(() => {
				setIsLoading(false);
			});
	};

	const handleAddNewAddress = (formData: IAddressFormInput) => {
		console.log(formData);
		setIsLoading(true);
		axiosPrivate
			.post("/user/shippingAddress/new", formData)
			.then((res) => {
				if (!res.data.success) {
					return toast.error(
						"Addition of new address failed, Please try again"
					);
				}
				if (user) {
					const newUser: UserType = {
						...user,
						shippingAddresses: res.data.data.user.shippingAddresses,
					};
					setUser(newUser);
				}
				methods.reset();
				setIsFormOpen(false);
				toast.success(res.data.message);
			})
			.catch(errorHandler)
			.finally(() => {
				setIsLoading(false);
			});
	};

	const onSubmit: SubmitHandler<IAddressFormInput> = async (
		formData: IAddressFormInput
	) => {
		if (isEditing) {
			handleUpdateAddress(formData);
		} else {
			handleAddNewAddress(formData);
		}
	};

	const handleSelectDeliveyAddress = (address: ShippingInfoType) => {
		setDeliveryAddress(address);
		setStep(2);
	};

	useEffect(() => {
		const getStates = () => {
			const res = State.getStatesOfCountry("IN");
			const states: OptionsType[] = res.map((item) => ({
				id: item.isoCode,
				name: item.name,
			}));
			setStates(states);
		};

		states.length <= 0 && getStates();
	}, [states]);

	return (
		<div className="addresses-wrapper">
			{isFormOpen ? (
				<AddAddressForm
					onCancel={handleCancel}
					onSubmit={onSubmit}
					isLoading={isLoading}
					methods={methods}
					states={states}
					isEditing={isEditing}
				/>
			) : (
				<div className="add" onClick={() => setIsFormOpen(true)}>
					<GoPlus size={20} />
					<span>Add New Address</span>
				</div>
			)}
			<FormProvider {...methods}>
				<form className="addresses-form">
					<h1>Select delivery address</h1>
					{user?.shippingAddresses.map((address) => (
						<AddressOptionItem
							id={address._id}
							name="deliveryAddress"
							setData={handlePopulateValues}
							shippingInfo={address}
							value={address._id}
							onNext={() => handleSelectDeliveyAddress(address)}
							key={address._id}
						/>
					))}
				</form>
			</FormProvider>
		</div>
	);
};

export default Addresses;
