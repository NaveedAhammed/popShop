import "./checkout.css";

const ProgressBar: React.FC<{ step: number }> = ({ step }) => {
	return (
		<div className="progress-bar">
			<div className={`progress step-${step}`}></div>
			<div
				className={`progress-step ${step >= 1 ? "active" : ""}`}
				data-title="Address"
			>
				{step > 1 ? <span>&#10004;</span> : <span>1</span>}
			</div>
			<div
				className={`progress-step ${step >= 2 ? "active" : ""}`}
				data-title="Order Summary"
			>
				{step > 2 ? <span>&#10004;</span> : <span>2</span>}
			</div>
			<div
				className={`progress-step ${step >= 3 ? "active" : ""}`}
				data-title="Payment"
			>
				{step > 3 ? <span>&#10004;</span> : <span>3</span>}
			</div>
		</div>
	);
};

export default ProgressBar;
