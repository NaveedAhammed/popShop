import styles from "./categories.module.css";

const CategoryItem: React.FC<{ categoryImg: string; label: string }> = ({
	categoryImg,
	label,
}) => {
	return (
		<div className={styles.categoryItem}>
			<img src={categoryImg} alt={label} className={styles.categoryImg} />
			<span className={styles.categoryLabel}>{label}</span>
		</div>
	);
};

export default CategoryItem;