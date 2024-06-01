// STYLES IMPORT
import styles from "./styles.module.css";

import { RxCross2 } from "react-icons/rx";
import Modal from "../../components/modal/Modal";
import { useAuthModal } from "../../hooks/useAuthModal";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const AuthModal = () => {
	const [formType, setFromType] = useState<"login" | "register">("register");

	const { isOpen, onClose } = useAuthModal();

	const body = (
		<div className={styles.authBody}>
			<div className={styles.wrapper}>
				{formType === "login" ? (
					<Login setFromType={setFromType} />
				) : (
					<Register setFromType={setFromType} />
				)}
			</div>
		</div>
	);

	return (
		<Modal
			body={body}
			headerIcon={RxCross2}
			isOpen={isOpen}
			onClose={onClose}
			headerIconOnClick={onClose}
			title="Log in or sign up"
		/>
	);
};

export default AuthModal;
