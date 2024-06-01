// STYLES MODULE IMPORT
import styles from "./categories.module.css";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import Button from "../button/Button";
import men from "../../assets/men.jpeg";
import women from "../../assets/women.jpeg";
import kids from "../../assets/kids.jpeg";
import elec from "../../assets/elec.avif";
import fur from "../../assets/furniture.avif";
import toys from "../../assets/toys.jpeg";
import kit from "../../assets/kitchen.jpeg";
import home from "../../assets/home.jpeg";
import mobiles from "../../assets/mobiles.jpeg";
import gro from "../../assets/grocery.jpeg";
import CategoryItem from "./CategoryItem";
import { useRef, useState } from "react";

const Categories: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
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
			ele.currentTarget.scrollWidth - ele.currentTarget.scrollLeft <=
			ele.currentTarget.clientWidth
		) {
			setNextBtnVisible(false);
		} else {
			setNextBtnVisible(true);
		}
	};

	const shimmerElements = Array.from({ length: 10 }).map((_, i) => (
		<div
			className={`${styles.shimmerCategoryItem} shimmer-animation`}
			key={i}
		></div>
	));

	return (
		<div className={styles.categories}>
			<div className={styles.wrapper}>
				{isLoading ? (
					<div
						className={`${styles.shimmerHeading} shimmer-animation`}
					></div>
				) : (
					<div className={styles.heading}>
						Explore Popular Categories
					</div>
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
						>
							<IoIosArrowBack />
						</Button>
					</div>
					<div
						className={styles.slider}
						ref={sliderRef}
						onScroll={handleOnScroll}
					>
						{isLoading ? (
							shimmerElements
						) : (
							<>
								<CategoryItem categoryImg={men} label="Men" />
								<CategoryItem
									categoryImg={women}
									label="Women"
								/>
								<CategoryItem categoryImg={kids} label="Kids" />
								<CategoryItem
									categoryImg={elec}
									label="Electronics"
								/>
								<CategoryItem
									categoryImg={fur}
									label="Furniture"
								/>
								<CategoryItem categoryImg={toys} label="Toys" />
								<CategoryItem
									categoryImg={kit}
									label="Kitchen"
								/>
								<CategoryItem categoryImg={home} label="Home" />
								<CategoryItem
									categoryImg={mobiles}
									label="Mobiles"
								/>
								<CategoryItem
									categoryImg={gro}
									label="Grocery"
								/>{" "}
							</>
						)}
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
						>
							<IoIosArrowForward />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Categories;
