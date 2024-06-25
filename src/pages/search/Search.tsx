// STYLES MODULE IMPORT
import "./search.css";

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
import { RxCross2 } from "react-icons/rx";

const Search = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const methods = useForm();
	const [q, setQ] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [products, setProducts] = useState<ProductType[]>([]);

	const debouncedSearch = useDebounce(q);

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

	const handleClear = () => {
		setQ("");
		methods.setValue("searchQuery", "");
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
		<div className="search">
			<header className="searchHeader">
				<div className="container">
					<div className="wrapper">
						<Link to="/" className="brand">
							<img src={logo} alt="Logo" className="brandLogo" />
							<span className="brandName">popShop</span>
						</Link>
						<div className="searchBar">
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
										tralingIcon={q ? RxCross2 : undefined}
										tralingIconOnClick={handleClear}
									/>
								</form>
							</FormProvider>
						</div>
					</div>
				</div>
			</header>
			<main className="main">
				<div className="container">
					{!debouncedSearch ? (
						<div className="searchGif">
							<img src={searchGif} alt="Search Products" />
							<span className="textInfo">
								Start searching for products...
							</span>
						</div>
					) : debouncedSearch && products.length > 0 ? (
						<>
							<div className="heading">
								{q && <h1>Search results for: {q}</h1>}
							</div>
							<div className="wrapper">
								<div className="searchItems">
									{isLoading
										? shimmerElements
										: products.map((product) => (
												<SearchItem product={product} />
										  ))}
								</div>
							</div>
						</>
					) : (
						<div className="noresults">
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
