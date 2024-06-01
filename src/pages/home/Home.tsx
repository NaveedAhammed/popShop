import { useEffect, useState } from "react";
import Categories from "../../components/categories/Categories";
import ChipCarousel from "../../components/chipCarousel/ChipCarousel";
import HeroBanners from "../../components/heroBanners/HeroBanners";
import Products from "../../components/products/Products";
import { BillboardType, ProductType } from "../../types";
import publicAxios from "../../utils/axios";
import { errorHandler } from "../../utils/errorHandler";
import { CHIP_ITEMS } from "../../utils/constants";

const Home = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [billboards, setBillboards] = useState<BillboardType[]>([]);
	const [products, setProducts] = useState<ProductType[]>([]);

	useEffect(() => {
		const getHomePageData = async () => {
			setIsLoading(true);
			Promise.all([
				publicAxios.get("/billboards/active"),
				publicAxios.get("/products/featured"),
			])
				.then((res) => {
					setBillboards(res[0].data.data.billboards);
					setProducts(res[1].data.data.featuredProducts);
				})
				.catch(errorHandler)
				.finally(() => {
					setIsLoading(false);
				});
		};

		(billboards.length === 0 || products.length === 0) && getHomePageData();
	}, [billboards, products]);

	return (
		<div className="container">
			<ChipCarousel chips={CHIP_ITEMS} isLoading={isLoading} />
			{billboards && (
				<HeroBanners
					heading="New this week"
					billboards={billboards}
					isLoading={isLoading}
				/>
			)}
			<Categories isLoading={isLoading} />
			{products && (
				<Products
					products={products}
					heading="Featured Products"
					isLoading={isLoading}
				/>
			)}
		</div>
	);
};

export default Home;
