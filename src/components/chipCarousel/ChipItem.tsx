import { Link } from "react-router-dom";
import styles from "./chipCarousel.module.css";

const ChipItem: React.FC<{ chip: { path: string; label: string } }> = ({
	chip,
}) => {
	return (
		<Link to={chip.path} className={styles.chipItem}>
			{chip.label}
		</Link>
	);
};

export default ChipItem;
