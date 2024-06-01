import { lazy } from "react";
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import Search from "./pages/search/Search";
import PersistLogin from "./PersistLogin";
import AppLayout from "./AppLayout";
import ProtectedLayout from "./ProtectedLayout";

// LOCAL FILES IMPORT
const Home = lazy(() => import("./pages/home/Home"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const Details = lazy(() => import("./pages/details/Details"));
const Account = lazy(() => import("./pages/account/Account"));
const MyProfile = lazy(() => import("./pages/account/MyProfile"));
const MyWishlist = lazy(() => import("./pages/account/MyWishlist"));
const ManageAddresses = lazy(() => import("./pages/account/ManageAddresses"));
const MyOrders = lazy(() => import("./pages/account/MyOrders"));
const MyReviews = lazy(() => import("./pages/account/MyReviews"));
const Redirect = lazy(() => import("./pages/redirect/Redirect"));
const RateProduct = lazy(() => import("./pages/rateProduct/RateProduct"));
const Products = lazy(() => import("./pages/products/Products"));

const router = createBrowserRouter([
	{
		element: <PersistLogin />,
		children: [
			{
				element: <AppLayout />,
				children: [
					{
						path: "/",
						element: <Home />,
					},
					{
						path: "products",
						element: <Products />,
					},
					{
						path: "product/:id",
						element: <Details />,
					},
					{
						element: <ProtectedLayout />,
						children: [
							{
								path: "shopping-bag",
								element: <Cart />,
							},
							{
								path: "/rate-review/product/:id",
								element: <RateProduct />,
							},
							{
								path: "account",
								element: <Account />,
								children: [
									{
										index: true,
										element: (
											<Navigate to="myProfile" replace />
										),
									},
									{
										path: "myProfile",
										element: <MyProfile />,
									},
									{
										path: "myWishlist",
										element: <MyWishlist />,
									},
									{
										path: "addresses",
										element: <ManageAddresses />,
									},
									{
										path: "myOrders",
										element: <MyOrders />,
									},
									{
										path: "myReviews",
										element: <MyReviews />,
									},
								],
							},
						],
					},
					{
						path: "auth",
						element: <Redirect />,
					},
				],
			},
			{
				path: "search",
				element: <Search />,
			},
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
