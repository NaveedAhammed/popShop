import "./button.css";

interface ButtonProps {
	size: "default" | "sm" | "md" | "lg" | "icon";
	rounded: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
	backgroundColor:
		| "primary"
		| "red"
		| "blue"
		| "green"
		| "yellow"
		| "gray"
		| "black"
		| "white";
	color:
		| "primary"
		| "red"
		| "blue"
		| "green"
		| "yellow"
		| "gray"
		| "black"
		| "white";
	backgroundColorCode:
		| "0"
		| "100"
		| "200"
		| "300"
		| "400"
		| "500"
		| "600"
		| "700"
		| "800"
		| "900";
	colorCode:
		| "0"
		| "100"
		| "200"
		| "300"
		| "400"
		| "500"
		| "600"
		| "700"
		| "800"
		| "900";
	borderColorCode?:
		| "0"
		| "100"
		| "200"
		| "300"
		| "400"
		| "500"
		| "600"
		| "700"
		| "800"
		| "900";
	borderWidth?: "100" | "200" | "300" | "400" | "500" | "600";
	shadow?: "sm" | "normal" | "md" | "lg" | "xl" | "2xl" | "3xl";
	borderColor?:
		| "primary"
		| "red"
		| "blue"
		| "green"
		| "yellow"
		| "gray"
		| "black"
		| "white";
	isIcon?: boolean;
	children: React.ReactNode;
	onClick?: () => void;
	style?: React.CSSProperties;
	disabled?: boolean;
	type?: "submit" | "button" | "reset";
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
}

const Button: React.FC<ButtonProps> = ({
	children,
	size,
	rounded,
	disabled,
	onClick,
	style,
	type = "button",
	isIcon,
	onMouseEnter,
	onMouseLeave,
	shadow,
	color,
	colorCode,
	backgroundColor,
	backgroundColorCode,
	borderWidth,
	borderColor,
	borderColorCode,
}) => {
	return (
		<button
			className={`btn size-${size} ${isIcon ? "icon" : ""}`}
			style={{
				color: `var(--color-${color}-${colorCode})`,
				backgroundColor: `var(--color-${backgroundColor}-${backgroundColorCode})`,
				border: borderWidth
					? `var(--border-${borderWidth}) solid var(--color-${borderColor}-${borderColorCode})`
					: "",
				borderRadius: `var(--rounded-${rounded})`,
				boxShadow: shadow
					? shadow === "normal"
						? `var(--shadow)`
						: `var(--shadow-${shadow})`
					: "",
				...style,
			}}
			disabled={disabled}
			onClick={onClick}
			type={type}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{children}
		</button>
	);
};

export default Button;
