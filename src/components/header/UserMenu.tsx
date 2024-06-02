import "./header.css";

import toast from "react-hot-toast";
import { useAuthModal } from "../../hooks/useAuthModal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useUserStore } from "../../hooks/useUserStore";
import UserMenuItem from "./UserMenuItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserMenu: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
	const { onOpen } = useAuthModal();
	const { user, setUser } = useUserStore();
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();

	const handleLogout = () => {
		const res = axiosPrivate.post("/logout");
		toast.promise(res, {
			loading: `Logging out...`,
			success: () => {
				navigate("/");
				setUser(null);
				localStorage.setItem("isLoggedIn", "false");
				location.reload();
				return "Logged out!";
			},
			error: (err) => {
				if (axios.isAxiosError<{ message: string }>(err)) {
					if (!err?.response) {
						return "Something went wrong";
					} else {
						return `${err.response?.data?.message}`;
					}
				}
				return "Unexpected error!";
			},
		});
	};

	return (
		<div className="usermenu">
			{isMobile && (
				<>
					<UserMenuItem isLink label="Home" path="/" />
					<UserMenuItem isLink label="Products" path="/products" />
				</>
			)}
			{user ? (
				<>
					<UserMenuItem
						isLink
						label="My Profile"
						path="/account/myProfile"
					/>
					<UserMenuItem
						isLink
						label="Wishlist"
						path="/account/myWishlist"
					/>
					<UserMenuItem
						isLink
						label="Orders"
						path="/account/myOrders"
					/>
					<UserMenuItem
						isLink={false}
						label="Log out"
						onClick={handleLogout}
					/>
				</>
			) : (
				<>
					<UserMenuItem
						isLink={false}
						label="Log in"
						onClick={onOpen}
					/>
					<UserMenuItem
						isLink={false}
						label="Sign up"
						onClick={onOpen}
					/>
				</>
			)}
		</div>
	);
};

export default UserMenu;
