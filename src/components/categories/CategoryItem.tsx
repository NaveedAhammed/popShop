import "./categories.css";

const CategoryItem: React.FC<{ categoryImg: string; label: string }> = ({
	categoryImg,
	label,
}) => {
	return (
		<div className="categoryItem">
			<img src={categoryImg} alt={label} className="categoryImg" />
			<span className="categoryLabel">{label}</span>
		</div>
	);
};

export default CategoryItem;
