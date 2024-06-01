// STYLES IMPORT
import styles from "../redirect.module.css";

import { useEffect, useState } from "react";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { useUserStore } from "../../hooks/useUserStore";
import { useLocation, useNavigate } from "react-router-dom";

const Redirect = () => {
	const [formType, setFromType] = useState<"login" | "register">("register");

	const { user } = useUserStore();

	const { state: locationState } = useLocation();

	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			if (locationState) {
				const { redirect } = locationState;
				return navigate(`${redirect.pathname}${redirect.search}`);
			}
			navigate("/");
		}
	}, [user, navigate, locationState]);

	return (
		<div className={`container ${styles.redirect}`}>
			<div className={styles.wrapper}>
				<div className={styles.authBody}>
					{formType === "login" ? (
						<Login setFromType={setFromType} />
					) : (
						<Register setFromType={setFromType} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Redirect;
