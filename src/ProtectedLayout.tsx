import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserStore } from "./hooks/useUserStore";

const ProtectedLayout = () => {
	const { user } = useUserStore();
	const location = useLocation();
	if (!user) {
		return (
			<Navigate
				to={`/auth?redirect=${location.pathname}`}
				replace
				state={{ redirect: location }}
			/>
		);
	}
	return <Outlet />;
};

export default ProtectedLayout;
