import "./header.css";

import { Link } from "react-router-dom";

const UserMenuItem: React.FC<{
	label: string;
	isLink: boolean;
	path?: string;
	onClick?: () => void;
}> = ({ label, isLink, path, onClick }) => {
	if (isLink && path) {
		return (
			<Link className="userMenuItem" to={path}>
				{label}
			</Link>
		);
	}
	return (
		<div className="userMenuItem" onClick={onClick}>
			{label}
		</div>
	);
};

export default UserMenuItem;
