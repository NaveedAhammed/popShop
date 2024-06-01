import styles from "../loader.module.css";

interface LoaderProps {
	width: string;
	height: string;
	color: string;
}

const Loader: React.FC<LoaderProps> = ({ width, height, color }) => {
	return (
		<div
			className={`${styles.loader} ${styles[`loader-${color}`]}`}
			style={{ width, height }}
		></div>
	);
};

export default Loader;
