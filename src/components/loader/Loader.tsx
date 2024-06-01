import "./loader.css";

interface LoaderProps {
	width: string;
	height: string;
	color: string;
}

const Loader: React.FC<LoaderProps> = ({ width, height, color }) => {
	return (
		<div
			className={`loader loader-${color}`}
			style={{ width, height }}
		></div>
	);
};

export default Loader;
