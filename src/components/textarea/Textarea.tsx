import styles from "./textarea.module.css";

import { useFormContext } from "react-hook-form";

interface TextareaProps {
	id: string;
	name: string;
	placeholder?: string;
	autoComplete: "off" | "on";
	required?: boolean;
	disabled?: boolean;
	defaultValue?: string | number;
	rows: number;
	cols: number;
}

const Textarea: React.FC<TextareaProps> = ({
	id,
	name,
	placeholder,
	autoComplete,
	required,
	disabled,
	defaultValue,
	cols,
	rows,
}) => {
	const { register } = useFormContext();

	return (
		<div className={styles.container}>
			<textarea
				id={id}
				{...register(name, { required })}
				placeholder={placeholder}
				autoComplete={autoComplete}
				required={required}
				disabled={disabled}
				defaultValue={defaultValue}
				className={styles.textarea}
				cols={cols}
				rows={rows}
			></textarea>
		</div>
	);
};

export default Textarea;
