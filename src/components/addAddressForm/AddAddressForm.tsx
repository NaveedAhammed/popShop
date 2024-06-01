import "./addAddressForm.css";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Input from "../input/Input";
import Textarea from "../textarea/Textarea";
import Select, { IOption } from "../select/Select";
import Button from "../button/Button";
import { IAddressFormInput } from "../../pages/account/ManageAddresses";
import Loader from "../loader/Loader";

const AddAddressForm: React.FC<{
	onSubmit: SubmitHandler<IAddressFormInput>;
	onCancel: () => void;
	isLoading: boolean;
	states: IOption[];
}> = ({ onSubmit, onCancel, isLoading, states }) => {
	const methods = useForm<IAddressFormInput>();

	return (
		<FormProvider {...methods}>
			<form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
				<h2>Add New Address</h2>
				<Input
					autoComplete="off"
					id="name"
					name="name"
					type="text"
					placeholder="Naveed"
				/>
				<Input
					autoComplete="off"
					id="phone"
					name="phone"
					type="number"
					placeholder="919******6"
				/>
				<Input
					autoComplete="off"
					id="pincode"
					name="pincode"
					type="number"
					placeholder="515**1"
				/>
				<Input
					autoComplete="off"
					id="locality"
					name="locality"
					type="text"
					placeholder="locality"
				/>
				<Textarea
					autoComplete="off"
					cols={30}
					rows={5}
					id="address"
					name="address"
					placeholder="Address"
				/>
				<Input
					autoComplete="off"
					id="city"
					name="city"
					required={true}
					type="text"
					placeholder="City/District"
				/>
				<Select
					id="state"
					name="state"
					required={true}
					options={states}
				/>
				<Input
					autoComplete="off"
					id="alternatePhone"
					name="alternatePhone"
					type="number"
					placeholder="Alternate Phone"
				/>
				<div className="addressType">
					<span>Address Type</span>
					<div className="types">
						<div className="item">
							<label htmlFor="home">Home</label>
							<input
								autoComplete="off"
								id="home"
								type="radio"
								value="home"
								{...methods.register("addressType")}
							/>
						</div>
						<div className="item">
							<label htmlFor="work">Work</label>
							<input
								autoComplete="off"
								id="work"
								type="radio"
								value="work"
								{...methods.register("addressType")}
							/>
						</div>
					</div>
				</div>
				<div className="submit">
					<Button
						size="md"
						backgroundColor="gray"
						backgroundColorCode="100"
						color="black"
						colorCode="0"
						rounded="md"
						onClick={onCancel}
						disabled={isLoading}
					>
						Cancel
					</Button>
					<Button
						backgroundColor="black"
						backgroundColorCode="0"
						color="white"
						colorCode="0"
						rounded="md"
						size="md"
						disabled={isLoading}
					>
						{isLoading && (
							<Loader
								width="1.4rem"
								height="1.4rem"
								color="white"
							/>
						)}
						Add
					</Button>
				</div>
			</form>
		</FormProvider>
	);
};

export default AddAddressForm;
