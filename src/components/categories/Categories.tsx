// STYLES MODULE IMPORT
import "./categories.css";

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
		<div className={`shimmerCategoryItem shimmer-animation`} key={i}></div>
	));

	return (
		<div className="categories">
			<div className="wrapper">
				{isLoading ? (
					<div className={`shimmerHeading shimmer-animation`}></div>
				) : (
					<div className="heading">Explore Popular Categories</div>
				)}
				<div className="items">
					<div
						className={`arrowBtn arrowLeft ${
							prevBtnVisible ? "active" : "inactive"
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
						className="slider"
						ref={sliderRef}
						onScroll={handleOnScroll}
					>
						{isLoading ? (
							shimmerElements
						) : (
							<>
								<CategoryItem
									categoryImg={men}
									label="Men"
									path="/products?parentCategory=Men"
								/>
								<CategoryItem
									categoryImg={women}
									label="Women"
									path="/products?parentCategory=Women"
								/>
								<CategoryItem
									categoryImg={kids}
									label="Kids"
									path="/products?parentCategory=Kids"
								/>
								<CategoryItem
									categoryImg={elec}
									label="Electronics"
									path="/products?parentCategory=Electornics"
								/>
								<CategoryItem
									categoryImg={fur}
									label="Furniture"
									path="/products?parentCategory=Furniture"
								/>
								<CategoryItem
									categoryImg={toys}
									label="Toys"
									path="/products?parentCategory=Toys"
								/>
								<CategoryItem
									categoryImg={kit}
									label="Kitchen"
									path="/products?parentCategory=Kitchen"
								/>
								<CategoryItem
									categoryImg={home}
									label="Home"
									path="/products?parentCategory=Home"
								/>
								<CategoryItem
									categoryImg={mobiles}
									label="Mobiles"
									path="/products?parentCategory=Electronics&childCategory=Mobiles"
								/>
								<CategoryItem
									categoryImg={gro}
									label="Grocery"
									path="/products?parentCategory=Grocery"
								/>
							</>
						)}
					</div>
					<div
						className={`arrowBtn arrowRight ${
							nextBtnVisible ? "active" : "inactive"
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
