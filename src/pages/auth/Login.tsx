import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "../styles.module.css";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import Loader from "../../components/loader/Loader";
import { AiOutlineGithub } from "react-icons/ai";
import { privateAxios } from "../../utils/axios";
import toast from "react-hot-toast";
import { useUserStore } from "../../hooks/useUserStore";
import { errorHandler } from "../../utils/errorHandler";
import { useAuthModal } from "../../hooks/useAuthModal";

interface ILoginInput {
	email: string;
	password: string;
}

// yup schema
const schema = yup.object().shape({
	email: yup.string().required("Email is required").email("Invalid email"),
	password: yup.string().required("Password is required"),
});

const Login: React.FC<{
	setFromType: React.Dispatch<React.SetStateAction<"register" | "login">>;
}> = ({ setFromType }) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const { setUser } = useUserStore();

	const { onClose } = useAuthModal();

	const methods = useForm<ILoginInput>({ resolver: yupResolver(schema) });

	const onSubmit: SubmitHandler<ILoginInput> = (formData: ILoginInput) => {
		setIsLoading(true);
		privateAxios
			.post("/login", formData)
			.then((res) => {
				if (!res.data.success) {
					return toast.error("Login failed, Please try again");
				}
				const { user: userData, accessToken } = res.data.data;
				setUser({
					_id: userData.id,
					username: userData.username,
					accessToken,
					avatar: userData?.avatar,
					wishlistIds: userData?.wishlistIds || [],
					email: userData?.email,
					phone: userData?.phone,
					gender: userData?.gender,
					cart: userData?.cart || [],
					shippingAddresses: userData?.shippingAddresses || [],
				});
				onClose();
				location.reload();
				localStorage.setItem("isLoggedIn", "true");
				console.log(userData);
			})
			.catch(errorHandler)
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		methods.setFocus("email");
	}, [methods]);

	return (
		<div className={styles.registerForm}>
			<div className={styles.heading}>
				<h1 className={styles.title}>Welcome back!</h1>
				<span>Enter your account details to login</span>
			</div>
			<FormProvider {...methods}>
				<form
					className={styles.form}
					onSubmit={methods.handleSubmit(onSubmit)}
				>
					<Input
						id="email"
						name="email"
						type="email"
						autoComplete="off"
						placeholder="Email"
					/>
					<Input
						id="password"
						name="password"
						type={isPasswordVisible ? "text" : "password"}
						autoComplete="off"
						placeholder="Password"
						tralingIcon={isPasswordVisible ? GoEye : GoEyeClosed}
						tralingIconOnClick={() =>
							setIsPasswordVisible((prev) => !prev)
						}
					/>
					<Button
						backgroundColor="primary"
						backgroundColorCode="500"
						color="white"
						colorCode="0"
						rounded="lg"
						size="lg"
						type="submit"
						style={{ width: "100%", marginTop: "2rem" }}
					>
						{isLoading && (
							<Loader width="2rem" height="2rem" color="white" />
						)}
						Continue
					</Button>
					<div className={styles.alternate}>
						<span className={styles.sub}>
							Don't have an account?
						</span>
						<span
							className={styles.main}
							onClick={() => setFromType("register")}
						>
							Register
						</span>
					</div>
				</form>
			</FormProvider>
			<div className={styles.seperator}>
				<span>or</span>
			</div>
			<div className={styles.socialAccounts}>
				<Button
					backgroundColor="white"
					backgroundColorCode="0"
					borderColor="gray"
					borderColorCode="500"
					color="black"
					colorCode="0"
					rounded="lg"
					size="md"
					borderWidth="100"
					style={{ width: "100%" }}
				>
					<FcGoogle />
					<span>Continue with Google</span>
				</Button>
				<Button
					backgroundColor="white"
					backgroundColorCode="0"
					borderColor="gray"
					borderColorCode="500"
					color="black"
					colorCode="0"
					rounded="lg"
					size="md"
					borderWidth="100"
					style={{ width: "100%" }}
				>
					<AiOutlineGithub />
					<span>Continue with Github</span>
				</Button>
			</div>
		</div>
	);
};

export default Login;
