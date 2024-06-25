// STYLES IMPORT
import "./redirect.css";

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
		<div className="container redirect">
			<div className="wrapper">
				<div className="authBody">
					{formType === "login" ? (
						<Login setFromType={setFromType} reload={false} />
					) : (
						<Register reload={false} setFromType={setFromType} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Redirect;
