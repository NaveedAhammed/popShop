import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import { Suspense } from "react";
import Loader from "./components/loader/Loader";
import Footer from "./components/footer/Footer";

const AppLayout = () => {
	return (
		<div>
			<Header />
			<main>
				<Suspense
					fallback={
						<div className="lazy-loader">
							<Loader width="5rem" height="5rem" color="black" />
						</div>
					}
				>
					<Outlet />
				</Suspense>
			</main>
			<Footer />
		</div>
	);
};

export default AppLayout;
