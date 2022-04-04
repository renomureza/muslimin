import { Link } from "react-router-dom";

const CustomLink = ({ href, ...rest }) => {
  const isInternalLink = (href && href.startsWith("/")) || !href.includes("/");
  const isInternalLinkAnchor = href && href.startsWith("#");

  if (isInternalLink) {
    return <Link to={href} {...rest} />;
  }

  if (isInternalLinkAnchor) {
    return (
      <a href={href} {...rest}>
        {rest.children}
      </a>
    );
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={href} {...rest}>
      {rest.children}
    </a>
  );
};

export default CustomLink;
