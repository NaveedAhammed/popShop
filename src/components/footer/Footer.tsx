import styles from "../footer.module.css";

import {
	FaFacebookF,
	FaInstagram,
	FaLinkedin,
	FaTwitter,
} from "react-icons/fa6";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={`container ${styles.wrapper}`}>
				<ul className={styles.links}>
					<li className={styles.link}>Terms Of Use</li>
					<li className={styles.link}>Privacy-Policy</li>
					<li className={styles.link}>About</li>
					<li className={styles.link}>Blog</li>
					<li className={styles.link}>FAQ</li>
				</ul>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
					Duis aute irure dolor in reprehenderit in voluptate velit
					esse cillum dolore eu fugiat nulla pariatur.
				</p>
				<div className={styles.socialLinks}>
					<button className={`${styles.btnLink} ${styles.facebook}`}>
						<FaFacebookF />
					</button>
					<button className={`${styles.btnLink} ${styles.instagram}`}>
						<FaInstagram />
					</button>
					<button className={`${styles.btnLink} ${styles.twitter}`}>
						<FaTwitter />
					</button>
					<button className={`${styles.btnLink} ${styles.linkedin}`}>
						<FaLinkedin />
					</button>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
