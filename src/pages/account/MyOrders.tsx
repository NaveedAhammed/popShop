import "./account.css";

import { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import OrderItem from "../../components/orderItem/OrderItem";
import Select from "../../components/select/Select";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import { FormProvider, useForm } from "react-hook-form";
import { OrderType } from "../../types";
import { errorHandler } from "../../utils/errorHandler";
import { useSearchParams } from "react-router-dom";

const MyOrders = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [orders, setOrders] = useState<OrderType[]>([]);
	const [totalOrders, setTotalOrders] = useState(0);

	const [searchParams, setSearchParams] = useSearchParams();

	const pageNum = searchParams.get("page") || "1";

	const methods = useForm();

	console.log(isLoading, orders);

	const axiosPrivate = useAxiosPrivate();

	const handlePagination = (type: "next" | "prev") => {
		const newSearchParams = new URLSearchParams(searchParams);
		if (type === "next") {
			newSearchParams.set("page", `${Number(pageNum) + 1}`);
		} else {
			newSearchParams.set("page", `${Number(pageNum) - 1}`);
		}
		setSearchParams(newSearchParams);
	};

	useEffect(() => {
		const getProductDetails = () => {
			setIsLoading(true);
			axiosPrivate
				.get(`/myOrders?page=${pageNum}`)
				.then((res) => {
					setOrders(res.data.data.orders);
					setTotalOrders(Number(res.data.data.totalOrders));
				})
				.catch(errorHandler)
				.finally(() => {
					setIsLoading(false);
				});
		};

		getProductDetails();
	}, [axiosPrivate, pageNum]);

	const shimmerElements = Array.from({ length: 4 }).map((_, i) => (
		<div className="shimmerOrderItem" key={i}>
			<div className="shimmerHeader">
				<div className="shimmerOrderInfo">
					<div className="shimmerOrderId shimmer-animation"></div>
					<div className="shimmerOrderDetails">
						<div className="shimmerOrderedDate shimmer-animation"></div>
						<div className="shimmerOrderStatus shimmer-animation"></div>
					</div>
				</div>
				<div className="shimmerAmountPaid shimmer-animation"></div>
			</div>
			<hr className="shimmerSeperator" />
			<div className="shimmerItem">
				<div className="shimmerProductImg shimmer-animation"></div>
				<div className="shimmerProductInfo">
					<div className="shimmerProductBrand shimmer-animation"></div>
					<div className="shimmerProductTitle shimmer-animation"></div>
					<div className="shimmerMinDiscount">
						<div className="shimmer-animation"></div>
					</div>
					<div className="shimmerSubInfo">
						<div className="shimmerInfoItem shimmer-animation"></div>
						<div className="shimmerInfoItem shimmer-animation"></div>
					</div>
				</div>
				<div className="shimmerDiscount">
					<div className="shimmer-animation"></div>
				</div>
				<div className="shimmerPrice">
					<div className="price shimmer-animation"></div>
					<div className="quantity shimmer-animation"></div>
				</div>
			</div>
		</div>
	));

	return (
		<div className="myOrders">
			<div className="ordersWrapper">
				<div className="header">
					<FormProvider {...methods}>
						<form className="searchBar">
							<Input
								id="searchQuery"
								name="searchQuery"
								type="text"
								placeholder="Search your orders here"
								autoComplete="off"
							/>
							<Button
								backgroundColor="black"
								backgroundColorCode="0"
								color="white"
								colorCode="0"
								rounded="md"
								size="md"
							>
								Search
							</Button>
						</form>
						<div className="filters">
							<form className="filterItem">
								<Select id="type" name="type" options={[]} />
							</form>
							<form className="filterItem">
								<Select id="type" name="type" options={[]} />
							</form>
						</div>
					</FormProvider>
				</div>
				<div className="ordersContainer">
					{isLoading
						? shimmerElements
						: orders.map((order) => (
								<OrderItem
									orderId={order._id}
									orderItems={order.orderItems}
									orderStatus={order.orderStatus}
									orderedDate={order.orderedAt}
								/>
						  ))}
				</div>
				<div className="pagination">
					<Button
						backgroundColor="white"
						backgroundColorCode="0"
						color="black"
						colorCode="0"
						rounded="lg"
						borderColor="gray"
						borderColorCode="100"
						borderWidth="100"
						size="md"
						disabled={pageNum === "1" || isLoading}
						onClick={() => handlePagination("prev")}
					>
						Prev
					</Button>
					<span className="numPage">{pageNum}</span>
					<Button
						backgroundColor="white"
						backgroundColorCode="0"
						color="black"
						colorCode="0"
						rounded="lg"
						borderColor="gray"
						borderColorCode="100"
						borderWidth="100"
						size="md"
						onClick={() => handlePagination("next")}
						disabled={
							Number(pageNum) === Math.ceil(totalOrders / 10) ||
							isLoading
						}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
};

export default MyOrders;
