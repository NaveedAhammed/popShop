import UserMenu from "./UserMenu";
import "./header.css";

const MobileMenu: React.FC<{
	isMobileMenuShown: boolean;
	overlayClick: () => void;
}> = ({ isMobileMenuShown, overlayClick }) => {
	return (
		<>
			<div className={`mobileMenu ${isMobileMenuShown ? "show" : ""}`}>
				<UserMenu isMobile />
			</div>
			<div
				className={`mobileMenuOverlay ${
					isMobileMenuShown ? "show" : ""
				}`}
				onClick={overlayClick}
			></div>
		</>
	);
};

export default MobileMenu;
