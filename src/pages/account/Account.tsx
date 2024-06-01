import { NavLink, Outlet } from "react-router-dom";
import styles from "../account.module.css";
import { Suspense } from "react";
import Loader from "../../components/loader/Loader";

const activeLink = ({ isActive }: { isActive: boolean }) => {
	return `${styles.link} ${isActive ? styles.active : styles.inActive}`;
};

const Profile = () => {
	return (
		<section className={`container ${styles.account}`}>
			<div className={styles.navbar}>
				<NavLink to="/account/myProfile" className={activeLink}>
					My Profile
				</NavLink>
				<NavLink to="/account/addresses" className={activeLink}>
					Manage Addresses
				</NavLink>
				<NavLink to="/account/myWishlist" className={activeLink}>
					My Wishlist
				</NavLink>
				<NavLink to="/account/myOrders" className={activeLink}>
					My Orders
				</NavLink>
				<NavLink to="/account/myReviews" className={activeLink}>
					My Reviews
				</NavLink>
			</div>
			<div className={styles.outlet}>
				<Suspense
					fallback={
						<div className={styles.lazyLoader}>
							<Loader width="5rem" height="5rem" color="black" />
						</div>
					}
				>
					<Outlet />
				</Suspense>
			</div>
		</section>
	);
};

export default Profile;
