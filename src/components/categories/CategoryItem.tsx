import { Link } from "react-router-dom";
import "./categories.css";

const CategoryItem: React.FC<{
	categoryImg: string;
	label: string;
	path: string;
}> = ({ categoryImg, label, path }) => {
	return (
		<Link to={path} className="categoryItem">
			<img src={categoryImg} alt={label} className="categoryImg" />
			<span className="categoryLabel">{label}</span>
		</Link>
	);
};

export default CategoryItem;
