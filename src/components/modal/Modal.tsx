// STYLES MODULE IMPORT
import "./modal.css";

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
		<div className={`modal ${showModal ? "modal-open" : "close"}`}>
			<div className="overlay"></div>
			<div className={`wrapper ${showModal ? "active" : "inactive"}`}>
				<div className="modalHeader">
					<HeaderIcon
						className="headerIcon"
						onClick={headerIconOnClick}
					/>
					<h2>{title}</h2>
				</div>
				<div className="body">{body}</div>
			</div>
		</div>,
		document.getElementById("modal")!
	);
};

export default Modal;
