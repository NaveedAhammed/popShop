// STYLES MODULE IMPORT
import "./chipCarousel.css";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Button from "../button/Button";
import ChipItem from "./ChipItem";
import { useEffect, useRef, useState } from "react";

const ChipCarousel: React.FC<{
	heading?: string;
	chips: { label: string; path: string }[];
	isLoading: boolean;
}> = ({ heading, chips, isLoading }) => {
	const [leftBtnVisible, setLeftBtnVisible] = useState(false);
	const [rightBtnVisible, setRightBtnVisible] = useState(true);
	const [dragging, setDragging] = useState(false);

	const sliderRef = useRef<HTMLDivElement>(null);

	const handleScrolling = (dir: string) => {
		if (sliderRef.current) {
			if (dir === "right") {
				sliderRef.current.scrollTo({
					left:
						sliderRef.current.scrollLeft +
						(sliderRef.current.clientWidth * 70) / 100,
				});
			}
			if (dir === "left") {
				sliderRef.current.scrollTo({
					left:
						sliderRef.current.scrollLeft -
						(sliderRef.current.clientWidth * 70) / 100,
				});
			}
		}
	};

	const handleOnScroll = (ele: React.UIEvent<HTMLDivElement, UIEvent>) => {
		if (ele.currentTarget.scrollLeft <= 0) {
			setLeftBtnVisible(false);
		} else {
			setLeftBtnVisible(true);
		}
		if (
			Math.floor(
				ele.currentTarget.scrollWidth - ele.currentTarget.scrollLeft
			) <= ele.currentTarget.clientWidth
		) {
			setRightBtnVisible(false);
		} else {
			setRightBtnVisible(true);
		}
	};

	const handleDrag = (ele: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (!dragging) return;
		if (sliderRef.current) {
			sliderRef.current.scrollLeft -= ele.movementX;
		}
	};

	const handleOnMouseDown = () => {
		setDragging(true);
	};

	const handleOnMouseUp = () => {
		setDragging(false);
	};

	useEffect(() => {
		const handleLisiner = () => {
			setDragging(false);
		};
		window.addEventListener("mouseup", handleLisiner);

		return () => window.removeEventListener("mouseup", handleLisiner);
	}, []);

	const shimmerElements = Array.from({ length: 15 }).map((_, i) => (
		<div className={`shimmerChipItem shimmer-animation`} key={i}></div>
	));

	return (
		<div className="chipCarousel">
			<div className="wrapper">
				{heading && <div className="heading">{heading}</div>}
				<div className="links">
					<div
						className={`actionBtn btnLeft ${
							leftBtnVisible ? "active" : "inactive"
						}`}
					>
						<Button
							backgroundColor="white"
							backgroundColorCode="0"
							color="black"
							colorCode="0"
							rounded="full"
							size="icon"
							borderWidth="100"
							borderColor="gray"
							borderColorCode="100"
							shadow="normal"
							onClick={() => handleScrolling("left")}
							style={{ width: "4rem", height: "4rem" }}
						>
							<IoIosArrowBack />
						</Button>
					</div>
					<div
						className={`slider ${
							dragging ? "dragging" : "scrolling"
						}`}
						ref={sliderRef}
						onScroll={handleOnScroll}
						onMouseDown={handleOnMouseDown}
						onMouseMove={handleDrag}
						onMouseUp={handleOnMouseUp}
					>
						{isLoading
							? shimmerElements
							: chips.map((chip, i) => (
									<ChipItem chip={chip} key={i} />
							  ))}
					</div>
					<div
						className={`actionBtn btnRight ${
							rightBtnVisible ? "active" : "inactive"
						}`}
					>
						<Button
							backgroundColor="white"
							backgroundColorCode="0"
							color="black"
							colorCode="0"
							rounded="full"
							size="icon"
							borderWidth="100"
							borderColor="gray"
							borderColorCode="100"
							shadow="normal"
							onClick={() => handleScrolling("right")}
							style={{ width: "4rem", height: "4rem" }}
						>
							<IoIosArrowForward />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChipCarousel;
