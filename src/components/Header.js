import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import config from "../config/config";

const menus = [
  {
    name: "Quran",
    slug: "quran",
  },
  {
    name: "Hadits",
    slug: "hadits",
  },
  {
    name: "Prayer",
    slug: "prayer",
  },
  {
    name: "Berita",
    slug: "berita",
  },
];

const HamburgerMenu = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
};

const CrossIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

const Logo = () => {
  return (
    <Link to="/" className="text-primary font-bold text-2xl">
      {config.site.name}
    </Link>
  );
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const toggleOpenMenu = () => setIsOpenMenu((prev) => !prev);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width >= 768 && isOpenMenu) {
      setIsOpenMenu(false);
    }
  }, [isOpenMenu, windowSize.width]);

  return (
    <header className={`border-b border-slate-200 z-10 bg-white w-full`}>
      <nav className="w-full max-w-7xl mx-auto py-4 flex items-center flex-wrap gap-4 rounded-md justify-between h-full px-4 font-medium">
        <Logo />
        <button onClick={toggleOpenMenu} className="md:hidden">
          {isOpenMenu ? <CrossIcon /> : <HamburgerMenu />}
        </button>
        <div
          className={`md:inline-flex gap-10 ${
            isOpenMenu ? "flex w-full flex-col gap-6 items-center" : "hidden"
          }`}
        >
          {menus.map((menu) => (
            <Link
              key={menu.slug}
              to={menu.slug}
              className="hover:text-primary transition-colors"
            >
              {menu.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
