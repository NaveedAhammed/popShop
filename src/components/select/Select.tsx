import "./select.css";

import { useFormContext } from "react-hook-form";

export interface OptionsType {
	id: string;
	name: string;
}

interface SelectProps {
	options: OptionsType[];
	name: string;
	id: string;
	required?: boolean;
	style?: React.CSSProperties;
	onClick?: () => void;
	defaultOption: string;
}

const Select: React.FC<SelectProps> = ({
	options,
	name,
	id,
	required,
	style,
	onClick,
	defaultOption,
}) => {
	const { register } = useFormContext();

	return (
		<select
			id={id}
			{...register(name, { required })}
			onClick={onClick}
			style={style}
			className="select"
			defaultValue={defaultOption}
		>
			<option value="default" key="x">
				{defaultOption}
			</option>
			{options.map((option) => (
				<option value={option.name} key={option.id}>
					{option.name}
				</option>
			))}
		</select>
	);
};

export default Select;
