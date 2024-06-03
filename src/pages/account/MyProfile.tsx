import "./account.css";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { TbEdit } from "react-icons/tb";
import { GoMail, GoPerson } from "react-icons/go";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { useState } from "react";
import profilePic from "../../assets/profile-pic.svg";
import { useUserStore } from "../../hooks/useUserStore";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import toast from "react-hot-toast";
import { UserType } from "../../types";
import { errorHandler } from "../../utils/errorHandler";
import Loader from "../../components/loader/Loader";

interface IMyProfileInput {
	username: string;
	email: string;
	phone?: number | null;
	gender?: string | null;
}

// yup schema
const schema = yup.object().shape({
	username: yup.string().required("Username is required"),
	email: yup.string().required("Email is required").email("Invaild email"),
	phone: yup
		.number()
		.nullable()
		.typeError("Alternate phone must be a number")
		.notRequired(),
	gender: yup.string().notRequired(),
});

const MyProfile = () => {
	const [editing, setEditing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const { user, setUser } = useUserStore();

	const axiosPrivate = useAxiosPrivate();

	const methods = useForm<IMyProfileInput>({
		defaultValues: {
			username: user?.username,
			email: user?.email,
			phone: user?.phone,
			gender: user?.gender,
		},
		resolver: yupResolver(schema),
	});

	const handleUpdatePersonalInfo: SubmitHandler<IMyProfileInput> = (
		formData: IMyProfileInput
	) => {
		setIsLoading(true);
		axiosPrivate
			.put("/myProfile/update", formData)
			.then((res) => {
				if (!res.data.success) {
					return toast.error(
						"Profile update failed, Please try again"
					);
				}
				const { user: userData } = res.data.data;
				if (user) {
					const newUser: UserType = {
						...user,
						username: userData?.username,
						email: userData?.email,
						phone: userData?.phone,
						gender: userData?.gender,
					};
					setUser(newUser);
				}
				setEditing(false);
			})
			.catch(errorHandler)
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<div className="myProfile">
			<div className="profileWrapper">
				<div className="profileHeader">
					<div className="profileImg">
						<img src={user?.avatar || profilePic} alt="" />
					</div>
					<div className="profileInfo">
						<span style={{ fontSize: "1.2rem", fontWeight: "400" }}>
							Hello,
						</span>
						<span className="profileName">{user?.username}</span>
					</div>
					{!editing && (
						<div className="btnEdit">
							<Button
								size="default"
								onClick={() => setEditing(true)}
								backgroundColor="gray"
								backgroundColorCode="100"
								color="black"
								colorCode="0"
								rounded="lg"
							>
								<span>Edit</span>
								<TbEdit />
							</Button>
						</div>
					)}
				</div>
				<div className="personalInfo">
					<hr className="separator" />
					<h2 style={{ fontSize: "1.8rem", fontWeight: "400" }}>
						Personal Information
					</h2>
					<FormProvider {...methods}>
						<form
							className="profileForm"
							onSubmit={methods.handleSubmit(
								handleUpdatePersonalInfo
							)}
						>
							<Input
								autoComplete="off"
								id="username"
								name="username"
								type="text"
								placeholder="Naveed"
								leadingIcon={GoPerson}
								disabled={!editing}
							/>
							<Input
								autoComplete="off"
								id="email"
								name="email"
								type="email"
								placeholder="naveed@gmail.com"
								leadingIcon={GoMail}
								disabled={!editing}
							/>
							<Input
								autoComplete="off"
								id="phone"
								name="phone"
								type="number"
								placeholder="919*****18"
								leadingIcon={MdOutlinePhoneIphone}
								disabled={!editing}
							/>
							<div className="gender">
								<div className="genderItem">
									<label htmlFor="male">Male</label>
									<input
										autoComplete="off"
										id="male"
										type="radio"
										value="male"
										{...methods.register("gender")}
										disabled={!editing}
									/>
								</div>
								<div className="genderItem">
									<label htmlFor="female">Female</label>
									<input
										autoComplete="off"
										id="female"
										type="radio"
										value="female"
										{...methods.register("gender")}
										disabled={!editing}
									/>
								</div>
							</div>
							{editing && (
								<div className="profileSubmit">
									<Button
										size="md"
										onClick={() => setEditing(false)}
										backgroundColor="gray"
										backgroundColorCode="100"
										color="black"
										colorCode="0"
										rounded="lg"
									>
										Cancel
									</Button>
									<Button
										size="md"
										type="submit"
										backgroundColor="black"
										backgroundColorCode="0"
										color="white"
										colorCode="0"
										rounded="lg"
									>
										{isLoading && (
											<Loader
												width="1rem"
												height="1rem"
												color="white"
											/>
										)}
										Update
									</Button>
								</div>
							)}
						</form>
					</FormProvider>
				</div>
			</div>
		</div>
	);
};

export default MyProfile;
