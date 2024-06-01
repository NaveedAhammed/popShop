// STYLES MODULE IMPORT
import styles from "./heroBanners.module.css";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import BannerItem from "./BannerItem";
import { useRef, useState } from "react";
import Button from "../button/Button";
import { BillboardType } from "../../types";

const HeroBanners: React.FC<{
	heading: string;
	billboards: BillboardType[];
	isLoading: boolean;
}> = ({ heading, billboards, isLoading }) => {
	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
	const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

	const sliderRef = useRef<HTMLDivElement>(null);

	const scroll = (dir: string) => {
		if (sliderRef.current) {
			const firstElementChildWidth = sliderRef.current.firstElementChild
				? sliderRef.current.firstElementChild?.clientWidth
				: 0;
			if (dir === "forward") {
				sliderRef.current.scrollTo({
					left: sliderRef.current.scrollLeft + firstElementChildWidth,
				});
			}
			if (dir === "back") {
				sliderRef.current.scrollTo({
					left: sliderRef.current.scrollLeft - firstElementChildWidth,
				});
			}
		}
	};

	const handleOnScroll = (ele: React.UIEvent<HTMLDivElement, UIEvent>) => {
		if (ele.currentTarget.scrollLeft <= 0) {
			setPrevBtnDisabled(true);
		} else {
			setPrevBtnDisabled(false);
		}
		if (
			ele.currentTarget.scrollWidth - ele.currentTarget.scrollLeft ===
			ele.currentTarget.clientWidth
		) {
			setNextBtnDisabled(true);
		} else {
			setNextBtnDisabled(false);
		}
	};

	const shimmerElements = Array.from({ length: 4 }).map((_, i) => (
		<div
			className={`${styles.shimmerBannerItem} shimmer-animation`}
			key={i}
		></div>
	));

	return (
		<div className={styles.heroBanners}>
			<div className={styles.wrapper}>
				<div className={styles.header}>
					{isLoading ? (
						<div
							className={`${styles.shimmerH2} shimmer-animation`}
						></div>
					) : (
						<h2>{heading}</h2>
					)}
					<div className={styles.actionBtns}>
						<Button
							backgroundColor="white"
							backgroundColorCode="0"
							color="black"
							colorCode="0"
							borderColor="gray"
							borderColorCode="200"
							rounded="full"
							size="icon"
							borderWidth="100"
							onClick={() => scroll("back")}
							disabled={prevBtnDisabled}
						>
							<IoIosArrowBack className={styles.arrowIcon} />
						</Button>
						<Button
							backgroundColor="white"
							backgroundColorCode="0"
							color="black"
							colorCode="0"
							borderColor="gray"
							borderColorCode="200"
							rounded="full"
							size="icon"
							borderWidth="100"
							onClick={() => scroll("forward")}
							disabled={nextBtnDisabled}
						>
							<IoIosArrowForward className={styles.arrowIcon} />
						</Button>
					</div>
				</div>
				<div
					ref={sliderRef}
					className={styles.bannersSlider}
					onScroll={handleOnScroll}
				>
					{isLoading
						? shimmerElements
						: billboards.map((billboard) => (
								<BannerItem
									bannerImg={billboard.imageUrl}
									subHeading="Collection"
									heading={billboard.title}
									key={billboard._id}
								/>
						  ))}
				</div>
			</div>
		</div>
	);
};

export default HeroBanners;
