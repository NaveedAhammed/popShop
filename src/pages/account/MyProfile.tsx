import "./account.css";

import { FormProvider, useForm } from "react-hook-form";
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

	const { user } = useUserStore();

	const methods = useForm<IMyProfileInput>({
		defaultValues: {
			username: user?.username,
			email: user?.email,
			phone: user?.phone,
			gender: user?.gender,
		},
		resolver: yupResolver(schema),
	});

	return (
		<div className="myProfile">
			<div className="profileWrapper">
				<div className="header">
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
						<form className="profileForm">
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
