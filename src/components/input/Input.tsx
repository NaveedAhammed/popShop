import { useFormContext } from "react-hook-form";
import styles from "./input.module.css";
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
		<div className={styles.input}>
			{label && (
				<label htmlFor={id} className={styles.label}>
					{label}
				</label>
			)}
			<div
				className={`${styles.inputWrapper} ${
					errors[name] ? styles.error : ""
				}`}
			>
				{LeadingIcon && <LeadingIcon className={styles.leadingIcon} />}
				<input
					type={type}
					id={id}
					{...register(name, {
						onChange,
					})}
					placeholder={placeholder}
					disabled={disabled}
					autoCapitalize={autoComplete}
					className={styles.inputEle}
				/>
				{TralingIcon && (
					<TralingIcon
						className={styles.tralingIcon}
						onClick={tralingIconOnClick}
					/>
				)}
			</div>
			{errors[name] && (
				<span
					className={styles.errorMsg}
				>{`${errors[name]?.message}`}</span>
			)}
		</div>
	);
};

export default Input;
