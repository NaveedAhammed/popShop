import { useEffect, useState } from "react";
import Loader from "./components/loader/Loader";
import { Outlet } from "react-router-dom";
import useRefreshToken from "./hooks/useRefreshToken";
import { useUserStore } from "./hooks/useUserStore";

const PersistLogin = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const refresh = useRefreshToken();
	const { user } = useUserStore();
	const isLoggedIn = localStorage.getItem("isLoggedIn");

	useEffect(() => {
		const verifyRefreshToken = async () => {
			try {
				setIsLoading(true);
				await refresh();
			} catch (err) {
				console.log(err);
			} finally {
				setIsLoading(false);
			}
		};

		isLoggedIn &&
			isLoggedIn === "true" &&
			!user?.accessToken &&
			verifyRefreshToken();
	}, [user, refresh, isLoggedIn]);

	return (
		<>
			{isLoading ? (
				<div
					style={{
						width: "100%",
						height: "100%",
						minHeight: "100vh",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Loader width="5rem" height="5rem" color="black" />
				</div>
			) : (
				<Outlet />
			)}
		</>
	);
};

export default PersistLogin;
