import { Link } from "react-router-dom";
import config from "../config/config";
import IconGithub from "./icons/IconGithub";

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <span className="text-sm">
          &copy; {new Date().getFullYear()}{" "}
          <Link
            to="/"
            className="font-semibold hover:text-primary transition-colors"
          >
            {config.site.name}
          </Link>{" "}
          All Rights Reserved.
        </span>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href={config.site.github}
          className="hover:text-primary transition-colors"
        >
          <IconGithub />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
