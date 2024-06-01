import { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import OrderItem from "../../components/orderItem/OrderItem";
import Select from "../../components/select/Select";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styles from "./account.module.css";

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
		<div className={styles.shimmerOrderItem} key={i}>
			<div className={styles.shimmerHeader}>
				<div className={styles.shimmerOrderInfo}>
					<div
						className={`${styles.shimmerOrderId} shimmer-animation`}
					></div>
					<div className={styles.shimmerOrderDetails}>
						<div
							className={`${styles.shimmerOrderedDate} shimmer-animation`}
						></div>
						<div
							className={`${styles.shimmerOrderStatus} shimmer-animation`}
						></div>
					</div>
				</div>
				<div
					className={`${styles.shimmerAmountPaid} shimmer-animation`}
				></div>
			</div>
			<hr className={styles.shimmerSeperator} />
			<div className={styles.shimmerItem}>
				<div
					className={`${styles.shimmerProductImg} shimmer-animation`}
				></div>
				<div className={styles.shimmerProductInfo}>
					<div
						className={`${styles.shimmerProductBrand} shimmer-animation`}
					></div>
					<div
						className={`${styles.shimmerProductTitle} shimmer-animation`}
					></div>
					<div className={styles.shimmerMinDiscount}>
						<div className="shimmer-animation"></div>
					</div>
					<div className={styles.shimmerSubInfo}>
						<div
							className={`${styles.shimmerInfoItem} shimmer-animation`}
						></div>
						<div
							className={`${styles.shimmerInfoItem} shimmer-animation`}
						></div>
					</div>
				</div>
				<div className={styles.shimmerDiscount}>
					<div className="shimmer-animation"></div>
				</div>
				<div className={styles.shimmerPrice}>
					<div className={`${styles.price} shimmer-animation`}></div>
					<div
						className={`${styles.quantity} shimmer-animation`}
					></div>
				</div>
			</div>
		</div>
	));

	return (
		<div className={styles.myOrders}>
			<div className={styles.ordersWrapper}>
				<div className={styles.header}>
					<FormProvider {...methods}>
						<form className={styles.searchBar}>
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
						<div className={styles.filters}>
							<form className={styles.filterItem}>
								<Select id="type" name="type" options={[]} />
							</form>
							<form className={styles.filterItem}>
								<Select id="type" name="type" options={[]} />
							</form>
						</div>
					</FormProvider>
				</div>
				<div className={styles.ordersContainer}>
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
				<div className={styles.pagination}>
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
					<span className={styles.numPage}>{pageNum}</span>
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
