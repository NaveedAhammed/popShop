import "./select.css";

import { useFormContext } from "react-hook-form";

export interface IOption {
	name: string;
}

interface SelectProps {
	options: IOption[];
	name: string;
	id: string;
	required?: boolean;
	style?: object;
	onClick?: () => void;
}

const Select: React.FC<SelectProps> = ({
	options,
	name,
	id,
	required,
	style,
	onClick,
}) => {
	const { register } = useFormContext();

	return (
		<select
			id={id}
			{...register(name, { required })}
			onClick={onClick}
			style={style}
			className="select"
		>
			<option value="">select</option>
			{options.map((option) => (
				<option
					className="text-base"
					value={`${option.name}`}
					key={option.name}
				>
					{option.name}
				</option>
			))}
		</select>
	);
};

export default Select;
