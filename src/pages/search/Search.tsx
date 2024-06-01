// STYLES MODULE IMPORT
import styles from "../search.module.css";

import { Link, useSearchParams } from "react-router-dom";

// LOCAL FILES IMPORT
import logo from "../../assets/logo.svg";
import { LuSearch } from "react-icons/lu";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../components/input/Input";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import publicAxios from "../../utils/axios";
import { errorHandler } from "../../utils/errorHandler";
import { ProductType } from "../../types";
import SearchItem from "./SearchItem";
import searchGif from "../../assets/searching-last.gif";
import noresults from "../../assets/no_result.gif";

const Search = () => {
	const methods = useForm();
	const [q, setQ] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [products, setProducts] = useState<ProductType[]>([]);

	const [searchParams, setSearchParams] = useSearchParams();

	const debouncedSearch = useDebounce(q);

	console.log(debouncedSearch);

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newSearchParams = new URLSearchParams(searchParams);
		if (e.target.value === "") {
			newSearchParams.delete("q");
		} else {
			newSearchParams.set("q", e.target.value);
		}
		setSearchParams(newSearchParams);
		setQ(e.target.value);
	};

	useEffect(() => {
		methods.setFocus("searchQuery");
	}, [methods]);

	useEffect(() => {
		const getSearchResults = () => {
			setIsLoading(true);
			publicAxios
				.get(`/search?searchQuery=${debouncedSearch}`)
				.then((res) => {
					setProducts(res.data.data.products);
				})
				.catch(errorHandler)
				.finally(() => {
					setIsLoading(false);
				});
		};

		debouncedSearch && getSearchResults();
	}, [debouncedSearch]);

	const shimmerElements = Array.from({ length: 10 }).map((_, i) => (
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
		<div className={styles.search}>
			<header className={styles.header}>
				<div className="container">
					<div className={styles.wrapper}>
						<Link to="/" className={styles.brand}>
							<img
								src={logo}
								alt="Logo"
								className={styles.brandLogo}
							/>
							<span className={styles.brandName}>popShop</span>
						</Link>
						<div className={styles.searchBar}>
							<FormProvider {...methods}>
								<form>
									<Input
										autoComplete="on"
										id="searchQuery"
										name="searchQuery"
										type="text"
										leadingIcon={LuSearch}
										placeholder="Search for Products, Brands and More"
										onChange={handleOnChange}
									/>
								</form>
							</FormProvider>
						</div>
					</div>
				</div>
			</header>
			<main className={styles.main}>
				<div className="container">
					{!debouncedSearch ? (
						<div className={styles.searchGif}>
							<img src={searchGif} alt="Search Products" />
							<span className={styles.textInfo}>
								Start searching for products...
							</span>
						</div>
					) : debouncedSearch && products.length > 0 ? (
						<>
							<div className={styles.heading}>
								{q && <h1>Search results for: {q}</h1>}
							</div>
							<div className={styles.wrapper}>
								<div className={styles.searchItems}>
									{isLoading
										? shimmerElements
										: products.map((product) => (
												<SearchItem product={product} />
										  ))}
								</div>
							</div>
						</>
					) : (
						<div className={styles.noresults}>
							<img src={noresults} alt="No results" />
						</div>
					)}
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Search;
