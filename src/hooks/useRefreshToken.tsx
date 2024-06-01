import { AxiosError } from "axios";
import { privateAxios } from "../utils/axios";
import { useUserStore } from "./useUserStore";

const useRefreshToken = () => {
	const { setUser } = useUserStore();

	const refresh = async () => {
		try {
			const res = (await privateAxios.get("/refresh")).data;
			const { user: userData, accessToken } = res.data;
			setUser({
				username: userData.username,
				avatar: userData?.avatar,
				accessToken,
				_id: userData.id,
				wishlistIds: userData?.wishlistIds || [],
				email: userData?.email,
				phone: userData?.phone,
				gender: userData?.gender,
				cart: userData?.cart || [],
				shippingAddresses: userData?.shippingAddresses || [],
			});
			return res.data.accessToken;
		} catch (err) {
			const error = err as AxiosError;
			if (error?.response?.status === 401) {
				setUser(null);
				localStorage.setItem("isLoggedIn", "false");
			}
		}
	};

	return refresh;
};

export default useRefreshToken;
