import { Link } from "react-router-dom";
import styles from "./header.module.css";

const UserMenuItem: React.FC<{
	label: string;
	isLink: boolean;
	path?: string;
	onClick?: () => void;
}> = ({ label, isLink, path, onClick }) => {
	if (isLink && path) {
		return (
			<Link className={styles.userMenuItem} to={path}>
				{label}
			</Link>
		);
	}
	return (
		<div className={styles.userMenuItem} onClick={onClick}>
			{label}
		</div>
	);
};

export default UserMenuItem;
