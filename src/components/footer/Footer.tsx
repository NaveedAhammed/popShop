import "./footer.css";

import {
	FaFacebookF,
	FaInstagram,
	FaLinkedin,
	FaTwitter,
} from "react-icons/fa6";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="container wrapper">
				<ul className="links">
					<li className="link">Terms Of Use</li>
					<li className="link">Privacy-Policy</li>
					<li className="link">About</li>
					<li className="link">Blog</li>
					<li className="link">FAQ</li>
				</ul>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
					Duis aute irure dolor in reprehenderit in voluptate velit
					esse cillum dolore eu fugiat nulla pariatur.
				</p>
				<div className="socialLinks">
					<button className="btnLink facebook">
						<FaFacebookF />
					</button>
					<button className="btnLink instagram">
						<FaInstagram />
					</button>
					<button className="btnLink twitter">
						<FaTwitter />
					</button>
					<button className="btnLink linkedin">
						<FaLinkedin />
					</button>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
