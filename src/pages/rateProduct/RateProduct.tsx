import "./rateProduct.css";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { ProductType, ReviewType } from "../../types";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { errorHandler } from "../../utils/errorHandler";
import CustomRating from "../../components/customRating/CustomRating";
import Textarea from "../../components/textarea/Textarea";
import Button from "../../components/button/Button";
import Loader from "../../components/loader/Loader";
import publicAxios from "../../utils/axios";
import { useUserStore } from "../../hooks/useUserStore";
import sadGif from "../../assets/sad.gif";

interface IRateProductInput {
	comment: string;
}

// yup schema
const schema = yup.object().shape({
	comment: yup.string().required("Review comment is required"),
});

const RateProduct = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [tempRating, setTempRating] = useState(0);
	const [userReview, setUserReview] = useState<ReviewType | null>(null);
	const [rating, setRating] = useState(0);
	const [product, setProduct] = useState<ProductType | null>(null);
	const methods = useForm<IRateProductInput>({
		resolver: yupResolver(schema),
		defaultValues: {
			comment: userReview?.comment,
		},
	});
	const [isValidRate, setIsValidRate] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [hasPurchased, setHasPurchased] = useState(false);

	const { id } = useParams();

	const { user } = useUserStore();

	const axiosPrivate = useAxiosPrivate();

	const onSubmit: SubmitHandler<IRateProductInput> = (
		formData: IRateProductInput
	) => {
		if (!tempRating && !rating) {
			setIsValidRate(false);
			return;
		}
		setIsSubmitting(true);
		axiosPrivate
			.post(`/product/review/${product?._id}`, {
				...formData,
				numRating: tempRating || rating,
			})
			.then((res) => {
				if (!res.data.success) {
					return toast.error(
						"Something went wrong, Please try again"
					);
				}
				if (res.data.success) {
					return toast.success(res.data.message);
				}
			})
			.catch(errorHandler)
			.finally(() => {
				setIsSubmitting(false);
			});
	};

	const onInvalid = () => {
		if (!tempRating && !rating) {
			setIsValidRate(false);
			return;
		}
	};

	useEffect(() => {
		const userReview = product?.reviews.find(
			(it) => it.userId._id === user?._id
		);
		if (userReview) {
			setUserReview(userReview);
			methods.setValue("comment", userReview.comment);
			setRating(userReview.numRating);
		}
	}, [product, user?._id, methods]);

	useEffect(() => {
		const checkHasPurchasedOrNot = () => {
			setIsLoading(true);
			axiosPrivate
				.get(`/hasPurchased/${id}`)
				.then((res) => {
					setHasPurchased(res.data.data.hasPurchasedOrNot);
				})
				.catch(errorHandler)
				.finally(() => {
					setIsLoading(false);
				});
		};

		checkHasPurchasedOrNot();
	}, [id, axiosPrivate]);

	useEffect(() => {
		const getProductDetails = () => {
			setIsLoading(true);
			publicAxios
				.get(`/products/${id}`)
				.then((res) => {
					setProduct(res.data.data.product);
				})
				.catch(errorHandler)
				.finally(() => {
					setIsLoading(false);
				});
		};

		hasPurchased && id && getProductDetails();
	}, [id, hasPurchased]);

	return (
		<div className="rateProduct">
			<div className="container">
				<div className="wrapper">
					{isLoading ? (
						<Loader width="3rem" height="3rem" color="black" />
					) : (
						<>
							{product && (
								<div className="body">
									{!hasPurchased ? (
										<div className="notAllowed">
											<img
												src={sadGif}
												alt="Not Allowed"
											/>
											<h2>
												Haven't purchased this product?
											</h2>
											<span>
												Sorry! You are not allowed to
												review this product since you
												haven't bought it on popShop.
											</span>
										</div>
									) : (
										<>
											<h1>Rating & Review</h1>
											<div className="productDetails">
												<div className="productImg">
													<img
														src={
															product?.images[0]
																.url
														}
														alt={product.title}
													/>
												</div>
												<Link
													to={`/product/${product._id}`}
													className="productTitle"
												>
													{product.title}
												</Link>
											</div>
											<FormProvider {...methods}>
												<form
													onSubmit={methods.handleSubmit(
														onSubmit,
														onInvalid
													)}
													className="form"
												>
													<div className="rating">
														<CustomRating
															rating={rating}
															tempRating={
																tempRating
															}
															setRating={
																setRating
															}
															setTempRating={
																setTempRating
															}
															setIsValidRate={
																setIsValidRate
															}
														/>
														{!isValidRate && (
															<span className="errorMsg">
																Rating is
																required
															</span>
														)}
													</div>
													<div className="comment">
														<Textarea
															autoComplete="off"
															cols={30}
															rows={5}
															id="comment"
															name="comment"
															placeholder="Comment"
															disabled={
																isSubmitting
															}
														/>
														{methods.formState
															.errors.comment && (
															<span className="errorMsg">
																{
																	methods
																		.formState
																		.errors
																		.comment
																		.message
																}
															</span>
														)}
													</div>
													<Button
														backgroundColor="black"
														backgroundColorCode="0"
														color="white"
														colorCode="0"
														rounded="lg"
														size="default"
														disabled={isSubmitting}
														type="submit"
													>
														{isSubmitting && (
															<Loader
																width="1rem"
																height="1rem"
																color="white"
															/>
														)}
														Submit
													</Button>
												</form>
											</FormProvider>
										</>
									)}
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default RateProduct;
