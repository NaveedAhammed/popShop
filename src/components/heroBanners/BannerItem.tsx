// STYLES MODULE IMPORT
import "./heroBanners.css";

import Button from "../button/Button";

const BannerItem: React.FC<{
	bannerImg: string;
	subHeading: string;
	heading: string;
}> = ({ bannerImg, heading, subHeading }) => {
	return (
		<div className="bannerItem">
			<img src={bannerImg} alt="" className="bannerImg" />
			<div className="bannerContent">
				<div className="bannerContentWrapper">
					<span className="subHeading">{subHeading}</span>
					<span className="heading">{heading}</span>
					<Button
						backgroundColor="white"
						backgroundColorCode="0"
						color="black"
						colorCode="0"
						rounded="lg"
						size="default"
						style={{ width: "12rem", marginTop: "auto" }}
					>
						Shop Now
					</Button>
				</div>
			</div>
		</div>
	);
};

export default BannerItem;
