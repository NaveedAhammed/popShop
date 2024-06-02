import "./account.css";

import { GoPlus } from "react-icons/go";
import AddAddressForm from "../../components/addAddressForm/AddAddressForm";
import AddressItem from "../../components/addressItem/AddressItem";
import { useEffect, useState } from "react";
import { useUserStore } from "../../hooks/useUserStore";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { ShippingInfoType, UserType } from "../../types";
import toast from "react-hot-toast";
import { errorHandler } from "../../utils/errorHandler";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from "axios";
import { OptionsType } from "../../components/select/Select";
import { State } from "country-state-city";

export interface IAddressFormInput {
	name: string;
	phone: number;
	pincode: number;
	locality: string;
	address: string;
	city: string;
	state: string;
	addressType: string;
	alternatePhone?: number | null;
}

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

const ManageAddresses = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [id, setId] = useState<string | undefined>("");
	const { user, setUser } = useUserStore();
	const [states, setStates] = useState<OptionsType[]>([]);

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

	const handleDeleteAddress = (shippingAddressId: string | undefined) => {
		const res = axiosPrivate.delete(
			`/user/shippingAddress/delete/${shippingAddressId}`
		);
		toast.promise(res, {
			loading: "Deleting the address...",
			success: (res) => {
				console.log(res.data);
				if (user) {
					const newUser: UserType = {
						...user,
						shippingAddresses: res.data.data.user.shippingAddresses,
					};
					setUser(newUser);
				}
				return res.data.message;
			},
			error: (err) => {
				if (axios.isAxiosError<{ message: string }>(err)) {
					if (!err?.response) {
						return "Something went wrong";
					} else {
						return `${err.response?.data?.message}`;
					}
				}
				return "Unexpected error!";
			},
		});
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
		<div className="manageAddresses">
			<div className="addressWrapper">
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
				<div className="addresses">
					{user?.shippingAddresses.map((item) => (
						<AddressItem
							shippingInfo={item}
							key={item._id}
							deleteAddress={handleDeleteAddress}
							setData={handlePopulateValues}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ManageAddresses;
