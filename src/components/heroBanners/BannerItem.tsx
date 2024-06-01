// STYLES MODULE IMPORT
import Button from "../button/Button";
import styles from "../heroBanners.module.css";

const BannerItem: React.FC<{
	bannerImg: string;
	subHeading: string;
	heading: string;
}> = ({ bannerImg, heading, subHeading }) => {
	return (
		<div className={styles.bannerItem}>
			<img src={bannerImg} alt="" className={styles.bannerImg} />
			<div className={styles.bannerContent}>
				<div className={styles.bannerContentWrapper}>
					<span className={styles.subHeading}>{subHeading}</span>
					<span className={styles.heading}>{heading}</span>
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
