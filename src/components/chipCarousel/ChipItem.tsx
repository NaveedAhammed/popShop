import { Link } from "react-router-dom";
import "./chipCarousel.css";

const ChipItem: React.FC<{ chip: { path: string; label: string } }> = ({
	chip,
}) => {
	return (
		<Link to={chip.path} className="chipItem">
			{chip.label}
		</Link>
	);
};

export default ChipItem;
