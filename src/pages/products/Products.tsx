import "./products.css";

import { RxCross2 } from "react-icons/rx";
import { useEffect, useMemo, useState } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
	ChildCategoryType,
	ParentCategoryType,
	ProductType,
} from "../../types";
import publicAxios from "../../utils/axios";
import { errorHandler } from "../../utils/errorHandler";
import Button from "../../components/button/Button";
import { Slider } from "@mui/material";
import { PiStarFill } from "react-icons/pi";
import ProductItem from "./ProductItem";
import { IoFilter } from "react-icons/io5";
import Select from "../../components/select/Select";
import { FormProvider, useForm } from "react-hook-form";

const minDistance = 1000;

const Products = () => {
	const [isFiltersOpen, setIsFiltersOpen] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();

	const minPriceParam = searchParams.get("minPrice")
		? Number(searchParams.get("minPrice"))
		: 0;
	const maxPriceParam = searchParams.get("maxPrice")
		? Number(searchParams.get("maxPrice"))
		: 50000;
	const [price, setPrice] = useState([minPriceParam, maxPriceParam]);
	const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
	const [brands, setBrands] = useState<string[]>([]);
	const [parentCategories, setParentCategories] = useState<
		ParentCategoryType[]
	>([]);
	const [childCategories, setChildCategories] = useState<ChildCategoryType[]>(
		[]
	);
	const methods = useForm();
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const parentCategoryParam = searchParams.get("parentCategory");
	const brandsParam = searchParams.get("brands");
	const childCategoryParam = searchParams.get("childCategory");
	const searchParam = searchParams.get("search");
	const discountParam = searchParams.get("discount");
	const featured = searchParams.get("featured");
	const newArrivals = searchParams.get("newArrivals");
	const customerRatingParam = searchParams.get("customerRating");

	const updateSearchParams = (key: string, value: string) => {
		const newSearchParams = new URLSearchParams(searchParams);
		if (!value || value === "[]") {
			newSearchParams.delete(key);
		} else {
			newSearchParams.set(key, value);
		}
		setSearchParams(newSearchParams);
	};

	const handleBrandAddition = (brand: string) => {
		if (brandsParam) {
			const newBrands = JSON.parse(brandsParam) as Array<string>;
			const index = newBrands.indexOf(brand);
			if (index !== -1) {
				newBrands.splice(index, 1);
			} else {
				newBrands.push(brand);
			}
			updateSearchParams("brands", JSON.stringify(newBrands));
		} else {
			updateSearchParams("brands", JSON.stringify([brand]));
		}
	};

	const handleCustomerRatingAddition = (rating: string) => {
		if (customerRatingParam && rating === discountParam) {
			return updateSearchParams("customerRating", "");
		}
		return updateSearchParams("customerRating", rating);
	};

	const handleDiscountAddition = (discount: string) => {
		if (discountParam && discount === discountParam) {
			return updateSearchParams("discount", "");
		}
		return updateSearchParams("discount", discount);
	};

	const handleCategoriesClear = () => {
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.delete("childCategory");
		newSearchParams.delete("parentCategory");
		newSearchParams.delete("brands");
		setChildCategories([]);
		setSearchParams(newSearchParams);
	};

	const handleCategoryChange = (childCategory: string) => {
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.set("childCategory", childCategory);
		newSearchParams.delete("brands");
		setSearchParams(newSearchParams);
	};

	const getParentCategoryId = useMemo(() => {
		const parentCategory = parentCategories.find(
			(it) => it.name === parentCategoryParam
		);
		return parentCategory ? parentCategory._id : null;
	}, [parentCategories, parentCategoryParam]);

	const getChildCategoryId = useMemo(() => {
		const childCategory = childCategories.find(
			(it) => it.name === childCategoryParam
		);
		return childCategory ? childCategory._id : null;
	}, [childCategories, childCategoryParam]);

	const handleBrandChecked = (brand: string): boolean => {
		if (brandsParam) {
			const parsed = JSON.parse(brandsParam);
			return parsed.includes(brand);
		}
		return false;
	};

	const handleCustomerRatingChecked = (rating: string): boolean => {
		if (customerRatingParam) {
			return rating === customerRatingParam;
		}
		return false;
	};

	const handlePriceChange = (
		_: Event,
		newValue: number | number[],
		activeThumb: number
	) => {
		if (!Array.isArray(newValue)) {
			return;
		}
		if (activeThumb === 0) {
			const minPriceValue = Math.min(newValue[0], price[1] - minDistance);
			setPrice([minPriceValue, price[1]]);
			minPriceValue === 0
				? updateSearchParams("minPrice", "")
				: updateSearchParams("minPrice", `${minPriceValue}`);
		} else {
			const maxPriceValue = Math.max(newValue[1], price[0] + minDistance);
			setPrice([price[0], maxPriceValue]);
			maxPriceValue === 50000
				? updateSearchParams("maxPrice", "")
				: updateSearchParams("maxPrice", `${maxPriceValue}`);
		}
	};

	const handleDiscountChecked = (discount: string) => {
		if (discountParam) {
			return discount === discountParam;
		}
		return false;
	};

	const handlePriceClear = () => {
		setPrice([0, 50000]);
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.delete("minPrice");
		newSearchParams.delete("maxPrice");
		setSearchParams(newSearchParams);
	};

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getProducts = () => {
			setIsLoading(true);
			const parentCaregoryId = getParentCategoryId || "";
			const childCaregoryId = getChildCategoryId || "";
			const url = `/filteredProducts?search=${
				searchParam ? searchParam : ""
			}&parentCategoryId=${parentCaregoryId}&childCategoryId=${childCaregoryId}&brands=${brandsParam}&discount=${
				discountParam ? discountParam : 0
			}&featured=${featured}&newArrivals=${newArrivals}&minPrice=${minPriceParam}&maxPrice=${
				maxPriceParam !== 50000 ? maxPriceParam : null
			}&customerRating=${customerRatingParam ? customerRatingParam : 0}`;
			publicAxios
				.get(url, { signal: controller.signal })
				.then((res) => {
					isMounted &&
						setFilteredProducts(res.data.data.filteredProducts);
					isMounted && setBrands(res.data.data.brands);
				})
				.catch(errorHandler)
				.finally(() => {
					setIsLoading(false);
				});
		};

		getProducts();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [
		getChildCategoryId,
		getParentCategoryId,
		searchParam,
		brandsParam,
		discountParam,
		newArrivals,
		featured,
		minPriceParam,
		maxPriceParam,
		customerRatingParam,
	]);

	useEffect(() => {
		const getParentCategories = () => {
			publicAxios.get("/category/parent/public").then((res) => {
				setParentCategories(res.data.data.parentCategories);
			});
		};

		getParentCategories();
	}, []);

	useEffect(() => {
		const getChildCategories = () => {
			const item = parentCategories.find(
				(item) => item.name === parentCategoryParam
			);
			publicAxios
				.get(`/category/child/public/${item?._id}`)
				.then((res) => {
					setChildCategories(res.data.data.childCategories);
				});
		};

		(parentCategoryParam !== null || "") && getChildCategories();
	}, [parentCategoryParam, parentCategories]);

	const shimmerElements = Array.from({ length: 10 }).map((_, i) => (
		<div className="shimmerProductItem" key={i}>
			<div className="shimmerItemWrapper">
				<div className="shimmerProductImg shimmer-animation"></div>
				<div className="shimmerTextSmall shimmer-animation"></div>
				<div className="shimmerTextMedium shimmer-animation"></div>
				<div className="shimmerTextLarge shimmer-animation"></div>
			</div>
		</div>
	));

	return (
		<div className="products">
			<div className="container">
				<div className="wrapper">
					<div className={`left ${isFiltersOpen ? "open" : "close"}`}>
						<RxCross2
							className="closeIcon"
							onClick={() => setIsFiltersOpen((prev) => !prev)}
						/>
						<div className="productsHeader">
							<div className="heading">
								<span>Filters</span>
								{(parentCategoryParam ||
									childCategoryParam ||
									brandsParam ||
									minPriceParam !== 0 ||
									maxPriceParam !== 50000) && (
									<Button
										backgroundColor="white"
										backgroundColorCode="0"
										color="black"
										colorCode="0"
										rounded="full"
										size="md"
										onClick={() => navigate("/products")}
									>
										Clear All
									</Button>
								)}
							</div>
							<div className="appliedFilterItems">
								{parentCategoryParam && (
									<div
										className="filterItem"
										onClick={handleCategoriesClear}
									>
										<span className="filterName">
											{parentCategoryParam}
										</span>
										<RxCross2 />
									</div>
								)}
								{childCategoryParam && (
									<div
										className="filterItem"
										onClick={() =>
											updateSearchParams(
												"childCategory",
												""
											)
										}
									>
										<span className="filterName">
											{childCategoryParam}
										</span>
										<RxCross2 />
									</div>
								)}
								{featured && (
									<div
										className="filterItem"
										onClick={() =>
											updateSearchParams("featured", "")
										}
									>
										<span className="filterName">
											Featured
										</span>
										<RxCross2 />
									</div>
								)}
								{newArrivals && (
									<div
										className="filterItem"
										onClick={() =>
											updateSearchParams(
												"newArrivals",
												""
											)
										}
									>
										<span className="filterName">
											New Arrivals
										</span>
										<RxCross2 />
									</div>
								)}
								{brandsParam &&
									JSON.parse(brandsParam).map(
										(it: string) => (
											<div
												className="filterItem"
												onClick={() =>
													handleBrandAddition(it)
												}
												key={it}
											>
												<span className="filterName">
													{it}
												</span>
												<RxCross2 />
											</div>
										)
									)}
								{customerRatingParam && (
									<div
										className="filterItem"
										onClick={() =>
											updateSearchParams(
												"customerRating",
												""
											)
										}
									>
										<span className="filterName">
											{customerRatingParam}{" "}
											<PiStarFill className="starIcon" />{" "}
											& above
										</span>
										<RxCross2 />
									</div>
								)}
								{discountParam && (
									<div
										className="filterItem"
										onClick={() =>
											updateSearchParams("discount", "")
										}
									>
										<span className="filterName">
											{discountParam}% or more
										</span>
										<RxCross2 />
									</div>
								)}
								{minPriceParam > 0 && (
									<div
										className="filterItem"
										onClick={() => {
											updateSearchParams("minPrice", "");
											setPrice((prev) => [0, prev[1]]);
										}}
									>
										<span className="filterName">
											Min Price: {minPriceParam}
										</span>
										<RxCross2 />
									</div>
								)}
								{maxPriceParam < 50000 && (
									<div
										className="filterItem"
										onClick={() => {
											updateSearchParams("maxPrice", "");
											setPrice((prev) => [
												prev[0],
												50000,
											]);
										}}
									>
										<span className="filterName">
											Max Price: {maxPriceParam}
										</span>
										<RxCross2 />
									</div>
								)}
							</div>
						</div>
						<div className="filters">
							<div className="filter">
								<div className="filterHeading">
									<span>Categories</span>
									{parentCategoryParam && (
										<Button
											backgroundColor="white"
											backgroundColorCode="0"
											color="black"
											colorCode="0"
											rounded="full"
											size="sm"
											onClick={handleCategoriesClear}
										>
											Clear
										</Button>
									)}
								</div>
								<div className="list">
									{parentCategories.length > 0 &&
										parentCategories.map(
											(parentCategory) => (
												<div
													className={`parentCategory ${
														parentCategory.name.includes(
															parentCategoryParam ||
																""
														)
															? "block"
															: "hidden"
													} ${
														parentCategoryParam ===
														parentCategory.name
															? "active"
															: ""
													}`}
													key={parentCategory._id}
												>
													<div
														className="listItem"
														onClick={() =>
															updateSearchParams(
																"parentCategory",
																`${parentCategory.name}`
															)
														}
													>
														{parentCategoryParam &&
														childCategories.length >
															0 ? (
															<IoIosArrowDown />
														) : (
															<IoIosArrowForward />
														)}
														<span>
															{
																parentCategory.name
															}
														</span>
													</div>
													{parentCategoryParam &&
														childCategories.length >
															0 && (
															<div className="subList">
																{childCategories.map(
																	(
																		childCategory
																	) => (
																		<span
																			className={`subListItem ${
																				childCategoryParam ===
																				childCategory.name
																					? "active"
																					: ""
																			}`}
																			key={
																				childCategory._id
																			}
																			onClick={() =>
																				handleCategoryChange(
																					childCategory.name
																				)
																			}
																		>
																			{
																				childCategory.name
																			}
																		</span>
																	)
																)}
															</div>
														)}
												</div>
											)
										)}
								</div>
							</div>
							<div className="filter">
								<div className="filterHeading">
									<span>Price</span>
									{(minPriceParam > 0 ||
										maxPriceParam < 50000) && (
										<Button
											backgroundColor="white"
											backgroundColorCode="0"
											color="black"
											colorCode="0"
											rounded="full"
											size="sm"
											onClick={handlePriceClear}
										>
											Clear
										</Button>
									)}
								</div>
								<Slider
									aria-labelledby="range-slider"
									value={price}
									onChange={handlePriceChange}
									valueLabelDisplay="auto"
									disableSwap
									min={0}
									max={50000}
									step={100}
								/>
							</div>
							{brands.length > 0 && (
								<div className="filter">
									<div className="filterHeading">
										<span>Brand</span>
										{brandsParam && (
											<Button
												backgroundColor="white"
												backgroundColorCode="0"
												color="black"
												colorCode="0"
												rounded="full"
												size="sm"
												onClick={() =>
													updateSearchParams(
														"brands",
														""
													)
												}
											>
												Clear
											</Button>
										)}
									</div>
									<div className="list">
										{brands.map((brand) => (
											<div
												className="listItem"
												key={brand}
											>
												<input
													type="checkbox"
													id={brand}
													onChange={() => {
														handleBrandAddition(
															brand
														);
													}}
													checked={handleBrandChecked(
														brand
													)}
												/>
												<label htmlFor={brand}>
													{brand}
												</label>
											</div>
										))}
									</div>
								</div>
							)}
							<div className="filter">
								<div className="filterHeading">
									<span>Customer Ratings</span>
									{customerRatingParam && (
										<Button
											backgroundColor="white"
											backgroundColorCode="0"
											color="black"
											colorCode="0"
											rounded="full"
											size="sm"
											onClick={() =>
												updateSearchParams(
													"customerRating",
													""
												)
											}
										>
											Clear
										</Button>
									)}
								</div>
								<div className="list">
									<div className="listItem">
										<input
											type="radio"
											id="4"
											onClick={() =>
												handleCustomerRatingAddition(
													"4"
												)
											}
											checked={handleCustomerRatingChecked(
												"4"
											)}
										/>
										<label htmlFor="4">
											4{" "}
											<PiStarFill className="starIcon" />{" "}
											& above
										</label>
									</div>
									<div className="listItem">
										<input
											type="radio"
											id="3"
											onClick={() =>
												handleCustomerRatingAddition(
													"3"
												)
											}
											checked={handleCustomerRatingChecked(
												"3"
											)}
										/>
										<label htmlFor="3">
											3{" "}
											<PiStarFill className="starIcon" />{" "}
											& above
										</label>
									</div>
									<div className="listItem">
										<input
											type="radio"
											id="2"
											onClick={() =>
												handleCustomerRatingAddition(
													"2"
												)
											}
											checked={handleCustomerRatingChecked(
												"2"
											)}
										/>
										<label htmlFor="2">
											2{" "}
											<PiStarFill className="starIcon" />{" "}
											& above
										</label>
									</div>
								</div>
							</div>
							<div className="filter">
								<div className="filterHeading">
									<span>Discount</span>
									{discountParam && (
										<Button
											backgroundColor="white"
											backgroundColorCode="0"
											color="black"
											colorCode="0"
											rounded="full"
											size="sm"
											onClick={() =>
												updateSearchParams(
													"discount",
													""
												)
											}
										>
											Clear
										</Button>
									)}
								</div>
								<div className="list">
									<div className="listItem">
										<input
											type="radio"
											id="50"
											name="discount"
											onChange={() =>
												handleDiscountAddition("50")
											}
											checked={handleDiscountChecked(
												"50"
											)}
										/>
										<label htmlFor="50">50% or more</label>
									</div>
									<div className="listItem">
										<input
											type="radio"
											name="discount"
											id="40"
											onChange={() =>
												handleDiscountAddition("40")
											}
											checked={handleDiscountChecked(
												"40"
											)}
										/>
										<label htmlFor="40">40% or more</label>
									</div>
									<div className="listItem">
										<input
											id="30"
											type="radio"
											name="discount"
											onChange={() =>
												handleDiscountAddition("30")
											}
											checked={handleDiscountChecked(
												"30"
											)}
										/>
										<label htmlFor="30">30% or more</label>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="right">
						<div className="options">
							<Button
								backgroundColor="white"
								backgroundColorCode="0"
								color="black"
								colorCode="0"
								rounded="md"
								size="lg"
								onClick={() => setIsFiltersOpen(true)}
							>
								<IoFilter />
								<span>Filters</span>
							</Button>
							<FormProvider {...methods}>
								<Select
									id="sort-by"
									name="sort-by"
									options={[]}
								/>
							</FormProvider>
						</div>
						<div className="productItems">
							{isLoading
								? shimmerElements
								: filteredProducts.length > 0 &&
								  filteredProducts.map((product) => (
										<ProductItem
											product={product}
											key={product._id}
										/>
								  ))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Products;
