import "./input.css";

import { useFormContext } from "react-hook-form";
import { IconType } from "react-icons";

interface InputProps {
	label?: string;
	placeholder?: string;
	id: string;
	name: string;
	required?: boolean;
	disabled?: boolean;
	autoComplete: "off" | "on";
	type: "text" | "password" | "email" | "number" | "radio";
	leadingIcon?: IconType;
	tralingIcon?: IconType;
	tralingIconOnClick?: () => void;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
	label,
	id,
	name,
	placeholder,
	disabled,
	autoComplete = "off",
	type,
	leadingIcon: LeadingIcon,
	tralingIcon: TralingIcon,
	tralingIconOnClick,
	onChange,
}) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<div className="input">
			{label && (
				<label htmlFor={id} className="label">
					{label}
				</label>
			)}
			<div className={`inputWrapper ${errors[name] ? "error" : ""}`}>
				{LeadingIcon && <LeadingIcon className="leadingIcon" />}
				<input
					type={type}
					id={id}
					{...register(name, {
						onChange,
					})}
					placeholder={placeholder}
					disabled={disabled}
					autoCapitalize={autoComplete}
					className="inputEle"
				/>
				{TralingIcon && (
					<TralingIcon
						className="tralingIcon"
						onClick={tralingIconOnClick}
					/>
				)}
			</div>
			{errors[name] && (
				<span className="errorMsg">{`${errors[name]?.message}`}</span>
			)}
		</div>
	);
};

export default Input;
