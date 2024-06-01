// STYLES MODULE IMPORT
import { useRef, useState } from "react";
import styles from "./products.module.css";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Button from "../button/Button";
import ProductItem from "./ProductItem";
import { ProductType } from "../../types";

const Products: React.FC<{
	products: ProductType[];
	heading?: string;
	isLoading: boolean;
}> = ({ products, heading, isLoading }) => {
	const [prevBtnVisible, setPrevBtnVisible] = useState(false);
	const [nextBtnVisible, setNextBtnVisible] = useState(true);

	const sliderRef = useRef<HTMLDivElement>(null);

	const scroll = (dir: string) => {
		if (sliderRef.current) {
			const firstElementChildWidth = sliderRef.current.firstElementChild
				? sliderRef.current.firstElementChild?.clientWidth
				: 0;
			if (dir === "next") {
				sliderRef.current.scrollTo({
					left: sliderRef.current.scrollLeft + firstElementChildWidth,
				});
			}
			if (dir === "prev") {
				sliderRef.current.scrollTo({
					left: sliderRef.current.scrollLeft - firstElementChildWidth,
				});
			}
		}
	};

	const handleOnScroll = (ele: React.UIEvent<HTMLDivElement, UIEvent>) => {
		if (ele.currentTarget.scrollLeft <= 0) {
			setPrevBtnVisible(false);
		} else {
			setPrevBtnVisible(true);
		}
		if (
			ele.currentTarget.scrollWidth - ele.currentTarget.scrollLeft - 10 <=
			ele.currentTarget.clientWidth
		) {
			setNextBtnVisible(false);
		} else {
			setNextBtnVisible(true);
		}
	};

	const shimmerElements = Array.from({ length: 15 }).map((_, i) => (
		<div className={styles.shimmerProductItem} key={i}>
			<div className={styles.shimmerItemWrapper}>
				<div
					className={`${styles.shimmerProductImg} shimmer-animation`}
				></div>
				<div
					className={`${styles.shimmerTextSmall} shimmer-animation`}
				></div>
				<div
					className={`${styles.shimmerTextMedium} shimmer-animation`}
				></div>
				<div
					className={`${styles.shimmerTextLarge} shimmer-animation`}
				></div>
			</div>
		</div>
	));

	return (
		<div className={styles.products}>
			<div className={styles.wrapper}>
				{heading && (
					<>
						{isLoading ? (
							<div
								className={`${styles.shimmerHeading} shimmer-animation`}
							></div>
						) : (
							<div className={styles.heading}>{heading}</div>
						)}
					</>
				)}
				<div className={styles.items}>
					<div
						className={`${styles.arrowBtn} ${styles.arrowLeft} ${
							prevBtnVisible ? styles.active : styles.inactive
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
							onClick={() => scroll("prev")}
							style={{
								width: "4rem",
								height: "4rem",
								fontSize: "2rem",
							}}
						>
							<IoIosArrowBack />
						</Button>
					</div>
					<div
						className={styles.slider}
						ref={sliderRef}
						onScroll={handleOnScroll}
					>
						{isLoading
							? shimmerElements
							: products.map((product) => (
									<ProductItem
										product={product}
										key={product._id}
									/>
							  ))}
					</div>
					<div
						className={`${styles.arrowBtn} ${styles.arrowRight} ${
							nextBtnVisible ? styles.active : styles.inactive
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
							onClick={() => scroll("next")}
							style={{
								width: "4rem",
								height: "4rem",
								fontSize: "2rem",
							}}
						>
							<IoIosArrowForward />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Products;
