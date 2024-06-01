import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthModal from "./pages/auth/AuthModal.tsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Toaster />
		<App />
		<AuthModal />
	</React.StrictMode>
);
