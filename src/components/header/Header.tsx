// STYLES MODULE IMPORT
import "./header.css";

import { LuSearch } from "react-icons/lu";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
// import { GoPerson } from "react-icons/go";
import { IoMenu } from "react-icons/io5";

// LOCAL FILES IMPORT
import logo from "../../assets/logo.svg";
import bag from "../../assets/bag.svg";
import UserMenu from "./UserMenu";
import { useState } from "react";
import { useUserStore } from "../../hooks/useUserStore";
import { GoPerson } from "react-icons/go";

const activeLink = ({ isActive }: { isActive: boolean }) => {
	return `navLink ${isActive ? "active" : "inactive"}`;
};

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const location = useLocation();

	const { user } = useUserStore();

	const navigate = useNavigate();

	return (
		<header className="header">
			<div className="container">
				<div className="mainHeader">
					<Link to="/" className="brand">
						<img src={logo} alt="Logo" className="brandLogo" />
						<span className="brandName">popShop</span>
					</Link>
					<nav className="navbar">
						<NavLink to="/" className={activeLink}>
							<span>Home</span>
						</NavLink>
						<NavLink to="/products" className={activeLink}>
							<span>Products</span>
						</NavLink>
						<NavLink
							to="/account/myWishlist"
							className={activeLink}
						>
							<span>Wishlist</span>
						</NavLink>
					</nav>
					{location.pathname !== "/auth" && (
						<>
							<div
								className="searchBar"
								onClick={() => navigate("/search")}
							>
								<div className="searchWrapper">
									<LuSearch className="searchIcon" />
									<span className="searchPlaceholder">
										Search for Products, Brands and More
									</span>
								</div>
							</div>
							<div className="shoppingBag">
								<Link
									to="/shopping-bag"
									className="shoppingBagWrapper"
								>
									<img
										src={bag}
										alt="Shopping bag"
										className="shoppingBagIcon"
									/>
									{user && (
										<span className="numItems">
											{user?.cart.length}
										</span>
									)}
								</Link>
							</div>
							<div
								className="user"
								onClick={() => setIsMenuOpen((prev) => !prev)}
							>
								<div className="userWrapper">
									{user ? (
										<>
											<IoMenu className="userMenuIcon" />
											{user.avatar ? (
												<img
													src={user.avatar}
													alt={user.username}
													className="userProfilePic"
												/>
											) : (
												<GoPerson className="userIcon" />
											)}
										</>
									) : (
										<span className="userLoginText">
											Login
										</span>
									)}
								</div>
								{isMenuOpen && <UserMenu />}
							</div>
							<div className="menu">
								<IoMenu className="menuIcon" />
							</div>
						</>
					)}
				</div>
				<div className="secHeader">
					<div
						className="searchBar"
						onClick={() => navigate("/search")}
					>
						<div className="searchWrapper">
							<LuSearch className="searchIcon" />
							<span className="searchPlaceholder">
								Search for Products, Brands and More
							</span>
							<span className="miniSearchPlaceholder">
								Search here...
							</span>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
