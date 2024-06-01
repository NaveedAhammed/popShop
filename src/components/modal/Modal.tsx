// STYLES MODULE IMPORT
import styles from "./modal.module.css";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IconType } from "react-icons";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	description?: string;
	body: React.ReactNode;
	headerIcon: IconType;
	headerIconOnClick?: () => void;
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	title,
	body,
	headerIcon: HeaderIcon,
	headerIconOnClick,
}) => {
	const [showModal, setShowModal] = useState<boolean>(isOpen);

	useEffect(
		function () {
			setShowModal(isOpen);
		},
		[isOpen]
	);

	useEffect(() => {
		if (showModal) {
			document.body.style.overflowY = "hidden";
		} else {
			document.body.style.overflowY = "unset";
		}
	}, [showModal]);

	if (!isOpen) return null;

	return createPortal(
		<div
			className={`${styles.modal} ${
				showModal ? "modal-open" : styles.close
			}`}
		>
			<div className={styles.overlay}></div>
			<div
				className={`${styles.wrapper} ${
					showModal ? styles.active : styles.inactive
				}`}
			>
				<div className={styles.header}>
					<HeaderIcon
						className={styles.headerIcon}
						onClick={headerIconOnClick}
					/>
					<h2 className="">{title}</h2>
				</div>
				<div className={styles.body}>{body}</div>
			</div>
		</div>,
		document.getElementById("modal")!
	);
};

export default Modal;
