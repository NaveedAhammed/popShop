// STYLES MODULE IMPORT
import styles from "./header.module.css";

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
	return `${styles.navLink} ${isActive ? styles.active : styles.inactive}`;
};

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const location = useLocation();

	const { user } = useUserStore();

	const navigate = useNavigate();

	return (
		<header className={styles.header}>
			<div className="container">
				<div className={styles.mainHeader}>
					<Link to="/" className={styles.brand}>
						<img
							src={logo}
							alt="Logo"
							className={styles.brandLogo}
						/>
						<span className={styles.brandName}>popShop</span>
					</Link>
					<nav className={styles.navbar}>
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
								className={styles.searchBar}
								onClick={() => navigate("/search")}
							>
								<div className={styles.searchWrapper}>
									<LuSearch className={styles.searchIcon} />
									<span className={styles.searchPlaceholder}>
										Search for Products, Brands and More
									</span>
								</div>
							</div>
							<div className={styles.shoppingBag}>
								<Link
									to="/shopping-bag"
									className={styles.shoppingBagWrapper}
								>
									<img
										src={bag}
										alt="Shopping bag"
										className={styles.shoppingBagIcon}
									/>
									{user && (
										<span className={styles.numItems}>
											{user?.cart.length}
										</span>
									)}
								</Link>
							</div>
							<div
								className={styles.user}
								onClick={() => setIsMenuOpen((prev) => !prev)}
							>
								<div className={styles.userWrapper}>
									{user ? (
										<>
											<IoMenu
												className={styles.userMenuIcon}
											/>
											{user.avatar ? (
												<img
													src={user.avatar}
													alt={user.username}
													className={
														styles.userProfilePic
													}
												/>
											) : (
												<GoPerson
													className={styles.userIcon}
												/>
											)}
										</>
									) : (
										<span className={styles.userLoginText}>
											Login
										</span>
									)}
								</div>
								{isMenuOpen && <UserMenu />}
							</div>
							<div className={styles.menu}>
								<IoMenu className={styles.menuIcon} />
							</div>
						</>
					)}
				</div>
				<div className={styles.secHeader}>
					<div className={styles.searchBar}>
						<div className={styles.searchWrapper}>
							<LuSearch className={styles.searchIcon} />
							<span className={styles.searchPlaceholder}>
								Search for Products, Brands and More
							</span>
							<span className={styles.miniSearchPlaceholder}>
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
